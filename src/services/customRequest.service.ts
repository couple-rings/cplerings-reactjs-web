import axios from "src/config/axios.main";
import queryString from "query-string";

export const postCreateCustomRequest = (data: ICreateCRRequest) => {
  return axios.post<unknown, IResponse<ICustomRequest>>(
    `custom-requests`,
    data
  );
};

export const getCustomRequests = (queryObj: ICustomRequestFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICustomRequest>>>(
    `custom-requests?${queryUrl}`
  );
};

export const getCustomRequestDetail = (id: number) => {
  return axios.get<unknown, IResponse<ICustomRequestDetailResponse>>(
    `custom-requests/${id}`
  );
};

export const putUpdateCustomRequest = (data: IUpdateCRRequest, id: number) => {
  return axios.put<unknown, IResponse<ICustomRequest>>(
    `custom-requests/determination/${id}`,
    data
  );
};
