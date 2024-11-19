import { Grid, Tooltip } from "@mui/material";
import styles from "./BlogRow.module.scss";
// import moment from "moment";

function BlogRow(props: IBlogRowProps) {
  const { blog, handleClick } = props;
  const { title, summary, createdAt, coverImage } = blog;

  return (
    <Tooltip title="Xem Chi Tiết" placement="top">
      <Grid
        container
        className={styles.container}
        alignItems={"center"}
        gap={3}
        onClick={() => handleClick(blog)}
      >
        <Grid item md={3}>
          <img src={coverImage} className={styles.coverImg} />
        </Grid>

        <Grid item md={8}>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>{createdAt}</div>
          <div className={styles.summary}>{summary}</div>
        </Grid>
      </Grid>
    </Tooltip>
  );
}

export default BlogRow;
