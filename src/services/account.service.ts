import axios from "src/config/axios.main";
import queryString from "query-string";

export const getAccountProfile = () => {
  return axios.get<unknown, IResponse<IProfileResponse>>(
    `accounts/profile/current`
  );
};

export const getTransporters = (queryObj: ITransporterFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IUser>>>(
    `accounts/transporters?${queryUrl}`
  );
};

export const getJewelers = (queryObj: IJewelerFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IUser>>>(
    `accounts/jewelers?${queryUrl}`
  );
};
