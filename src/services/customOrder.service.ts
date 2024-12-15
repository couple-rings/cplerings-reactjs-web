import axios from "src/config/axios.main";
import queryString from "query-string";
import { OrderType } from "src/utils/enums";

export const getCustomOrders = (queryObj: ICustomOrderFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICustomOrder>>>(
    `custom-orders?${queryUrl}`
  );
};

export const getCustomOrderByOrderNo = (orderNo: string) => {
  return axios.get<unknown, IResponse<{ customOrder: ICustomOrder }>>(
    `custom-orders/orderNo/${orderNo}`
  );
};

export const getCustomOrderDetail = (id: number) => {
  return axios.get<unknown, IResponse<{ customOrder: ICustomOrder }>>(
    `custom-orders/${id}`
  );
};

export const postAssignCustomOrder = (orderId: number, jewelerId: number) => {
  return axios.post<unknown, IResponse<{ customOrder: ICustomOrder }>>(
    `custom-orders/${orderId}/assigning`,
    {
      jewelerId,
    }
  );
};

export const putCompleteCustomOrder = (orderId: number) => {
  return axios.put<unknown, IResponse<object>>(`orders/complete`, {
    orderId,
    orderType: OrderType.Custom,
  });
};
