import axios from "src/config/axios.main";
import queryString from "query-string";


export const getTotalRevenueFollowingBranch = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IRevenue>>(
    `revenue?${queryUrl}`
);
};

export const getTotalOrderFollowingBranch = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<ITotalOrder>>(
    `orders/statistic?${queryUrl}`
  );
};

export const getTotalRevenueOfAllTimeFollowingBranch = () => {
  return axios.get<unknown, IResponse<ITotalRevenueOfAllTime>>(
    `revenue/total`
  );
};

export const getTotalTransactionOfAllTimeFollowingBranch = () => {
  return axios.get<unknown, IResponse<ITotalTransactionOfAllTime>>(
    `revenue/transactions/total`
  );
};

export const getTotalOrderOfAllTimeFollowingBranch = () => {
  return axios.get<unknown, IResponse<ITotalOrderOfAllTime>>(
    `orders/statistic/total`
  );
}

export const getRevenueTransferPaymentTypeFollowingBranch = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IRevenuePaymentType>>(
    `orders/statistic/payments/type?${queryUrl}`
  )
};

export const getResellOrderStatistic = (queryObj: IOrderStatisticFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IResellOrderStatistic>>> (
    `orders/statistic/resell-orders?${queryUrl}`
  );
};

export const getRefundOrderStatistic = (queryObj: IOrderStatisticFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IRefundOrderStatistic>>> (
    `orders/statistic/refund-orders?${queryUrl}`
  );
}

export const getCustomOrderStatistic = (queryObj: IOrderStatisticFilter) => { 
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICustomOrderStatistic>>> (
    `orders/statistic/custom-orders?${queryUrl}`
  );
}

export const getPaymentOrderStatistic = (queryObj: IOrderStatisticFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IPaymentOrderStatistic>>> (
    `orders/statistic/payments?${queryUrl}`
  );
}

