import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./Header.module.scss";
import { useAppSelector } from "src/utils/hooks";
import { getConversationDetail } from "src/services/conversation.service";
import { fetchConversationDetail } from "src/utils/querykey";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";

const Header = () => {
  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { _id } = currentConversation;

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchConversationDetail, _id],

    queryFn: () => {
      if (_id) return getConversationDetail({ userId, conversationId: _id });
    },
    enabled: !!_id,
  });

  if (isLoading) return <Skeleton height={100} sx={{ mx: 2 }} />;

  return (
    <div className={styles.container}>
      {response?.data?.partner?.avatar ? (
        <img src={response.data.partner.avatar} className={styles.avatar} />
      ) : (
        <AccountCircleIcon fontSize="large" />
      )}
      <div className={styles.title}>
        {response?.data?.partner ? response.data.partner.username : "Anonymous"}
      </div>
    </div>
  );
};

export default Header;
