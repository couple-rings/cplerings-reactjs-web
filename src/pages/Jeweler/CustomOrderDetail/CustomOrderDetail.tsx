import { Button, Grid, Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";

import blueprint from "src/assets/sampledata/blueprint.pdf";
import menring from "src/assets/sampledata/menring.png";
import HoverCard from "src/components/product/HoverCard";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import styles from "./CustomOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import { fetchCustomOrderDetail } from "src/utils/querykey";
import { useQuery } from "@tanstack/react-query";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import { CustomOrderStatus, DesignCharacteristic } from "src/utils/enums";

function CustomOrderDetail() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, id],

    queryFn: () => {
      if (id) return getCustomOrderDetail(+id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (response && response.data) {
      const { firstRing, secondRing } = response.data.customOrder;

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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Chi Tiết Đơn</div>
      </div>

      <Grid
        container
        justifyContent={"space-around"}
        className="container-biggest"
      >
        <Grid
          container
          item
          md={4}
          justifyContent={"center"}
          className="container-item"
          pb={5}
        >
          <Grid item xs={12} md={12} pb={3} className="image-item">
            <HoverCard file={blueprint} image={menring} />
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
                Chất Liệu
              </Grid>
              <Grid item className="info-detail-content">
                18K white gold
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
                12PT, D
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
                3
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
                Hehehoho
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
                5 chỉ
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          md={4}
          justifyContent={"center"}
          className="container-item"
          pb={5}
        >
          <Grid item xs={12} md={12} pb={3} className="image-item">
            <HoverCard file={blueprint} image={menring} />
          </Grid>

          <Grid container pb={5} className={styles.genderDefine}>
            <Grid item className="gender-icon">
              <FemaleIcon sx={{ color: "#ea394b" }} />
            </Grid>
            <Grid item className="gender-name">
              Nữ giới
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
                Chất Liệu
              </Grid>
              <Grid item className="info-detail-content">
                18K white gold
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
                12PT, D
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
                3
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
                Hehehoho
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
                5 chỉ
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {order.status === CustomOrderStatus.Waiting && (
        <Grid container justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{ ...primaryBtn, borderRadius: 2, px: 5 }}
          >
            Nhận đơn này
          </Button>
        </Grid>
      )}
    </div>
  );
}

export default CustomOrderDetail;
