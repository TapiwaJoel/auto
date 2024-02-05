export interface Requisition {
  id: string;
  requisitionNumber: string;
  description: string;
  productRequested: any[];
  numberOfProducts: number;
  recordStatus: string;
  dateCreated: string;
}
