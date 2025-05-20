import { Controller, Post, Body, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LocalAuthGuard } from '../../infrastructure/auth/local-auth.guard';
import { ChangeRoleDto } from '../dto/change-role.dto';
import { JwtAuthGuard, RolesGuard, Roles } from 'monorepo-libs';
import { Role } from '../../domain/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    await this.authService.logout();
    return { message: 'Logged out' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() dto: ChangeRoleDto) {
    await this.authService.updateRole(id, dto.role);
    return { message: 'Role updated' };
  }
} 