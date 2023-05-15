import {Vehicle} from '../vehicles/vehicles.entity';

export interface Booking {
  id: string;
  vehicleId: string;
  vehicle: Partial<Vehicle>;
  motorServiceCategoryIds: string[];
  motorServiceCategories: any;
  additionalInformation: string;
  bookingStatus: any;
  expectedCollectionDate: string;
  recordStatus: string;
  dateCreated: string;
}
