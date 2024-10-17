import axios from "src/config/axios.chat";

export const putUpdateMessage = (id: string, data: IUpdateMessageRequest) => {
  return axios.put<unknown, ISecondaryResponse<null>>(`messages/${id}`, data);
};

export const getMessages = (queryObj: IMessageFilterDto) => {
  const { current, conversationId } = queryObj;

  return axios.get<
    unknown,
    ISecondaryResponse<ISecondaryListResponse<IMessage[]>>
  >(
    `messages?conversationId=${conversationId}&&${
      current ? `current=${current}` : ""
    }`
  );
};
