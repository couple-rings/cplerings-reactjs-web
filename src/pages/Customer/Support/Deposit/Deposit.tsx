import { Divider, Grid, Radio, Skeleton } from "@mui/material";
import styles from "./Deposit.module.scss";
import vnpay from "src/assets/vnpay.png";
import momo from "src/assets/momo.png";
import paypal from "src/assets/paypal.png";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { currencyFormatter, getDiamondSpec } from "src/utils/functions";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCraftingStages,
  fetchCustomOrderDetail,
} from "src/utils/querykey";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import { useAppSelector } from "src/utils/hooks";
import {
  CraftingStageStatus,
  DesignCharacteristic,
  StagePercentage,
} from "src/utils/enums";
import {
  getCraftingStages,
  postDepositCraftingStage,
} from "src/services/craftingStage.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

function Deposit() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [filterObj, setFilterObj] = useState<ICraftingStageFilter | null>(null);
  const [depositStage, setDepositStage] = useState<ICraftingStage | null>(null);

  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const navigate = useNavigate();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const { orderId, stageId } = useParams<{
    orderId: string;
    stageId: string;
  }>();

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, orderId],

    queryFn: () => {
      if (orderId) return getCustomOrderDetail(+orderId);
    },
    enabled: !!orderId,
  });

  const { data: stageResponse } = useQuery({
    queryKey: [fetchCraftingStages, filterObj],

    queryFn: () => {
      if (filterObj) return getCraftingStages(filterObj);
    },
    enabled: !!filterObj,
  });

  const mutation = useMutation({
    mutationFn: (data: IDepositCraftingStageRequest) => {
      return postDepositCraftingStage(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        const { paymentLink } = response.data;
        window.open(paymentLink, "_self");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const getStageFormat = () => {
    if (stageResponse?.data && stageId) {
      const stage = stageResponse.data.items.find(
        (item) => item.id === +stageId
      );

      if (stage) {
        if (stage.progress === StagePercentage.First)
          return {
            stageNo: 1,
            stageName: "Hoàn Thành 50% - Đúc khuôn nhẫn",
          };
        if (stage.progress === StagePercentage.Second)
          return {
            stageNo: 2,
            stageName: "Hoàn Thành 75% - Gắn kim cương và Đánh bóng",
          };
        if (stage.progress === StagePercentage.Third)
          return {
            stageNo: 3,
            stageName: "Hoàn Thành 100% - Đóng gói và Hoàn tất",
          };
      }
    }

    return {
      stageNo: 0,
      stageName: "",
    };
  };

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

  useEffect(() => {
    if (!stageId) {
      navigate("/customer/support/custom-order");
      return;
    }

    if (stageResponse?.data) {
      const { items: stages } = stageResponse.data;

      const stageIndex = stages.findIndex((item) => item.id === +stageId);

      if (stageIndex === -1) navigate("/customer/support/custom-order");
      if (stageIndex !== -1) {
        if (stages[stageIndex].status === CraftingStageStatus.Paid)
          navigate("/customer/support/custom-order");

        if (stageIndex !== 0 && !stages[stageIndex - 1].completionDate)
          navigate("/customer/support/custom-order");

        setDepositStage(stages[stageIndex]);
      }
    }

    if (stageResponse?.errors) {
      navigate("/customer/support/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResponse, stageId]);

  useEffect(() => {
    if (orderId)
      setFilterObj({
        page: 0,
        pageSize: 100,
        customOrderId: +orderId,
      });
  }, [orderId]);

  if (!order || !maleRing || !femaleRing || !depositStage)
    return (
      <Grid container justifyContent={"center"} my={5}>
        <Grid container item xs={8} mb={3} justifyContent={"space-between"}>
          <Grid container item xs={4.5} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>
          <Grid container item xs={7} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={600} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <Grid container item lg={10} justifyContent={"space-between"}>
        <Grid item xs={12} className={styles.title}>
          Thanh Toán Tiền Đặt Cọc
        </Grid>

        <Divider sx={{ backgroundColor: "#ccc", width: "100%", my: 4 }} />

        <Grid item md={4} className={styles.paymentMethod}>
          <div className={styles.title}>Phương thức thanh toán</div>
          <div className={styles.radio}>
            <Radio checked />
            <img src={vnpay} />
            <div>VNPAY</div>
          </div>

          <div className={styles.radio}>
            <Radio disabled />
            <img src={momo} />
            <div className={styles.notAvailable}>MoMo (Sắp ra mắt)</div>
          </div>

          <div className={styles.radio}>
            <Radio disabled />
            <img src={paypal} />
            <div className={styles.notAvailable}>Paypal (Sắp ra mắt)</div>
          </div>

          <LoadingButton
            loading={mutation.isPending}
            variant="contained"
            sx={{ ...secondaryBtn, my: 3 }}
            fullWidth
            onClick={() =>
              mutation.mutate({ craftingStageId: depositStage.id })
            }
          >
            Thanh Toán
          </LoadingButton>
        </Grid>

        <Grid item md={7.5} className={styles.summary}>
          <div className={styles.title}>Thông Tin Thanh Toán</div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <div className={styles.body}>
            <div className={styles.title}>Thông Tin Nhẫn</div>
            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img src={maleRing.customDesign.designVersion.image.url} />
              </Grid>
              <Grid container item sm={8} gap={2}>
                <Grid container>
                  <Grid item xs={4}>
                    Chất liệu:
                  </Grid>
                  <Grid item>{maleRing.metalSpecification.name}</Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    Kim cương:
                  </Grid>
                  <Grid item>
                    {maleRing.diamonds[0].diamondSpecification.shape}{" "}
                    {getDiamondSpec(maleRing.diamonds[0].diamondSpecification)}
                  </Grid>
                </Grid>
                <div className={styles.gender}>
                  <img src={male} />
                  Nhẫn nam
                </div>
              </Grid>
            </Grid>

            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img src={femaleRing.customDesign.designVersion.image.url} />
              </Grid>
              <Grid container item sm={8} gap={2}>
                <Grid container>
                  <Grid item xs={4}>
                    Chất liệu:
                  </Grid>
                  <Grid item>{femaleRing.metalSpecification.name}</Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    Kim cương:
                  </Grid>
                  <Grid item>
                    {femaleRing.diamonds[0].diamondSpecification.shape}{" "}
                    {getDiamondSpec(
                      femaleRing.diamonds[0].diamondSpecification
                    )}
                  </Grid>
                </Grid>
                <div className={styles.gender}>
                  <img src={female} />
                  Nhẫn nữ
                </div>
              </Grid>
            </Grid>

            <div className={styles.noteTitle}>
              Thanh Toán Cho Giai Đoạn {getStageFormat().stageNo}
            </div>
            <div className={styles.note}>{getStageFormat().stageName}</div>
          </div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Tỷ Lệ Cọc</Grid>

            <Grid item fontSize={"1.2rem"}>
              {depositStage.progress}% Giá Trị
            </Grid>
          </Grid>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Thành Tiền</Grid>

            <Grid item fontWeight={600} fontSize={"1.3rem"}>
              {currencyFormatter(
                order.totalPrice.amount * (depositStage.progress / 100)
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Deposit;
