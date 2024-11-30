import { Chip, Grid, MenuItem, Select, Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";
import HoverCard from "src/components/product/HoverCard";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import styles from "./CustomOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import {
  fetchCraftingStages,
  fetchCustomOrderDetail,
  fetchJewelers,
} from "src/utils/querykey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCustomOrderDetail,
  postAssignCustomOrder,
} from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import {
  CraftingStageStatus,
  CustomOrderStatus,
  DesignCharacteristic,
  StagePercentage,
} from "src/utils/enums";
import {
  currencyFormatter,
  formatCustomOrderStatus,
  getDiamondSpec,
} from "src/utils/functions";
import { useAppSelector } from "src/utils/hooks";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { getJewelers } from "src/services/account.service";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import { getCraftingStages } from "src/services/craftingStage.service";

function CustomOrderDetail() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const [firstStage, setFirstStage] = useState<ICraftingStage | null>(null);
  const [secondStage, setSecondStage] = useState<ICraftingStage | null>(null);
  const [thirdStage, setThirdStage] = useState<ICraftingStage | null>(null);

  const [stageFilterObj, setStageFilterObj] =
    useState<ICraftingStageFilter | null>(null);
  const [jewelerFilterObj, setJewelerFilterObj] =
    useState<IJewelerFilter | null>(null);
  const [selected, setSelected] = useState(0);

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

  const { data: stageResponse } = useQuery({
    queryKey: [fetchCraftingStages, stageFilterObj],

    queryFn: () => {
      if (stageFilterObj) return getCraftingStages(stageFilterObj);
    },
    enabled: !!stageFilterObj,
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

  useEffect(() => {
    if (stageResponse?.data) {
      const firstStage = stageResponse.data.items.find(
        (item) => item.progress === StagePercentage.First
      );

      const secondStage = stageResponse.data.items.find(
        (item) => item.progress === StagePercentage.Second
      );

      const thirdStage = stageResponse.data.items.find(
        (item) => item.progress === StagePercentage.Third
      );

      if (firstStage && secondStage && thirdStage) {
        setFirstStage(firstStage);
        setSecondStage(secondStage);
        setThirdStage(thirdStage);
      }
    }

    if (stageResponse?.errors) {
      navigate("/staff/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResponse]);

  useEffect(() => {
    if (order)
      setStageFilterObj({
        page: 0,
        pageSize: 100,
        customOrderId: order.id,
      });
  }, [order]);

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

              <Grid item>{moment(order.createdAt).format("DD/MM/YYYY")}</Grid>
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

        <Grid container justifyContent={"space-between"}>
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

            <fieldset style={{ margin: 0, width: "100%" }}>
              <legend>Thợ làm</legend>
              <Grid container p={2}>
                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Username:</Grid>

                  <Grid item>{order.jeweler?.username ?? "--"}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Email:</Grid>

                  <Grid item>{order.jeweler?.email ?? "--"}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Username:</Grid>

                  <Grid item>{order.jeweler?.phone ?? "--"}</Grid>
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          <Grid item md={6.5}>
            <Timeline
              sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.2,
                },
              }}
            >
              <TimelineItem>
                <TimelineOppositeContent color="textSecondary">
                  {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="info" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Duyệt yêu cầu gia công</TimelineContent>
              </TimelineItem>

              {order.contract.signedDate && (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(order.contract.signedDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Khách hàng ký hợp đồng</TimelineContent>
                </TimelineItem>
              )}

              {order.customOrderHistories.find(
                (item) => item.status === CustomOrderStatus.Waiting
              ) && (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(
                      order.customOrderHistories.find(
                        (item) => item.status === CustomOrderStatus.Waiting
                      )?.createdAt
                    ).format("DD/MM/YYYY HH:mm")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Đặt cọc giai đoạn 1</TimelineContent>
                </TimelineItem>
              )}

              {firstStage?.completionDate && (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(firstStage.completionDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Hoàn tất gia công giai đoạn 1
                  </TimelineContent>
                </TimelineItem>
              )}

              {secondStage?.craftingStageHistories.find(
                (item) => item.status === CraftingStageStatus.Paid
              ) && (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(
                      secondStage?.craftingStageHistories.find(
                        (item) => item.status === CraftingStageStatus.Paid
                      )?.createdAt
                    ).format("DD/MM/YYYY HH:mm")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Hoàn tất đặt cọc giai đoạn 2
                  </TimelineContent>
                </TimelineItem>
              )}

              {secondStage?.completionDate && (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(secondStage.completionDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Hoàn tất gia công giai đoạn 2
                  </TimelineContent>
                </TimelineItem>
              )}

              {thirdStage?.craftingStageHistories.find(
                (item) => item.status === CraftingStageStatus.Paid
              ) && (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(
                      secondStage?.craftingStageHistories.find(
                        (item) => item.status === CraftingStageStatus.Paid
                      )?.createdAt
                    ).format("DD/MM/YYYY HH:mm")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Hoàn tất đặt cọc giai đoạn 3
                  </TimelineContent>
                </TimelineItem>
              )}

              {thirdStage?.completionDate && (
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(thirdStage.completionDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Hoàn tất quá trình gia công</TimelineContent>
                </TimelineItem>
              )}
            </Timeline>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent={"space-around"}
          className="container-biggest"
          mt={5}
        >
          <Grid
            container
            item
            md={5}
            justifyContent={"center"}
            className="container-item"
            pb={5}
          >
            <Grid item xs={12} md={12} pb={3} className="image-item">
              <HoverCard
                file={maleRing.customDesign.blueprint.url}
                image={maleRing.customDesign.designVersion.image.url}
              />
            </Grid>

            <Grid container pb={5} className={styles.genderDefine}>
              <Grid item className="gender-icon">
                <MaleIcon sx={{ color: "#4994ec" }} />
              </Grid>
              <Grid item className="gender-name">
                Nam giới
              </Grid>
            </Grid>

            <Grid
              container
              item
              justifyContent={"center"}
              className="info-detail-container"
            >
              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Người sở hữu
                </Grid>
                <Grid item className="info-detail-content">
                  {maleRing.customDesign.spouse.fullName}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Chất Liệu
                </Grid>
                <Grid item className="info-detail-content">
                  {maleRing.metalSpecification.name}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Kim cương
                </Grid>
                <Grid item className="info-detail-content">
                  {maleRing.diamonds[0].diamondSpecification.shape}{" "}
                  {getDiamondSpec(maleRing.diamonds[0].diamondSpecification)}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Kim cương phụ
                </Grid>
                <Grid item className="info-detail-content">
                  {maleRing.customDesign.sideDiamondsCount} viên
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Kích cỡ
                </Grid>
                <Grid item className="info-detail-content">
                  {maleRing.fingerSize}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Khắc Chữ
                </Grid>
                <Grid item className="info-detail-content">
                  {maleRing.engraving}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Trọng Lượng
                </Grid>
                <Grid item className="info-detail-content">
                  {maleRing.customDesign.metalWeight} chỉ
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            md={5}
            justifyContent={"center"}
            className="container-item"
            pb={5}
          >
            <Grid item xs={12} md={12} pb={3} className="image-item">
              <HoverCard
                file={femaleRing.customDesign.blueprint.url}
                image={femaleRing.customDesign.designVersion.image.url}
              />
            </Grid>

            <Grid container pb={5} className={styles.genderDefine}>
              <Grid item className="gender-icon">
                <FemaleIcon sx={{ color: "#ea394b" }} />
              </Grid>
              <Grid item className="gender-name">
                Nữ giới
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Người sở hữu
              </Grid>
              <Grid item className="info-detail-content">
                {femaleRing.customDesign.spouse.fullName}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid
              container
              item
              justifyContent={"center"}
              className="info-detail-container"
            >
              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Chất Liệu
                </Grid>
                <Grid item className="info-detail-content">
                  {femaleRing.metalSpecification.name}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Kim cương
                </Grid>
                <Grid item className="info-detail-content">
                  {femaleRing.diamonds[0].diamondSpecification.shape}{" "}
                  {getDiamondSpec(femaleRing.diamonds[0].diamondSpecification)}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Kim cương phụ
                </Grid>
                <Grid item className="info-detail-content">
                  {femaleRing.customDesign.sideDiamondsCount} viên
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Kích cỡ
                </Grid>
                <Grid item className="info-detail-content">
                  {femaleRing.fingerSize}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Khắc Chữ
                </Grid>
                <Grid item className="info-detail-content">
                  {femaleRing.engraving}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container className={styles.infoDetail}>
                <Grid item className="info-detail-label">
                  Trọng Lượng
                </Grid>
                <Grid item className="info-detail-content">
                  {femaleRing.customDesign.metalWeight} chỉ
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
                      {item.username}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>

            <Grid item>
              <LoadingButton
                loading={assignMutation.isPending}
                onClick={() =>
                  assignMutation.mutate({ orderId: order.id, jewelerId: 1 })
                }
                variant="contained"
                sx={{ ...primaryBtn, borderRadius: 1, px: 5 }}
              >
                Xác nhận giao đơn
              </LoadingButton>
            </Grid>
          </Grid>
        )}

        {order.jeweler && (
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
        )}
      </Grid>
    </Grid>
  );
}

export default CustomOrderDetail;
