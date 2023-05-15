export interface Task {
  id: string;
  bookingId: number;
  mechanicId: number;
  description: string;
  labourCharge: number;
  recordStatus: string;
  dateCreated: string;
}
