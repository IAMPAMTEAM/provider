// import { useAxios } from '@vueuse/integrations/useAxios';
// import type {
//   GetPaymentInfoParams,
//   PostPaymentInfoParams,
//   PostPaymentPrepareParams,
// } from '@/api/types';
// import { paymentInstance } from '@/api';

// enum Api {
//   GET_PAYMENT_INFO = '/',
//   POST_PAYMENT_INFO = '/',
//   POST_PAYMENT_PREPARE = '/prepare',
//   DELETE_PAYMENT_INFO = '/',
//   GET_TRANSACTION_INFO = '/transaction',
//   POST_TRANSACTION_INFO = '/transaction',
//   UPDATE_TRANSACTION_INFO = '/transaction',
// }

// const getPaymentInfo = (params: GetPaymentInfoParams) => {
//   return useAxios(
//     Api.GET_TRANSACTION_INFO,
//     {
//       method: 'GET',
//       data: params,
//     },
//     paymentInstance
//   );
// };
// const postPaymentPrepare = (params: PostPaymentPrepareParams) => {
//   return useAxios(
//     Api.POST_PAYMENT_PREPARE,
//     {
//       method: 'POST',
//       data: params,
//     },
//     paymentInstance
//   );
// };

// const postPaymentInfo = (params: PostPaymentInfoParams) => {
//   return useAxios(
//     Api.POST_PAYMENT_INFO,
//     {
//       method: 'POST',
//       data: params,
//     },
//     paymentInstance
//   );
// };

// export { getPaymentInfo, postPaymentInfo, postPaymentPrepare };
