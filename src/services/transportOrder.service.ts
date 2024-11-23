import axios from "src/config/axios.main";
import queryString from "query-string";

export const getTransportOrders = (queryObj: ITransportOrderFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ITransportOrder>>>(
    `transportation-orders?${queryUrl}`
  );
};

export const postAssignTransportOrder = (
  orderId: number,
  transporterId: number
) => {
  return axios.post<
    unknown,
    IResponse<{ transportationOrder: ITransportOrder }>
  >(`transportation-orders/${orderId}/assigning`, {
    transporterId,
  });
};

export const getTransportOrderWithCustomOrder = (customOrderId: number) => {
  return axios.get<unknown, IResponse<ITransportOrder>>(
    `transportation-orders/custom-orders/${customOrderId}`
  );
};
