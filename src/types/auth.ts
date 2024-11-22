export type UserRole = 'SELLER_ADMIN' | 'SELLER';

export interface User {
  email: string;
  role: UserRole;
} 