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
  description: string;
}

export default class CreateSoxYearlySiteWebPart extends BaseClientSideWebPart<ICreateSoxYearlySiteWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICreateSoxYearlySiteProps > = React.createElement(
      CreateSoxYearlySite,
      {
        description: this.properties.description
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
