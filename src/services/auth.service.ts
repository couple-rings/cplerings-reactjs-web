import axios from "src/config/axios.main";

export const postLogin = (data: ILoginRequest) => {
  return axios.post<unknown, IResponse<ILoginResponse>>(`auth/login`, data);
};
