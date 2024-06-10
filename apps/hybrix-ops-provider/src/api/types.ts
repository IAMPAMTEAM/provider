/**
 * @title HOME MODULE API TYPES
 */

export interface FindInfoParams {
  query: string;
}

/** Account */
export interface AddAccountInfoParams {
  providerId: string;
  // provider: string;
  displayName: string;
  email: string;
  profileImg?: string;
  loginLocation?: string;
  lastLoginDate?: string;
}

export interface UpdateAccountInfoParams {
  displayName?: string;
  email?: string;
  profileImg?: string;
  tenantUrn?: string;
}

export interface UpdateProfileImgParams {
  profileImg?: string;
}

export interface RemoveAccountInfoParams {
  urn: string;
}

/** Auth */
export interface GetAccountInfoParams {
  query: string;
}

/** Transaction */
export type TransactionType = 'Charge' | 'Expense' | 'Update';

export interface GetTransactionInfoParams {
  query: string;
}

/** Payment */
// export type TransactionType = 'Charge' | 'Expense' | 'Update';

export interface GetPaymentInfoParams {
  query: string;
}

export interface PostPaymentInfoParams {
  imp_uid: string;
}

export interface PostPaymentPrepareParams {
  coinExchangeUrn: string; // 상품
  accountUrn: string;
  tenantUrn: string;
  imp?: any;
}

/** Tenant */
export interface AddTenantInfoParams {
  tenantName: string;
  accountUrn: string;
  // company?: {
  //   companyName: string;
  //   companyBusinessNumber: string;
  //   companyContactName: string;
  //   companyContactPhone: string;
  //   companyContactEmail: string;
  // };
}

export interface UpdateTenantInfoParams {
  accountUrn?: string;
  serviceInfo?: {
    serviceName: string;
    serviceLevel: string;
    monthlyExpenseCoin?: number;
    timeSpan?: number;
  };
  coin?: {
    cash: number;
    bonus: number;
    currentCoin: number;
  };
  tenantStatus?: string;
  company?: {
    companyName?: string;
    companyBusinessNumber?: string;
    companyContactName?: string;
    companyContactPhone?: string;
    companyContactEmail?: string;
  };
  billings?: string[];
  startDate?: string;
  dueDate?: string;
}

export interface GetTenantInfoParams {
  query: string;
}

export interface RemoveTenantInfoParams {
  urn: string;
}

export interface AddServiceInfoParams {
  tenantId: string;
}

export interface AddCoinInfoParams {
  providerId: string;
  tenantName: string;
  coin: {
    cash: number;
    bonus: number;
  };
  transactionType: TransactionType;
}

/**
 * @title CONSOLE MODULE API TYPES
 */

/** Admin */
export interface AddAdminUserParams {
  email: string;
}

/** User */
export interface GetUserInfoParams {
  query: string;
}

export enum Privilege {
  ADMIN = 'admin',
  GENERAL = 'general',
  GUEST = 'guest',
  MANAGER = 'manager',
}

export interface OTPData {
  otpSecret: string;
  qrcode: string;
}

export interface AuthenType {
  password: boolean;
  otp: boolean;
}

export interface AddUserInfoParams {
  tenantName: string;
  userId: string;
  displayname: string;
  email: string;
  password: string;
  phone: string;
  profileImg?: string;

  slackId?: string;

  privilege: Privilege;

  authenType: AuthenType;
  otpData?: OTPData;
  portalPolicyUrn: string;
}

export interface UpdateUserInfoParams {
  urn: string;
  displayname?: string;
  email?: string;
  password?: string;
  phone?: string;
  profileImg?: string;
  slackId?: string;
  privilege?: Privilege;
  authenType?: AuthenType;
  otpData?: OTPData;
  portalPolicyUrn?: string;

  loginFails?: number;
  isLocked?: boolean;
  lockType?: string;
  isPwReset?: boolean;
  fixedPwChangeExpireDate?: number;
  lastPwChange?: string;
  lastLogin?: string;
  lastLogout?: string;
  loginLocation?: string;
}

export interface RemoveUserInfoParams {
  urn: string;
}

// NEW
export interface RetrieveParams {
  query: string;
}

export interface UpdateParams {
  urn: string;
  data: any;
}

export interface DeleteParams {
  urn: string;
}
