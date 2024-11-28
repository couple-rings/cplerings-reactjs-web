import axios from "src/config/axios.main";

export const postCreateSpouse = (data: ICreateSpouseRequest) => {
  return axios.post<unknown, IResponse<object>>(`spouses`, data);
};

export const getCustomerSpouse = (customerId: number) => {
  return axios.get<unknown, IResponse<{ spouses: ISpouse[] }>>(
    `spouses?customerId=${customerId}`
  );
};
