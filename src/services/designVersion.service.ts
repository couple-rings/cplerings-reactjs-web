import axios from "src/config/axios.main";
import queryString from "query-string";

export const getDesignVersions = (queryObj: IDesignVersionFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<IDesignVersion>>>(
    `designs/versions?${queryUrl}`
  );
};

export const postCreateDesignVersion = (data: ICreateDesignVersionRequest) => {
  return axios.post<unknown, IResponse<{ designVersion: IDesignVersion }>>(
    `designs/versions`,
    data
  );
};

export const putUpdateDesignVersion = (id: number) => {
  return axios.put<unknown, IResponse<{ designVersion: IDesignVersion }>>(
    `designs/versions/${id}`
  );
};

export const getDesignVersionDetail = (id: number) => {
  return axios.get<unknown, IResponse<{ designVersion: IDesignVersion }>>(
    `designs/versions/${id}`
  );
};
