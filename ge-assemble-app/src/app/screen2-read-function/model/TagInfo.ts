import { ApplianceAction } from './ApplianceAction';

export interface TagInfo {
  nfcId: string;
  nfcName: string;
  location: string;
  applianceAction: ApplianceAction[];
}
