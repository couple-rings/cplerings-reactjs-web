import styles from "./CraftingProcess.module.scss";
import Carousel from "react-material-ui-carousel";
import {
  Button,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Skeleton,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProcessStage_50 from "./ProcessStage_50";
import ProcessStage_75 from "./ProcessStage_75";
import ProcessStage_100 from "./ProcessStage_100";
import { useEffect, useState } from "react";
import AddProcessImage from "./AddProcessImage";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  getCraftingStages,
  postCompleteCraftingStage,
} from "src/services/craftingStage.service";
import { useAppSelector } from "src/utils/hooks";
import { stages } from "src/utils/constants";
import CompleteModal from "src/components/modal/craftingStage/Complete.modal";
import { postUploadFile } from "src/services/file.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import moment from "moment";

function CraftingProcess() {
  const [noImg, setNoImg] = useState(false);
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

  const { username, id: userId } = useAppSelector(
    (state) => state.auth.userInfo
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const uploadMutation = useMutation({
    mutationFn: (base64: string) => {
      return postUploadFile(base64);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const stageMutation = useMutation({
    mutationFn: (data: {
      id: number;
      payload: IUpdateCraftingStageRequest;
    }) => {
      return postCompleteCraftingStage(data.id, data.payload);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đã cập nhật quá trình");
        queryClient.invalidateQueries({
          queryKey: [fetchCraftingStages, filterObj],
        });
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleComplete = async (
    progress: StagePercentage,
    maleDocumentId?: number,
    femaleDocumentId?: number
  ) => {
    if (progress === StagePercentage.First) {
      if (imageSrcs50.length === 0) {
        setNoImg(true);
        return;
      }

      const uploadResponse = await uploadMutation.mutateAsync(imageSrcs50[0]);

      if (uploadResponse.data && firstStage) {
        stageMutation.mutate({
          id: firstStage.id,
          payload: {
            imageId: uploadResponse.data.id,
          },
        });
      }
    }

    if (progress === StagePercentage.Second) {
      if (imageSrcs75.length === 0) {
        setNoImg(true);
        return;
      }

      const uploadResponse = await uploadMutation.mutateAsync(imageSrcs75[0]);

      if (uploadResponse.data && secondStage) {
        stageMutation.mutate({
          id: secondStage.id,
          payload: {
            imageId: uploadResponse.data.id,
          },
        });
      }
    }

    if (progress === StagePercentage.Third) {
      const uploadResponse = await uploadMutation.mutateAsync(imageSrcs100[0]);

      if (
        uploadResponse.data &&
        thirdStage &&
        maleRing &&
        femaleRing &&
        maleDocumentId &&
        femaleDocumentId
      ) {
        stageMutation.mutate({
          id: thirdStage.id,
          payload: {
            imageId: uploadResponse.data.id,
            ringMaintenances: [
              {
                ringId: maleRing.id,
                maintenanceDocumentId: maleDocumentId,
              },
              {
                ringId: femaleRing.id,
                maintenanceDocumentId: femaleDocumentId,
              },
            ],
          },
        });
      }
    }
  };

  useEffect(() => {
    if (response && response.data) {
      const { firstRing, secondRing, jeweler } = response.data.customOrder;

      if (!jeweler || jeweler.id !== userId) navigate("/jeweler/custom-order");

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
      const inProgress = stageResponse.data.items.findIndex(
        (item) =>
          item.status === CraftingStageStatus.Paid && !item.completionDate
      );

      const pending = stageResponse.data.items.findIndex(
        (item) => item.status === CraftingStageStatus.Pending
      );

      if (inProgress !== -1) setCurrentStage(inProgress);
      else if (pending !== -1) setCurrentStage(pending);
      if (inProgress === -1 && pending === -1) setCurrentStage(2);

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
        if (firstStage.image) setImageSrcs50([firstStage.image.url]);
        if (secondStage.image) setImageSrcs75([secondStage.image.url]);
        if (thirdStage.image) setImageSrcs100([thirdStage.image.url]);

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
                    Chờ đặt cọc
                  </Grid>
                )}
                {firstStage.status === CraftingStageStatus.Paid &&
                  !firstStage.completionDate && (
                    <Grid item className={styles.deposit}>
                      Đã Đặt Cọc
                    </Grid>
                  )}
                {firstStage.completionDate && firstStage.completionDate && (
                  <Grid item className={styles.deposit}>
                    Đã Hoàn Thành
                  </Grid>
                )}

                <FormLabel>
                  {firstStage.completionDate &&
                    moment(firstStage.completionDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                </FormLabel>
              </Grid>

              <Grid className={styles.jewelerName}>Jeweler_{username}</Grid>

              <div className={styles.stepper}>
                <ProcessStage_50 />
              </div>

              <Grid container>
                <Grid item className={styles.headerProcess}>
                  {
                    stages.find(
                      (item) => item.progress === StagePercentage.First
                    )?.name
                  }
                </Grid>

                <Grid
                  container
                  className="infoProcess"
                  justifyContent={"space-between"}
                  mb={5}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    md={8}
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

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2.5}
                    justifyContent="center"
                  >
                    <AddProcessImage
                      stage={firstStage}
                      setNoImg={setNoImg}
                      imageSrcs={imageSrcs50}
                      setImageSrcs={setImageSrcs50}
                    />

                    {noImg && (
                      <FormHelperText error sx={{ mt: 2 }}>
                        * Vui lòng upload hình sản phẩm
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {firstStage.status === CraftingStageStatus.Paid &&
                !firstStage.completionDate && (
                  <Grid container justifyContent={"center"}>
                    <LoadingButton
                      loading={
                        uploadMutation.isPending || stageMutation.isPending
                      }
                      className={styles.completeButton}
                      onClick={() => handleComplete(StagePercentage.First)}
                    >
                      Hoàn Thành Qui Trình
                    </LoadingButton>
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
                    Chờ đặt cọc
                  </Grid>
                )}
                {secondStage.status === CraftingStageStatus.Paid &&
                  !secondStage.completionDate && (
                    <Grid item className={styles.deposit}>
                      Đã Đặt Cọc
                    </Grid>
                  )}
                {secondStage.status === CraftingStageStatus.Paid &&
                  secondStage.completionDate && (
                    <Grid item className={styles.deposit}>
                      Đã Hoàn Thành
                    </Grid>
                  )}

                <FormLabel>
                  {secondStage.completionDate &&
                    moment(secondStage.completionDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                </FormLabel>
              </Grid>

              <Grid className={styles.jewelerName}>Jeweler_{username}</Grid>

              <div className={styles.stepper}>
                <ProcessStage_75 />
              </div>

              <Grid container>
                <Grid item className={styles.headerProcess}>
                  {
                    stages.find(
                      (item) => item.progress === StagePercentage.Second
                    )?.name
                  }
                </Grid>

                <Grid
                  container
                  className="infoProcess"
                  justifyContent={"space-between"}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    md={8}
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

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2.5}
                    justifyContent="center"
                  >
                    <AddProcessImage
                      stage={secondStage}
                      setNoImg={setNoImg}
                      imageSrcs={imageSrcs75}
                      setImageSrcs={setImageSrcs75}
                    />

                    {noImg && (
                      <FormHelperText error sx={{ mt: 2 }}>
                        * Vui lòng upload hình sản phẩm
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {secondStage.status === CraftingStageStatus.Paid &&
                !secondStage.completionDate && (
                  <Grid container justifyContent={"center"}>
                    <LoadingButton
                      loading={
                        uploadMutation.isPending || stageMutation.isPending
                      }
                      className={styles.completeButton}
                      onClick={() => handleComplete(StagePercentage.Second)}
                    >
                      Hoàn Thành Qui Trình
                    </LoadingButton>
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
                    Chờ đặt cọc
                  </Grid>
                )}
                {thirdStage.status === CraftingStageStatus.Paid &&
                  !thirdStage.completionDate && (
                    <Grid item className={styles.deposit}>
                      Đã Đặt Cọc
                    </Grid>
                  )}
                {thirdStage.status === CraftingStageStatus.Paid &&
                  thirdStage.completionDate && (
                    <Grid item className={styles.deposit}>
                      Đã Hoàn Thành
                    </Grid>
                  )}
              </Grid>

              <Grid className={styles.jewelerName}>Jeweler_{username}</Grid>

              <div className={styles.stepper}>
                <ProcessStage_100 />
              </div>

              <Grid container>
                <Grid item className={styles.headerProcess}>
                  {
                    stages.find(
                      (item) => item.progress === StagePercentage.Third
                    )?.name
                  }
                </Grid>

                <Grid
                  container
                  className="infoProcess"
                  justifyContent={"space-between"}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    md={8}
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

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2.5}
                    justifyContent="center"
                  >
                    <AddProcessImage
                      stage={thirdStage}
                      setNoImg={setNoImg}
                      imageSrcs={imageSrcs100}
                      setImageSrcs={setImageSrcs100}
                    />

                    {noImg && (
                      <FormHelperText error sx={{ mt: 2 }}>
                        * Vui lòng upload hình sản phẩm
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {thirdStage.status === CraftingStageStatus.Paid &&
                !thirdStage.completionDate && (
                  <Grid container justifyContent={"center"}>
                    <Button
                      className={styles.completeButton}
                      onClick={() => {
                        if (imageSrcs100.length === 0) {
                          setNoImg(true);
                          return;
                        }
                        setOpen(true);
                      }}
                    >
                      Hoàn Thành Qui Trình
                    </Button>
                  </Grid>
                )}
            </Paper>
          </Carousel>
        )}
      </div>

      <CompleteModal
        open={open}
        setOpen={setOpen}
        handleComplete={handleComplete}
        updatingStage={stageMutation.isPending}
      />
    </div>
  );
}

export default CraftingProcess;
