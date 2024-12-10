import axios from "src/config/axios.main";

export const postRefundRequest = (customOrderId: number, data: IRefundRequest) => {
  return axios.post<unknown, IResponse<{ refundOrder: IRefundOrder }>>(
    `custom-orders/${customOrderId}/refund`,
    data
  );
};