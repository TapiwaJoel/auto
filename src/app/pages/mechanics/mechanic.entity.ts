import {User} from '../users/users.entity';


export interface Mechanic {
  id: string;
  userId: Partial<User>;
  user: any;
  recordStatus: string;
  dateCreated: string;
}
