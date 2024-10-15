import styles from "./AvatarMessage.module.scss";
import { Avatar, Tooltip } from "@mui/material";
import moment from "moment";

const AvatarMessage = (props: IAvatarMessageProps) => {
  const { timestamp, children } = props;

  return (
    <div className={styles.container}>
      <Avatar>M</Avatar>
      <Tooltip
        title={moment(timestamp).format("MMMM Do YYYY, HH:mm")}
        placement="right"
      >
        <div className={styles.childrenContainer}>{children}</div>
      </Tooltip>
    </div>
  );
};

export default AvatarMessage;
