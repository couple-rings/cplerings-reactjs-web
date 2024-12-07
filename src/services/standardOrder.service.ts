import axios from "src/config/axios.main";
import queryString from "query-string";

export const postCreateStandardOrder = (data: ICreateStandardOrderRequest) => {
  return axios.post<unknown, IResponse<{ standardOrder: IStandardOrder }>>(
    `standard-orders`,
    data
  );
};

export const postPayStandardOrder = (data: IPayStandardOrderRequest) => {
  return axios.post<unknown, IResponse<{ paymentLink: string }>>(
    `standard-orders/payment`,
    data
  );
};

export const putCancelStandardOrder = (id: number) => {
  return axios.put<unknown, IResponse<{ standardOrder: IStandardOrder }>>(
    `standard-orders/${id}/cancel`
  );
};

export const getStandardOrders = (queryObj: IStandardOrderFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IStandardOrder>>>(
    `standard-orders?${queryUrl}`
  );
};

export const getStandardOrderDetail = (id: number) => {
  return axios.get<unknown, IResponse<{ standardOrder: IStandardOrder }>>(
    `standard-orders/${id}`
  );
};
