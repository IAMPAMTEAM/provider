import { defineStore } from 'pinia';
import dayjs from 'dayjs';

import { getDashboardDaily, getDashboardWeekly } from '@/api/modules/console/golddata';
import type { TrendListDaily, TrendListWeekly } from '@/store/types';

export interface DataSource {
  date: string;
  count: number;
}

interface State {
  currentDateDailySocial: Date;
  currentDateDailyTenant: Date;
  currentDateDailyService: Date;
  currentDateDailyRevenue: Date;
  currentDateWeeklySocial: Date;
  currentDateWeeklyTenant: Date;
  currentDateWeeklyService: Date;
  currentDateWeeklyRevenue: Date;
  trendTransitionDaily: TrendListDaily[];
  trendTransitionDailySocial: TrendListDaily[];
  trendTransitionDailyTenant: TrendListDaily[];
  trendTransitionDailyService: TrendListDaily[];
  trendTransitionDailyRevenue: TrendListDaily[];
  trendTransitionWeekly: TrendListWeekly[];
  trendTransitionWeeklySocial: TrendListWeekly[];
  trendTransitionWeeklyTenant: TrendListWeekly[];
  trendTransitionWeeklyService: TrendListWeekly[];
  trendTransitionWeeklyRevenue: TrendListWeekly[];
}

export const useDataStore = defineStore('transitionData', {
  state: (): State => ({
    currentDateDailySocial: new Date('2023-01-20'),
    currentDateDailyTenant: new Date('2023-01-20'),
    currentDateDailyService: new Date('2023-01-20'),
    currentDateDailyRevenue: new Date('2023-01-20'),
    currentDateWeeklySocial: dayjs(new Date('2023-05-01'))
      .day(1)
      .subtract(1, 'week')
      .toDate(),
    currentDateWeeklyService: dayjs(new Date('2023-05-01'))
      .day(1)
      .subtract(1, 'week')
      .toDate(),
    currentDateWeeklyTenant: dayjs(new Date('2023-05-01'))
      .day(1)
      .subtract(1, 'week')
      .toDate(),
    currentDateWeeklyRevenue: dayjs(new Date('2023-05-01'))
      .day(1)
      .subtract(1, 'week')
      .toDate(),
    trendTransitionDaily: [],
    trendTransitionDailySocial: [],
    trendTransitionDailyTenant: [],
    trendTransitionDailyService: [],
    trendTransitionDailyRevenue: [],
    trendTransitionWeekly: [],
    trendTransitionWeeklySocial: [],
    trendTransitionWeeklyTenant: [],
    trendTransitionWeeklyService: [],
    trendTransitionWeeklyRevenue: [],
  }),
  actions: {
    async fetchWeeklyResourceList(
      periodicity: 'daily' | 'weekly',
      option: 'social' | 'tenant' | 'service' | 'revenue'
    ) {
      return [
        {
          _id: {
            description: '',
            duration: 1222,
            name: '',
          },
          datas: {
            timestamp: {
              start: '1/3/2022, 12:00:00 AM',
              end: '1/3/2022, 12:00:00 AM',
            },
            weeklyTrendStats: {
              avgOfSocialTransition: 9,
              avgOfTenantTransition: 11,
              avgOfServiceTransition: 7,
              avgOfRevenueTransition: 124,
            },
          },
        },
      ];
    },
    async fetchResourceList(
      periodicity: 'daily' | 'weekly',
      option: 'social' | 'tenant' | 'service' | 'revenue'
    ) {
      const result = [
        {
          _id: '63bb78fced9d3a1069398dde',
          datas: {
            timestamp: '1/3/2022, 12:00:00 AM',
            socialTransition: 9,
            tenantTransition: 11,
            serviceTransition: 7,
            revenueTransition: 124,
          },
        },
      ];
      // if (periodicity === 'daily') {
      //   if (option === 'social')
      //     result = await getDashboardDaily({
      //       date: this.formattedCurrentDateDailySocial.replaceAll('.', ''),
      //     });
      //   else if (option === 'tenant')
      //     result = await getDashboardDaily({
      //       date: this.formattedCurrentDateDailyTenant.replaceAll('.', ''),
      //     });
      //   else if (option === 'service')
      //     result = await getDashboardDaily({
      //       date: this.formattedCurrentDateDailyService.replaceAll('.', ''),
      //     });
      //   else if (option === 'revenue')
      //     result = await getDashboardDaily({
      //       date: this.formattedCurrentDateDailyRevenue.replaceAll('.', ''),
      //     });
      // } else if (periodicity === 'weekly') {
      //   if (option === 'social')
      //     result = await getDashboardWeekly({
      //       startDate: this.formattedCurrentDateWeeklySocial.start.replaceAll('.', ''),
      //     });
      //   else if (option === 'tenant')
      //     result = await getDashboardWeekly({
      //       startDate: this.formattedCurrentDateWeeklyTenant.start.replaceAll('.', ''),
      //     });
      //   else if (option === 'service')
      //     result = await getDashboardWeekly({
      //       startDate: this.formattedCurrentDateWeeklyService.start.replaceAll('.', ''),
      //     });
      //   else if (option === 'revenue')
      //     result = await getDashboardWeekly({
      //       startDate: this.formattedCurrentDateWeeklyRevenue.start.replaceAll('.', ''),
      //     });
      // }
      return result;
    },
    // async fetchResourceList(periodicity: 'daily' | 'weekly') {
    //   let result: any;
    //   if (periodicity === 'daily') {
    //     result = await getTransitionData({
    //       date: this.formattedCurrentDateDaily.replaceAll('.', ''),
    //     });
    //   } else if (periodicity === 'weekly') {
    //     result = await getTransitionDataWeekly({
    //       startDate: this.formattedCurrentDateWeekly.start.replaceAll('.', ''),
    //     });
    //   }
    //   return result?.data.value.data;
    // },
  },
  getters: {
    formattedCurrentDateDailySocial: ({ currentDateDailySocial }) => {
      return dayjs(currentDateDailySocial).format('YYYY.MM.DD');
    },

    formattedCurrentDateDailyTenant: ({ currentDateDailyTenant }) => {
      return dayjs(currentDateDailyTenant).format('YYYY.MM.DD');
    },

    formattedCurrentDateDailyService: ({ currentDateDailyService }) => {
      return dayjs(currentDateDailyService).format('YYYY.MM.DD');
    },

    formattedCurrentDateDailyRevenue: ({ currentDateDailyRevenue }) => {
      return dayjs(currentDateDailyRevenue).format('YYYY.MM.DD');
    },

    formattedCurrentDateWeeklySocial: ({ currentDateWeeklySocial }) => ({
      start: dayjs(currentDateWeeklySocial).day(1).format('YYYY.MM.DD'),
      end: dayjs(currentDateWeeklySocial).day(0).add(1, 'week').format('YYYY.MM.DD'),
    }),

    formattedCurrentDateWeeklyTenant: ({ currentDateWeeklyTenant }) => ({
      start: dayjs(currentDateWeeklyTenant).day(1).format('YYYY.MM.DD'),
      end: dayjs(currentDateWeeklyTenant).day(0).format('YYYY.MM.DD'),
    }),

    formattedCurrentDateWeeklyService: ({ currentDateWeeklyService }) => ({
      start: dayjs(currentDateWeeklyService).day(1).format('YYYY.MM.DD'),
      end: dayjs(currentDateWeeklyService).day(1).format('YYYY.MM.DD'),
    }),

    formattedCurrentDateWeeklyRevenue: ({ currentDateWeeklyRevenue }) => ({
      start: dayjs(currentDateWeeklyRevenue).day(1).format('YYYY.MM.DD'),
      end: dayjs(currentDateWeeklyRevenue).day(1).format('YYYY.MM.DD'),
    }),

    getCleanedSocialTransitionDaily: (state) => {
      return () =>
        state.trendTransitionDailySocial.map((dailyData) => {
          const count = dailyData.datas.socialTransition;
          return {
            date: new Date(dailyData.datas.timestamp).toDateString(),
            count,
            status: 'social',
          };
        });
    },

    getCleanedTenantTransitionDaily: (state) => {
      return () =>
        state.trendTransitionDailyTenant.map((dailyData) => {
          const count = dailyData.datas.tenantTransition;
          return {
            date: new Date(dailyData.datas.timestamp).toDateString(),
            count,
            status: 'tenant',
          };
        });
    },

    getCleanedServiceTransitionDaily: (state) => {
      return () =>
        state.trendTransitionDailyService.map((dailyData) => {
          const count = dailyData.datas.serviceTransition;
          return {
            date: new Date(dailyData.datas.timestamp).toDateString(),
            count,
            status: 'service',
          };
        });
    },

    getCleanedRevenueTransitionDaily: (state) => {
      return () =>
        state.trendTransitionDailyRevenue.map((dailyData) => {
          const count = dailyData.datas.revenueTransition;
          return {
            date: new Date(dailyData.datas.timestamp).toDateString(),
            count,
            status: 'revenue',
          };
        });
    },

    getCleanedSocialTransitionWeekly: (state) => {
      return () =>
        state.trendTransitionWeeklySocial.map((weeklyData) => {
          const count = weeklyData.datas.weeklyTrendStats.avgOfSocialTransition;
          return {
            date: new Date(weeklyData.datas.timestamp.start).toDateString(),
            count,
            status: 'social',
          };
        });
    },

    getCleanedTenantTransitionWeekly: (state) => {
      return () =>
        state.trendTransitionWeeklyTenant.map((weeklyData) => {
          const count = weeklyData.datas.weeklyTrendStats.avgOfTenantTransition;
          return {
            date: new Date(weeklyData.datas.timestamp.start).toDateString(),
            count,
            status: 'tenant',
          };
        });
    },

    getCleanedServiceTransitionWeekly: (state) => {
      return () =>
        state.trendTransitionWeeklyService.map((weeklyData) => {
          const count = weeklyData.datas.weeklyTrendStats.avgOfServiceTransition;
          return {
            date: new Date(weeklyData.datas.timestamp.start).toDateString(),
            count,
            status: 'service',
          };
        });
    },

    getCleanedRevenueTransitionWeekly: (state) => {
      return () =>
        state.trendTransitionWeeklyRevenue.map((weeklyData) => {
          const count = weeklyData.datas.weeklyTrendStats.avgOfRevenueTransition;
          return {
            date: new Date(weeklyData.datas.timestamp.start).toDateString(),
            count,
            status: 'revenue',
          };
        });
    },
  },
});
