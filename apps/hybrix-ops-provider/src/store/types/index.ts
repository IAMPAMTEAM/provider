/*----- Trend Data -----*/
export interface TrendListDaily {
  _id: string;
  datas: {
    timestamp: Date;
    socialTransition: number;
    tenantTransition: number;
    serviceTransition: number;
    revenueTransition: number;
  };
}

interface TimestampWeekly {
  start: Date;
  end: Date;
}

interface weeklyTrendStats {
  avgOfSocialTransition: number;
  avgOfTenantTransition: number;
  avgOfServiceTransition: number;
  avgOfRevenueTransition: number;
}

export interface TrendListWeekly {
  _id: PerformanceServerTiming;
  datas: {
    timestamp: TimestampWeekly;
    weeklyTrendStats: weeklyTrendStats;
  };
}
