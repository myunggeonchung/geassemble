import { Injectable } from '@angular/core';
import { Configure } from './cloud.service.config';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

import { Subscription, Observable, of, throwError, timer } from 'rxjs';
import { switchMap, map, tap, catchError, switchAll, retryWhen, delayWhen } from 'rxjs/operators';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EMPTY, Subject } from 'rxjs';
import { WsResMessage, WsReqSubscribe, WsReqPingMessage, WsReqAppliancesListMessage, WsResAppliancesListMessage, WsReqSendErdMessage, WsResCacheMessage, CommandData, CommandResponse, ApplianceId, CommandId, MetaData } from '../data/data.model';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private socket$: WebSocketSubject<any>;

  private applianceListMessage: WsResAppliancesListMessage;
  private commandDataForOven: CommandData;
  private commandDataForAirCon: CommandData;

  private cacheResponseHandler: Function = function (commandResponse: CommandResponse): void { };

  constructor() {
    this.socket$ = undefined;
  }

  public connect(endPoint: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(endPoint);
      this.socket$.subscribe(
        (message) => {
          const wsMessage: WsResMessage = JSON.parse(JSON.stringify(message));

          switch (wsMessage.kind) {
            case Configure.WebSocket.MessageType.Connect:
              const wsReqSubscribe: WsReqSubscribe = {
                action: 'subscribe',
                resources: [
                  `/appliance/*/erd/*`,
                  `/appliance/*/presence`,
                  `/appliance/*`]
              };

              this.sendMessage(wsReqSubscribe);
              break;


            case Configure.WebSocket.MessageType.Subscribe:
              setInterval(() => {
                const wsReqPingMessage: WsReqPingMessage = {
                  kind: Configure.WebSocket.MessageType.Ping,
                  action: 'ping',
                  id: 'gea709'
                };

                this.sendMessage(wsReqPingMessage);
              }, 60 * 1000);

              setTimeout(() => {
                const wsReqAppliancesListMessage: WsReqAppliancesListMessage = {
                  kind: Configure.WebSocket.MessageType.Api,
                  action: 'api',
                  host: Configure.WebSocket.getApiHost(),
                  method: 'GET',
                  path: '/v1/appliance',
                  id: Configure.WebSocket.ApiType.ApplianceList
                };

                this.sendMessage(wsReqAppliancesListMessage);
              }, 1000);
              break;

            case Configure.WebSocket.MessageType.Subscription:
              break;

            case Configure.WebSocket.MessageType.Presence:
              break;

            case Configure.WebSocket.MessageType.Api:
              if (wsMessage.id === Configure.WebSocket.ApiType.ApplianceList) {
                const listMessage: WsResAppliancesListMessage = JSON.parse(JSON.stringify(message));
                this.applianceListMessage = listMessage;
                console.log(this.applianceListMessage);
              }
              else if (wsMessage.id.startsWith('CACHE-')) {
                const cacheMessage: WsResCacheMessage = JSON.parse(JSON.stringify(message));
                const applianceId = cacheMessage.body.applianceId;
                switch (applianceId) {
                  case Configure.WebSocket.ApplianceId.Oven: {
                    let commandStatus = '';
                    const commandId = this.commandDataForOven.commandId;
                    if (commandId === CommandId.GetCurrentPower) {
                      const erdNumber = '0x5401';
                      const erdData = cacheMessage.body.items.find((item) => item.erd === erdNumber);
                      if (erdData != undefined) {
                        const erdValue = erdData.value;
                        const dataValue = erdValue.substring(4, 6);
                        if (dataValue != '00') {
                          commandStatus = 'On';
                        }
                        else {
                          commandStatus = 'Off';
                        }
                      }
                    }
                    else if (commandId === CommandId.GetCurrentTemperature) {
                      const erdNumber = '0x5401';
                      const erdData = cacheMessage.body.items.find((item) => item.erd === erdNumber);
                      if (erdData != undefined) {
                        const erdValue = erdData.value;
                        const hexValue = erdValue.substring(10, 14);
                        const dataValue = parseInt(hexValue, 16);
                        commandStatus = `${dataValue}`;
                      }
                    }
                    else { // time left
                      const erdNumber = '0x5403';
                      const erdData = cacheMessage.body.items.find((item) => item.erd === erdNumber);
                      if (erdData != undefined) {
                        const erdValue = erdData.value;
                        const hexValue = erdValue.substring(2, 6);
                        const dataValue = parseInt(hexValue, 16);
                        const second = dataValue % 60;
                        const hour = dataValue / 60;
                        commandStatus = `${hour}:${second}`;
                      }
                    }

                    const commandResponse: CommandResponse = {
                      commandIndex: this.commandDataForOven.commandIndex,
                      commandResult: true,
                      commandType: 'pull',
                      commandStatus: commandStatus
                    };

                    this.cacheResponseHandler(commandResponse);
                  }
                    break;
                  case Configure.WebSocket.ApplianceId.AirCon: {
                    let commandStatus = '';
                    const commandId = this.commandDataForAirCon.commandId;
                    if (commandId === CommandId.GetCurrentPower) {
                      const erdNumber = '0x7a0f';
                      const erdData = cacheMessage.body.items.find((item) => item.erd === erdNumber);
                      if (erdData != undefined) {
                        const erdValue = erdData.value;
                        if (erdValue != '00') {
                          commandStatus = 'On';
                        }
                        else {
                          commandStatus = 'Off';
                        }
                      }
                    }
                    else if (commandId === CommandId.GetCurrentTemperature) {
                      const erdNumber = '0x7003';
                      const erdData = cacheMessage.body.items.find((item) => item.erd === erdNumber);
                      if (erdData != undefined) {
                        const erdValue = erdData.value;
                        const dataValue = parseInt(erdValue, 16);
                        commandStatus = `${dataValue}`;
                      }
                    }
                    else { // time left
                      commandStatus = 'Unsupported';
                    }

                    const commandResponse: CommandResponse = {
                      commandIndex: this.commandDataForAirCon.commandIndex,
                      commandResult: true,
                      commandType: 'pull',
                      commandStatus: commandStatus
                    };

                    this.cacheResponseHandler(commandResponse);
                  }
                    break;
                  default:
                    break;
                }
                console.log(cacheMessage);
              }
              break;

            case Configure.WebSocket.MessageType.Ping:
              break;

            case Configure.WebSocket.MessageType.Pong:
              break;

            case Configure.WebSocket.MessageType.Error:
              break;

            default:
              console.log('Message Type: default');
              break;
          }

          console.log('Message Type: ' + wsMessage.kind);
        },
        (error) => console.log(error),
        () => console.log('complete')
      );
    }
  }

  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retryWhen(errors => errors.pipe(tap(value => console.log('[CloudService] Try to reconnect', value)),
        delayWhen(_ => timer(Configure.WebSocket.ReconnectInterval)))));
  }

  private getNewWebSocket(endPoint: string) {
    // return webSocket(Configure.WsEndPoint);
    return webSocket({
      url: endPoint,
      // serializer: reqMessage => JSON.stringify(reqMessage),
      // deserializer: (resEvent) => JSON.parse(resEvent.data) as WsResMessage,
      openObserver: {
        next: () => {
          console.log('[CloudService]: connection opened');
        }
      },
      closingObserver: {
        next: () => {
          console.log('[CloudService]: connection closing');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[CloudService]: connection closed');
          this.socket$ = undefined;
          setTimeout(_ => this.connect(endPoint), 10000);
        }
      }
    });
  }

  sendErd(commandData: CommandData, responseHandler: (commandResponse: CommandResponse) => void) {

    const applianceId = commandData.applianceId;
    const commandId = commandData.commandId;

    let methodValue = 'POST';
    let erdNumber = '';
    let erdValue = '';
    let applianceIdValue = '';

    switch (applianceId) {
      case ApplianceId.Oven:
        erdNumber = '0x5402';
        applianceIdValue = Configure.WebSocket.ApplianceId.Oven;
        if (commandId === CommandId.Cooking) {
          const metaData = commandData.metaData;
          const tempValue = ('0000' + parseInt(metaData).toString(16).toLowerCase()).slice(-4);
          erdValue = `540101${tempValue}0000000000000000000000000000`;
        }
        else if (commandId === CommandId.Temp) {
          const metaData = commandData.metaData;
          const tempValue = ('0000' + parseInt(metaData).toString(16).toLowerCase()).slice(-4);
          erdValue = `ad02ff${tempValue}ffffffffffffffffffffffffffff`;
        }
        else { // Power Off
          erdValue = '89000000000000000000000000000000000000';
        }
        break;
      case ApplianceId.AirCon:
        applianceIdValue = Configure.WebSocket.ApplianceId.AirCon;
        if (commandId === CommandId.Power) {
          erdNumber = '0x7A0F';
          const metaData = commandData.metaData;
          if (metaData === MetaData.On) {
            erdValue = '01';
          }
          else {
            erdValue = '00';
          }
        }
        else { // CommandId.Temp
          erdNumber = '0x7003';
          const metaData = commandData.metaData;
          const tempValue = ('0000' + parseInt(metaData).toString(16).toLowerCase()).slice(-4);
          erdValue = tempValue;
        }
        break;

      default:
        break;
    }

    const wsReqSendErdMessage: WsReqSendErdMessage = {
      kind: Configure.WebSocket.MessageType.Api,
      action: 'api',
      host: Configure.WebSocket.getApiHost(),
      method: methodValue,
      path: `/v1/appliance/${applianceIdValue}/erd/${erdNumber}`,
      id: `${methodValue}-${applianceIdValue.toLowerCase()}_${Configure.WebSocket.UserId}-${erdNumber}-${erdValue}`,
      body: {
        userId: Configure.WebSocket.UserId,
        applianceId: applianceIdValue,
        delay: 0,
        ackTimeout: 10,
        value: erdValue,
        erd: erdNumber, // Advantium Edit (cook start)
        kind: 'appliance#erdListEntry'
      }
    };

    if (applianceId != ApplianceId.Washer) {
      this.sendMessage(wsReqSendErdMessage);
    }

    setTimeout(() => {
      const commandResponse: CommandResponse = {
        commandIndex: commandData.commandIndex,
        commandResult: true,
        commandStatus: '',
        commandType: 'push'
      }
      responseHandler(commandResponse);
    }, 1500);
  }


  sendCache(commandData: CommandData, responseHandler: (commandResponse: CommandResponse) => void) {

    this.cacheResponseHandler = responseHandler;

    const applianceId = commandData.applianceId;
    const commandId = commandData.commandId;

    let applianceIdValue = '';
    switch (applianceId) {
      case ApplianceId.Oven:
        applianceIdValue = Configure.WebSocket.ApplianceId.Oven;
        this.commandDataForOven = commandData;
        break;
      case ApplianceId.AirCon:
        applianceIdValue = Configure.WebSocket.ApplianceId.AirCon;
        this.commandDataForAirCon = commandData;
        break;
      case ApplianceId.Washer:
        applianceIdValue = Configure.WebSocket.ApplianceId.Washer;
        break;
      default:
        break;
    }

    const wsReqCacheMessage: WsReqAppliancesListMessage = {
      kind: Configure.WebSocket.MessageType.Api,
      id: `CACHE-${applianceIdValue}`,
      path: `/v1/appliance/${applianceIdValue}/erd`,
      host: Configure.WebSocket.getApiHost(),
      method: 'GET',
      action: 'api'
    };

    if (applianceId != ApplianceId.Washer) {
      this.sendMessage(wsReqCacheMessage);
    }
    else {
      // defualt response for washer
      let commandStatus = '';
      if (commandId === CommandId.GetTimeLeft) {
        commandStatus = '0min';
      }
      else if (commandId === CommandId.GetCurrentPower) {
        commandStatus = 'Off';
      }
      else {
        commandStatus = '74F';
      }
      setTimeout(() => {
        const commandResponse: CommandResponse = {
          commandIndex: commandData.commandIndex,
          commandResult: true,
          commandStatus: commandStatus,
          commandType: 'pull'
        }
        responseHandler(commandResponse);
      }, 1500);
    }
  }

  private sendMessage(message: any) {
    if (this.socket$ != undefined) {
      this.socket$.next(message);
    }
  }

  close() {
    if (this.socket$ != undefined) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }

  // geTokenResponse: GeTokenResponse;
  // subscription: Subscription;

  // constructor(private http: HttpClient) {

  // }

  // obtainGeTokens() {
  //   console.log('obtainGeToken');

  //   this.subscription = this.obtainGeToken().subscribe(response => {
  //     console.log(response);
  //   });

  // }

  // // body = { name: 'Brad' };

  // private obtainGeToken(): Observable<GeTokenResponse> {

  //   const url = `${Configure.getHostNameAccout()}${Configure.CloudApiUriGeToken}`;

  //   const body = `integration=${Configure.getSonosIntegrationId()}&client_id=${Configure.getAccountClienctId()}&client_secret=${Configure.getAccountClientSecret()}&mdt=${Configure.getMobileDeviceToken()}`;

  //   const headers = new HttpHeaders()
  //     .set('Access-Control-Allow-Origin', '*')
  //     .set('Content-type', 'application/x-www-form-urlencoded')
  //     .set('Content-length', `${body.length}`)
  //     .set('User-Agent', 'GE Brillion Mobile 1.1.100.0_gea_cloud /iOS 13.1.2/ iPhoneXR')
  //     // .set('Authorization', '')
  //     ;
  //   // .set('mobiledevicetoken', '');

  //   return this.http.post<GeTokenResponse>(url, body, { headers: headers });
  // }
}
