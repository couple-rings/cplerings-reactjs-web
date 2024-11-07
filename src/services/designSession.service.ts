import axios from "src/config/axios.main";

export const postCreateSession = () => {
  return axios.post<unknown, IResponse<{ paymentLink: string }>>(
    `designs/sessions/create`
  );
};
