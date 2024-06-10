interface RuleParameters {
  ParamName: string;

  Type: string;

  Default: string;

  ParamDesc: string;
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

export interface RuleTagType {
  ruleTagName: string;
  ruleTagType: string;
}
