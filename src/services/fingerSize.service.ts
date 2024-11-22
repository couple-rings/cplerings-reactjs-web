import axios from "src/config/axios.main";
import queryString from "query-string";

export const getFingerSize = (queryObj: IFingerSizeFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IFingerSize>>>(
    `finger-sizes?${queryUrl}`
  );
};
