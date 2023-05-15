import {User} from '../users/users.entity';
import {Department} from '../departments/departments.entity';


export interface HeadOfDepartment {
  id: string;
  userId: Partial<User>;
  user: any;
  departmentId: Partial<Department>;
  department: any;
  recordStatus: string;
  dateCreated: string;
}
