// import { createApp } from 'vue';
// import ButtonElement from './elements/ButtonElement.vue';

// export const getCellRenderer = () => {
//   return ButtonElement;
// };

// export const columnType = (data: any) => {
//   if (
//     typeof data === 'string' ||
//     typeof data === 'boolean' ||
//     typeof data === 'number' ||
//     data === null
//   )
//     return 'column';
//   else if (typeof data === 'object' && Object.keys(data)[0] === '0') return 'array';
//   else if (Array.isArray(data)) return 'array';
//   else return 'group';
// };

// export enum MenuType {
//   MANAGEMENT_ACCOUNT = 'managementAccount',
//   TENANT = 'tenant',
//   CASH = 'cash',
//   SOCIAL_ACCESS_HISTORY = 'socialAccessHistory',
//   CONSOLE_ACCESS_HISTORY = 'consoleAccessHistory',
//   COIN_HISTORY = 'coinHistory',
//   ORDER_HISTORY = 'orderHistory',
//   DEBUG = 'debug',
//   SETUP_USER = 'setUpUser',
//   SETUP_GROUP = 'setUpGroup',
// }

// export const columnNames: any = {
//   [MenuType.MANAGEMENT_ACCOUNT]: [
//     { field: 'displayName', width: 160 },
//     { field: 'urn', width: 220 },
//     { field: 'profileImg', width: 100 },
//     { field: 'email', width: 200 },
//     { field: 'loginLocation', width: 160 },
//     { field: 'lastLoginDate', width: 160 },
//     {
//       field: 'socialLoginUnsubscribing',
//       cellRenderer: getCellRenderer(),
//       width: 160,
//       headerName: 'Unsubscribe',
//     },
//   ],
//   [MenuType.TENANT]: [
//     {
//       field: 'tenant',
//       children: [
//         { field: 'tenantName', width: 160 },
//         { field: 'urn', width: 220, headerName: 'urn' },
//       ],
//     },
//     {
//       field: 'company',
//       children: [
//         { field: 'companyName', width: 160 },
//         { field: 'companyEmail', width: 160 },
//         { field: 'companyContact', width: 160 },
//         { field: 'companyBusinessNumber', width: 160 },
//       ],
//     },
//     {
//       field: 'product',
//       children: [{ field: 'productName', width: 160 }],
//     },
//     {
//       field: 'payment',
//       children: [
//         { field: 'paymentStartDate', width: 160 },
//         { field: 'paymentName', width: 160 },
//       ],
//     },
//     {
//       field: 'deleteTenant',
//       cellRenderer: getCellRenderer(),
//       width: 160,
//     },
//     {
//       field: 'console',
//       children: [
//         {
//           field: 'consoleURL',
//           width: 160,
//         },
//         {
//           field: 'consolePassword',
//           cellRenderer: getCellRenderer(),
//           width: 160,
//         },
//         {
//           field: 'consoleOTP',
//           cellRenderer: getCellRenderer(),
//           width: 160,
//         },
//       ],
//     },
//   ],
//   [MenuType.DEBUG]: [
//     { field: 'Timestamp', children: [{ field: 'timeStamp', width: 200 }] },
//     { field: 'Source IP', children: [{ field: 'sourceIp', width: 200 }] },
//     { field: 'Request API Type', children: [{ field: 'apiType', width: 200 }] },
//     {
//       field: 'Request API Content',
//       children: [
//         { field: 'method', width: 200 },
//         { field: 'query', width: 200 },
//         {
//           field: 'request',
//           width: 200,
//         },
//       ],
//     },
//     {
//       field: 'Response',
//       children: [
//         {
//           field: 'response',
//           width: 200,
//           cellStyle: { 'white-space': 'normal' },
//         },
//       ],
//     },
//   ],
//   [MenuType.CASH]: [
//     { field: 'urn' },
//     { field: 'companyName' },
//     { field: 'tenantName' },
//     { field: 'currentCoin' },
//     { field: 'serviceName' },
//     { field: 'serviceLevel' },
//     { field: 'cash' },
//     { field: 'bonus' },
//     { field: 'createDate' },
//   ],
//   [MenuType.SOCIAL_ACCESS_HISTORY]: [
//     { field: 'accountUrn' },
//     { field: 'loginLocation' },
//     { field: 'createDate', headerName: 'Login Date' },
//   ],
//   [MenuType.CONSOLE_ACCESS_HISTORY]: [
//     { field: 'userUrn' },
//     { field: 'loginLocation' },
//     { field: 'createDate', headerName: 'Login Date' },
//   ],
//   [MenuType.COIN_HISTORY]: [
//     { field: 'coin' },
//     { field: 'bonus' },
//     { field: 'type' },
//     { field: 'accountUrn' },
//     { field: 'tenantUrn' },
//     { field: 'createDate' },
//   ],
//   [MenuType.ORDER_HISTORY]: [
//     { field: 'orderHistory' },
//     { field: 'currency' },
//     { field: 'currency' },
//     { field: 'coin' },
//     { field: 'bonus' },
//     { field: 'accountUrn' },
//     { field: 'tenantUrn' },
//     { field: 'createDate' },
//   ],
//   [MenuType.SETUP_USER]: [
//     { field: 'displayName', width: 160 },
//     { field: 'urn', width: 220 },
//     { field: 'profileImg', width: 100 },
//     { field: 'email', width: 200 },
//     { field: 'loginLocation', width: 160 },
//     { field: 'lastLoginDate', width: 160 },
//     {
//       field: 'deleteProviderAccount',
//       cellRenderer: getCellRenderer(),
//       width: 160,
//       headerName: 'Delete Account',
//     },
//   ],
// };
