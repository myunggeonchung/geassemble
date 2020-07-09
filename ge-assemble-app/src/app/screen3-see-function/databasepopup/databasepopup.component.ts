import { Component, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-database-popup',
  templateUrl: './databasepopup.component.html',
  styleUrls: ['./databasepopup.component.css']
})

export class DatabasePopupComponent implements OnInit {
  @Input() public tagName: string;
  @Input() public tagLocation: string;
  @Input() public tagCount: number;
  @Input() public tagTime: string[];

  constructor(
    private dialogRef: MatDialogRef<DatabasePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.tagName = data.tagName
      this.tagCount = data.tagCount
      this.tagTime = data.tagTime
      this.tagLocation = data.tagLocation
    }

  ngOnInit() {
      console.log('시작')
      console.log(this.tagName)
      console.log('끝')
  }

  onClose() {
      this.dialogRef.close();
  }
}
 