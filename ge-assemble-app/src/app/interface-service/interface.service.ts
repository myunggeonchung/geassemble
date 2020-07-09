import { Injectable } from '@angular/core';

import { CloudService } from './cloud.service';
import { DatabaseService } from './database.service';


import { TagData, TagInformation, TaggingData, ApplianceId, CommandId, CommandData } from '../data/data.model';
import { CommandResponse } from '../data/data.model';
import { TAGINFORMATION_ARRAY, TAG_DATA } from '../data/data.tagdata';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  // private commandResponseHandler: Function = function (commandResponse: CommandResponse): void { };
  // private dataResponseHandler: Function = function (tagData: TagData): void { };
  // private informationAllHandler: Function = function (tagInformations: TagInformation[]): void { };
  // private informationModifyHandler: Function = function (tagInformations: TagInformation[]): void { };

  constructor(private cloudService: CloudService, private databaseService: DatabaseService) { }

  // ---------------------- Use Write Page
  writeTagData(tagData: TagData, successHandler: (isSuccess: boolean) => void): void {

    console.log(tagData);
    this.databaseService.createTagData(tagData, successHandler);

    // console.log(tagData);
  }

  getTagId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // ---------------------- Use Read Page
  getTagDataByTagId(tagId: string, tagDataHandler: (tagData: TagData) => void): void {

    // this.dataResponseHandler = tagDataHandler;

    this.databaseService.getAllTagData((tagDatas) => {
      console.log(tagDatas);
      const tagData = tagDatas.find(tagData => tagData.tagId === tagId);
      tagDataHandler(tagData);
    });
  }

  sendCommandByTagId(tagId: string, responseHandler: (commandResponse: CommandResponse) => void): void {

    // this.commandResponseHandler = responseHandler;
    // const commandData: CommandData = {
    //   commandIndex: '0',
    //   applianceId: ApplianceId.Oven,
    //   commandId: CommandId.GetCurrentTemperature,
    //   metaData: ''
    // }
    // this.cloudService.sendCache(commandData, (commandResponse) => {
    //   responseHandler(commandResponse);
    // });
    // return;
    // save TaggingData
    const today = new Date();
    const taggingData: TaggingData = {
      tagId: tagId,
      taggingTime: today.toString()
    }
    this.databaseService.createTaggingData(taggingData, (isSuccess) => {

      // if (isSuccess) {

        // send the command and return callback
        // 1. find command with tagId
        this.databaseService.getAllTagData((tagDatas) => {
          const tagData = tagDatas.find(tagData => tagData.tagId === tagId);
          if (tagData != undefined) {

            // 2. send command
            // 3. parsing data to send to the view
            tagData.commandData.forEach((commandData) => {
              const applianceId = commandData.applianceId;
              const commandId = commandData.commandId;
              switch (applianceId) {
                case ApplianceId.Oven:
                  if (commandId === CommandId.Cooking || commandId === CommandId.Temp || commandId === CommandId.Power) {
                    this.cloudService.sendErd(commandData, (commandResponse) => {
                      responseHandler(commandResponse);
                    });
                  }
                  else {
                    this.cloudService.sendCache(commandData, (commandResponse) => {
                      responseHandler(commandResponse);
                    });
                  }
                  break;
                case ApplianceId.AirCon:
                  if (commandId === CommandId.Power || commandId === CommandId.Temp) {
                    this.cloudService.sendErd(commandData, (commandResponse) => {
                      responseHandler(commandResponse);
                    });
                  }
                  else {
                    this.cloudService.sendCache(commandData, (commandResponse) => {
                      responseHandler(commandResponse);
                    });
                  }
                  break;
                case ApplianceId.Washer:
                  if (commandId === CommandId.Power) {
                    this.cloudService.sendErd(commandData, (commandResponse) => {
                      responseHandler(commandResponse);
                    });
                  }
                  else {
                    this.cloudService.sendCache(commandData, (commandResponse) => {
                      responseHandler(commandResponse);
                    });
                  }
                  break;

                default:
                  break;
              }
            });
          }
          else {
            // return failed
            let commandResponse: CommandResponse = {
              commandResult: false,
              commandIndex: '',
              commandType: '',
              commandStatus: ''
            };
            responseHandler(commandResponse);
          }
        });
      // }
      // else {
      //   // return failed
      //   let commandReponse: CommandResponse = {
      //     commandResult: false,
      //     commandIndex: '',
      //     commandType: '',
      //     commandStatus: ''
      //   };
      //   responseHandler(commandReponse);
      // }

      // setTimeout(() => {
      //   let commandReponse: CommandResponse = {
      //     commandResult: true,
      //     commandIndex: '0',
      //     commandType: 'push',
      //     commandStatus: 'On'
      //   };

      //   responseHandler(commandReponse);
      // }, 2000);
    });
  }
  // private commandResponsHandler: Function = function (commandResponse: CommandResponse): void {
  //   // 3. parsing data to send to the view, or check is succeed.
  // };



  // ---------------------- Use Display Page
  getInformations(informationHandler: (tagInformations: TagInformation[]) => void): void {

    // this.informationAllHandler = informationHandler;

    this.databaseService.getAllTaggingData((taggingDatas) => {
      console.log(taggingDatas);

      this.databaseService.getAllTagData((tagDatas) => {
        console.log(tagDatas);

        let tagInformationList: TagInformation[] = [];
        // const tagDataInterator = tagDatas.values();
        tagDatas.forEach((tagData) => {

          let applianceTypeList: string[] = [];
          const commandDataIterator = tagData.commandData.values();
          for (const value of commandDataIterator) {
            applianceTypeList.push(value.applianceId);
          }

          let taggingCount = 0;
          const taggingDataList = taggingDatas.filter((taggingData) => taggingData.tagId === tagData.tagId);
          if (taggingDataList != undefined) {
            taggingCount = taggingDataList.length;
          }

          let taggingTimeList: string[] = [];
          const taggingDataInterator = taggingDataList.values();
          for (const value of taggingDataInterator) {
            taggingTimeList.push(value.taggingTime);
          }

          const tagInformation: TagInformation = {
            tagName: tagData.name,
            tagLocation: tagData.location,
            applianceNameList: applianceTypeList,
            tagCallCount: taggingCount,
            tagTimeList: taggingTimeList
          };

          tagInformationList.push(tagInformation);
        });

        informationHandler(tagInformationList);
      });

    });
  }

  observeInformationModify(modifyHandler: (tagInformations: TagInformation[]) => void): void {
    // return tag information array when the tag data is changed.
    // this.informationModifyHandler = modifyHandler;

    this.databaseService.observeDataModify(() => {
      console.log('Modified Tag Data!');



      this.databaseService.getAllTaggingData((taggingDatas) => {
        // console.log(taggingDatas);

        this.databaseService.getAllTagData((tagDatas) => {
          // console.log(tagDatas);

          let tagInformationList: TagInformation[] = [];
          // const tagDataInterator = tagDatas.values();
          tagDatas.forEach((tagData) => {

            let applianceTypeList: string[] = [];
            const commandDataIterator = tagData.commandData.values();
            for (const value of commandDataIterator) {
              applianceTypeList.push(value.applianceId);
            }

            let taggingCount = 0;
            const taggingDataList = taggingDatas.filter((taggingData) => taggingData.tagId === tagData.tagId);
            if (taggingDataList != undefined) {
              taggingCount = taggingDataList.length;
            }

            let taggingTimeList: string[] = [];
            const taggingDataInterator = taggingDataList.values();
            for (const value of taggingDataInterator) {
              taggingTimeList.push(value.taggingTime);
            }

            const tagInformation: TagInformation = {
              tagName: tagData.name,
              tagLocation: tagData.location,
              applianceNameList: applianceTypeList,
              tagCallCount: taggingCount,
              tagTimeList: taggingTimeList
            };

            tagInformationList.push(tagInformation);
          });

          modifyHandler(tagInformationList);
        });

      });



    });
  }


  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  connectCloud(resultHandler: (isConnected: boolean) => void) {

    this.databaseService.getWsEndPoint((endPoint) => {
      console.log(endPoint);
      setTimeout(()=>this.cloudService.connect(endPoint.endPoint),1000);
      resultHandler(true);
    });
  }

  disconnectCloud() {
    console.log('call disconnected');
    this.cloudService.close();
  }


}
