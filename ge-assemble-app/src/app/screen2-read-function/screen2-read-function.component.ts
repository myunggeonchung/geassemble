import { Component, OnInit } from '@angular/core';
import { ApplianceAction } from './model/ApplianceAction';
import { TagInfo } from './model/TagInfo';
import { InterfaceService } from '../interface-service/interface.service';
import {CommandData, TagData} from '../data/data.model';
import { ConstantPool } from '@angular/compiler';
import { NfcService } from '../nfc-service/nfc.service';

@Component({
  selector: 'app-screen2-read-function',
  templateUrl: './screen2-read-function.component.html',
  styleUrls: ['./screen2-read-function.component.css']
})
export class Screen2ReadFunctionComponent implements OnInit {

  nfcReadTagId = '';

  receivedTagData: TagData = null;

  responseList = new Map([
    [ '0', '-' ],
    [ '1', '-' ],
    [ '2', '-' ],
    [ '3', '-' ],
  ]);

   applianceBackgroundColor = new Map([
    [ 'AirCon', '#36f649' ],
    [ 'Oven', '#ffdc00' ],
    [ 'Washer', '#023fd9' ]
  ]);

  nfcLoadingSrc = 'assets/nfc_load.gif';

  getReceiveTagData(): CommandData[] {
    if (this.receivedTagData == null) {
        return [];
    }
    else {
      return this.receivedTagData.commandData;
    }
  }

  getCommandDescription(commandData: CommandData): string {

    // console.log('applianceId' + commandData.applianceId);
    // console.log('commandId' + commandData.commandId);
    if (commandData.applianceId === 'Oven' && commandData.commandId === 'Cooking') {
      return 'Start Cooking ' + commandData.metaData + '°F'; // commandData.metaData
    }
    else if (commandData.applianceId === 'Washer' && commandData.commandId === 'Power'){
     return 'Turn ' + commandData.metaData +  ' the washer';
    }
    else if (commandData.applianceId === 'AirCon' && commandData.commandId === 'Power'){
      return 'Turn ' + commandData.metaData + ' the AirCon';
    }
    else if (commandData.applianceId === 'AirCon' && commandData.commandId === 'Temp'){
      return 'Set Temperature ' + commandData.metaData;
    }
    else if (commandData.applianceId === 'Washer' && commandData.commandId === 'GetCurrentPower'){
      return 'Current Washer status';
    }
    else if (commandData.applianceId === 'AirCon' && commandData.commandId === 'GetCurrentTemperature'){
      return 'Current temperature of AirCon';
    }
    else if (commandData.applianceId === 'Oven' && commandData.commandId === 'GetCurrentTemperature'){
      return 'Target temperature of Oven';
    }
    else if (commandData.applianceId === 'Oven' && commandData.commandId === 'GetCurrentPower'){
      return 'Current Oven status';
    }
    else if (commandData.applianceId === 'Oven' && commandData.commandId === 'GetTimeLeft'){
      return 'Current cook time of Oven ';
    }
    else if (commandData.applianceId === 'Washer' && commandData.commandId === 'GetTimeLeft'){
      return 'Washer Timer Left';
    }

    return 'Undefined command.';
  }

  constructor(private interfaceService: InterfaceService, private service: NfcService) {

    this.startNfcCardScan();
  }

  startNfcCardScan() {
    this.service.scanNfcCard(this.getNfcID.bind(this));

  }

  getNfcID(tagId: string) {
    console.log('정명건' + tagId);
    this.onNfcReadCallBack(tagId);
  }

  // NFC READ 했을때 읽기.
  onNfcReadCallBack(nfcId: string): void {
    this.clearResponseData();
    this.nfcLoadingSrc = './assets/nfc_load.gif' + '?a=' + Math.random();
    this.nfcReadTagId = nfcId;

    this.interfaceService.getTagDataByTagId(nfcId, (tagData) => {
      this.receivedTagData = tagData;
    });

    this.interfaceService.sendCommandByTagId(this.nfcReadTagId, (commandResponse) => {
        this.responseList.set(commandResponse.commandIndex, commandResponse.commandStatus);
    });
  }

  onClickReadSendNfcTest() {
    this.clearResponseData();
    this.nfcReadTagId = 'q69ifi9u2wendwctz1sa1l';
    this.onNfcReadCallBack(this.nfcReadTagId);
  }

  onClickReadNfcTest() {
    this.clearResponseData();
    // this.nfcReadTagId = 'zxcvzxcvzxcvzxcvc';
    this.nfcReadTagId = 'q69ifi9u2wendwctz1sa1l';

    this.interfaceService.getTagDataByTagId(this.nfcReadTagId, (tagData) => {
      console.log('tagData' + tagData);
      this.receivedTagData = tagData;
    });
  }

  onClickSendNfcTest() {

    this.interfaceService.sendCommandByTagId(this.nfcReadTagId, (commandResponse) => {
      this.responseList.set(commandResponse.commandIndex, commandResponse.commandStatus);
    });
  }

  onClear() {
    this.clearResponseData();
    // 빈화면 리드 하는 화면.
    this.nfcReadTagId = '';
  }

  ngOnInit(): void {

  }

  onClickLoad() {

  }

  onCreateTagData() {

    const tagData: TagData = {
      tagId: 'zxcvzxcvzxcvzxcvc',
      commandData: [
        {
          commandIndex: '0',
          applianceId: 'Oven',
          commandId: 'Power',
          metaData: 'On'
        },
        {
          commandIndex: '1',
          applianceId: 'AirCon',
          commandId: 'Temp',
          metaData: '74'
        }],
      name: 'Jayden Test',
      location: 'LivingRoom',
      time: '2020, 07/10, 22:30'
    };
    this.interfaceService.writeTagData(tagData, (isSuccess) => { console.log('Write Good!'); });

    this.receivedTagData = tagData;
  }

  onReadTagData() {
    let tagData = this.interfaceService.getTagDataByTagId('0', (tagData) => {
      console.log(tagData);
    });
  }

  onSendCommand() {
    this.interfaceService.sendCommandByTagId('0', (commandResponse) => {
      console.log(commandResponse);
    });
  }

  onGetTagId() {
    const tagId = this.interfaceService.getTagId();
    console.log(tagId);
  }

  onReadTaggingData() {

  }

  onReadTagInformation() {
    this.interfaceService.getInformations((tagInformations) => {
      console.log(tagInformations);
    });
  }

  getApplianceColor(applianceName: string): string {
     return this.applianceBackgroundColor.get(applianceName);
    // return '#3693f6';
  }

  getApplianceIcon(applianceName: string): string {
    if (applianceName === 'Oven') {
      return 'assets/ic_oven.png';
    }
    else if (applianceName === 'AirCon') {
      return 'assets/ic_aircon.png';
    }
    else if (applianceName === 'Washer') {
      return 'assets/ic_washer.png';
    }
    return 'assets/ic_oven.png';
  }

  receivedResponse(commandIdx: string): boolean {
    if (this.responseList.get(commandIdx) === '-') { return false; }
    else { return true; }
  }

  clearResponseData(): void {
    this.responseList.set('0', '-');
    this.responseList.set('1', '-');
    this.responseList.set('2', '-');
    this.responseList.set('3', '-');
  }

  onObserveTagData() {
    this.interfaceService.observeInformationModify((tagInformations) => {
      console.log(tagInformations);
    });
  }

  onConnect() {
    this.interfaceService.connectCloud((isConnected) => {
      // move to menu screen
    });
  }

  onDisConnect() {
    this.interfaceService.disconnectCloud();
  }
}
