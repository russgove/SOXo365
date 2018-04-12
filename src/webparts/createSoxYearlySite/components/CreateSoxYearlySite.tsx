import * as React from 'react';
import styles from './CreateSoxYearlySite.module.scss';
import { ICreateSoxYearlySiteProps } from './ICreateSoxYearlySiteProps';
import { ICreateSoxYearlySiteState } from './ICreateSoxYearlySiteState';
import { escape } from '@microsoft/sp-lodash-subset';

import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";


//import { load, exec, toArray } from "../../JsomHelpers"
import { TextField } from "office-ui-fabric-react/lib/TextField";
import {
  sp,
  WebAddResult, Web, Files,
  ContextInfo, List, ViewAddResult
} from "@pnp/sp";
import { find, map } from "lodash";
require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepoint');
require('sp-workflow');

export default class CreateSoxYearlySite extends React.Component<ICreateSoxYearlySiteProps, ICreateSoxYearlySiteState> {
  public constructor(props: ICreateSoxYearlySiteProps) {
    super();
    console.log("in Construrctor");
    debugger;
    this.state = {
      messages: ["Enter the site name (i.e. 2018) and click the create site button"],
      siteName: ""

    };

  }
  /**
   * Creates an EFR Quarterly subsite including secured libraries and an efr tsak list
   * 
   * @returns {Promise<any>} 
   * @memberof EfrAdmin
   */
  public addMessage(msg): void {
    console.log(msg);
    this.setState((current: ICreateSoxYearlySiteState) => {
      let newState = current;
      newState.messages.push(msg);
      return newState;
    });

  }
  private displayMessages(): any {
    const messages = map(this.state.messages, (m) => {
      return "<div>" + m + "</div>";
    });
    return { __html: messages.join('') };
  }
  /**
 *  Adds a custom webpart to the edit form located at editformUrl
 * 
 * @param {string} webRelativeUrl -- The web containing the list
 * @param {any} editformUrl -- the url of the editform page
 * @param {string} webPartXml  -- the xml for the webpart to add
 * @memberof EfrAdmin
 */
  public async SetWebToUseSharedNavigation(webRelativeUrl: string) {

    const clientContext: SP.ClientContext = new SP.ClientContext(webRelativeUrl);
    var currentWeb = clientContext.get_web();
    var navigation = currentWeb.get_navigation();
    navigation.set_useShared(true);
    await new Promise((resolve, reject) => {
      clientContext.executeQueryAsync((x) => {
        console.log("the web was set to use shared navigation");
        resolve();
      }, (error) => {
        console.log(error);
        reject();
      });
    });
  }
  public async createSite(): Promise<any> {
    debugger;

    let newWeb: Web;  // the web that gets created
    let libraryList: Array<any>; // the list of libraries we need to create in the new site. has the library name and the name of the group that should get access
    // let foldersList: Array<string>; // the list of folders to create in each of the libraries.
    let roleDefinitions: Array<any>;// the roledefs for the site, we need to grant 'contribute no delete'
    let siteGroups: Array<any>;// all the sitegroups in the site
    let tasks: Array<any>; // the list of tasks in the TaskMaster list. We need to create on e task for each of these in tye EFRTasks list in the new site
    let taskList: List; // the task list we created  in the new site
    let taskListId: string; // the ID of task list we created  in the new site
    let webServerRelativeUrl: string; // the url of the subweb
    let contextInfo: ContextInfo;
    let editformurl: string;





    this.addMessage("CreatingSite");
    await sp.site.getContextInfo().then((context: ContextInfo) => {
      contextInfo = context;
    });
    // create the site
    await sp.web.webs.add(this.state.siteName, this.state.siteName, this.state.siteName, this.props.templateName)
      .then((war: WebAddResult) => {
        this.addMessage("CreatedSite");
        // show the response from the server when adding the web
        webServerRelativeUrl = war.data.ServerRelativeUrl;
        console.log(war.data);
        newWeb = war.web;
        return;
      }).catch(error => {
        debugger;
        this.addMessage("<h1>error creating site</h1>");
        this.addMessage(error.data.responseBody["odata.error"].message.value);
        console.error(error);
        return;
      });

    await this.SetWebToUseSharedNavigation(webServerRelativeUrl);


    this.addMessage(`Creating library ${this.props.workingDocumentsDestinationLibraryName}.`);
    await newWeb.lists.add(this.props.workingDocumentsDestinationLibraryName, this.props.workingDocumentsDestinationLibraryName, 101, false)
      .then(async (listResponse) => {
        debugger;
        this.addMessage(`Created library ${this.props.workingDocumentsDestinationLibraryName}.`);
        let destinationLibraryServerRelativeUrl: string;
        await listResponse.list.rootFolder.serverRelativeUrl
          .get()
          .then((url) => {
            destinationLibraryServerRelativeUrl = url;
          })
          .catch((err) => {
            this.addMessage(`<h1>Error fethhing relative url of destination library</h1>`);
            debugger;
          });
        // now copy files from library in rootweb
        sp.site.rootWeb.lists.getByTitle(this.props.workingDocumentsSourceLibraryName)
          .rootFolder.files.get()
          .then(async (files) => {
            debugger;
            for (let file of files) {
              await sp.web.getFileByServerRelativeUrl(file["ServerRelativeUrl"]).getBlob()
                .then(async (blob: Blob) => {
                  await newWeb.getFolderByServerRelativeUrl(destinationLibraryServerRelativeUrl)
                    .files.add(file["Name"], blob, true)
                    .then((s) => {
                      debugger;
                    })
                    .catch((err) => {
                      this.addMessage(`<h1>${err.data.responseBody["odata.error"].message.value}</h1>`);
                      debugger;
                    })
                });
            }


          });
      });

    this.addMessage("DONE!!");
  }
  public render(): React.ReactElement<ICreateSoxYearlySiteProps> {

    return (
      <div className={styles.createSoxYearlySite} >
        <TextField label="Site Name" onChanged={(e) => {
          this.setState((current) => ({ ...current, siteName: e }));
        }} />


        <PrimaryButton onClick={this.createSite.bind(this)} title="Create Site">Create Site</PrimaryButton>

        <div dangerouslySetInnerHTML={this.displayMessages()} />

      </div >
    );
  }
}
