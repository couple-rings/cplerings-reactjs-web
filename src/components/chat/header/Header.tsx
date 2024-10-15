import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./Header.module.scss";
import { useAppSelector } from "src/utils/hooks";

const Header = () => {
  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { participants } = currentConversation;

  const chatPartnerId = participants.find((item) => item !== userId);

  return (
    <div className={styles.container}>
      <AccountCircleIcon fontSize="large" />
      <div className={styles.title}>{chatPartnerId}</div>
    </div>
  );
};

export default Header;
