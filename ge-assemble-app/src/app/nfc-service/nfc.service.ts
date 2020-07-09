import { Injectable, Input } from '@angular/core';

declare function onScan(func: any): any;
declare function onWrite(tagId: any, func: any): any;

@Injectable({    
    providedIn: 'root'    
})    
export class NfcService { 
    public tagIdFunction1: any
    public tagResultfunction2: any

    scanNfcCard(function1: any) {
        console.log('angular card scan 시작')
        this.tagIdFunction1 = function1;
        onScan(this.getTag.bind(this));
    }
    
    writeNfcCard(tagId: string, function2: any) {
        console.log('angular card write 시작')
        this.tagResultfunction2 = function2;
        onWrite(tagId, this.getWriteResult.bind(this));
    }

    getTag = (tagId: string) => {
        console.log('throwtag'+tagId);
        this.tagIdFunction1(tagId)
    }

    getWriteResult = (result: boolean) => {
        console.log(result)
        this.tagResultfunction2(result)
    }
}
