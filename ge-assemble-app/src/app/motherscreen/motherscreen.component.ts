import { Component, OnInit } from '@angular/core';
import { Statement } from '@angular/compiler';
// import { menuState} from ''

enum MenuState {
  write = 0, 
  read = 1, 
  database = 2
}

@Component({
  selector: 'app-motherscreen',
  templateUrl: './motherscreen.component.html',
  styleUrls: ['./motherscreen.component.css']
})
export class MotherscreenComponent implements OnInit {

  public MenuState = MenuState;
  myMenuState: MenuState = MenuState.write

  stateStrings: string[] =["Write","Read","Database"];

  constructor() { }

  ngOnInit(): void {
  }

  onReadClicked() {
    this.myMenuState = MenuState.read
    console.log('읽는중')
  }

  onWriteClicked() {
    this.myMenuState = MenuState.write
    console.log('쓰는중')
  }

  onDatabaseClicked() {
    this.myMenuState = MenuState.database
    console.log('Databse')
  }

  // getButtonName(index: number): string {
  //   return this.stateString[index]
  // }
  onButtonClicked(index: number) {
    console.log(index)
    if (index == MenuState.write) {
      this.myMenuState = MenuState.write
      console.log('쓰는중')
    } else if (index == MenuState.read) {
      this.myMenuState = MenuState.read
      console.log('읽는중')
    } else if (index == MenuState.database) {
      this.myMenuState = MenuState.database
      console.log('Databse')
    }
  }
  getButtonTextColor(index: number): string {
    if (this.myMenuState == index) {
       return 'black';    
    } else {
       return '#A5A5A5';
    }
  }
  
  getBarColor(index: number): string {
    if (this.myMenuState == index) {
      return 'black'    
   } else {
      return 'none'
   }
  }
}
