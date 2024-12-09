import { Chip, FormLabel, Grid } from "@mui/material";
import styles from "./StandardOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStandardOrderDetail,
  putCompleteStandardOrder,
} from "src/services/standardOrder.service";
import { fetchStandardOrderDetail } from "src/utils/querykey";
import {
  currencyFormatter,
  formatStandardOrderStatus,
} from "src/utils/functions";
import moment from "moment";
import placeholder from "src/assets/default.jpg";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import {
  DesignCharacteristic,
  ResponseType,
  StandardOrderStatus,
} from "src/utils/enums";
import StaffStandardOrderTimeline from "src/components/timeline/staffStandardOrder/StaffStandardOrderTimeline";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { primaryBtn } from "src/utils/styles";

function StandardOrderDetail() {
  const [order, setOrder] = useState<IStandardOrder | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: response } = useQuery({
    queryKey: [fetchStandardOrderDetail, id],

    queryFn: () => {
      if (id) return getStandardOrderDetail(+id);
    },
    enabled: !!id,
  });

  const completeMutation = useMutation({
    mutationFn: (orderId: number) => {
      return putCompleteStandardOrder(orderId);
    },
    onSuccess: (response) => {
      if (response.type === ResponseType.Info) {
        queryClient.invalidateQueries({
          queryKey: [fetchStandardOrderDetail, id],
        });
        toast.success("Đã xác nhận hoàn thành đơn hàng");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  useEffect(() => {
    if (response && response.data) {
      setOrder(response.data.standardOrder);
    }

    if (response && response.errors) {
      navigate("/staff/standard-order");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (order)
    return (
      <Grid container className={styles.container} justifyContent={"center"}>
        <Grid container item xs={11}>
          <Grid container className={styles.header}>
            <div className={styles.title}>Chi Tiết Đơn</div>
            <Chip
              color={formatStandardOrderStatus(order.status).color}
              label={formatStandardOrderStatus(order.status).text}
            />
          </Grid>

          <Grid container mb={3}>
            <Grid container mb={1}>
              <Grid container item sm={6}>
                <Grid item xs={4} md={3} mb={1}>
                  Mã đơn:
                </Grid>

                <Grid item>{order.orderNo}</Grid>
              </Grid>

              <Grid container item sm={6}>
                <Grid item xs={4} md={3}>
                  Ngày tạo:
                </Grid>

                <Grid item>
                  {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                </Grid>
              </Grid>
            </Grid>

            <Grid container mb={1}>
              <Grid container item sm={6} alignItems={"center"}>
                <Grid item xs={4} md={3}>
                  Tổng tiền:
                </Grid>

                <Grid item className={styles.totalPrice}>
                  {currencyFormatter(order.totalPrice.amount)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container mb={3} justifyContent={"space-between"}>
            <Grid container item gap={3} md={5}>
              <fieldset style={{ margin: 0, width: "100%" }}>
                <legend>Khách Hàng</legend>
                <Grid container p={2}>
                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Username:</Grid>

                    <Grid item>{order.customer.username}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Email:</Grid>

                    <Grid item>{order.customer.email}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Username:</Grid>

                    <Grid item>
                      {order.customer.phone ? order.customer.phone : "--"}
                    </Grid>
                  </Grid>
                </Grid>
              </fieldset>

              {order.standardOrderItems.length > 0 && (
                <fieldset style={{ margin: 0, width: "100%" }}>
                  <legend>Chi Nhánh</legend>
                  <Grid container my={1}>
                    <Grid item xs={4}>
                      Tên cửa hàng:
                    </Grid>
                    <Grid item>
                      {order.standardOrderItems[0].branch.storeName}
                    </Grid>
                  </Grid>

                  <Grid container mb={1}>
                    <Grid item xs={4}>
                      Địa chỉ:
                    </Grid>
                    <Grid item xs={8}>
                      {order.standardOrderItems[0].branch.address}
                    </Grid>
                  </Grid>

                  <Grid container mb={1}>
                    <Grid item xs={4}>
                      Số điện thoại:
                    </Grid>
                    <Grid item>{order.standardOrderItems[0].branch.phone}</Grid>
                  </Grid>
                </fieldset>
              )}
            </Grid>

            <Grid item md={6.5}>
              {order && <StaffStandardOrderTimeline order={order} />}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} my={4} className={styles.subtitle}>
              Thông Tin Hàng ({order.standardOrderItems.length})
            </Grid>

            {order.standardOrderItems.map((item) => {
              const img = item.design.designMetalSpecifications.find(
                (i) => i.metalSpecification.id === item.metalSpecification.id
              )?.image.url;

              return (
                <Grid container key={item.id} className={styles.jewelry}>
                  <Grid item sm={4} lg={2.5}>
                    <img
                      src={img ? img : placeholder}
                      className={styles.image}
                    />
                  </Grid>

                  <Grid container item sm={7.5} lg={9}>
                    <Grid item className={styles.name}>
                      {item.design.name}
                    </Grid>

                    <Grid item xs={12}>
                      {item.design.characteristic ===
                        DesignCharacteristic.Male && (
                        <div>
                          <img src={male} className={styles.genderIcon} />{" "}
                          {"Nam Tính"}
                        </div>
                      )}

                      {item.design.characteristic ===
                        DesignCharacteristic.Female && (
                        <div>
                          <img src={female} className={styles.genderIcon} />{" "}
                          {"Nữ Tính"}
                        </div>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel>
                        Bộ Sưu Tập {item.design.designCollection.name}
                      </FormLabel>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid container item md={6} gap={2}>
                        <Grid item>Chất liệu:</Grid>

                        <Grid item>{item.metalSpecification.name}</Grid>
                      </Grid>

                      <Grid container item md={6} gap={2}>
                        <Grid item>Kích thước:</Grid>

                        <Grid item>{item.design.size} cm</Grid>
                      </Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid container item md={6} gap={2}>
                        <Grid item>Kim cương phụ:</Grid>

                        <Grid item>{item.design.sideDiamondsCount} viên</Grid>
                      </Grid>

                      <Grid container item md={6} gap={2}>
                        <Grid item>Khối lượng:</Grid>

                        <Grid item>{item.design.metalWeight} chỉ</Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      Giá Tiền:{" "}
                      <span className={styles.price}>
                        {currencyFormatter(item.price.amount)}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          {order.transportationOrders.length === 0 &&
            order.status === StandardOrderStatus.Paid && (
              <Grid container justifyContent={"center"} mt={7}>
                <LoadingButton
                  loading={completeMutation.isPending}
                  variant="contained"
                  sx={{ ...primaryBtn, borderRadius: 1, px: 6 }}
                  onClick={() => completeMutation.mutate(order.id)}
                >
                  Xác Nhận Hoàn Thành
                </LoadingButton>
              </Grid>
            )}
        </Grid>
      </Grid>
    );
}

export default StandardOrderDetail;
