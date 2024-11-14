import ConversationList from "src/components/chat/conversation/ConversationList";
import styles from "./Index.module.scss";
import { useAppDispatch, useAppSelector, useScrollTop } from "src/utils/hooks";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { putUpdateMessage } from "src/services/message.service";
import { saveNotifications } from "src/redux/slice/conversation.slice";
import { putUpdateConversation } from "src/services/conversation.service";
import Chatbox from "src/components/chat/chatbox/Chatbox";
import { socket } from "src/config/socket";
import { fetchConversations } from "src/utils/querykey";
import { Box } from "@mui/material";
import { Location, useLocation } from "react-router-dom";

function Index() {
  const [receiveMessage, setReceiveMessage] = useState<null | IMessage>(null);

  const location: Location<{ conversation: IConversation }> = useLocation();
  const { conversation } = location.state || {};

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { currentConversation, notificationList, conversationsList } =
    useAppSelector((state) => state.conversation);

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
          queryKey: [fetchConversations, userId],
        });
      }
    });
  };

  useScrollTop();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected: ", socket.connected);
    });

    return () => {
      socket.off("connect", () => {
        console.log("socket disconnected: ", socket.connected);
      });
    };
  }, []);

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
          queryKey: [fetchConversations, userId],
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
      <ConversationList joinRooms={joinRooms} conversation={conversation} />

      {_id && (
        <Chatbox handleSend={handleSend} receiveMessage={receiveMessage} />
      )}

      {conversationsList.length === 0 && (
        <Box sx={{ mt: 10, textAlign: "center", width: "100%", color: "#555" }}>
          Bạn chưa có cuộc hội thoại nào
        </Box>
      )}
    </div>
  );
}

export default Index;
