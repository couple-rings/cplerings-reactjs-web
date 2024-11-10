import { List } from "@mui/material";
import styles from "./ConversationList.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import Conversation from "./Conversation";
import { getConversations } from "src/services/conversation.service";
import { useEffect, useState } from "react";
import {
  saveConversations,
  saveNotifications,
  selectConversation,
} from "src/redux/slice/conversation.slice";
import { fetchConversations } from "src/utils/querykey";

function ConversationList(props: IConversationListProps) {
  const { joinRooms } = props;

  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { conversationsList } = useAppSelector((state) => state.conversation);

  const { data: response } = useQuery({
    queryKey: [fetchConversations, userId],
    queryFn: () => {
      return getConversations({ userId });
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (response && response.statusCode === 200 && response.data) {
      if (firstRender) {
        const rooms = response.data.map((conversation) => conversation._id);
        joinRooms(rooms);

        const notificationList: string[] = [];
        response.data.forEach((conversation) => {
          if (
            conversation.notifiedUsers &&
            conversation.notifiedUsers.includes(userId)
          )
            notificationList.push(conversation._id);
        });

        dispatch(saveNotifications(notificationList));
        if (response.data.length > 0)
          dispatch(selectConversation(response.data[0]));

        setFirstRender(false);
      }
      dispatch(saveConversations(response.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (conversationsList.length > 0)
    return (
      <div className={styles.container}>
        <List>
          {conversationsList.length > 0 &&
            conversationsList.map((conversation) => {
              return (
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                />
              );
            })}
        </List>
      </div>
    );
  else return <></>;
}

export default ConversationList;
