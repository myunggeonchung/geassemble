
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InterfaceService } from '../interface-service/interface.service';

import { DatabasePopupComponent } from './databasepopup/databasepopup.component';
import { TAGINFORMATION_ARRAY } from '../data/data.tagdata';
import { TagInformation } from '../data/data.model';

@Component({
  selector: 'app-screen3-see-function',
  templateUrl: './screen3-see-function.component.html',
  styleUrls: ['./screen3-see-function.component.css']
})

export class Screen3SeeFunctionComponent implements OnInit {

  public title = 'GEA.Assemble Project';
  public tagInformation : any;
  public backgroundColor = ['#F65336', '#F99104', '#F5D312', '#CDD902']

  constructor(private dialog: MatDialog, private interfaceService: InterfaceService) {
    interfaceService.getInformations((tagInformations) => {
        this.tagInformation = tagInformations;
    });
    interfaceService.observeInformationModify((tagInformations) => {
        this.tagInformation = tagInformations;
    });
   }

  ngOnInit() {
    //  modalService: NgbModal
  }

  openModal(index: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      tagName: this.tagInformation[index].tagName,
      tagLocation: this.tagInformation[index].tagLocation,
      tagCount: this.tagInformation[index].tagCallCount,
      tagTime:  this.tagInformation[index].tagTimeList
  };

    this.dialog.open(DatabasePopupComponent, dialogConfig);
  }

  getBackgroundColor(index: number): string {
    console.log('dddd:'+index);
    return this.backgroundColor[index % this.backgroundColor.length];
  }

  getIndex(item: TagInformation): number {
    // console.log('번호:' + this.tagInformation.indexOf(item));

    if (this.tagInformation.indexOf(item) > this.tagInformation.length) {
      return 0;
    }
    return this.tagInformation.indexOf(item);
  }

  getIndexPlusOne(item: TagInformation): number {
  
    let plusNumber =  this.tagInformation.indexOf(item)+1;

    if (plusNumber >= this.tagInformation.length) {
      console.log('번호:' + plusNumber);
      return 1;
    }

    return (plusNumber);
  }

  getTagCount(index: number): number {
    // if (!this.isValidIndex(index)) { return 0; }
    if (index >= this.tagInformation.length) {
      return 0;
    }
    return this.tagInformation[index].tagCallCount;
  }

  getTagName(index: number): string {
    // if (!this.isValidIndex(index)) { return '-'; }
    return this.tagInformation[index].tagName;
  }

  getLocationName(index: number): string {
    // if (!this.isValidIndex(index)) { return '-'; }
    return this.tagInformation[index].tagLocation;
  }

  getApplianceName(index: number): string[] {
    // console.log(this.tagInformation[index]);
    return this.tagInformation[index].applianceNameList;
  }

  isValidIndex(index: number): boolean {
    return (this.tagInformation.length < index);
  }

  getApplianceImageName(name: string): string {
    // Oven, AirCon, Washer
    console.log(name);

    if (name == 'Oven') {
        return 'assets/advantium.png';
    }
    else if (name == 'AirCon') {
        return 'assets/pac.png';
    }
    else if (name == 'Washer') {
      return 'assets/washer.png';
    }
    else {
      return 'assets/advantium.png';
    }
  }
}
