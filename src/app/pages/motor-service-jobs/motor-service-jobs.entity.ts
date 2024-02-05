import {Booking} from '../bookings/bookings.entity';
import {Task} from '../tasks/tasks.entity';
import {MotorServiceCategory} from '../motor-service-categories/motor-service-categories.entity';

export interface MotorServiceJob {
  id: string;
  booking: Partial<Booking>;
  bookingId: any;
  mechanicId: any;
  mechanicDto: any;
  serviceCategory: Partial<MotorServiceCategory>;
  services: Partial<MotorServiceCategory>;
  serviceCategoryId: any;
  recordStatus: string;
  serviceName: string;
  taskStatus: string;
  description: string;
  expectedDeliveryDate: string;
  dateCreated: string;
}
