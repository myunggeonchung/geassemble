import { Component, OnInit } from '@angular/core';
import { FunctionItemServiceService, FunctionItems } from '../function-item-service.service';
import { CountSnackBarComponent } from '../count-snack-bar/count-snack-bar.component';

@Component({
  providers:[CountSnackBarComponent],
  selector: 'app-screen1-washer-function',
  templateUrl: './screen1-washer-function.component.html',
  styleUrls: ['./screen1-washer-function.component.css']
})
export class Screen1WasherFunctionComponent implements OnInit {

  selectedFunction: FunctionItems = new FunctionItems();
  itemService: FunctionItemServiceService;
  washerPowerMeta: string[] = ['On', 'Off'];
  snackBar: CountSnackBarComponent;

  constructor(functionItemService: FunctionItemServiceService, snackBar: CountSnackBarComponent) {
     this.itemService = functionItemService;
     this.snackBar = snackBar;
  }

  ngOnInit(): void {
  }

}
