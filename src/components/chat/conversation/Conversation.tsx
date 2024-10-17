import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";
import styles from "./Conversation.module.scss";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import InsertPhotoSharpIcon from "@mui/icons-material/InsertPhotoSharp";
import AttachmentSharpIcon from "@mui/icons-material/AttachmentSharp";
import { useQueryClient } from "@tanstack/react-query";
import CircleIcon from "@mui/icons-material/Circle";
import {
  saveNotifications,
  selectConversation,
} from "src/redux/slice/conversation.slice";
import { putUpdateConversation } from "src/services/conversation.service";
import { putUpdateMessage } from "src/services/message.service";

function Conversation(props: IConversationProps) {
  const { conversation } = props;

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { notificationList } = useAppSelector((state) => state.conversation);

  const renderLatestMsg = (message: IMessage | undefined) => {
    if (!message)
      return (
        <span className={styles.latestMessage}>
          <span className={styles.messageContent}>
            Bạn có thể bắt đầu trò chuyện với người này
          </span>
        </span>
      );

    const classname =
      notificationList.includes(message.conversationId) ||
      (message.sender !== userId && !message.read)
        ? `${styles.latestMessage} ${styles.notified}`
        : styles.latestMessage;

    if (message.imageId)
      return (
        <span className={classname}>
          <span>{message.sender === userId ? "You" : message.sender}:</span>{" "}
          <InsertPhotoSharpIcon fontSize="small" />
          <span>Image</span>
        </span>
      );

    if (message.attachmentId)
      return (
        <span className={classname}>
          <span>{message.sender === userId ? "You" : message.sender}:</span>{" "}
          <AttachmentSharpIcon fontSize="small" />
          <span className={styles.messageContent}>
            {message.attachmentId.originalName}
          </span>
        </span>
      );

    return (
      <span className={classname}>
        <span>{message.sender === userId ? "You" : message.sender}:</span>{" "}
        <span className={styles.messageContent}>{message.content}</span>
      </span>
    );
  };

  const handleClickConversation = async () => {
    dispatch(selectConversation(conversation));

    //remove notification for this conversation after read
    const found = notificationList.find((item) => item === conversation._id);
    if (found) {
      const newNotifications = notificationList.filter(
        (item) => item !== conversation._id
      );
      dispatch(saveNotifications(newNotifications));

      putUpdateConversation(conversation._id, { userId });
    }

    // update read status of last message to true when click on conversation
    const latestMessage = conversation.latestMessage;
    if (
      latestMessage &&
      latestMessage.sender !== userId &&
      !latestMessage.read
    ) {
      if (latestMessage._id)
        putUpdateMessage(latestMessage._id, { read: true });

      queryClient.invalidateQueries({
        queryKey: ["fetchConversations", userId],
      });
    }
  };

  return (
    <ListItem disablePadding className={styles.container}>
      <ListItemButton onClick={handleClickConversation}>
        <ListItemIcon>
          <AccountCircleIcon sx={{ fontSize: 50, marginRight: 2 }} />
        </ListItemIcon>
        <ListItemText
          primary={conversation.participants.find((user) => user !== userId)}
          secondary={renderLatestMsg(conversation.latestMessage)}
        />
        {conversation.latestMessage && (
          <div className={styles.right}>
            {notificationList.includes(conversation._id) && (
              <CircleIcon color="primary" sx={{ fontSize: 13 }} />
            )}
            <span className={styles.date}>
              {moment(conversation.latestMessage.sentAt).format("DD/MM")}
            </span>
          </div>
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default Conversation;
