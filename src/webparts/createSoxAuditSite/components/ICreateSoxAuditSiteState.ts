import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
export interface ICreateSoxAuditSiteState {
  siteName?: string;
  parentSiteUrl?:string;
  messages:string[];
  topLevelSites?:Array<IDropdownOption>;
}
