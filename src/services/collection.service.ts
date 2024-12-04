import axios from "src/config/axios.main";
import queryString from "query-string";

export const getCollections = (queryObj: ICollectionFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICollection>>>(
    `designs/collections?${queryUrl}`
  );
};
