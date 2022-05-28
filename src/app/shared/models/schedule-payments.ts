export interface SchedulePayments {
  alias: string;
  id: number;
  key: number;
  maxAmount: number;
  periodicityDescription: string;
  publicServiceCategoryId: number;
  publicServiceCategoryName: string;
  publicServiceDescription: string;
  startDate: string;
  icon?: string;
  quota?: number;
}
