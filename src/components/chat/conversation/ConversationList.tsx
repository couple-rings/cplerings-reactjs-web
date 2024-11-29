import { Box, Grid, List, Tab } from "@mui/material";
import styles from "./ConversationList.module.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import Conversation from "./Conversation";
import { getConversations } from "src/services/conversation.service";
import { useEffect, useState } from "react";
import {
  removeConversations,
  saveConversations,
  saveNotifications,
  selectConversation,
} from "src/redux/slice/conversation.slice";
import { fetchConversations, fetchCustomRequests } from "src/utils/querykey";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { getCustomRequests } from "src/services/customRequest.service";
import { CustomRequestStatus, UserRole } from "src/utils/enums";
import Scrollbars from "react-custom-scrollbars-2";
import CustomRequest from "src/components/chat/customRequest/CustomRequest";

function ConversationList(props: IConversationListProps) {
  const { joinRooms, conversation } = props;

  const [filterObj, setFilterObj] = useState<ICustomRequestFilter | null>(null);
  const [firstRender, setFirstRender] = useState(true);
  const [value, setValue] = useState("conversation");

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { id: userId, role } = useAppSelector((state) => state.auth.userInfo);
  const { conversationsList, currentConversation } = useAppSelector(
    (state) => state.conversation
  );

  const { data: response } = useQuery({
    queryKey: [fetchConversations, userId],
    queryFn: () => {
      return getConversations({ userId });
    },
    enabled: !!userId,
  });

  const { data: customResponse } = useQuery({
    queryKey: [fetchCustomRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomRequests(filterObj);
    },
    enabled: !!filterObj,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 100,
      customerId:
        role === UserRole.Customer ? userId : currentConversation.partner?.id,
      status: CustomRequestStatus.OnGoing,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConversation]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchCustomRequests, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  useEffect(() => {
    if (response && response.statusCode === 200 && response.data) {
      if (firstRender) {
        const notificationList: string[] = [];
        response.data.forEach((conversation) => {
          if (
            conversation.notifiedUsers &&
            conversation.notifiedUsers.includes(userId)
          )
            notificationList.push(conversation._id);
        });

        dispatch(saveNotifications(notificationList));

        setFirstRender(false);
      }

      const rooms = response.data.map((conversation) => conversation._id);
      joinRooms(rooms);

      if (response.data.length > 0 && !currentConversation._id) {
        if (conversation) dispatch(selectConversation(conversation));
        else dispatch(selectConversation(response.data[0]));
      }
      if (response.data.length === 0) dispatch(removeConversations());

      dispatch(saveConversations(response.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, response, currentConversation]);

  if (conversationsList.length > 0)
    return (
      <div className={styles.container}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} variant="fullWidth">
              <Tab
                label="Danh Sách Chat"
                value={"conversation"}
                className={styles.tabLabel}
              />
              <Tab
                label="Yêu Cầu Thiết Kế"
                value={"customRequest"}
                className={styles.tabLabel}
              />
            </TabList>
          </Box>
          <TabPanel value={"conversation"} sx={{ p: 0 }}>
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
          </TabPanel>
          <TabPanel value={"customRequest"} sx={{ p: 0 }}>
            <Scrollbars
              style={{ height: "calc(100vh - 112px)" }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              {customResponse?.data && customResponse.data.items.length > 0 ? (
                <CustomRequest data={customResponse.data.items[0]} />
              ) : (
                <Grid px={2} py={4} textAlign={"center"}>
                  Chưa có yêu cầu thiết kế
                </Grid>
              )}
            </Scrollbars>
          </TabPanel>
        </TabContext>
      </div>
    );
  else return <></>;
}

export default ConversationList;
