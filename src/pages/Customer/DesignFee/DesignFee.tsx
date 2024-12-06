import { Button, Divider, Grid, Radio } from "@mui/material";
import styles from "./DesignFee.module.scss";
import vnpay from "src/assets/vnpay.png";
import momo from "src/assets/momo.png";
import paypal from "src/assets/paypal.png";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { currencyFormatter } from "src/utils/functions";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useScrollTop } from "src/utils/hooks";
import {
  removeRequestedDesigns,
  saveRequestedDesigns,
} from "src/redux/slice/design.slice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postCreateSession } from "src/services/designSession.service";
import { toast } from "react-toastify";
import SpouseModal from "src/components/modal/redirect/Spouse.modal";
import { fetchDesignDetail } from "src/utils/querykey";
import { getDesignDetail } from "src/services/design.service";
import { ConfigurationKey } from "src/utils/enums";

function DesignFee() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { hasSpouse } = useAppSelector((state) => state.auth.userInfo);
  const { configs } = useAppSelector((state) => state.config);

  const designFee = configs.find(
    (item) => item.key === ConfigurationKey.DesignFee
  )?.value;

  const { maleDesignId, femaleDesignId } = useParams<{
    maleDesignId: string;
    femaleDesignId: string;
  }>();

  const { data: maleResponse } = useQuery({
    queryKey: [fetchDesignDetail, maleDesignId],

    queryFn: () => {
      if (maleDesignId) return getDesignDetail(+maleDesignId);
    },
    enabled: !!maleDesignId,
  });

  const { data: femaleResponse } = useQuery({
    queryKey: [fetchDesignDetail, femaleDesignId],

    queryFn: () => {
      if (femaleDesignId) return getDesignDetail(+femaleDesignId);
    },
    enabled: !!femaleDesignId,
  });

  const mutation = useMutation({
    mutationFn: () => {
      return postCreateSession();
    },
    onSuccess: (response) => {
      if (response.data) {
        const { paymentLink } = response.data;
        window.open(paymentLink, "_self");
      }

      if (response.errors) {
        dispatch(removeRequestedDesigns());
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handlePayment = () => {
    if (!hasSpouse) {
      setOpen(true);
      return;
    }

    if (maleDesignId && femaleDesignId) {
      dispatch(saveRequestedDesigns([+maleDesignId, +femaleDesignId]));
      mutation.mutate();
    }
  };

  useEffect(() => {
    if (!maleDesignId || !femaleDesignId) navigate("/wedding-rings");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [femaleDesignId, maleDesignId]);

  useEffect(() => {
    if (maleResponse?.errors || femaleResponse?.errors) {
      navigate("/wedding-rings");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [femaleResponse, maleResponse]);

  useScrollTop();

  return (
    <div className={styles.container}>
      <Grid container item lg={10} justifyContent={"space-between"}>
        <Grid item xs={12} className={styles.title}>
          Phí Thiết Kế
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

          <Button
            variant="contained"
            sx={{ ...secondaryBtn, my: 3 }}
            fullWidth
            onClick={handlePayment}
          >
            Thanh Toán
          </Button>
        </Grid>

        <Grid item md={7.5} className={styles.summary}>
          <div className={styles.title}>Thông Tin Thanh Toán</div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <div className={styles.body}>
            <div className={styles.title}>Thiết Kế Gốc</div>
            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img
                  src={
                    maleResponse?.data?.designMetalSpecifications[0].image.url
                  }
                />
              </Grid>
              <Grid item sm={8}>
                <div className={styles.name}>
                  Bản Thiết Kế {maleResponse?.data?.name}
                </div>
                <div className={styles.collection}>
                  Bộ sưu tập {maleResponse?.data?.designCollection.name}
                </div>
                <div className={styles.gender}>
                  <img src={male} />
                  Nhẫn nam
                </div>
              </Grid>
            </Grid>

            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img
                  src={
                    femaleResponse?.data?.designMetalSpecifications[0].image.url
                  }
                />
              </Grid>
              <Grid item sm={8}>
                <div className={styles.name}>
                  Bản Thiết Kế {femaleResponse?.data?.name}
                </div>
                <div className={styles.collection}>
                  Bộ sưu tập {femaleResponse?.data?.designCollection.name}
                </div>
                <div className={styles.gender}>
                  <img src={female} />
                  Nhẫn nữ
                </div>
              </Grid>
            </Grid>

            <div className={styles.noteTitle}>Dịch vụ bao gồm khi mua</div>
            <div className={styles.note}>
              3 phiên bản thiết kế cho mỗi bản gốc
            </div>
          </div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Thành Tiền</Grid>

            <Grid item fontWeight={600} fontSize={"1.3rem"}>
              {currencyFormatter(designFee ? +designFee : 0)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <SpouseModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default DesignFee;
