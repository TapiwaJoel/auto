export interface Requisition {
  id: string;
  requisitionNumber: string;
  description: string;
  productRequested: any[];
  recordStatus: string;
  dateCreated: string;
}
