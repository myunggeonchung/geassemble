import { Injectable } from '@angular/core';

export class FunctionItems {
  ApplianceId?: string;
  CommandId?: string;
  MetaValue?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FunctionItemServiceService {

  acFunctionItems: FunctionItems[] =
    [
      { ApplianceId: 'AirCon', CommandId: "Power", MetaValue: '' },
      { ApplianceId: 'AirCon', CommandId: 'Temp', MetaValue: '' },
      { ApplianceId: 'AirCon', CommandId: 'GetCurrentPower', MetaValue: '' },
      { ApplianceId: 'AirCon', CommandId: 'GetCurrentTemperature', MetaValue: '' }
    ]

  ovenFunctionItems: FunctionItems[] =
    [
      { ApplianceId: 'Oven', CommandId: "Power", MetaValue: '' },
      { ApplianceId: 'Oven', CommandId: "Cooking", MetaValue: '' },
      { ApplianceId: 'Oven', CommandId: "GetCurrentPower", MetaValue: '' },
      { ApplianceId: 'Oven', CommandId: "GetCurrentTemperature", MetaValue: '' },
      { ApplianceId: 'Oven', CommandId: "GetTimeLeft", MetaValue: '' }
    ]

  washerFunctionItems: FunctionItems[] =
    [
      { ApplianceId: 'Washer', CommandId: "Power", MetaValue: '' },
      { ApplianceId: 'Washer', CommandId: "GetCurrentPower", MetaValue: '' },
      { ApplianceId: 'Washer', CommandId: "GetTimeLeft", MetaValue: '' }
    ]

  mergeFunctionItems: FunctionItems[] = [];
  tagName: string;
  currentLocation: string;

  getWasherFunctions() {
     return this.washerFunctionItems;
  }

  getOvenFunctions() {
    return this.ovenFunctionItems;
  }
  getAcFunctions() {
    return this.acFunctionItems;
  }

  addAcFunction(item: FunctionItems) {
    this.acFunctionItems.push(item);
  }

  getMergeFunctions() {
    return this.mergeFunctionItems;
  }

  addMergeFunction(item: FunctionItems) {
    if (item.CommandId != null)
      this.mergeFunctionItems.push(item);
  }

  removeMergeFunction(item: FunctionItems) {
    const index = this.mergeFunctionItems.indexOf(item);
    if (index >= 0) {
      this.mergeFunctionItems.splice(index, 1);
    }
  }

  getMergeFunctionCount(): number {
    return this.mergeFunctionItems.length;
  }

  constructor() { }
}
