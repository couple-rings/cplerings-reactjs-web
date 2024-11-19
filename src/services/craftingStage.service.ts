import axios from "src/config/axios.main";
import queryString from "query-string";

export const getCraftingStages = (queryObj: ICraftingStageFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICraftingStage>>>(
    `crafting-stages?${queryUrl}`
  );
};
