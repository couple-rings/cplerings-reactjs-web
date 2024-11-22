import axios from "src/config/axios.main";
import queryString from "query-string";

export const postCreateTransportAddress = (
  data: ICreateTransportAddressRequest
) => {
  return axios.post<
    unknown,
    IResponse<{ transportationAddress: ITransportAddress }>
  >(`addresses`, data);
};

export const getTransportAddresses = (
  queryObj: ITransportationAddressFilter
) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ITransportAddress>>>(
    `addresses?${queryUrl}`
  );
};
