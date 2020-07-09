import { Component, OnInit } from '@angular/core';
import { FunctionItemServiceService, FunctionItems } from '../function-item-service.service';
import { CountSnackBarComponent } from '../count-snack-bar/count-snack-bar.component';

@Component({
  providers: [CountSnackBarComponent],
  selector: 'app-screen1-oven-function',
  templateUrl: './screen1-oven-function.component.html',
  styleUrls: ['./screen1-oven-function.component.css']
})
export class Screen1OvenFunctionComponent implements OnInit {

  selectedFunction: FunctionItems = new FunctionItems();
  itemService: FunctionItemServiceService;
  ovenPowerMeta: string[] = ['On', 'Off'];
  snackBar: CountSnackBarComponent;

  constructor(functionItemService: FunctionItemServiceService, snackBar: CountSnackBarComponent) {
    this.itemService = functionItemService;
    this.snackBar = snackBar;
  }

  ngOnInit(): void {

  }

}
