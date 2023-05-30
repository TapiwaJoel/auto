export interface Authentication {
  _id: string;
  AuthenticatedEntity: string;
  AuthenticatedEntityId: string | any;
  FullDetails?: any;
  Token?: string | any;
  Status: string;
  Date: string;
}
