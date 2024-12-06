import axios from "src/config/axios.main";
import queryString from "query-string";

export const getJewelryCategories = (queryObj: IJewelryCategoriesFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IJewelryCategory>>>(
    `jewelries/categories?${queryUrl}`
  );
};
