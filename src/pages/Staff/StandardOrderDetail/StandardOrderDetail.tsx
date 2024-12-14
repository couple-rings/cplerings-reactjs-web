import {
  Box,
  Chip,
  Divider,
  FormLabel,
  Grid,
  OutlinedInput,
} from "@mui/material";
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
  formatRefundMethodTitle,
  formatStandardOrderStatus,
} from "src/utils/functions";
import moment from "moment";
import { ResponseType, StandardOrderStatus } from "src/utils/enums";
import StaffStandardOrderTimeline from "src/components/timeline/staffStandardOrder/StaffStandardOrderTimeline";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { primaryBtn } from "src/utils/styles";
import StandardOrderItem from "src/components/product/StandardOrderItem";

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

                <Grid item>
                  <FormLabel>{order.orderNo}</FormLabel>
                </Grid>
              </Grid>

              <Grid container item sm={6}>
                <Grid item xs={4} md={3}>
                  Ngày tạo:
                </Grid>

                <Grid item>
                  <FormLabel>
                    {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                  </FormLabel>
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
                    <Grid item>Tên tài khoản:</Grid>

                    <Grid item>{order.customer.username}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Email:</Grid>

                    <Grid item>{order.customer.email}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Số điện thoại:</Grid>

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

            <Grid container justifyContent={"center"} mt={4}>
              <Grid container item xs={12}>
                <Divider sx={{ width: "100%" }} />
              </Grid>
            </Grid>
          </Grid>

          {order.status === StandardOrderStatus.Refunded && order.refund && (
            <Grid container>
              <Grid item xs={12} my={4} className={styles.subtitle}>
                Thông tin hoàn tiền
              </Grid>

              <Grid container mb={1} justifyContent={"space-between"}>
                <Grid container item md={6} alignItems={"baseline"}>
                  <Grid item xs={4} md={3} mb={1}>
                    Số tiền hoàn trả:
                  </Grid>

                  <Grid item className={styles.totalPrice}>
                    {currencyFormatter(order.refund.amount.amount)}
                  </Grid>
                </Grid>

                <Grid container item md={5.7}>
                  <Grid item xs={4} md={3}>
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
                  <Grid item xs={4} md={3}>
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

              <Grid container justifyContent={"center"} my={4}>
                <Grid container item xs={12}>
                  <Divider sx={{ width: "100%" }} />
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid container>
            <Grid item xs={12} my={4} className={styles.subtitle}>
              Thông Tin Hàng ({order.standardOrderItems.length})
            </Grid>

            {order.standardOrderItems.map((item) => {
              return <StandardOrderItem key={item.id} item={item} />;
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
