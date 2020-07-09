import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen1-add-function',
  templateUrl: './screen1-add-function.component.html',
  styleUrls: ['./screen1-add-function.component.css']
})
export class Screen1AddFunctionComponent implements OnInit {

  currentMode = 3;

  ngOnInit(): void {
  }

  constructor(private router: Router) { }

  changeScreenMode(modeNum:number)
  {
    this.currentMode=modeNum;
  }
}
