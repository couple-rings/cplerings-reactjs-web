import axios from "src/config/axios.main";
import queryString from "query-string";

export const getCraftingRequests = (queryObj: ICraftingRequestFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICraftingRequest>>>(
    `crafting-requests?${queryUrl}`
  );
};

export const getCraftingRequestGroups = (
  queryObj: ICraftingRequestGroupFilter
) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICraftingRequestGroup>>>(
    `crafting-requests/groups?${queryUrl}`
  );
};

export const postCreateCraftingRequests = (data: ICreateCraftingRequest) => {
  return axios.post<unknown, IResponse<{ craftingRequest: ICraftingRequest }>>(
    `crafting-requests`,
    data
  );
};

export const putUpdateCraftingRequests = (data: IUpdateCraftingRequest) => {
  return axios.put<unknown, IResponse<IUpdateCraftingRequestResponse>>(
    `crafting-requests/determination`,
    data
  );
};
