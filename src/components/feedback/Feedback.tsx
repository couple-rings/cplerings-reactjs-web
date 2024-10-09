import { Avatar, Divider, IconButton, Rating, SxProps } from "@mui/material";
import styles from "./Feedback.module.scss";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const avatarStyle: SxProps = {
  width: 60,
  height: 60,
};

function Feedback(props: IFeedbackProps) {
  const {
    comment,
    rating,
    title,
    username,
    date,
    setOpenDelete,
    setOpenUpdate,
  } = props;

  return (
    <>
      <div className={styles.container}>
        <Avatar sx={avatarStyle}>{username.charAt(0)}</Avatar>
        <div className={styles.right}>
          <div className={styles.dateName}>
            <div className={styles.name}>{username}</div>
            <div className={styles.date}>{date}</div>
          </div>

          <Rating value={rating} readOnly sx={{ color: "#b43620" }} />

          <div className={styles.title}>{title}</div>

          <div className={styles.comment}>{comment}</div>

          <div className={styles.iconBtnGroup}>
            <IconButton onClick={() => setOpenDelete(true)}>
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={() => setOpenUpdate(true)}>
              <BorderColorIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#555", mb: 8 }} />
    </>
  );
}

export default Feedback;
