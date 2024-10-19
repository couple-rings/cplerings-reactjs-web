import axios from "src/config/axios.main";

export const postCreateSpouse = (data: ICreateSpouseRequest) => {
  return axios.post<unknown, IResponse<object>>(`spouses`, data);
};
