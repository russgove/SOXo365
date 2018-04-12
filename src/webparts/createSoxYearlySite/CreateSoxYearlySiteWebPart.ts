import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CreateSoxYearlySiteWebPartStrings';
import CreateSoxYearlySite from './components/CreateSoxYearlySite';
import { ICreateSoxYearlySiteProps } from './components/ICreateSoxYearlySiteProps';

export interface ICreateSoxYearlySiteWebPartProps {
  templateName: string;
  workingDocumentsSourceLibraryName: string;
  workingDocumentsDestinationLibraryName: string;
}
import { setup as pnpSetup } from "@pnp/common";
export default class CreateSoxYearlySiteWebPart extends BaseClientSideWebPart<ICreateSoxYearlySiteWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      // other init code may be present
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ICreateSoxYearlySiteProps> = React.createElement(
      CreateSoxYearlySite,
      {
        templateName: this.properties.templateName,
        workingDocumentsDestinationLibraryName: this.properties.workingDocumentsDestinationLibraryName,
        workingDocumentsSourceLibraryName:this.properties.workingDocumentsSourceLibraryName
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
                PropertyPaneTextField("templateName", {
                  label: "template used to create site"
                }),
                PropertyPaneTextField("workingDocumentsSourceLibraryName", {
                  label: "Working Documents library at root site to copy Working papers from"
                }),
                PropertyPaneTextField("workingDocumentsDestinationLibraryName", {
                  label: "Working Documents library to create in the Yearly site to hold working papers"
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
