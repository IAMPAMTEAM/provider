export interface Coin {
  coin: number;
  bonus: number;
  currentCoin: number;
}

export interface Urn {
  urn: string;
  savePolicy: string;
  revision: Revision;
}

export interface Revision {
  revisionDate: string;
  revisionSequence: string;
}

export interface Account {
  _id: string;
  providerId: string;
  provider: string;
  email: string;
  displayName: string;
  profileImg: string;
  role: string;
  urn: Urn;
  tenantUrn?: null | string;
  tenants: Tenant[];
  lastLoginDate: Date;
  loginLocation: string;
}

export interface Tenant {
  _id: string;
  tenantName: string;
  tenantStatus: string;
  companyName: string;
  companyEmail: string;
  companyContact: string;
  businessNumber: string;
  awsAccountId?: string;
  allowRegions?: string[];
  coin?: Coin;
  paymentName: string;
  paymentStartDate?: Date;
  urn: Urn;
  accountUrn: string;
  productUrn: string;
  products?: Product[]; //
  createDate?: Date;
}

export interface Product {
  _id: string;
  productName: string;
  accessible: Accessible;
  monthlyExpenseCoin: number;
  timeSpan: number;
  urn: Urn;
}

export interface Accessible {
  Admin: boolean;
  DiagOps: boolean;
  FlowOps: boolean;
  NetOps: boolean;
  SecOps: boolean;
}

export interface ProviderAccount {
  _id: string;
  providerId: string;
  provider: string;
  email: string;
  password: string;
  profileImg: string;
  displayName: string;
  urn: Urn;
  tenants: Tenant[];
  lastLoginDate: Date;
  loginLocation: string;
}

export interface Rule {
  checkRuleName: string;
  'checkRuleName-ko': string;
  checkRuleType: string;
  checkRuleID: string;
  hybrixRuleName: string;
  description: string;
  'description-ko': string;
  recommendation: string;
  'recommendation-ko': string;
  remediation: string;
  'remediation-ko': string;
  risk: string;
  'risk-ko': string;
  criteria: string;
  'criteria-ko': string;
  ifApply: string;
  triggerType: string;
  checkRuleServiceCode: string;
  awsProductCode: string;
  lambdaName: string;
  customerPersonalInfoSeverity: string;
  defaultSeverity: string;
  financeSeverity: string;
  ismsCompliance: string[];
  securityTerms: string[];
  awsResourceType: string[];
  configRuleParams: string;
  awsNotAllowedRegions: string[];
}

export const ROW_DATA = {
  ACCOUNTS: 'accounts',
  TENANTS: 'tenants',
  PROVIDER_ACCOUNT: 'providerAccounts',
  BLACKLIST: 'blacklist',
  WHITELIST: 'whitelist',
  RULE: 'rule',
} as const;

export type RowData = (typeof ROW_DATA)[keyof typeof ROW_DATA];

export const REMOVE_ROW_DATA = {
  REMOVE_ACCOUNT: 'removeAccount',
  REMOVE_PROVIDER_ACCOUNT: 'removeProviderAccount',
  REMOVE_TENANT: 'removeTenant',
  REMOVE_BLACKLIST: 'removeBlacklist',
  REMOVE_WHITELIST: 'removeWhitelist',
  REMOVE_RULE: 'removeRule',
} as const;

export type RemoveRowData = (typeof REMOVE_ROW_DATA)[keyof typeof REMOVE_ROW_DATA];

export const EDIT_ROW_DATA = {
  EDIT_ACCOUNT: 'editAccount',
  EDIT_PROVIDER_ACCOUNT: 'editProviderAccount',
  EDIT_TENANT: 'editTenant',
} as const;

export type EditRowData = (typeof EDIT_ROW_DATA)[keyof typeof EDIT_ROW_DATA];
