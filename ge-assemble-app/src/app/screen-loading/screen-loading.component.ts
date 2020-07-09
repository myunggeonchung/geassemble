import { Component, OnInit } from '@angular/core';
import { NfcService } from '../nfc-service/nfc.service';
import { Router } from '@angular/router';
import { InterfaceService } from '../interface-service/interface.service';

@Component({
  selector: 'index-board',
  templateUrl: './screen-loading.component.html',
  styleUrls: ['./screen-loading.component.css']
})


export class ScreenLoadingComponent implements OnInit {

  isConnected: boolean;
  constructor(public service: NfcService, private router: Router, private interfaceService: InterfaceService) {

    interfaceService.connectCloud((isConnected) => {

      setTimeout(() => {
        this.router.navigate(['screen-mother']);
    }, 1500);  //5s

      if (isConnected) {
        this.isConnected = isConnected;
      }
    });
  }


  ngOnInit(): void {

    setTimeout(() => {
      this.router.navigate(['screen-mother']);
  }, 5000);  //5s
  }

  startNfcCardScan() {
    this.service.scanNfcCard(this.getNfcID.bind(this))
  }

  getNfcID(tagId: string) {
    console.log('정명건' + tagId)
  }

  startNfcCardWrite(tagId: string) {
    this.service.writeNfcCard(tagId, this.getResultBooleanType.bind(this))
  }

  getResultBooleanType(tagResult: boolean) {
    console.log('정명건' + tagResult)
  }


}
