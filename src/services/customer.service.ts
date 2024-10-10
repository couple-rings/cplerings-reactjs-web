import axios from "src/config/axios.main";

export const postRegister = (data: IRegisterRequest) => {
  return axios.post<unknown, IResponse<IRegisterResponse>>(
    `accounts/customer/registration`,
    data
  );
};

export const postAccountVerify = (data: IAccountVerifyRequest) => {
  return axios.post<unknown, IResponse<IAccountVerifyResponse>>(
    `accounts/customer/verification`,
    data
  );
};
