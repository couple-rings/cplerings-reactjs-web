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

//Total all time

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

export const getTotalIncomeOfAllTimeFollowingBranch = () => {
  return axios.get<unknown, IResponse<ITotalIncomeOfAllTime>>(
    `income`
  );
}

export const getTotalExpenditureOfAllTimeFollowingBranch = () => {
  return axios.get<unknown, IResponse<ITotalExpenditureOfAllTime>>(
    `expenditure`
  )
}

export const getTop5CustomOrder = () => {
  return axios.get<unknown, IResponse<ITop5CustomOrder>>(
    `custom-orders/top-5`
  )
}

//Another

export const getTotalIncomeFollowingTime = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<ITotalIncomeFollowingTime>>(
    `income/time?${queryUrl}`
  )
}

export const getTotalExpenditureFollowingTime = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<ITotalExpenditureFollowingTime>>(
    `expenditure/time?${queryUrl}`
  )
}

export const getRevenueTransferPaymentTypeFollowingBranch = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IRevenuePaymentType>>(
    `orders/statistic/payments/type?${queryUrl}`
  )
};

//Statistic

export const getResellOrderStatistic = (queryObj: IOrderStatisticFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IResellOrder>>> (
    `orders/statistic/resell-orders?${queryUrl}`
  );
};

export const getRefundOrderStatistic = (queryObj: IOrderStatisticFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IRefund>>> (
    `orders/statistic/refund-orders?${queryUrl}`
  );
}

export const getCustomOrderStatistic = (queryObj: IOrderStatistic) => { 
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICustomOrder>>> (
    `orders/statistic/custom-orders?${queryUrl}`
  );
}

export const getPaymentOrderStatistic = (queryObj: IOrderStatisticFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IPaymentOrderStatistic>>> (
    `orders/statistic/payments?${queryUrl}`
  );
}

export const getTotalPaymentStatistic = (queryObj: ITotalPaymentStatistic) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<ITotalPayment>> (
    `orders/statistic/payments/total?${queryUrl}`
  )
}

