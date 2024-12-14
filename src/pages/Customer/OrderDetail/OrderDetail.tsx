import styles from "./OrderDetail.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Grid,
  OutlinedInput,
  Skeleton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedSteppers from "src/components/stepper/Stepper";
import sample from "src/assets/default.jpg";
import {
  currencyFormatter,
  formatRefundMethodTitle,
  formatStandardOrderStatus,
} from "src/utils/functions";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStandardOrderDetail } from "src/utils/querykey";
import { getStandardOrderDetail } from "src/services/standardOrder.service";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import moment from "moment";
import {
  ConfigurationKey,
  DesignCharacteristic,
  StandardOrderStatus,
  TransportOrderStatus,
} from "src/utils/enums";
import { secondaryBtn } from "src/utils/styles";
import TimelineModal from "src/components/modal/transportOrder/Timeline.modal";

function OrderDetail() {
  const [order, setOrder] = useState<IStandardOrder | null>(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { id: orderId } = useParams<{ id: string }>();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { configs } = useAppSelector((state) => state.config);

  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;

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

  useScrollTop();

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
            {order.status !== StandardOrderStatus.Canceled &&
              order.status !== StandardOrderStatus.Refunded && (
                <Grid item xs={12} md={8} lg={6}>
                  <CustomizedSteppers
                    activeStep={determineStep()}
                    shipping={
                      order.transportationOrders.length > 0 ? true : false
                    }
                  />
                </Grid>
              )}

            {order.status !== StandardOrderStatus.Pending &&
              order.status !== StandardOrderStatus.Canceled &&
              order.status !== StandardOrderStatus.Refunded &&
              order.transportationOrders.length > 0 && (
                <Grid container item xs={12} justifyContent={"center"} mt={6}>
                  <Button
                    variant="contained"
                    sx={{ ...secondaryBtn, px: 3 }}
                    onClick={() => setOpen(true)}
                  >
                    Quá Trình Giao Hàng
                  </Button>
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

          <Grid container mb={6} justifyContent={"space-between"}>
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
                    {currencyFormatter(item.price.amount)}
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
                <Grid item sm={5} className={styles.left}>
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

            {order.status !== StandardOrderStatus.Pending &&
              order.status !== StandardOrderStatus.Canceled && (
                <Grid item sm={5} className={styles.right}>
                  <div className={styles.title}>Thông Tin Thanh Toán</div>
                  <div className={styles.fee}>
                    <span>Ngày thanh toán:</span>
                    <span>
                      {moment(
                        order.standardOrderHistories.find(
                          (item) => item.status === StandardOrderStatus.Paid
                        )?.createdAt
                      ).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </div>
                  <div className={styles.fee}>
                    <span>Tiền Hàng:</span>
                    <span>{currencyFormatter(order.totalPrice.amount)}</span>
                  </div>
                  <div className={styles.fee}>
                    <span>Vận Chuyển:</span>
                    <span>
                      {shippingFee && currencyFormatter(+shippingFee)}
                    </span>
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

            {order.transportationOrders.find(
              (item) => item.status === TransportOrderStatus.Delivering
            ) && (
              <Grid container justifyContent={"center"} mt={3}>
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() => navigate(`/customer/transport/${order.id}`)}
                >
                  Vị Trí Người Giao Hàng
                </Button>
              </Grid>
            )}
          </Grid>

          {order.status === StandardOrderStatus.Refunded && order.refund && (
            <Grid container>
              <Grid item xs={12} my={4} className={styles.refuntTitle}>
                Thông tin hoàn tiền
              </Grid>

              <Grid container mb={1} justifyContent={"space-between"}>
                <Grid container item md={6} alignItems={"baseline"}>
                  <Grid item xs={4} mb={1}>
                    Số tiền hoàn trả:
                  </Grid>

                  <Grid item className={styles.totalPrice}>
                    {currencyFormatter(order.refund.amount.amount)}
                  </Grid>
                </Grid>

                <Grid container item md={5.7}>
                  <Grid item xs={4}>
                    Phương thức:
                  </Grid>

                  <Grid item>
                    <FormLabel>
                      {formatRefundMethodTitle(order.refund.method)}
                    </FormLabel>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                rowGap={2}
                mb={3}
                justifyContent={"space-between"}
              >
                <Grid container item md={5.7}>
                  <Grid item mb={2}>
                    Lý do hoàn trả:
                  </Grid>

                  <Grid item xs={12}>
                    <OutlinedInput
                      sx={{ borderRadius: 0 }}
                      fullWidth
                      readOnly
                      multiline
                      rows={4}
                      defaultValue={order.refund.reason}
                    />
                  </Grid>
                </Grid>

                <Grid container item md={5.7}>
                  <Grid item xs={4}>
                    Ngày thực hiện:
                  </Grid>

                  <Grid item>
                    <FormLabel>
                      {moment(
                        order.standardOrderHistories.find(
                          (item) => item.status === StandardOrderStatus.Refunded
                        )?.createdAt
                      ).format("DD/MM/YYYY HH:mm")}
                    </FormLabel>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ mb: 1 }}>Hình ảnh giao dịch:</Box>
              <Grid container rowGap={2} justifyContent={"space-between"}>
                <Grid item md={5.7}>
                  <img
                    src={order.refund.proofImage.url}
                    className={styles.refundImage}
                  />
                </Grid>
                <Grid item xs={12} md={5.7}>
                  <fieldset style={{ margin: 0, width: "100%" }}>
                    <legend>Nhân Viên Thực Hiện</legend>
                    <Grid container p={2}>
                      <Grid container justifyContent={"space-between"} mb={1}>
                        <Grid item>Tên tài khoản:</Grid>

                        <Grid item>{order.refund.staff.username}</Grid>
                      </Grid>

                      <Grid container justifyContent={"space-between"} mb={1}>
                        <Grid item>Email:</Grid>

                        <Grid item>{order.refund.staff.email}</Grid>
                      </Grid>

                      <Grid container justifyContent={"space-between"} mb={1}>
                        <Grid item>Số điện thoại:</Grid>

                        <Grid item>
                          {order.refund.staff.phone
                            ? order.refund.staff.phone
                            : "--"}
                        </Grid>
                      </Grid>

                      <Grid container justifyContent={"space-between"} mb={1}>
                        <Grid item>Chi Nhánh:</Grid>

                        <Grid item>{order.refund.staff.branch?.storeName}</Grid>
                      </Grid>
                    </Grid>
                  </fieldset>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>

        {order.transportationOrders.length > 0 && (
          <TimelineModal
            open={open}
            setOpen={setOpen}
            order={order.transportationOrders[0]}
          />
        )}
      </div>
    );
}

export default OrderDetail;
