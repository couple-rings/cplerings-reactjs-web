import axios from "src/config/axios.main";
// import queryString from "query-string";

export const getPaymentDetail = (id: number) => {
  return axios.get<unknown, IResponse<IPayment>>(`payments/${id}`);
};

export const getCustomOrderPayments = (id: number) => {
  return axios.get<unknown, IResponse<{ payments: IPayment[] }>>(
    `custom-orders/${id}/payments`
  );
};
