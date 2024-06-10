// import { findAccountInfo } from '@/api/modules/home/account';
// import { MenuType, columnNames } from './datas';
// import { getTenantInfo } from '@/api/modules/home/tenant';
// import { getApiLog, getCoinExchageLog, getHomeAccessLog } from '@/api/modules/home/log';
// import { getUsers } from '@/api/modules/console/user';
// import { getTeams } from '@/api/modules/console/team';
// import {
//   coinHistory,
//   consoleAccessHistory,
//   orderHistory,
//   parseCashItem,
//   parseDebugItem,
//   parseTenantItem,
//   setUpUser,
//   socialAccessHistory,
// } from './dataParser';
// import bgUserProfile from '@/assets/images/backgrounds/bg-user-profile.png';
// import { getConsoleAccessLogs } from '@/api/modules/console/log';
// import { getOrderInfo } from '@/api/modules/home/order';
// import { findProviderAccountInfo } from '@/api/modules/home/provider-account';

// export const getDataAPI = async (menu: MenuType | string) => {
//   const query = JSON.stringify({});

//   switch (menu) {
//     case MenuType.MANAGEMENT_ACCOUNT:
//       return await findAccountInfo({ query });
//     case MenuType.TENANT:
//       return await getTenantInfo({ query });
//     case MenuType.CASH:
//       return await getTenantInfo({ query });
//     case MenuType.SOCIAL_ACCESS_HISTORY:
//       return await getHomeAccessLog({ query });
//     case MenuType.CONSOLE_ACCESS_HISTORY:
//       return await getConsoleAccessLogs({ query });
//     case MenuType.COIN_HISTORY:
//       return await getCoinExchageLog({ query });
//     case MenuType.ORDER_HISTORY:
//       return await getOrderInfo({ query });
//     case MenuType.DEBUG:
//       return await getApiLog({ query });
//     case MenuType.SETUP_USER:
//       return await findProviderAccountInfo({ query });
//   }
// };

// export const makeSources = async (menu: MenuType | string, datas: any) => {
//   switch (menu) {
//     // case MenuType.MANAGEMENT_ACCOUNT:
//     // return datas.map((item: any) => parseAccountItem(item));
//     case MenuType.TENANT:
//       return datas.map((item: any) => parseTenantItem(item));
//     case MenuType.CASH:
//       return datas.map((item: any) => parseCashItem(item));
//     case MenuType.SOCIAL_ACCESS_HISTORY:
//       return datas.map((item: any) => socialAccessHistory(item));
//     case MenuType.CONSOLE_ACCESS_HISTORY:
//       return datas.map((item: any) => consoleAccessHistory(item));
//     case MenuType.COIN_HISTORY:
//       return datas.map((item: any) => coinHistory(item));
//     case MenuType.ORDER_HISTORY:
//       return datas.map((item: any) => orderHistory(item));
//     case MenuType.DEBUG:
//       datas.reverse();
//       return datas.map((updatedItem: any) => parseDebugItem(updatedItem));
//     case MenuType.SETUP_USER:
//     // return datas.map((item: any) => parseAccountItem(item));
//   }
// };
// const updatePreviewProfileImage = (profileImg: any) => {
//   if (profileImg && profileImg !== '') {
//     return profileImg;
//   }
//   return bgUserProfile;
// };

// export const setColumns = async (menu: MenuType | string) => {
//   let columns;
//   const fieldList: any[] = [];
//   if (menu in columnNames) {
//     columns = columnNames[menu];
//     columns?.forEach((column: any) => {
//       if (column) {
//         if (column.field === 'profileImg') {
//           const value = {
//             ...column,
//             cellRenderer: (params: any) =>
//               `<img style="width: 40px; height: 100%;" src=${updatePreviewProfileImage(
//                 params.data.profileImg
//               )} />`,
//           };
//           fieldList.push(value);
//         } else {
//           fieldList.push({ ...column });
//         }
//       }
//     });
//   } else {
//     throw new Error();
//   }
//   return fieldList;
// };
// const columnType = (data: any) => {
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

// export const gridMethods = {
//   makeSources: async (datas: any) => {
//     if (Array.isArray(datas.value)) {
//       return await Promise.all(
//         datas.value.map((item: any) => {
//           const keys = Object.keys(item);
//           const source = {} as { [column: string]: string };
//           keys.forEach((key) => {
//             const type = columnType(item[key]);
//             if (type === 'column') source[key] = item[key];
//             if (type === 'group') {
//               const fields = Object.keys(item[key]);
//               fields.forEach((field) => {
//                 source[field] = item[key][field];
//               });
//             }
//           });
//           return { ...source };
//         })
//       );
//     }
//   },
//   setColumns: async (datas: any, columnList: any) => {
//     const processedDatas = await gridMethods.makeSources(datas);
//     if (processedDatas) {
//       processedDatas.forEach((data) => {
//         const columns = data;
//         columnList.value = [];
//         const fields = Object.keys(columns);

//         fields.forEach((field: any) => {
//           if (columns[field]) {
//             columnList.value.push({
//               headerName: field,
//             });
//           }
//         });
//       });
//     }
//   },
// };
