import axios from "src/config/axios.main";
import queryString from "query-string";

export const getDiamondSpecs = (queryObj: IDiamondSpecFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IDiamondSpec>>>(
    `diamond-specifications?${queryUrl}`
  );
};
