import axios from 'axios';
// import { setInterceptors } from '@/api/utils/interceptors';

const createInstance = (target: 'HOME' | 'CONSOLE' | 'MONITORING', service: string) => {
  return axios.create({
    baseURL: import.meta.env[`VITE_HYBRIX_OPS_APIS_${target}`] + '/' + service,
  });
};

const createProviderInstance = (service: string) => {
  return axios.create({
    baseURL: import.meta.env[`VITE_HYBRIX_OPS_APIS_PROVIDER`] + '/' + service,
  });
};

/*----- Provider -----*/
export const awsAccountInstance = createProviderInstance('awsaccount');
export const awsSocialUsersInstance = createProviderInstance('socialusers');
export const awsTenantsInstance = createProviderInstance('tenants');
export const awsRegionsInstance = createProviderInstance('awsregions');

export const providerAuthInstance = createInstance('HOME', 'provider/auth');
export const homeLogInstance = createInstance('HOME', 'provider/logs');
export const homeAccountInstance = createInstance('HOME', 'provider/account');
export const homeTenantInstance = createInstance('HOME', 'provider/tenant');
export const providerAccountInstance = createInstance('HOME', 'provider/provider-account');
export const providerAllowlistInstance = createInstance('HOME', 'provider/allowlist');
export const providerAwsProductInstance = createInstance('HOME', 'provider/rules/aws-product');
export const providerAwsServiceInstance = createInstance('HOME', 'provider/rules/aws-service');
export const providerAwsRegionInstance = createInstance('HOME', 'provider/rules/aws-region');
export const providerAwsResourceTypeInstance = createInstance(
  'HOME',
  'provider/rules/aws-resourcetype'
);
export const providerSecurityTermInstance = createInstance('HOME', 'provider/rules/security-term');
export const providerSvgIconInstance = createInstance('HOME', 'provider/svg-icon');

/*----- Monitor -----*/

export const montiorInstance = createInstance('MONITORING', '');

// export const AWSAccountInstance = createAloneInstance('awsaccount');
