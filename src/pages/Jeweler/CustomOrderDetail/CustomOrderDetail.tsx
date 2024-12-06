import { Chip, Grid, Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";
import HoverCard from "src/components/product/HoverCard";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import styles from "./CustomOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import { fetchCustomOrderDetail } from "src/utils/querykey";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCustomOrderDetail,
  postAssignCustomOrder,
} from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import { CustomOrderStatus, DesignCharacteristic } from "src/utils/enums";
import {
  currencyFormatter,
  formatCustomOrderStatus,
  getDiamondSpec,
} from "src/utils/functions";
import { toast } from "react-toastify";
import { useAppSelector } from "src/utils/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import moment from "moment";
import JewelerCustomOrderTimeline from "src/components/timeline/jewelerCustomOrder/JewelerCustomOrderTimeline";

function CustomOrderDetail() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { id: userId, branchId } = useAppSelector(
    (state) => state.auth.userInfo
  );

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, id],

    queryFn: () => {
      if (id) return getCustomOrderDetail(+id);
    },
    enabled: !!id,
  });

  const assignMutation = useMutation({
    mutationFn: (data: { orderId: number; jewelerId: number }) => {
      return postAssignCustomOrder(data.orderId, data.jewelerId);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đã nhận đơn này");
        navigate("/jeweler/custom-order");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  useEffect(() => {
    if (response && response.data) {
      const { firstRing, secondRing, jeweler } = response.data.customOrder;

      const { branch } = firstRing;

      if (branch.id !== branchId) navigate("/jeweler/custom-order");

      if (jeweler && jeweler.id !== userId) navigate("/jeweler/custom-order");

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
      navigate("/jeweler/custom-order");
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

      <Grid
        container
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        mb={6}
      >
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
        </Grid>

        <Grid item md={6.5}>
          <JewelerCustomOrderTimeline order={order} />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"space-around"}
        className="container-biggest"
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
              shadow={true}
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
                Khối Lượng
              </Grid>
              <Grid item className="info-detail-content">
                {maleRing.customDesign.metalWeight} chỉ
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Giá Tiền
              </Grid>
              <Grid item className="info-detail-content">
                {currencyFormatter(maleRing.price.amount)}
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
              shadow={true}
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
                Khối Lượng
              </Grid>
              <Grid item className="info-detail-content">
                {femaleRing.customDesign.metalWeight} chỉ
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Giá Tiền
              </Grid>
              <Grid item className="info-detail-content">
                {currencyFormatter(femaleRing.price.amount)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        {order.status === CustomOrderStatus.Waiting && (
          <LoadingButton
            loading={assignMutation.isPending}
            onClick={() =>
              assignMutation.mutate({ orderId: order.id, jewelerId: userId })
            }
            variant="contained"
            sx={{ ...primaryBtn, borderRadius: 2, px: 5 }}
          >
            Nhận đơn này
          </LoadingButton>
        )}

        {order.status !== CustomOrderStatus.Pending &&
          order.status !== CustomOrderStatus.Waiting && (
            <LoadingButton
              onClick={() =>
                navigate(`/jeweler/custom-order/${order.id}/crafting-process`)
              }
              variant="contained"
              sx={{ ...primaryBtn, borderRadius: 2, px: 5 }}
            >
              Xem quá trình
            </LoadingButton>
          )}
      </Grid>
    </Grid>
  );
}

export default CustomOrderDetail;
