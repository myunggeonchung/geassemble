
export class TagData {
    tagId: string; //random string of length 8
    commandData: CommandData[];
    name: string;
    location: string; //Kitchen, LivingRoom, BedRoom, Room1, Room2, Garage, Bathroom, FrontDoor, Terrace, Basement
    time: string;
}

export class CommandData {
    commandIndex: string; //CommandData[]'s index
    applianceId: string; //Oven, AirCon, Washer
    commandId: string; // Power, Temp, Cooking, GetCurrentPower, GetCurrentTemperature, GetTimeLeft
    metaData: string;  // On/Off, number(degree)
}

export enum ApplianceId {
    Oven = 'Oven',
    AirCon = 'AirCon',
    Washer = 'Washer'
}

export enum CommandId {
    Power = 'Power',
    Temp = 'Temp',
    Cooking = 'Cooking',
    GetCurrentPower = 'GetCurrentPower',
    GetCurrentTemperature = 'GetCurrentTemperature',
    GetTimeLeft = 'GetTimeLeft',
}

export enum MetaData {
    On = 'On',
    Off = 'Off',
}

/*
{ Oven, Cooking, number},
{ Oven, Power, Off},
{ Oven, Temp, number},
{ Oven, GetCurrentTemperature},
{ Oven, GetTimeLeft},
{ AirCon, Power, On/Off},
{ AirCon, Temp, number},
{ AirCon, GetCurrentTemperature},
{ Washer, Power, On/Off},
{ Washer, GetCurrentPower},
{ Washer, GetTimeLeft}
*/
export class CommandResponse {
    commandIndex: string;
    commandType: string;            // pull, push
    commandResult: boolean;         // success, failed
    commandStatus: string;          // if it is push '', if it is pull On/Off/number
}

// export class CommandStatus {
//     applianceType: string;      // oven, pac
//     applianceTemp: string;
//     applianceStatus: string;    // on, off
// }

export class TaggingData {
    tagId: string;
    taggingTime: string;
}

export class TagInformation {
    tagName: string;
    tagLocation: string;
    applianceNameList: string[];
    tagCallCount: number;
    tagTimeList: string[];
}


export class WsEndPoint {
    endPoint: string;
}

export class WsResMessage {
    kind: string;
    success?: string;
    action?: string;
    resources?: string;
    reason?: string;
    change?: string;
    resource?: string;
    id?: string;
}

export class WsResAppliancesListMessage {
    kind: string;
    method: string;
    id: string;
    success: boolean;
    code: number;
    body: WsResAppliancesListBodyMessage;
}

export class WsResAppliancesListBodyMessage {
    kind: string;
    userId: string;
    items: WsResAppliancesListItemsMessage[];
}

export class WsResAppliancesListItemsMessage {
    applianceId: string;
    brand: string;
    jid: string;
    nickname: string;
    online: string;
    type: string;
}

export class WsResCacheMessage {
    kind: string;
    id: string;
    success: boolean;
    code: number;
    body: WsResCacheBodyMessage;
}

export class WsResCacheBodyMessage {
    applianceId: string;
    kind: string;
    userId: string;
    items: WsResCacheItemsMessage[];
}

export class WsResCacheItemsMessage {
    erd: string;
    time: string;
    value: string;
}

export class WsReqSubscribe {
    action: string;
    resources: string[];
}

export class WsReqCacheMessage {
    kind: string;
    id: string;
    path: string;
    host: string;
}

export class WsReqPingMessage {
    kind: string;
    action: string;
    id: string;
}

export class WsReqAppliancesListMessage {
    kind: string;
    action: string;
    host: string;
    method: string;
    path: string;
    id: string;
}

export class WsReqSendErdMessage {
    kind: string;
    method: string;
    action: string;
    id: string;
    host: string;
    path: string;
    body: WsReqSendErdBodyMessage;
}

export class WsReqSendErdBodyMessage {
    userId: string;
    applianceId: string;
    delay: number;
    ackTimeout: number;
    value: string;
    erd: string;
    kind: string;
}
