import axios from "src/config/axios.main";
import queryString from "query-string";

export const postResellJewelry = (
  jewelryId: number,
  data: IJewelryResellRequest
) => {
  return axios.post<unknown, IResponse<IResellOrder>>(
    `jewelries/${jewelryId}/jewelry`,
    data
  );
};

export const postResellCustomOrder = (
  customOrderId: number,
  data: ICustomOrderResellRequest
) => {
  return axios.post<unknown, IResponse<IResellCustomOrder>>(
    `custom-orders/${customOrderId}/resell`,
    data
  );
};

export const getResellOrders = (queryObj: IResellFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IResellOrder>>>(
    `resell-orders?${queryUrl}`
  );
};

export const getResellCustomOrderDetail = (id: number) => {
  return axios.get<unknown, IResponse<IResellCustomOrder>>(
    `resell-orders/${id}`
  );
};