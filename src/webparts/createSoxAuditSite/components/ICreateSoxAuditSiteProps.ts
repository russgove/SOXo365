export interface ICreateSoxAuditSiteProps {
  webPartXml:string;
  templateName:string;
  soxControlListName:string;
  spxFoldersListName:string;
  WriteAccessGroups:string;
  ReadAccessGroups:string;
  SOXMaximumTasks: number;
  SOXTaskContentTypeId:string;
  permissionToGrantToLibraries:string;
  permissionToGrantToTaskList:string;
  siteUrl:string;
}
