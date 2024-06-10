import axios from 'axios';
// import { setInterceptors } from '@/api/utils/interceptors';

const createInstance = (target: 'HOME' | 'CONSOLE' | 'MONITORING', service: string) => {
  return axios.create({
    baseURL: import.meta.env[`VITE_HYBRIX_OPS_APIS_${target}`] + '/' + service,
  });
};

// const createInstanceWithAuth = (target: 'HOME' | 'CONSOLE', service: string) => {
//   const instance = axios.create({
//     baseURL: import.meta.env[`VITE_HYBRIX_OPS_APIS_${target}`] + '/' + service,
//   });
//   return setInterceptors(instance);
// };

/*----- Console -----*/
export const consoleUserInstance = createInstance('CONSOLE', 'provider/admin/user');
export const golddataInstance = createInstance('CONSOLE', 'provider/golddata');
export const teamInstance = createInstance('CONSOLE', 'provider/admin/team');
export const portalPolicyInstance = createInstance('CONSOLE', 'provider/admin/policy');
export const consoleTenantInstance = createInstance('CONSOLE', 'provider/tenant');
export const consoleLogInstance = createInstance('CONSOLE', 'provider/logs');

/*----- Home -----*/
export const orderInstance = createInstance('HOME', 'order');
export const rulesInstance = createInstance('HOME', 'rules');

/*----- Provider -----*/
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
