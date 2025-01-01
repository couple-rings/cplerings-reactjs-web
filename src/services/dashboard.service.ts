import axios from "src/config/axios.main";
import queryString from "query-string";


export const getTotalRevenueFollowingBranch = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IRevenue>>(
    `revenue?${queryUrl}`
);
}

export const getTotalOrderFollowingBranch = (queryObj: IRevenueFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<ITotalOrder>>(
    `orders/statistic?${queryUrl}`
  );
};