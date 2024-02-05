import {User} from '../users/users.entity';

export interface Mechanic {
  id: string;
  userId: Partial<User>;
  user: Partial<User>;
  isSupervisor: boolean;
  fullName: string;
  recordStatus: string;
  dateCreated: string;
}
