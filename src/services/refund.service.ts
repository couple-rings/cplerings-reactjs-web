import axios from "src/config/axios.main";
import queryString from "query-string";

export const postRefundStandardOrder = (
  orderId: number,
  data: IStandardOrderRefundRequest
) => {
  return axios.post<unknown, IResponse<{ refund: IRefund }>>(
    `standard-orders/${orderId}/refund`,
    data
  );
};

export const postRefundCustomOrder = (data: ICustomOrderRefundRequest) => {
  return axios.post<unknown, IResponse<IRefund>>(
    `custom-orders/${data.customOrderId}/refund`,
    data
  );
};

export const getRefunds = (queryObj: IRefundFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IRefund>>>(
    `refunds?${queryUrl}`
  );
};
