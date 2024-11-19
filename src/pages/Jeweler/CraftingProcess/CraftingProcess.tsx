import styles from "./CraftingProcess.module.scss";
import Carousel from "react-material-ui-carousel";
import { Button, Grid, Paper, Skeleton } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProcessStage_50 from "./ProcessStage_50";
import ProcessStage_75 from "./ProcessStage_75";
import ProcessStage_100 from "./ProcessStage_100";
import { useEffect, useState } from "react";
import AddProcessImage from "./AddProcessImage";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCraftingStages,
  fetchCustomOrderDetail,
} from "src/utils/querykey";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import {
  CraftingStageStatus,
  DesignCharacteristic,
  StagePercentage,
} from "src/utils/enums";
import { getCraftingStages } from "src/services/craftingStage.service";
import { useAppSelector } from "src/utils/hooks";
import { stages } from "src/utils/constants";
import CompleteModal from "src/components/modal/craftingStage/Complete.modal";

function CraftingProcess() {
  const [imageSrcs50, setImageSrcs50] = useState<string[]>([]);
  const [imageSrcs75, setImageSrcs75] = useState<string[]>([]);
  const [imageSrcs100, setImageSrcs100] = useState<string[]>([]);

  const [firstStage, setFirstStage] = useState<ICraftingStage | null>(null);
  const [secondStage, setSecondStage] = useState<ICraftingStage | null>(null);
  const [thirdStage, setThirdStage] = useState<ICraftingStage | null>(null);

  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);
  const [filterObj, setFilterObj] = useState<ICraftingStageFilter | null>(null);

  const [currentStage, setCurrentStage] = useState(0);
  const [open, setOpen] = useState(false);

  const { orderId } = useParams<{ orderId: string }>();

  const { username } = useAppSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();

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
    }

    if (response && response.errors) {
      navigate("/jeweler/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (stageResponse?.data) {
      let currentStage = 0;

      stageResponse.data.items.forEach((item, index) => {
        if (item.status === CraftingStageStatus.Paid) currentStage = index;
      });

      setCurrentStage(currentStage);

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
      navigate("/jeweler/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResponse]);

  useEffect(() => {
    if (orderId)
      setFilterObj({
        page: 0,
        pageSize: 100,
        customOrderId: +orderId,
      });
  }, [orderId]);

  if (!maleRing || !femaleRing || !stageResponse)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid
          container
          item
          gap={3}
          xs={8}
          mt={5}
          justifyContent={"space-between"}
        >
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          <Skeleton variant="rectangular" width={"100%"} height={500} />
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.all}>
      <div className={styles.container}>
        {firstStage && secondStage && thirdStage && (
          <Carousel autoPlay={false} index={currentStage}>
            <Paper elevation={0} className={styles.processItem}>
              <Grid container className={styles.header}>
                <Grid item className={styles.title}>
                  Qui trình chế tác
                </Grid>
                {firstStage.status === CraftingStageStatus.Pending && (
                  <Grid item className={styles.waitingToDeposit}>
                    Đang chờ khách hàng đặt cọc
                  </Grid>
                )}
                {firstStage.status === CraftingStageStatus.Paid && (
                  <Grid item className={styles.deposit}>
                    Đã Đặt Cọc
                  </Grid>
                )}
              </Grid>

              <Grid className={styles.jewelerName}>Jeweler_{username}</Grid>

              <div className={styles.stepper}>
                <ProcessStage_50 />
              </div>

              <Grid container>
                <Grid item className={styles.headerProcess}>
                  {firstStage.name}
                </Grid>

                <Grid container className="infoProcess">
                  <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    pb={5}
                    className={styles.infoDetail}
                  >
                    {stages
                      .find((item) => item.progress === StagePercentage.First)
                      ?.steps.map((item, index) => {
                        return (
                          <Grid
                            key={index}
                            item
                            container
                            className={styles.infoItem}
                          >
                            <Grid item xs={1} md={1}>
                              <VerifiedIcon />
                            </Grid>
                            <Grid
                              item
                              xs={11}
                              md={8}
                              className={styles.content}
                            >
                              {item}
                            </Grid>
                          </Grid>
                        );
                      })}
                  </Grid>

                  <Grid item md={4} justifyContent="center">
                    <AddProcessImage
                      imageSrcs={imageSrcs50}
                      setImageSrcs={setImageSrcs50}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {firstStage.status === CraftingStageStatus.Paid && (
                <Grid container justifyContent={"center"}>
                  <Button className={styles.completeButton}>
                    Hoàn Thành Qui Trình
                  </Button>
                </Grid>
              )}
            </Paper>

            <Paper elevation={0} className={styles.processItem}>
              <Grid container className={styles.header}>
                <Grid item className={styles.title}>
                  Qui trình chế tác
                </Grid>
                {secondStage.status === CraftingStageStatus.Pending && (
                  <Grid item className={styles.waitingToDeposit}>
                    Đang chờ khách hàng đặt cọc
                  </Grid>
                )}
                {secondStage.status === CraftingStageStatus.Paid && (
                  <Grid item className={styles.deposit}>
                    Đã Đặt Cọc
                  </Grid>
                )}
              </Grid>

              <Grid className={styles.jewelerName}>Jeweler_{username}</Grid>

              <div className={styles.stepper}>
                <ProcessStage_75 />
              </div>

              <Grid container>
                <Grid item className={styles.headerProcess}>
                  {secondStage.name}
                </Grid>

                <Grid container className="infoProcess">
                  <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    pb={5}
                    className={styles.infoDetail}
                  >
                    {stages
                      .find((item) => item.progress === StagePercentage.Second)
                      ?.steps.map((item, index) => {
                        return (
                          <Grid
                            key={index}
                            item
                            container
                            className={styles.infoItem}
                          >
                            <Grid item xs={1} md={1}>
                              <VerifiedIcon />
                            </Grid>
                            <Grid
                              item
                              xs={11}
                              md={8}
                              className={styles.content}
                            >
                              {item}
                            </Grid>
                          </Grid>
                        );
                      })}
                  </Grid>

                  <Grid container item md={4} justifyContent="center">
                    <AddProcessImage
                      imageSrcs={imageSrcs75}
                      setImageSrcs={setImageSrcs75}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {secondStage.status === CraftingStageStatus.Paid && (
                <Grid container justifyContent={"center"}>
                  <Button className={styles.completeButton}>
                    Hoàn Thành Qui Trình
                  </Button>
                </Grid>
              )}
            </Paper>

            <Paper elevation={0} className={styles.processItem}>
              <Grid container className={styles.header}>
                <Grid item className={styles.title}>
                  Qui trình chế tác
                </Grid>
                {thirdStage.status === CraftingStageStatus.Pending && (
                  <Grid item className={styles.waitingToDeposit}>
                    Đang chờ khách hàng đặt cọc
                  </Grid>
                )}
                {secondStage.status === CraftingStageStatus.Paid && (
                  <Grid item className={styles.deposit}>
                    Đã Đặt Cọc
                  </Grid>
                )}
              </Grid>

              <Grid className={styles.jewelerName}>Jeweler_{username}</Grid>

              <div className={styles.stepper}>
                <ProcessStage_100 />
              </div>

              <Grid container>
                <Grid item className={styles.headerProcess}>
                  {thirdStage.name}
                </Grid>

                <Grid container className="infoProcess">
                  <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    pb={5}
                    className={styles.infoDetail}
                  >
                    {stages
                      .find((item) => item.progress === StagePercentage.Third)
                      ?.steps.map((item, index) => {
                        return (
                          <Grid
                            key={index}
                            item
                            container
                            className={styles.infoItem}
                          >
                            <Grid item xs={1} md={1}>
                              <VerifiedIcon />
                            </Grid>
                            <Grid
                              item
                              xs={11}
                              md={8}
                              className={styles.content}
                            >
                              {item}
                            </Grid>
                          </Grid>
                        );
                      })}
                  </Grid>

                  <Grid container item md={4} justifyContent="center">
                    <AddProcessImage
                      imageSrcs={imageSrcs100}
                      setImageSrcs={setImageSrcs100}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {thirdStage.status === CraftingStageStatus.Paid && (
                <Grid container justifyContent={"center"}>
                  <Button
                    className={styles.completeButton}
                    onClick={() => setOpen(true)}
                  >
                    Hoàn Thành Qui Trình
                  </Button>
                </Grid>
              )}
            </Paper>
          </Carousel>
        )}
      </div>

      <CompleteModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default CraftingProcess;
