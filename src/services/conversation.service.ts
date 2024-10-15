import axios from "src/config/axios.chat";

export const getConversations = (queryObj: IConversationFilterDto) => {
  const { userId } = queryObj;

  return axios.get<unknown, ISecondaryResponse<IConversation[]>>(
    `conversations?userId=${userId}`
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
