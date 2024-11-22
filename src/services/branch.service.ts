import axios from "src/config/axios.main";
import queryString from "query-string";

export const getBranches = (queryObj: IBranchFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IBranch>>>(
    `branches?${queryUrl}`
  );
};
