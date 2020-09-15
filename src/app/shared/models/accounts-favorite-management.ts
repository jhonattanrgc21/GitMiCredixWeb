export interface AccountsFavoriteManagement {
  name: string;
  account: any;
  // ibanFavoriteId
  IdAccountFavorite?: number;
  // end

  // data of /publicservice/findallpublicservicefavoritebyuser
  publicServiceFavoriteName?: string;
  serviceReference?: string;
  publicServiceCategory?: string;
  publicServiceName?: string;
  publicServiceAccessKeyDescription?: string;
  publicServiceId?: number;
  publicServiceEnterpriseId?: number;
  publicServiceProvider?: string;
  publicServiceProviderPrefix?: string;
  accountId?: number;
  publicServiceEnterpriseDescription?: string;
  publicServiceAccessKeyId?: number;
  publicServiceCode?: number;
  publicServiceFavoriteId?: string;
  publicServiceAccessKeyType?: number;
  publicServiceEnterpriseCode?: string;
  // end

  //  data of /schedulerpayment/getscheduledpays
  publicServiceDescription?: string;
  alias?: string;
  id?: number;
  maxAmount?: number;
  periodicityDescription?: string;
  startDate?: Date;
  key?: number;
}
