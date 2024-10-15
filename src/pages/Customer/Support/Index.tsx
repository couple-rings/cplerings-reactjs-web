import { io } from "socket.io-client";
import ConversationList from "src/components/chat/conversation/ConversationList";
import styles from "./Index.module.scss";
import Chatbox from "src/components/chat/chatbox/Chatbox";
import { useAppDispatch, useAppSelector, useScrollTop } from "src/utils/hooks";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { saveNotifications } from "src/redux/slice/conversation.slice";
import { putUpdateConversation } from "src/services/conversation.service";
import { putUpdateMessage } from "src/services/message.service";

const socket = io(import.meta.env.VITE_NESTJS_SERVER_URL);

socket.on("connect", () => {
  console.log("socket client: ", socket.id);
});

function Index() {
  const [receiveMessage, setReceiveMessage] = useState<null | IMessage>(null);

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { currentConversation, notificationList } = useAppSelector(
    (state) => state.conversation
  );

  const { _id } = currentConversation;

  const joinRooms = (rooms: string[]) => {
    socket.emit("join_room", rooms, (response: string) =>
      console.log(response)
    );
  };

  const handleSend = (message: IMessage) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.emit("send_message", message, async (response: any) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: ["fetchConversations", userId],
        });
      }
    });
  };

  useScrollTop();

  useEffect(() => {
    const listener = async (data: IMessage) => {
      if (currentConversation) {
        // if new message belongs to current conversation
        if (data.conversationId === _id) {
          setReceiveMessage(data);
          if (data._id) putUpdateMessage(data._id, { read: true });
        } else {
          // if conversation is not in notification list
          if (!notificationList.includes(data.conversationId)) {
            dispatch(
              saveNotifications([...notificationList, data.conversationId])
            );

            putUpdateConversation(data.conversationId, { userId });
          }
        }

        queryClient.invalidateQueries({
          queryKey: ["fetchConversations", userId],
        });
      }
    };
    socket.on("receive_message", listener);

    return () => {
      socket.off("receive_message", listener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationList, currentConversation]);

  return (
    <div className={styles.container}>
      <ConversationList joinRooms={joinRooms} />

      {_id && (
        <Chatbox handleSend={handleSend} receiveMessage={receiveMessage} />
      )}
    </div>
  );
}

export default Index;
