import { Button, Grid } from "@mui/material";
import styles from "./ResellOrders.module.scss";
import { primaryBtn } from "src/utils/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

function ResellOrders() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
      >
        <div className={styles.title}>Đơn Mua Trang Sức</div>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1 }}
          onClick={() => navigate("/staff/resell-order/create")}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Tạo Mới
        </Button>
      </Grid>
    </div>
  );
}

export default ResellOrders;
