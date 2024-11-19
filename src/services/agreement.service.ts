import axios from "src/config/axios.main";
import queryString from "query-string";

export const getAgreements = (queryObj: IAgreementFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IAgreement>>>(
    `agreements?${queryUrl}`
  );
};
