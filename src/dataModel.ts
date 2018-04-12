
export interface SOXControlMaster {
    '@odata.type': string;
    '@odata.id': string;
    '@odata.etag': string;
    '@odata.editLink': string;
    FileSystemObjectType: number;
    Id: number;
     ContentTypeId: string;
   SOxLocationId: number;
    SOxProcessId: number;
    // SOxControlNumber: string; use title instead
    Title: string; // the sox control number
    SOxIsActive:string;
    SOxControlActivityDescription: string;
    SOxFrequency: string;
    SOxRisk: string;
    SOxPWCReliance: string;
    SOxControlOwnerId?: any;
    SOxControlOwnerStringId?: any;
    SOxDueDate?: any;
    SOxStatus: string;
    SOxPopulationRequestDate?: any;
    SOxPopulationDueDate?: any;
    SOxSampleDueDate?: any;
    SOxPreparerId?: any;
    SOxPreparerStringId?: any;
    SOxTestingDueDate?: any;
    SOxReviewerId?: any;
    SOxReviewerStringId?: any;
    SOxReviewerDueDate?: any;
    SOxApproverId?: any;
    SOxApproverStringId?: any;
    SOxApprovalDueDate?: any;
    SOxTesterId?: any;
    SOxTesterStringId?: any;
    SOxSecurityGroup?: string;
    ID: number;
    Modified: string;
    Created: string;
    AuthorId: number;
    EditorId: number;
    OData__UIVersionString: string;
    Attachments: boolean;
    GUID: string;
  }