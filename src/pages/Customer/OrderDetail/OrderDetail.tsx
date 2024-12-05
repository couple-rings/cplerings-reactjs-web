import styles from "./OrderDetail.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, FormHelperText, Grid, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedSteppers from "src/components/stepper/Stepper";
import sample from "src/assets/default.jpg";
import {
  currencyFormatter,
  formatStandardOrderStatus,
} from "src/utils/functions";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStandardOrderDetail } from "src/utils/querykey";
import { getStandardOrderDetail } from "src/services/standardOrder.service";
import { useAppSelector } from "src/utils/hooks";
import moment from "moment";
import { DesignCharacteristic, StandardOrderStatus } from "src/utils/enums";
import { secondaryBtn } from "src/utils/styles";

function OrderDetail() {
  const [order, setOrder] = useState<IStandardOrder | null>(null);

  const navigate = useNavigate();

  const { id: orderId } = useParams<{ id: string }>();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const { data: orderResponse, isLoading: orderLoading } = useQuery({
    queryKey: [fetchStandardOrderDetail, orderId],

    queryFn: () => {
      if (orderId) return getStandardOrderDetail(+orderId);
    },
    enabled: !!orderId,
  });

  const determineStep = () => {
    if (order && order.transportationOrders.length > 0) {
      if (order.status === StandardOrderStatus.Pending) return 0;
      if (order.status === StandardOrderStatus.Paid) return 1;
      if (order.status === StandardOrderStatus.Delivering) return 2;
      if (order.status === StandardOrderStatus.Completed) return 3;

      // canceled
      return 3;
    }

    if (order && order.transportationOrders.length === 0) {
      if (order.status === StandardOrderStatus.Pending) return 0;
      if (order.status === StandardOrderStatus.Paid) return 1;
      if (order.status === StandardOrderStatus.Completed) return 2;

      // canceled
      return 2;
    }

    return 0;
  };

  useEffect(() => {
    if (orderResponse?.data) {
      const { customer } = orderResponse.data.standardOrder;
      if (customer.id !== userId) navigate("/customer/orders");

      setOrder(orderResponse.data.standardOrder);
    }

    if (orderResponse?.errors) {
      navigate("/customer/orders");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderResponse]);

  if (orderLoading)
    return (
      <Grid container justifyContent={"center"} my={5}>
        <Grid container item xs={7} gap={3} justifyContent={"space-between"}>
          <Grid item xs={12}>
            <Skeleton width={"100%"} height={100} variant="rectangular" />
          </Grid>

          <Grid item xs={12}>
            <Skeleton width={"100%"} height={300} variant="rectangular" />
          </Grid>
        </Grid>
      </Grid>
    );

  if (order)
    return (
      <div className={styles.container}>
        <Grid container xs={11} item xl={9} className={styles.head}>
          <div
            className={styles.backLink}
            onClick={() => navigate("/customer/orders")}
          >
            <ArrowBackIosIcon />
            <span>Quay Lại</span>
          </div>
        </Grid>

        <Grid container item xs={11} lg={9.5} xl={8} className={styles.body}>
          <div className={styles.title}>Chi Tiết Đơn</div>
          <div className={styles.status}>
            {formatStandardOrderStatus(order.status).text}
          </div>

          <Grid container justifyContent={"center"}>
            {order.status !== StandardOrderStatus.Canceled && (
              <Grid item xs={12} md={8} lg={6}>
                <CustomizedSteppers
                  activeStep={determineStep()}
                  shipping={
                    order.transportationOrders.length > 0 ? true : false
                  }
                />
              </Grid>
            )}
          </Grid>

          <Grid container my={6} alignItems={"flex-end"}>
            <Grid item md={6}>
              <div className={styles.orderNo}>Mã Đơn: {order.orderNo}</div>
              <div className={styles.datetime}>
                {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
              </div>
            </Grid>

            <Grid item md={6} textAlign={"right"}>
              Tổng Tiền:{" "}
              <span className={styles.totalPrice}>
                {currencyFormatter(order.totalPrice.amount)}
              </span>
            </Grid>
          </Grid>

          <Grid container mb={6}>
            {order.standardOrderItems.map((item) => {
              const img = item.design.designMetalSpecifications.find(
                (i) => i.metalSpecification.id === item.metalSpecification.id
              )?.image.url;

              return (
                <Grid
                  container
                  item
                  md={5.5}
                  className={styles.item}
                  key={item.id}
                >
                  <Grid container justifyContent={"center"}>
                    <Grid item xs={10} sm={8}>
                      <img
                        src={img ? img : sample}
                        className={styles.productImg}
                      />
                    </Grid>
                  </Grid>

                  <div className={styles.name}>
                    {item.design.name}{" "}
                    {item.design.characteristic === DesignCharacteristic.Male
                      ? "(Nam Giới)"
                      : "(Nữ Giới)"}
                  </div>

                  <Grid container justifyContent={"center"}>
                    <FormHelperText sx={{ my: 1 }}>
                      Bộ Sưu Tập {item.design.designCollection.name}
                    </FormHelperText>
                  </Grid>

                  <Grid container justifyContent={"space-between"} my={1}>
                    <Grid item>
                      <span className={styles.label}>Chất liệu</span>
                      <span>{item.metalSpecification.name}</span>
                    </Grid>
                    <Grid item>
                      <span className={styles.label}>Kích thước</span>
                      <span>{item.design.size} cm</span>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent={"space-between"} my={1}>
                    <Grid item>
                      <span className={styles.label}>Kim cương phụ</span>
                      <span>{item.design.sideDiamondsCount} viên</span>
                    </Grid>
                    <Grid item>
                      <span className={styles.label}>Khối lượng</span>
                      <span>{item.design.metalWeight} chỉ</span>
                    </Grid>
                  </Grid>
                  <div className={styles.price}>
                    {currencyFormatter(12000000)}
                  </div>
                </Grid>
              );
            })}
          </Grid>

          {order.standardOrderItems.length > 0 && (
            <Grid container mb={10}>
              <Grid item xs={5.5}>
                <fieldset style={{ margin: 0 }}>
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
              </Grid>
            </Grid>
          )}

          <Grid container justifyContent={"space-between"}>
            {order.status !== StandardOrderStatus.Pending &&
              order.transportationOrders.length > 0 && (
                <Grid item sm={5} md={4} className={styles.left}>
                  <div className={styles.title}>Thông Tin Giao Hàng</div>
                  <div className={styles.name}>
                    {order.transportationOrders[0].receiverName}
                  </div>
                  <div className={styles.address}>
                    {order.transportationOrders[0].deliveryAddress}
                  </div>
                  <div className={styles.phone}>
                    {order.transportationOrders[0].receiverPhone}
                  </div>
                </Grid>
              )}

            {order.status !== StandardOrderStatus.Pending && (
              <Grid item sm={5} md={4} className={styles.right}>
                <div className={styles.title}>Thông Tin Thanh Toán</div>
                <div className={styles.fee}>
                  <span>Tiền Hàng:</span>
                  <span>{currencyFormatter(12000000)}</span>
                </div>
                <div className={styles.fee}>
                  <span>Vận Chuyển:</span>
                  <span>{currencyFormatter(0)}</span>
                </div>
                <div className={styles.fee}>
                  <span>Tổng Cộng:</span>
                  <span>{currencyFormatter(order.totalPrice.amount)}</span>
                </div>
              </Grid>
            )}

            {order.status === StandardOrderStatus.Pending && (
              <Grid container justifyContent={"center"}>
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() => navigate(`/customer/checkout/${order.id}`)}
                >
                  Thanh Toán Ngay
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    );
}

export default OrderDetail;
