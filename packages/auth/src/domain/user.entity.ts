import { Role } from './role.enum';

export class User {
  constructor(
    public readonly id: string,  // Unique user identifier
    public readonly email: string,  // User's email address
    public readonly password: string,  // Hashed password
    public readonly roles: Role[],  // Assigned roles
  ) {}
} 