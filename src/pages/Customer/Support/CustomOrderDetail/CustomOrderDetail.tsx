import {
  Box,
  Button,
  Chip,
  Divider,
  FormLabel,
  Grid,
  OutlinedInput,
  Skeleton,
} from "@mui/material";
import styles from "./CustomOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  currencyFormatter,
  formatCustomOrderStatus,
  formatRefundMethodTitle,
  getDiamondSpec,
} from "src/utils/functions";
import { secondaryBtn } from "src/utils/styles";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import { useQuery } from "@tanstack/react-query";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import {
  fetchCustomOrderDetail,
  fetchTransportOrdersWithCustomOrder,
} from "src/utils/querykey";
import { useEffect, useState } from "react";
import {
  CraftingDifficulty,
  CustomOrderStatus,
  DesignCharacteristic,
  TransportOrderStatus,
} from "src/utils/enums";
import { useAppSelector } from "src/utils/hooks";
import DownloadIcon from "@mui/icons-material/Download";
import { getTransportOrderWithCustomOrder } from "src/services/transportOrder.service";
import HoverCard from "src/components/product/HoverCard";

function CustomOrderDetail() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, id],

    queryFn: () => {
      if (id) return getCustomOrderDetail(+id);
    },
    enabled: !!id,
  });

  const { data: transportResponse } = useQuery({
    queryKey: [fetchTransportOrdersWithCustomOrder, order?.id],

    queryFn: () => {
      if (order?.id) return getTransportOrderWithCustomOrder(order.id);
    },
    enabled: !!order?.id,
  });

  useEffect(() => {
    if (response && response.data) {
      const { firstRing, secondRing, customer } = response.data.customOrder;

      if (customer.id !== userId) navigate("/customer/support/custom-order");

      if (
        firstRing.customDesign.designVersion.design.characteristic ===
        DesignCharacteristic.Male
      )
        setMaleRing(firstRing);
      else setFemaleRing(firstRing);

      if (
        secondRing.customDesign.designVersion.design.characteristic ===
        DesignCharacteristic.Female
      )
        setFemaleRing(secondRing);
      else setMaleRing(secondRing);

      setOrder(response.data.customOrder);
    }

    if (response && response.errors) {
      navigate("/customer/support/custom-order");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (!maleRing || !femaleRing || !order)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid container item xs={8} mb={3} justifyContent={"space-between"}>
          <Grid container item xs={5.8} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>
          <Grid container item xs={5.8} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={11} md={10}>
        <div className={styles.title}>Chi Tiết Đơn Gia Công</div>
        <Grid container>
          <Grid container item sm={6}>
            <Grid container item fontSize={"1.2rem"} mt={1} mb={3}>
              <Grid item xs={6} md={3}>
                Mã Đơn:
              </Grid>
              <Grid item className={styles.info}>
                {order.orderNo}
              </Grid>
            </Grid>

            <Grid container fontSize={"1.2rem"} mb={3}>
              <Grid item xs={6} md={3}>
                Ngày Tạo:
              </Grid>
              <Grid item className={styles.info}>
                {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
              </Grid>
            </Grid>
          </Grid>

          <Grid container item sm={6}>
            <Grid
              container
              item
              fontSize={"1.2rem"}
              mb={3}
              alignItems={"center"}
            >
              <Grid item xs={6} md={5}>
                Trạng Thái:
              </Grid>
              <Grid item>
                <Chip
                  label={formatCustomOrderStatus(order.status).text}
                  color={formatCustomOrderStatus(order.status).color}
                />
              </Grid>
            </Grid>

            <Grid container item fontSize={"1.2rem"} mb={2}>
              <Grid item xs={6} md={5}>
                Thợ Gia Công:
              </Grid>
              <Grid item className={styles.info}>
                {order.jeweler ? order.jeweler.username : "N/A"}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            sm={6}
            fontSize={"1.2rem"}
            mb={2}
            alignItems={"center"}
          >
            <Grid item xs={6} md={3}>
              Tổng Tiền:
            </Grid>
            <Grid item className={styles.total}>
              {currencyFormatter(order.totalPrice.amount)}
            </Grid>
          </Grid>

          {[
            CustomOrderStatus.Done,
            CustomOrderStatus.Delivering,
            CustomOrderStatus.Completed,
          ].includes(order.status) && (
            <Grid container item sm={6}>
              <Grid container item fontSize={"1.2rem"} mb={2}>
                <Grid
                  item
                  className={styles.loveVerification}
                  onClick={() => navigate("/customer/love-agreement")}
                >
                  Chứng Nhận Tình Yêu
                </Grid>
                <Grid item ml={1}>
                  Của Bạn
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid container mt={3}>
          <Grid item xs={12} md={6}>
            <fieldset>
              <legend>Chi Nhánh</legend>
              <Grid container my={1}>
                <Grid item xs={4}>
                  Tên cửa hàng:
                </Grid>
                <Grid item>{maleRing.branch.storeName}</Grid>
              </Grid>

              <Grid container mb={1}>
                <Grid item xs={4}>
                  Địa chỉ:
                </Grid>
                <Grid item xs={8}>
                  {maleRing.branch.address}
                </Grid>
              </Grid>

              <Grid container mb={1}>
                <Grid item xs={4}>
                  Số điện thoại:
                </Grid>
                <Grid item>{maleRing.branch.phone}</Grid>
              </Grid>
            </fieldset>
          </Grid>
        </Grid>

        {order.status === CustomOrderStatus.Refunded && order.refund && (
          <Grid container>
            <Grid item xs={12} my={4} className={styles.refuntTitle}>
              Thông tin hoàn tiền
            </Grid>

            <Grid container mb={1} justifyContent={"space-between"}>
              <Grid container item md={6} alignItems={"baseline"}>
                <Grid item xs={4} mb={1}>
                  Số tiền hoàn trả:
                </Grid>

                <Grid item className={styles.total}>
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

            <Grid container rowGap={2} mb={3} justifyContent={"space-between"}>
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
                      order.customOrderHistories.find(
                        (item) => item.status === CustomOrderStatus.Refunded
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

        <Grid container justifyContent={"center"} mt={5}>
          <Grid container item lg={10} className={styles.card} py={5}>
            <Grid
              container
              item
              xs={12}
              md={6}
              mb={7}
              justifyContent={"center"}
            >
              <Grid item xs={9} mb={3}>
                <HoverCard
                  shadow={true}
                  image={maleRing.customDesign.designVersion.image.url}
                  file={maleRing.customDesign.blueprint.url}
                />
              </Grid>

              <Grid item xs={12} textAlign={"center"} mb={2}>
                {maleRing.spouse.customerId
                  ? "Nhẫn Của Bạn"
                  : "Nhẫn Của Bạn Đời"}
              </Grid>

              {maleRing.maintenanceDocument && (
                <Grid item xs={12} textAlign={"center"} mb={2}>
                  <a
                    download={""}
                    href={maleRing.maintenanceDocument.url}
                    className={styles.download}
                    style={{ fontSize: "1rem" }}
                  >
                    <DownloadIcon />
                    Giấy bảo hành
                  </a>
                </Grid>
              )}

              <Grid item xs={10} mt={3}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Độ Phức Tạp
                  </Grid>
                  <Grid item>
                    {maleRing.difficulty === CraftingDifficulty.Normal
                      ? "Bình thường"
                      : "Khó"}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Chất Liệu
                  </Grid>
                  <Grid item>{maleRing.metalSpecification.name}</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kim Cương Chính
                  </Grid>
                  <Grid item>
                    {`${
                      maleRing.diamonds.length > 0 &&
                      maleRing.diamonds[0].diamondSpecification.shape
                    } ${
                      maleRing.diamonds.length > 0 &&
                      getDiamondSpec(maleRing.diamonds[0].diamondSpecification)
                    }`}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Số Kim Cương Phụ
                  </Grid>
                  <Grid item>
                    {maleRing.customDesign.sideDiamondsCount} Viên
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kích Thước
                  </Grid>
                  <Grid item>{maleRing.fingerSize}</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khắc Chữ
                  </Grid>
                  <Grid item>
                    {maleRing.engraving ? maleRing.engraving : "--"}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khối Lượng
                  </Grid>
                  <Grid item>{maleRing.customDesign.metalWeight} Chỉ</Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Phí Gia Công
                  </Grid>
                  <Grid item>
                    {currencyFormatter(maleRing.craftingFee.amount)}
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Tổng Tiền
                  </Grid>
                  <Grid item>{currencyFormatter(maleRing.price.amount)}</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={6}
              mb={7}
              justifyContent={"center"}
            >
              <Grid item xs={9} mb={3}>
                <HoverCard
                  shadow={true}
                  image={femaleRing.customDesign.designVersion.image.url}
                  file={femaleRing.customDesign.blueprint.url}
                />
              </Grid>

              <Grid item xs={12} textAlign={"center"} mb={2}>
                {femaleRing.spouse.customerId
                  ? "Nhẫn Của Bạn"
                  : "Nhẫn Của Bạn Đời"}
              </Grid>

              {femaleRing.maintenanceDocument && (
                <Grid item xs={12} textAlign={"center"} mb={2}>
                  <a
                    download={""}
                    href={femaleRing.maintenanceDocument.url}
                    className={styles.download}
                    style={{ fontSize: "1rem" }}
                  >
                    <DownloadIcon />
                    Giấy bảo hành
                  </a>
                </Grid>
              )}

              <Grid item xs={10} mt={3}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Độ Phức Tạp
                  </Grid>
                  <Grid item>
                    {femaleRing.difficulty === CraftingDifficulty.Normal
                      ? "Bình thường"
                      : "Khó"}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Chất Liệu
                  </Grid>
                  <Grid item>{femaleRing.metalSpecification.name}</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kim Cương Chính
                  </Grid>
                  <Grid item>
                    {" "}
                    {`${
                      femaleRing.diamonds.length > 0 &&
                      femaleRing.diamonds[0].diamondSpecification.shape
                    } ${
                      femaleRing.diamonds.length > 0 &&
                      getDiamondSpec(
                        femaleRing.diamonds[0].diamondSpecification
                      )
                    }`}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Số Kim Cương Phụ
                  </Grid>
                  <Grid item>
                    {femaleRing.customDesign.sideDiamondsCount} Viên
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kích Thước
                  </Grid>
                  <Grid item>{femaleRing.fingerSize}</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khắc Chữ
                  </Grid>
                  <Grid item>
                    {femaleRing.engraving ? femaleRing.engraving : "--"}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khối Lượng
                  </Grid>
                  <Grid item>{femaleRing.customDesign.metalWeight} Chỉ</Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Phí Gia Công
                  </Grid>
                  <Grid item>
                    {currencyFormatter(femaleRing.craftingFee.amount)}
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Tổng Tiền
                  </Grid>
                  <Grid item>{currencyFormatter(femaleRing.price.amount)}</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container px={4} flexDirection={"column"} gap={1} mb={2}>
              <FormLabel>
                * Phí vận chuyển: {currencyFormatter(order.shippingFee.amount)}
              </FormLabel>
              <FormLabel>
                * Kim cương phụ:{" "}
                {currencyFormatter(maleRing.sideDiamondPrice.amount)}/viên
              </FormLabel>
            </Grid>

            {order.contract.document && (
              <Grid container mt={2} justifyContent={"center"}>
                <a
                  download={""}
                  href={order.contract.document.url}
                  className={styles.download}
                >
                  <DownloadForOfflineRoundedIcon />
                  <span>Tải Hợp Đồng</span>
                </a>
              </Grid>
            )}

            <Grid container justifyContent={"center"} mt={5} gap={3}>
              {order.contract.signature ? (
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() =>
                    navigate(
                      `/customer/support/custom-order/${order.id}/crafting-process`
                    )
                  }
                >
                  Quá Trình Gia Công
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() => navigate(`/customer/contract/${order.id}`)}
                >
                  Ký Hợp Đồng
                </Button>
              )}

              {transportResponse?.data?.status ===
                TransportOrderStatus.Delivering && (
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() => navigate(`/customer/transport/${order.id}`)}
                >
                  Vị Trí Người Giao Hàng
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomOrderDetail;
