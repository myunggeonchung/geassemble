import { Component, OnInit } from '@angular/core';
import { FunctionItemServiceService } from '../function-item-service.service';
import { TagData, CommandData } from '../data/data.model';
import { InterfaceService } from '../interface-service/interface.service';
import { NfcService } from '../nfc-service/nfc.service';

@Component({
  selector: 'app-screen1-merge-function',
  templateUrl: './screen1-merge-function.component.html',
  styleUrls: ['./screen1-merge-function.component.css']
})

export class Screen1MergeFunctionComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  itemService: FunctionItemServiceService;
  dataBaseService: InterfaceService;
  nfcService: NfcService;
  currentTagData: TagData = new TagData();
  currentCommandData: CommandData = new CommandData();
  locations: string[] = ['Kitchen', 'LivingRoom', 'BedRoom', 'Room1', 'Room2',
    'Garage', 'Bathroom', 'FrontDoor', 'Terrace', 'Basement'];

  ngOnInit(): void {
  }

  constructor(functionItemService: FunctionItemServiceService, dataBaseService: InterfaceService, nfcService: NfcService) {
    this.itemService = functionItemService;
    this.dataBaseService = dataBaseService;
    this.nfcService = nfcService;
    this.currentTagData.commandData = [];
  }

  getResultBooleanType(tagResult: boolean) {
    console.log('NFC Write Success' + tagResult);
  }

  startNfcCardWrite(tagId: string) {
    this.nfcService.writeNfcCard(tagId, this.getResultBooleanType.bind(this))
  }

  createTagData() {

    console.log('test');
    this.currentTagData = new TagData();
    this.currentTagData.commandData = [];

    for (let i = 0; i < this.itemService.getMergeFunctionCount(); i++) {
      this.currentCommandData = new CommandData();
      this.currentCommandData.applianceId = (this.itemService.getMergeFunctions())[i].ApplianceId;
      this.currentCommandData.commandId = (this.itemService.getMergeFunctions())[i].CommandId;
      this.currentCommandData.commandIndex = i.toString();
      if ((this.itemService.getMergeFunctions())[i].MetaValue === null) {
        this.currentCommandData.metaData = '';
      }
      else {
        this.currentCommandData.metaData = this.itemService.getMergeFunctions()[i].MetaValue;
      }
      this.currentTagData.commandData.push(this.currentCommandData);
    }

    this.currentTagData.tagId = this.dataBaseService.getTagId();
    this.currentTagData.name = this.itemService.tagName;
    this.currentTagData.location = this.itemService.currentLocation;
    this.currentTagData.time = '';
    const jsonData = JSON.parse(JSON.stringify(this.currentTagData));


    this.dataBaseService.writeTagData(jsonData, (isSuccess) => { if (isSuccess) { console.log('success'); } });
    this.startNfcCardWrite(this.currentTagData.tagId);
  }
}

  // this.interfaceService.writeTagData(this.tagDataExample,(isSuccess) => {if (isSuccess) {console.log('success');}});
    // this.interfaceService.getTagId();
