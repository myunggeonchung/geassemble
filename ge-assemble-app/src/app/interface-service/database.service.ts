import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TagData, TaggingData, WsEndPoint } from '../data/data.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // private tagDataResponseHandler: Function = function (dataResponse: TagData[]): void { };
  // private writeTagDataHandler: Function = function (isSuccess: boolean): void { };

  // private taggingDataResponseHandler: Function = function (dataResponse: TaggingData[]): void { };
  // private writeTaggingDataHandler: Function = function (isSuccess: boolean): void { };

  // private observeDataModifyHandler: Function = function (): void { };

  private subscriptTagDataModify: Subscription;
  private isSubscriptTagDataInit: boolean = false;
  private subscriptTaggingDataModify: Subscription;
  private isSubscriptTaggingDataInit: boolean = false;

  constructor(private fireStore: AngularFirestore) {

  }

  getAllTagData(dataResponseHandler: (dataResponse: TagData[]) => void): void {

    // this.tagDataResponseHandler = dataResponseHandler;
    const subscription = this.fireStore.collection<TagData>('tagDatas').snapshotChanges()
      .pipe(map(values => values.map(value => value.payload.doc.data() as TagData)))
      .subscribe(tagDatas => {
        dataResponseHandler(tagDatas)
        subscription.unsubscribe();
      });
  }

  createTagData(tagData: TagData, successHandler: (isSuccess: boolean) => void) {

    // this.writeTagDataHandler = successHandler;
    this.fireStore.collection('tagDatas').add(tagData).then(
      _ => successHandler(true),
      _ => successHandler(false)
    );
  }

  deleteTagData(tagId: string) {
    this.fireStore.doc('tagDatas/' + tagId).delete();
  }

  createTaggingData(taggingData: TaggingData, successHandler: (isSuccess: boolean) => void) {
    // this.writeTaggingDataHandler = successHandler;
    this.fireStore.collection('taggingDatas').add(taggingData).then(
      _ => successHandler(true),
      _ => successHandler(false)
    );
  }

  getAllTaggingData(dataResponseHandler: (dataResponse: TaggingData[]) => void): void {

    // this.taggingDataResponseHandler = dataResponseHandler;
    const subscription = this.fireStore.collection<TaggingData>('taggingDatas').snapshotChanges()
      .pipe(map(values => values.map(value => value.payload.doc.data() as TaggingData)))
      .subscribe(taggingDatas => {
        dataResponseHandler(taggingDatas)
        subscription.unsubscribe();
      });
  }

  deleteTaggingData(tagId: string) {
    this.fireStore.doc('taggingDatas/' + tagId).delete();
  }

  observeDataModify(dataModifyHandler: () => void): void {

    // this.observeDataModifyHandler = dataModifyHandler;
    if (this.subscriptTagDataModify == undefined) {
      this.subscriptTagDataModify = this.fireStore.collection<TagData>('tagDatas').stateChanges()
      .pipe(map(values => values.map(value => value.payload.doc.data() as TagData)))
      .subscribe(tagDatas => {
        if (this.isSubscriptTagDataInit) {
          console.log(tagDatas);
          dataModifyHandler();
        }
        else {
          this.isSubscriptTagDataInit = true;
        }
      });
    }

    if (this.subscriptTaggingDataModify == undefined) {
      this.subscriptTaggingDataModify = this.fireStore.collection<TaggingData>('taggingDatas').stateChanges()
      .pipe(map(values => values.map(value => value.payload.doc.data() as TaggingData)))
      .subscribe(taggingDatas => {
        if (this.isSubscriptTaggingDataInit) {
          console.log(taggingDatas);
          dataModifyHandler();
        }
        else {
          this.isSubscriptTaggingDataInit = true;
        }
      });
    }
  }



  getWsEndPoint(responseHandler: (endPoint: WsEndPoint) => void): void {

    const subscription = this.fireStore.collection<WsEndPoint>('wsEndPoints').snapshotChanges()
      .pipe(map(values => values.map(value => value.payload.doc.data() as WsEndPoint)))
      .subscribe(endPoint => {
        responseHandler(endPoint[0]);
        subscription.unsubscribe();
      });
  }




}
