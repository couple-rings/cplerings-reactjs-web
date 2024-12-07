import {
  currencyFormatter,
  formatStandardOrderStatus,
} from "src/utils/functions";
import styles from "./CustomerOrder.module.scss";
import sample from "src/assets/default.jpg";
import { Button, Chip, Divider, FormLabel, Grid } from "@mui/material";
import { outlinedBtn, primaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DesignCharacteristic, StandardOrderStatus } from "src/utils/enums";
import LoadingButton from "@mui/lab/LoadingButton";

function CustomerOrder(props: IStandardOrderProps) {
  const { data, handleCancel, loading } = props;
  const { createdAt, status, standardOrderItems, id, orderNo } = data;

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <Grid container className={styles.header}>
          <Grid container item mb={{ xs: 2, md: 0 }} gap={2} sm={10}>
            <Grid item>{moment(createdAt).format("DD/MM/YYYY")}</Grid>
            <Grid item>Mã đơn: {orderNo}</Grid>
          </Grid>
          <Grid item>
            <Chip
              label={formatStandardOrderStatus(status).text}
              color={formatStandardOrderStatus(status).color}
            />
          </Grid>
        </Grid>

        <Grid container className={styles.body}>
          <Grid container item xs={12} md={8.5} lg={9}>
            {standardOrderItems.map((item) => {
              const img = item.design.designMetalSpecifications.find(
                (i) => i.metalSpecification.id === item.metalSpecification.id
              )?.image.url;

              return (
                <Grid
                  container
                  item
                  justifyContent={"space-between"}
                  key={item.id}
                >
                  <Grid item xs={12} sm={3}>
                    <img src={img ? img : sample} />
                  </Grid>

                  <Grid item xs={12} sm={8.5} className={styles.middle}>
                    <div className={styles.title}>
                      {item.design.name}{" "}
                      {item.design.characteristic === DesignCharacteristic.Male
                        ? "(Nam Giới)"
                        : "(Nữ Giới)"}
                    </div>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      my={2}
                      alignItems={"center"}
                    >
                      <FormLabel>
                        Bộ Sưu Tập {item.design.designCollection.name}
                      </FormLabel>
                      <div className={styles.price}>
                        {currencyFormatter(item.price.amount)}
                      </div>
                    </Grid>

                    <Grid
                      container
                      justifyContent={"space-between"}
                      my={{ xs: 3, xl: 1 }}
                    >
                      <Grid item>
                        <span className={styles.label}>Chất liệu</span>
                        <span>{item.metalSpecification.name}</span>
                      </Grid>
                      <Grid item>
                        <span className={styles.label}>Kích thước</span>
                        <span>{item.design.size} cm</span>
                      </Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid item>
                        <span className={styles.label}>Kim cương phụ</span>
                        <span>{item.design.sideDiamondsCount} viên</span>
                      </Grid>
                      <Grid item>
                        <span className={styles.label}>Khối lượng</span>
                        <span>{item.design.metalWeight} chỉ</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          <Grid container item xs={12} md={3} lg={2.5} className={styles.right}>
            {status === StandardOrderStatus.Pending && (
              <Grid item xs={12} sm={3.5} md={12}>
                <Button
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ ...primaryBtn, py: 1 }}
                  onClick={() => navigate(`/customer/checkout/${id}`)}
                >
                  Trả Ngay
                </Button>
              </Grid>
            )}

            <Grid item xs={12} sm={3.5} md={12}>
              <Button
                disabled={loading}
                fullWidth
                variant="outlined"
                sx={{ ...outlinedBtn, px: 0 }}
                onClick={() => navigate(`/customer/order-detail/${id}`)}
              >
                Chi Tiết
              </Button>
            </Grid>

            {status === StandardOrderStatus.Pending && (
              <Grid item xs={12} sm={3.5} md={12}>
                <LoadingButton
                  loading={loading}
                  fullWidth
                  variant="contained"
                  sx={{ ...primaryBtn, py: 1 }}
                  onClick={() => handleCancel(id)}
                >
                  Hủy Đơn
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
      <Divider sx={{ backgroundColor: "#555", mb: 5, mt: 2 }} />
    </>
  );
}

export default CustomerOrder;
