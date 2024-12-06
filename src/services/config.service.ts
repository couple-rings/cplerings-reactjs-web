import axios from "src/config/axios.main";
import queryString from "query-string";

export const getConfigs = () => {
  const generalFilter: IPaginationFilter = {
    page: 0,
    pageSize: 9999,
  };

  const queryUrl = queryString.stringify(generalFilter);

  return axios.get<unknown, IResponse<IListResponse<IConfigItem>>>(
    `configurations?${queryUrl}`
  );
};
