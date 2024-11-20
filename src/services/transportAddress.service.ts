import axios from "src/config/axios.main";

export const postCreateTransportAddress = (
  data: ICreateTransportAddressRequest
) => {
  return axios.post<
    unknown,
    IResponse<{ transportationAddress: ITransportAddress }>
  >(`addresses`, data);
};
