import axios from "src/config/axios.main";
import queryString from "query-string";

export const getMetalSpecs = (queryObj: IMetalSpecFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IMetalSpec>>>(
    `metal-specifications?${queryUrl}`
  );
};
