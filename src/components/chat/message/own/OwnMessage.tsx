import { Tooltip } from "@mui/material";
import moment from "moment";
import styles from "./OwnMessage.module.scss";

const OwnMessage = (props: IOwnMessageProps) => {
  const { children, timestamp } = props;

  return (
    <div className={styles.container}>
      <Tooltip
        title={moment(timestamp).format("MMMM Do YYYY, HH:mm")}
        placement="left"
      >
        <div className={styles.childrenContainer}>{children}</div>
      </Tooltip>
    </div>
  );
};

export default OwnMessage;
