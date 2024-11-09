import axios from "src/config/axios.main";

export const postCreateCustomRequest = (data: ICreateCRRequest) => {
  return axios.post<unknown, IResponse<ICreateCRResponse>>(
    `custom-requests`,
    data
  );
};
