import axios from "src/config/axios.main";

export const putUpdateContract = (id: number, data: IUpdateContractRequest) => {
  return axios.put<unknown, IResponse<{ contract: IContract }>>(
    `contracts/${id}/signing`,
    data
  );
};
