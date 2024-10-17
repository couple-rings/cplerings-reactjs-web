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

export const postRequestResetPW = (data: ISendOtpRequest) => {
  return axios.post<unknown, IResponse<ISendOtpResponse>>(
    `accounts/customer/password/forget`,
    data
  );
};

export const postResetPassword = (data: IResetPasswordRequest) => {
  return axios.post<unknown, IResponse<null>>(
    `accounts/customer/password/reset`,
    data
  );
};

export const postResendOtp = (data: ISendOtpRequest) => {
  return axios.post<unknown, IResponse<ISendOtpResponse>>(
    `accounts/customer/verification/resend`,
    data
  );
};
