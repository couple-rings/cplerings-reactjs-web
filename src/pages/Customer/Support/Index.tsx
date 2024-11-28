import ConversationList from "src/components/chat/conversation/ConversationList";
import styles from "./Index.module.scss";
import Chatbox from "src/components/chat/chatbox/Chatbox";
import { useAppDispatch, useAppSelector, useScrollTop } from "src/utils/hooks";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveNotifications } from "src/redux/slice/conversation.slice";
import {
  postCreateRandomConversation,
  putUpdateConversation,
} from "src/services/conversation.service";
import { putUpdateMessage } from "src/services/message.service";
import { Grid } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { socket } from "src/config/socket";
import { fetchConversations } from "src/utils/querykey";
import { Location, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

function Index() {
  const [receiveMessage, setReceiveMessage] = useState<null | IMessage>(null);

  const location: Location<{ conversation: IConversation }> = useLocation();
  const { conversation } = location.state || {};

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { currentConversation, notificationList } = useAppSelector(
    (state) => state.conversation
  );

  const { _id } = currentConversation;

  const chatMutation = useMutation({
    mutationFn: (userId: number) => {
      return postCreateRandomConversation(userId);
    },
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({
          queryKey: [fetchConversations, userId],
        });

        toast.success("Bạn đã có thể bắt đầu chat");
      }

      if (response.error) {
        toast.error(response.error);
      }
    },
  });

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

  return (
    <div className={styles.container}>
      <ConversationList joinRooms={joinRooms} conversation={conversation} />

      {_id ? (
        <Chatbox handleSend={handleSend} receiveMessage={receiveMessage} />
      ) : (
        <Grid container justifyContent={"center"} sx={{ height: "50vh" }}>
          <Grid item xs={12} md={8}>
            <div className={styles.intro}>
              Chào mừng bạn đến với Trung Tâm Chăm Sóc Khách Hàng!
            </div>
            <div className={styles.guide}>
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ mọi yêu cầu của bạn.
              Hãy nhấn vào nút bên dưới để bắt đầu trò chuyện cùng nhân viên của
              chúng tôi.
            </div>
            <div style={{ textAlign: "center" }}>
              <LoadingButton
                loading={chatMutation.isPending}
                variant="contained"
                sx={{ ...primaryBtn, py: 1 }}
                onClick={() => chatMutation.mutate(userId)}
              >
                Chat Ngay
              </LoadingButton>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Index;
