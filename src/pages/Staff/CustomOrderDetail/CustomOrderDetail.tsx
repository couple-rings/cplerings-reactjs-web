import {
  Box,
  Chip,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import HoverCard from "src/components/product/HoverCard";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import styles from "./CustomOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import {
  fetchCustomOrderDetail,
  fetchJewelers,
  fetchTransportOrdersWithCustomOrder,
} from "src/utils/querykey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCustomOrderDetail,
  postAssignCustomOrder,
  putCompleteCustomOrder,
} from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import {
  CraftingDifficulty,
  CustomOrderStatus,
  DesignCharacteristic,
  ResponseType,
} from "src/utils/enums";
import {
  currencyFormatter,
  formatCustomOrderStatus,
  formatRefundMethodTitle,
  getDiamondSpec,
} from "src/utils/functions";
import { useAppSelector } from "src/utils/hooks";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { getJewelers } from "src/services/account.service";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import StaffCustomOrderTimeline from "src/components/timeline/staffCustomOrder/StaffCustomOrderTimeline";
import { getTransportOrderWithCustomOrder } from "src/services/transportOrder.service";
import { metalWeightUnit } from "src/utils/constants";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import Payments from "src/components/table/customOrder/Payments";

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
  mb: 6,
};

function CustomOrderDetail() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const [jewelerFilterObj, setJewelerFilterObj] =
    useState<IJewelerFilter | null>(null);
  const [selected, setSelected] = useState(0);

  const [tab, setTab] = useState("general");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams<{ id: string }>();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, id],

    queryFn: () => {
      if (id) return getCustomOrderDetail(+id);
    },
    enabled: !!id,
  });

  const { data: jewelerResponse } = useQuery({
    queryKey: [fetchJewelers, jewelerFilterObj],

    queryFn: () => {
      if (jewelerFilterObj) return getJewelers(jewelerFilterObj);
    },
    enabled: !!jewelerFilterObj,
  });

  const { data: transportResponse } = useQuery({
    queryKey: [fetchTransportOrdersWithCustomOrder, id],

    queryFn: () => {
      if (id) return getTransportOrderWithCustomOrder(+id);
    },
    enabled: !!id,
  });

  const assignMutation = useMutation({
    mutationFn: (data: { orderId: number; jewelerId: number }) => {
      return postAssignCustomOrder(data.orderId, data.jewelerId);
    },
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({
          queryKey: [fetchCustomOrderDetail, id],
        });
        toast.success("Đơn đã được giao cho thợ gia công");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const completeMutation = useMutation({
    mutationFn: (orderId: number) => {
      return putCompleteCustomOrder(orderId);
    },
    onSuccess: (response) => {
      if (response.type === ResponseType.Info) {
        queryClient.invalidateQueries({
          queryKey: [fetchCustomOrderDetail, id],
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
      const { firstRing, secondRing } = response.data.customOrder;

      if (firstRing.branch.id !== branchId || secondRing.branch.id !== branchId)
        navigate("/staff/custom-order");

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
      navigate("/staff/custom-order");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (branchId !== 0) {
      setJewelerFilterObj({
        page: 0,
        pageSize: 100,
        branchId,
      });
    }
  }, [branchId]);

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
      <Grid container item xs={11}>
        <Grid container className={styles.header}>
          <div className={styles.title}>Chi Tiết Đơn</div>
          <Chip
            color={formatCustomOrderStatus(order.status).color}
            label={formatCustomOrderStatus(order.status).text}
          />
        </Grid>

        <Box sx={boxStyle}>
          <Tabs
            classes={{
              indicator: "myIndicator",
            }}
            value={tab}
            onChange={(e, value) => setTab(value)}
          >
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Thông tin chung"
              value={"general"}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Lịch sử giao dịch"
              value={"payments"}
            />
          </Tabs>
        </Box>

        {tab === "general" && (
          <>
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
                    {moment(order.createdAt).format("DD/MM/YYYY")}
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

                <Grid container item sm={6}>
                  <Grid item xs={4} md={3}>
                    Hợp đồng:
                  </Grid>

                  <Grid item>
                    {order.contract.document ? (
                      <a
                        download={""}
                        href={order.contract.document.url}
                        className={styles.contract}
                      >
                        <DownloadRoundedIcon fontSize="small" />{" "}
                        <span>Tải về</span>
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"flex-start"}
            >
              <Grid container item gap={3} md={5.5}>
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

                <fieldset style={{ margin: 0, width: "100%" }}>
                  <legend>Thợ gia công</legend>
                  <Grid container p={2}>
                    <Grid container justifyContent={"space-between"} mb={1}>
                      <Grid item>Tên tài khoản:</Grid>

                      <Grid item>{order.jeweler?.username ?? "--"}</Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"} mb={1}>
                      <Grid item>Email:</Grid>

                      <Grid item>{order.jeweler?.email ?? "--"}</Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"} mb={1}>
                      <Grid item>Số điện thoại:</Grid>

                      <Grid item>{order.jeweler?.phone ?? "--"}</Grid>
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>

              <Grid item md={6}>
                <StaffCustomOrderTimeline
                  order={order}
                  transportOrder={transportResponse?.data ?? undefined}
                />
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

                          <Grid item>
                            {order.refund.staff.branch?.storeName}
                          </Grid>
                        </Grid>
                      </Grid>
                    </fieldset>
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid container justifyContent={"space-between"} mt={5}>
              <Grid container item md={5.5} justifyContent={"center"} pb={5}>
                <Grid item xs={12} md={12} pb={3}>
                  <HoverCard
                    shadow={true}
                    file={maleRing.customDesign.blueprint.url}
                    image={maleRing.customDesign.designVersion.image.url}
                  />
                </Grid>

                <Grid container pb={5} className={styles.genderDefine}>
                  <Grid item>
                    <MaleIcon sx={{ color: "#4994ec" }} />
                  </Grid>
                  <Grid item>Nam giới</Grid>
                </Grid>

                <Grid container item justifyContent={"center"}>
                  <Grid container className={styles.infoDetail}>
                    <Grid item>Người sở hữu</Grid>
                    <Grid item>{maleRing.customDesign.spouse.fullName}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={2}>
                    <Grid item>Số CCCD</Grid>
                    <Grid item>{maleRing.customDesign.spouse.citizenId}</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Độ Phức Tạp</Grid>
                    <Grid item>
                      {maleRing.difficulty === CraftingDifficulty.Normal
                        ? "Bình thường"
                        : "Khó"}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Chất Liệu</Grid>
                    <Grid item>{maleRing.metalSpecification.name}</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Kim cương</Grid>
                    <Grid item>
                      {maleRing.diamonds.length > 0 &&
                        maleRing.diamonds[0].diamondSpecification.shape}{" "}
                      {maleRing.diamonds.length > 0 &&
                        getDiamondSpec(
                          maleRing.diamonds[0].diamondSpecification
                        )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Kim cương phụ</Grid>
                    <Grid item>
                      {maleRing.customDesign.sideDiamondsCount} viên
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Kích cỡ</Grid>
                    <Grid item>{maleRing.fingerSize}</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Khắc Chữ</Grid>
                    <Grid item>{maleRing.engraving}</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Khối Lượng</Grid>
                    <Grid item>{maleRing.customDesign.metalWeight} chỉ</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container justifyContent={"space-between"} mt={3}>
                    <Grid item>Giá Vàng (/gram)</Grid>
                    <Grid item>
                      {currencyFormatter(maleRing.metalPricePerUnit.amount)}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mt={2}>
                    <Grid item>Giá Kim Cương Chính</Grid>
                    <Grid item>
                      {currencyFormatter(maleRing.diamondPrice.amount)}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mt={2}>
                    <Grid item>Giá Kim Cương Phụ</Grid>
                    <Grid item>
                      {currencyFormatter(
                        maleRing.sideDiamondPrice.amount *
                          maleRing.customDesign.sideDiamondsCount
                      )}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} my={2}>
                    <Grid item>Phí Gia Công</Grid>
                    <Grid item>
                      {currencyFormatter(maleRing.craftingFee.amount)}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Tổng Tiền</Grid>
                    <Grid item>{currencyFormatter(maleRing.price.amount)}</Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item md={5.5} justifyContent={"center"} pb={5}>
                <Grid item xs={12} md={12} pb={3}>
                  <HoverCard
                    shadow={true}
                    file={femaleRing.customDesign.blueprint.url}
                    image={femaleRing.customDesign.designVersion.image.url}
                  />
                </Grid>

                <Grid container pb={5} className={styles.genderDefine}>
                  <Grid item>
                    <FemaleIcon sx={{ color: "#ea394b" }} />
                  </Grid>
                  <Grid item>Nữ giới</Grid>
                </Grid>

                <Grid container className={styles.infoDetail}>
                  <Grid item>Người sở hữu</Grid>
                  <Grid item>{femaleRing.customDesign.spouse.fullName}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={2}>
                  <Grid item>Số CCCD</Grid>
                  <Grid item>{femaleRing.customDesign.spouse.citizenId}</Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid container className={styles.infoDetail}>
                  <Grid item>Độ Phức Tạp</Grid>
                  <Grid item>
                    {femaleRing.difficulty === CraftingDifficulty.Normal
                      ? "Bình thường"
                      : "Khó"}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid container item justifyContent={"center"}>
                  <Grid container className={styles.infoDetail}>
                    <Grid item>Chất Liệu</Grid>
                    <Grid item>{femaleRing.metalSpecification.name}</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Kim cương</Grid>
                    <Grid item>
                      {femaleRing.diamonds.length > 0 &&
                        femaleRing.diamonds[0].diamondSpecification.shape}{" "}
                      {femaleRing.diamonds.length > 0 &&
                        getDiamondSpec(
                          femaleRing.diamonds[0].diamondSpecification
                        )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Kim cương phụ</Grid>
                    <Grid item>
                      {femaleRing.customDesign.sideDiamondsCount} viên
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Kích cỡ</Grid>
                    <Grid item>{femaleRing.fingerSize}</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Khắc Chữ</Grid>
                    <Grid item>{femaleRing.engraving}</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Khối Lượng</Grid>
                    <Grid item>{femaleRing.customDesign.metalWeight} chỉ</Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container justifyContent={"space-between"} mt={3}>
                    <Grid item>Giá Vàng (/gram)</Grid>
                    <Grid item>
                      {currencyFormatter(femaleRing.metalPricePerUnit.amount)}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mt={2}>
                    <Grid item>Giá Kim Cương Chính</Grid>
                    <Grid item>
                      {currencyFormatter(femaleRing.diamondPrice.amount)}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mt={2}>
                    <Grid item>Giá Kim Cương Phụ</Grid>
                    <Grid item>
                      {currencyFormatter(
                        femaleRing.sideDiamondPrice.amount *
                          femaleRing.customDesign.sideDiamondsCount
                      )}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} my={2}>
                    <Grid item>Phí Gia Công</Grid>
                    <Grid item>
                      {currencyFormatter(femaleRing.craftingFee.amount)}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid container className={styles.infoDetail}>
                    <Grid item>Tổng Tiền</Grid>
                    <Grid item>
                      {currencyFormatter(femaleRing.price.amount)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container mb={6}>
              <fieldset style={{ width: "100%" }}>
                <legend>Lưu ý</legend>
                <Grid container flexDirection={"column"} gap={1} p={1}>
                  <Grid container item gap={1}>
                    <Grid item>
                      <ArrowRightRoundedIcon />
                    </Grid>
                    <Grid item flex={1}>
                      <FormLabel>
                        Tiền nhẫn = (Giá vàng x Lượng vàng x {metalWeightUnit} +
                        Giá kim cương chính + Giá kim cương phụ + Phí gia công)
                        x Tỷ lệ lợi nhuận
                      </FormLabel>
                    </Grid>
                  </Grid>

                  <Grid container item gap={1}>
                    <Grid item>
                      <ArrowRightRoundedIcon />
                    </Grid>
                    <Grid item flex={1}>
                      <FormLabel>
                        Tổng tiền đơn = Tổng tiền cặp nhẫn + Phí vận chuyển
                      </FormLabel>
                    </Grid>
                  </Grid>

                  <FormLabel>* 1 chỉ = {metalWeightUnit} gram</FormLabel>
                  <FormLabel>
                    * Tỷ lệ lợi nhuận = {order.priceApplicationRatio}{" "}
                  </FormLabel>
                  <FormLabel>
                    * Kim cương phụ:{" "}
                    {currencyFormatter(maleRing.sideDiamondPrice.amount)}/viên
                  </FormLabel>
                  <FormLabel>
                    * Phí vận chuyển:{" "}
                    {currencyFormatter(order.shippingFee.amount)}
                  </FormLabel>
                </Grid>
              </fieldset>
            </Grid>

            {order.status === CustomOrderStatus.Waiting && (
              <Grid container justifyContent={"center"} gap={3}>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    value={selected}
                    onChange={(e) => setSelected(+e.target.value)}
                  >
                    <MenuItem value={0} disabled>
                      <em>Chọn thợ gia công</em>
                    </MenuItem>
                    {jewelerResponse?.data?.items.map((item) => {
                      return (
                        <MenuItem value={item.id} key={item.id}>
                          {item.username} - Đang làm{" "}
                          {item.numberOfHandleCustomOrder} đơn
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>

                <Grid item>
                  <LoadingButton
                    disabled={selected === 0}
                    loading={assignMutation.isPending}
                    onClick={() => {
                      if (selected !== 0)
                        assignMutation.mutate({
                          orderId: order.id,
                          jewelerId: selected,
                        });
                    }}
                    variant="contained"
                    sx={{ ...primaryBtn, borderRadius: 1, px: 5 }}
                  >
                    Xác nhận giao đơn
                  </LoadingButton>
                </Grid>
              </Grid>
            )}

            {transportResponse?.errors?.find((err) => err.code === "004") &&
              order.status === CustomOrderStatus.Done && (
                <Grid container justifyContent={"center"}>
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

            {/* {order.jeweler && (
          <Grid container justifyContent={"center"}>
            <LoadingButton
              // onClick={() =>
              //   navigate(`/jeweler/custom-order/${order.id}/crafting-process`)
              // }
              variant="contained"
              sx={{ ...primaryBtn, borderRadius: 1, px: 6 }}
            >
              Xem quá trình
            </LoadingButton>
          </Grid>
        )} */}
          </>
        )}

        {tab === "payments" && id && <Payments orderId={+id} />}
      </Grid>
    </Grid>
  );
}

export default CustomOrderDetail;
