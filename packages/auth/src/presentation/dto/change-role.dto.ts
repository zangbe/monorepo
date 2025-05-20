import { IsEnum, IsString } from 'class-validator';
import { Role } from '../../domain/role.enum';

export class ChangeRoleDto {
  @IsEnum(Role)
  role!: Role;
} 