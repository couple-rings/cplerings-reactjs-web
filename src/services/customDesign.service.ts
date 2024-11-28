import axios from "src/config/axios.main";
import queryString from "query-string";

export const postCreateCustomDesign = (data: ICreateCustomDesignRequest) => {
  return axios.post<unknown, IResponse<{ customDesign: ICustomDesign }>>(
    `designs/customs`,
    data
  );
};

export const getCustomDesigns = (queryObj: ICustomDesignFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICustomDesign>>>(
    `designs/customs?${queryUrl}`
  );
};
