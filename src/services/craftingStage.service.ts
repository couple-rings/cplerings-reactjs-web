import axios from "src/config/axios.main";
import queryString from "query-string";

export const getCraftingStages = (queryObj: ICraftingStageFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, IResponse<IListResponse<ICraftingStage>>>(
    `crafting-stages?${queryUrl}`
  );
};

export const postCompleteCraftingStage = (
  id: number,
  data: IUpdateCraftingStageRequest
) => {
  return axios.post<unknown, IResponse<ICraftingStage>>(
    `crafting-stages/${id}/completion`,
    data
  );
};

export const postDepositCraftingStage = (
  data: IDepositCraftingStageRequest
) => {
  return axios.post<unknown, IResponse<{ paymentLink: string }>>(
    `crafting-stages/deposit`,
    data
  );
};
