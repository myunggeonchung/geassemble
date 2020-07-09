import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunctionItemServiceService } from '../function-item-service.service';

@Component({
  selector: 'app-count-snack-bar',
  templateUrl: './count-snack-bar.component.html',
  styleUrls: ['./count-snack-bar.component.css']
})
export class CountSnackBarComponent implements OnInit {
  
  itemService:FunctionItemServiceService;

  constructor(private snackBar: MatSnackBar, itemService:FunctionItemServiceService) {
    this.itemService = itemService;
  }

  openSnackBar() {
    this.snackBar.openFromComponent(CountSnackBarComponent, { duration: 5000 });
  }

  ngOnInit(): void {
  }

}
