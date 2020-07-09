import { TagInformation, TagData } from '../data/data.model';

export const TAGINFORMATION_ARRAY: TagInformation[] = [
  { tagName: "Michael님 Tag", tagLocation: "주방", applianceNameList: ["Oven", "AirCon"], tagCallCount: 5, tagTimeList: ["Wed Jul 08 2020 18:19:50 GMT+0900 (Korean Standard Time)","Wed Jul 08 2020 18:19:50 GMT+0900 (Korean Standard Time)"]},
  { tagName: "Jayden님 Tag", tagLocation: "독방", applianceNameList: ["AirCon", "Washer"], tagCallCount: 3, tagTimeList: ["Wed Jul 08 2020 18:19:50 GMT+0900 (Korean Standard Time)"]},
  { tagName: "Paul님 Tag", tagLocation: "거실", applianceNameList: ["Oven", "AirCon", "Washer"], tagCallCount: 7, tagTimeList: ["Wed Jul 08 2020 18:19:50 GMT+0900 (Korean Standard Time)"]},
  { tagName: "Ricky님 Tag", tagLocation: "주방", applianceNameList: ["Oven", "AirCon"], tagCallCount: 12, tagTimeList: ["Wed Jul 08 2020 18:19:50 GMT+0900 (Korean Standard Time)"]},
  { tagName: "Ricky님 Tag", tagLocation: "주방", applianceNameList: ["Oven", "AirCon"], tagCallCount: 12, tagTimeList: ["Wed Jul 08 2020 18:19:50 GMT+0900 (Korean Standard Time)"]}
];


export const TAG_DATA: TagData = {
    tagId: '1',
    commandData: [{
      commandIndex: '0',
      applianceId: 'oven',
      commandId: 'on',
      metaData: ''
    }],
    name: 'Jayden Oven',
    location: 'desk',
    time: '12:30'
  };