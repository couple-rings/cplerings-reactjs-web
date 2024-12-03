import axios from "src/config/axios.main";
import queryString from "query-string";

export const getCoupleDesigns = (queryObj: ICoupleDesignFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICoupleDesign>>>(
    `designs/couple?${queryUrl}`
  );
};

export const getDesignDetail = (id: number) => {
  return axios.get<unknown, IResponse<IDesign>>(`designs/${id}`);
};

export const getDesigns = (queryObj: IDesignFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IDesign>>>(
    `designs?${queryUrl}`
  );
};

export const postCreateDesign = (data: ICreateDesignRequest) => {
  return axios.post<unknown, IResponse<IDesign>>(`designs`, data);
};
