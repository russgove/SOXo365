import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CreateSoxAuditSiteWebPartStrings';
import CreateSoxAuditSite from './components/CreateSoxAuditSite';
import { ICreateSoxAuditSiteProps } from './components/ICreateSoxAuditSiteProps';
import { setup as pnpSetup } from "@pnp/common";
export interface ICreateSoxAuditSiteWebPartProps {
  webPartXml:string;
  templateName:string;
  soxControlListName:string;
  spxFoldersListName:string;
  WriteAccessGroups:string;
  ReadAccessGroups:string;
  SOXMaximumTasks: number,
  SOXTaskContentTypeId:string;
  permissionToGrantToLibraries:string;
  permissionToGrantToTaskList:string;
}

export default class CreateSoxAuditSiteWebPart extends BaseClientSideWebPart<ICreateSoxAuditSiteWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      // other init code may be present
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
 
    const element: React.ReactElement<ICreateSoxAuditSiteProps > = React.createElement(
      CreateSoxAuditSite,
      {
        webPartXml:this.properties.webPartXml,
        templateName:this.properties.templateName,
        soxControlListName:this.properties.soxControlListName,
        spxFoldersListName:this.properties.spxFoldersListName,
        WriteAccessGroups:this.properties.WriteAccessGroups,
        ReadAccessGroups:this.properties.ReadAccessGroups,
        SOXMaximumTasks: this.properties.SOXMaximumTasks,
        SOXTaskContentTypeId:this.properties.SOXTaskContentTypeId,
        permissionToGrantToLibraries:this.properties.permissionToGrantToLibraries,
        permissionToGrantToTaskList:this.properties.permissionToGrantToTaskList,
        siteUrl:this.context.pageContext.site.serverRelativeUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
