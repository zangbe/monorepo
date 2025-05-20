// export enum Role {
//   USER = 'USER',  // Can request rewards
//   OPERATOR = 'OPERATOR',  // Can create events/rewards
//   AUDITOR = 'AUDITOR',  // Can view reward history
//   ADMIN = 'ADMIN',  // All access
// } 

import { Role as AuthRole } from '@prisma/client';

export const Role = AuthRole;
export type Role = AuthRole;