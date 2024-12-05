export type UserRole = 'ADMIN' | 'AFFILIATE_PARTNER' | 'COMPANY_PARTNER' | 'COMPANY_PARTNER_USERS' | 'COMPANY_BRANCHES' | 'SELLER';

export interface User {
  email: string;
  role: UserRole;
  isNewUser?: boolean;
} 