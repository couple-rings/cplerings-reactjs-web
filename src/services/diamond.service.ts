import axios from "src/config/axios.main";
import queryString from "query-string";

export const getDiamonds = (queryObj: IDiamondFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IDiamond>>>(
    `diamonds?${queryUrl}`
  );
};

export const postCreateDiamond = (data: ICreateDiamondRequest) => {
  return axios.post<unknown, IResponse<IDiamond>>(`diamonds`, data);
};
