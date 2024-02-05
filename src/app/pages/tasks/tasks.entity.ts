import {MotorServiceCategory} from '../motor-service-categories/motor-service-categories.entity';
import {Booking} from '../bookings/bookings.entity';
import {Mechanic} from '../mechanics/mechanic.entity';

export interface Task {
  id: string;
  bookingId: any;
  mechanicId: any;
  motorServiceCategory: Partial<MotorServiceCategory>;
  mechanic: Partial<Mechanic>;
  booking: Partial<Booking>;
  description: string;
  labourCharge: any;
  recordStatus: string;
  taskStatus: string;
  expectedDeliveryDate: string;
  dateCreated: string;
}
