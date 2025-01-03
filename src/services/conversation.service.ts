import axios from "src/config/axios.chat";
import queryString from "query-string";

export const getConversations = (queryObj: IConversationFilter) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, ISecondaryResponse<IConversation[]>>(
    `conversations?${queryUrl}`
  );
};

export const getConversationDetail = (queryObj: IConversationDetailRequest) => {
  const queryUrl = queryString.stringify(queryObj);

  return axios.get<unknown, ISecondaryResponse<IConversation>>(
    `conversations/detail?${queryUrl}`
  );
};

export const putUpdateConversation = (
  id: string,
  data: IUpdateConversationRequest
) => {
  return axios.put<unknown, ISecondaryResponse<null>>(
    `conversations/${id}`,
    data
  );
};

export const postCreateConversation = (data: ICreateConversationRequest) => {
  return axios.post<unknown, ISecondaryResponse<IConversation>>(
    `conversations`,
    data
  );
};

export const postCreateRandomConversation = (userId: number) => {
  return axios.post<unknown, ISecondaryResponse<IConversation>>(
    `conversations/random`,
    { userId }
  );
};
