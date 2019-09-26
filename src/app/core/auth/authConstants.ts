import { Role } from '../models/role.enum';

export const DEFAULT_AUTH_STATUS = {
  isAuthenticated: false, userRole: Role.None, userId: null };

export const EMAIL_ERROR_MESSAGE = 'Failed to login! Email need to end with @test.com.';
