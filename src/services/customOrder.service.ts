import axios from "src/config/axios.main";
import queryString from "query-string";

export const getCustomOrders = (queryObj: ICustomOrderFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICustomOrder>>>(
    `custom-orders?${queryUrl}`
  );
};

export const getCustomOrderDetail = (id: number) => {
  return axios.get<unknown, IResponse<{ customOrder: ICustomOrder }>>(
    `custom-orders/${id}`
  );
};
