import axios from "src/config/axios.main";

export const postCreateSession = () => {
  return axios.post<unknown, IResponse<{ paymentLink: string }>>(
    `designs/sessions/create`
  );
};

export const getCustomerSessionCount = (id: number) => {
  return axios.get<unknown, IResponse<ICustomerSessionCountResponse>>(
    `designs/sessions/customers/${id}/left`
  );
};

export const getOwnSessionCount = () => {
  return axios.get<unknown, IResponse<{ remainingCount: number }>>(
    `designs/sessions`
  );
};
