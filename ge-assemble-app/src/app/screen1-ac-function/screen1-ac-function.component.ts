import { Component, OnInit } from '@angular/core';
import { FunctionItemServiceService, FunctionItems } from '../function-item-service.service';
import { CountSnackBarComponent } from '../count-snack-bar/count-snack-bar.component';

@Component({
  providers: [CountSnackBarComponent],
  selector: 'app-screen1-ac-function',
  templateUrl: './screen1-ac-function.component.html',
  styleUrls: ['./screen1-ac-function.component.css']
})
export class Screen1AcFunctionComponent implements OnInit {

  selectedFunction: FunctionItems = {};
  itemService: FunctionItemServiceService;
  snackBar: CountSnackBarComponent;
  acPowerMeta:string[]=['On','Off'];
  constructor(functionItemService: FunctionItemServiceService, snackBar: CountSnackBarComponent) {
    this.itemService = functionItemService;
    this.snackBar = snackBar;
  }

  ngOnInit(): void {
  }

}
