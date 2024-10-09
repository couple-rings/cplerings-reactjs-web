import { Button, Grid } from "@mui/material";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/utils/hooks";

function NotFound() {
  const navigate = useNavigate();

  const { currentRoute } = useAppSelector((state) => state.route);

  return (
    <div className={styles.container}>
      <Grid container item xs={10} md={6} lg={4} className={styles.content}>
        <div className={styles.title}>Trang Không Tồn Tại</div>
        <div className={styles.text}>
          Link có thể đã bị hỏng hoặc trang có thể đã bị xóa. Hãy kiểm tra xem
          link bạn đang mở có đúng không.
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate(currentRoute);
          }}
        >
          Quay Lại
        </Button>
      </Grid>
    </div>
  );
}

export default NotFound;
