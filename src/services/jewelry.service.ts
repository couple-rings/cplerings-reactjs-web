import axios from "src/config/axios.main";
import queryString from "query-string";

export const getJewelries = (queryObj: IJewelryFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IJewelry>>>(
    `jewelries?${queryUrl}`
  );
};

export const postCreateJewelry = (data: ICreateJewelryRequest) => {
  return axios.post<unknown, IResponse<IJewelry>>(`jewelries`, data);
};

export const getJewelryByProductNo = (productNo: string) => {
  return axios.get<unknown, IResponse<IJewelry>>(
    `jewelries/productNo/${productNo}`
  );
};
