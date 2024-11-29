import { Card, Chip, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./DesignVersions.module.scss";
import HoverCard from "src/components/product/HoverCard";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { primaryBtn, roundedPrimaryBtn } from "src/utils/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddModal from "src/components/modal/version/Add.modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCustomerSessionCount,
  fetchCustomRequestDetail,
  fetchFemaleDesignVersions,
  fetchMaleDesignVersions,
} from "src/utils/querykey";
import { getCustomRequestDetail } from "src/services/customRequest.service";
import { CustomRequestStatus, DesignCharacteristic } from "src/utils/enums";
import {
  getDesignVersions,
  postCreateDesignVersion,
} from "src/services/designVersion.service";
import { postUploadFile } from "src/services/file.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { getCustomerSessionCount } from "src/services/designSession.service";
import moment from "moment";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { formatCustomRequestStatus } from "src/utils/functions";
import { postCreateConversation } from "src/services/conversation.service";
import { useAppSelector } from "src/utils/hooks";

const initDraft = {
  image: "",
  designFile: "",
  versionNo: 0,
};

function DesignVersions() {
  const [open, setOpen] = useState(false);
  const [createGender, setCreateGender] = useState(
    DesignCharacteristic.Default
  );
  const [canCreate, setCanCreate] = useState(false);

  const [maleDesign, setMaleDesign] = useState<IDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<IDesign | null>(null);

  const [maleNewVersion, setMaleNewVersion] = useState(initDraft);
  const [femaleNewVersion, setFemaleNewVersion] = useState(initDraft);

  const [maleFilterObj, setMaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const [femaleFilterObj, setFemaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id: staffId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response } = useQuery({
    queryKey: [fetchCustomRequestDetail, id],

    queryFn: () => {
      if (id) return getCustomRequestDetail(+id);
    },
    enabled: !!id,
  });

  const { data: sessionResponse, isLoading: loadingSession } = useQuery({
    queryKey: [fetchCustomerSessionCount, response?.data?.customer.id],

    queryFn: () => {
      if (response?.data?.customer.id)
        return getCustomerSessionCount(response?.data?.customer.id);
    },
    enabled: !!response?.data?.customer.id,
  });

  const { data: maleVersionResponse, isLoading: maleLoading } = useQuery({
    queryKey: [fetchMaleDesignVersions, maleFilterObj],

    queryFn: () => {
      if (maleFilterObj) return getDesignVersions(maleFilterObj);
    },

    enabled: !!maleFilterObj,
  });

  const { data: femaleVersionResponse, isLoading: femaleLoading } = useQuery({
    queryKey: [fetchFemaleDesignVersions, femaleFilterObj],

    queryFn: () => {
      if (femaleFilterObj) return getDesignVersions(femaleFilterObj);
    },

    enabled: !!femaleFilterObj,
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

  const createVersionMutation = useMutation({
    mutationFn: (data: ICreateDesignVersionRequest) => {
      return postCreateDesignVersion(data);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const chatMutation = useMutation({
    mutationFn: (data: ICreateConversationRequest) => {
      return postCreateConversation(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        navigate("/staff", { state: { conversation: response.data } });
      }

      if (response.error) {
        toast.error(response.error);
      }
    },
  });

  const isAccepted = () => {
    return !!(
      maleVersionResponse?.data?.items.find((item) => item.isAccepted) &&
      femaleVersionResponse?.data?.items.find((item) => item.isAccepted)
    );
  };

  const handleChat = () => {
    if (response?.data?.customer)
      chatMutation.mutate({
        participants: [staffId, response.data.customer.id],
      });
  };

  const handleCreateVersion = (image: string, designFile: string) => {
    if (
      createGender === DesignCharacteristic.Male &&
      maleVersionResponse?.data
    ) {
      let newVersionNo = 0;
      if (maleVersionResponse.data.items.length === 0) newVersionNo = 1;
      else {
        const recentVersion = maleVersionResponse.data.items.reduce(
          (prev, current) =>
            prev.versionNumber > current.versionNumber ? prev : current
        );
        newVersionNo = recentVersion.versionNumber + 1;
      }

      setMaleNewVersion({
        image,
        designFile,
        versionNo: newVersionNo,
      });
    }
    if (
      createGender === DesignCharacteristic.Female &&
      femaleVersionResponse?.data
    ) {
      let newVersionNo = 0;
      if (femaleVersionResponse.data.items.length === 0) newVersionNo = 1;
      else {
        const recentVersion = femaleVersionResponse.data.items.reduce(
          (prev, current) =>
            prev.versionNumber > current.versionNumber ? prev : current
        );
        newVersionNo = recentVersion.versionNumber + 1;
      }

      setFemaleNewVersion({
        image,
        designFile,
        versionNo: newVersionNo,
      });
    }
  };

  const handleConfirm = async () => {
    if (!maleNewVersion.image || !femaleNewVersion.image) return;
    if (response?.data && maleDesign && femaleDesign) {
      const maleImageResponse = await uploadMutation.mutateAsync(
        maleNewVersion.image
      );
      const malePdfResponse = await uploadMutation.mutateAsync(
        maleNewVersion.designFile
      );

      const femaleImageResponse = await uploadMutation.mutateAsync(
        femaleNewVersion.image
      );
      const femalePdfResponse = await uploadMutation.mutateAsync(
        femaleNewVersion.designFile
      );

      if (
        maleImageResponse.data &&
        malePdfResponse.data &&
        femaleImageResponse.data &&
        femalePdfResponse.data
      ) {
        const createVersionResponse = await createVersionMutation.mutateAsync({
          maleVersion: {
            customerId: response.data.customer.id,
            designId: maleDesign.id,
            previewImageId: maleImageResponse.data.id,
            designFileId: malePdfResponse.data.id,
          },
          femaleVersion: {
            customerId: response.data.customer.id,
            designId: femaleDesign.id,
            previewImageId: femaleImageResponse.data.id,
            designFileId: femalePdfResponse.data.id,
          },
        });

        if (createVersionResponse.data) {
          setMaleNewVersion(initDraft);
          setFemaleNewVersion(initDraft);

          queryClient.invalidateQueries({
            queryKey: [fetchMaleDesignVersions, maleFilterObj],
          });
          queryClient.invalidateQueries({
            queryKey: [fetchFemaleDesignVersions, femaleFilterObj],
          });
          queryClient.invalidateQueries({
            queryKey: [fetchCustomerSessionCount, response.data.customer.id],
          });

          toast.success("Tạo phiên bản thành công");
        }
      }
    }
  };

  const handleNavigateCustomDesign = () => {
    if (maleVersionResponse?.data && femaleVersionResponse?.data) {
      const maleVersionId = maleVersionResponse.data.items.find(
        (item) => item.isAccepted
      )?.id;
      const femaleVersionId = femaleVersionResponse.data.items.find(
        (item) => item.isAccepted
      )?.id;

      navigate(
        `/staff/custom-request/${id}/custom-design/${maleVersionId}/${femaleVersionId}`
      );
    }
  };

  useEffect(() => {
    if (response && response.data) {
      if (response.data.status !== CustomRequestStatus.OnGoing)
        navigate("not-found");

      const maleDesign = response.data.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Male
      );
      const femaleDesign = response.data.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Female
      );

      if (maleDesign && femaleDesign) {
        setMaleDesign(maleDesign);
        setFemaleDesign(femaleDesign);
      }
    }

    if (response && response.errors) {
      navigate("not-found");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (sessionResponse && sessionResponse.data) {
      if (sessionResponse.data.numOfSessions !== 0) {
        setCanCreate(true);
      } else setCanCreate(false);
    }
  }, [sessionResponse]);

  useEffect(() => {
    if (maleDesign && response?.data)
      setMaleFilterObj({
        page: 0,
        pageSize: 100,
        designId: maleDesign.id,
        customerId: response.data.customer.id,
      });
  }, [maleDesign, response]);

  useEffect(() => {
    if (femaleDesign && response?.data)
      setFemaleFilterObj({
        page: 0,
        pageSize: 100,
        designId: femaleDesign.id,
        customerId: response.data.customer.id,
      });
  }, [femaleDesign, response]);

  if (
    !maleDesign ||
    !femaleDesign ||
    loadingSession ||
    maleLoading ||
    femaleLoading
  )
    return (
      <Grid container justifyContent={"center"} py={5}>
        <Grid container item xs={8} justifyContent={"flex-start"}>
          <Skeleton
            variant="rectangular"
            width={"40%"}
            height={50}
            sx={{ mb: 3 }}
          />
          <Skeleton variant="rectangular" width={"100%"} height={500} />
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <Grid
        container
        mb={2}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <Grid container item md={6} gap={2} mb={3}>
          <div className={styles.title}> Quy Trình Thiết Kế</div>

          {response?.data && (
            <Chip
              label={formatCustomRequestStatus(response.data.status).text}
              color={formatCustomRequestStatus(response.data.status).color}
            />
          )}
        </Grid>

        <LoadingButton
          loading={chatMutation.isPending}
          variant="contained"
          sx={{ ...primaryBtn, py: 1, mb: 3 }}
          onClick={handleChat}
        >
          Chat Với Khách Hàng
        </LoadingButton>
      </Grid>

      <Grid container justifyContent={"space-between"}>
        <Grid container item xs={12} md={6} className={styles.original}>
          <Grid item xs={12} className={styles.name}>
            Bản Thiết Kế {maleDesign?.name} Và {femaleDesign?.name}
          </Grid>
          <Grid item md={5}>
            <HoverCard
              image={maleDesign.designMetalSpecifications[0].image.url}
              file={maleDesign.blueprint.url}
            />
            <div className={styles.label}>
              <img src={male} />
              <span>Nam Tính</span>
            </div>
          </Grid>
          <Grid item md={5}>
            <HoverCard
              image={femaleDesign.designMetalSpecifications[0].image.url}
              file={femaleDesign.blueprint.url}
            />
            <div className={styles.label}>
              <img src={female} />
              <span>Nữ Tính</span>
            </div>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={5.7}>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {moment(
                  response?.data?.customRequestHistories.find(
                    (item) => item.status === CustomRequestStatus.OnGoing
                  )?.createdAt
                ).format("DD/MM/YYYY HH:mm")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="info" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Tiếp nhận yêu cầu thiết kế</TimelineContent>
            </TimelineItem>

            {maleVersionResponse?.data?.items.map((item) => {
              return (
                <TimelineItem key={item.id}>
                  <TimelineOppositeContent color="textSecondary">
                    {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="info" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Hoàn tất bản thiết kế version {item.versionNumber}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          xs={11}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item className={styles.title}>
            Các Phiên Bản
          </Grid>

          <Grid item className={styles.count}>
            Còn {sessionResponse?.data?.numOfSessions} lượt thiết kế
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          sm={11}
          gap={7}
          justifyContent={"flex-start"}
          className={styles.versionList}
        >
          <Grid item xs={12} className={styles.label}>
            Dành Cho Bản {maleDesign.name}
          </Grid>

          {maleVersionResponse?.data?.items
            ?.sort((a, b) => a.versionNumber - b.versionNumber)
            .map((item) => {
              return (
                <Grid item md={3.7} key={item.id}>
                  <Card className={styles.version}>
                    <div className={styles.date}>
                      Ngày tạo: {moment(item.createdAt).format("DD/MM/YYYY")}
                    </div>
                    <HoverCard
                      image={item.image.url}
                      file={item.designFile.url}
                    />
                    <div className={styles.versionNo}>
                      Version {item.versionNumber} {item.isOld && "(Cũ)"}
                    </div>
                    {item.isAccepted && <CheckCircleIcon color="success" />}
                  </Card>
                </Grid>
              );
            })}

          {/* Male newly created version in draft state */}
          {maleNewVersion.versionNo !== 0 && (
            <Grid item md={3.7}>
              <Card className={styles.version}>
                <HoverCard
                  image={maleNewVersion.image}
                  file={maleNewVersion.designFile}
                />
                <div className={styles.versionNo}>
                  Version {maleNewVersion.versionNo} (Draft)
                </div>
              </Card>
            </Grid>
          )}

          {maleNewVersion.versionNo === 0 && canCreate && (
            <Grid
              item
              xs={12}
              md={3.7}
              onClick={() => {
                setOpen(true);
                setCreateGender(DesignCharacteristic.Male);
              }}
            >
              <Card className={`${styles.version} ${styles.addVersion}`}>
                <AddBoxOutlinedIcon className={styles.addIcon} />
                <div className={styles.addText}>Tạo Bản Mới</div>
              </Card>
            </Grid>
          )}

          <Divider sx={{ backgroundColor: "#ccc", width: "100%", my: 3 }} />
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          sm={11}
          gap={7}
          justifyContent={"flex-start"}
          className={styles.versionList}
        >
          <Grid item xs={12} className={styles.label}>
            Dành Cho Bản {femaleDesign.name}
          </Grid>

          {femaleVersionResponse?.data?.items
            ?.sort((a, b) => a.versionNumber - b.versionNumber)
            .map((item) => {
              return (
                <Grid item md={3.7} key={item.id}>
                  <Card className={styles.version}>
                    <div className={styles.date}>
                      Ngày tạo: {moment(item.createdAt).format("DD/MM/YYYY")}
                    </div>
                    <HoverCard
                      image={item.image.url}
                      file={item.designFile.url}
                    />
                    <div className={styles.versionNo}>
                      Version {item.versionNumber} {item.isOld && "(Cũ)"}
                    </div>
                    {item.isAccepted && <CheckCircleIcon color="success" />}
                  </Card>
                </Grid>
              );
            })}

          {/* Female newly created version in draft state */}
          {femaleNewVersion.versionNo !== 0 && (
            <Grid item md={3.7}>
              <Card className={styles.version}>
                <HoverCard
                  image={femaleNewVersion.image}
                  file={femaleNewVersion.designFile}
                />
                <div className={styles.versionNo}>
                  Version {femaleNewVersion.versionNo} (Draft)
                </div>
              </Card>
            </Grid>
          )}

          {femaleNewVersion.versionNo === 0 && canCreate && (
            <Grid
              item
              xs={12}
              md={3.7}
              onClick={() => {
                setOpen(true);
                setCreateGender(DesignCharacteristic.Female);
              }}
            >
              <Card className={`${styles.version} ${styles.addVersion}`}>
                <AddBoxOutlinedIcon className={styles.addIcon} />
                <div className={styles.addText}>Tạo Bản Mới</div>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} mt={10}>
        <Grid item xs={11} md={4}>
          {response?.data?.status === CustomRequestStatus.OnGoing &&
            !isAccepted() && (
              <LoadingButton
                disabled={!maleNewVersion.image || !femaleNewVersion.image}
                loading={
                  uploadMutation.isPending || createVersionMutation.isPending
                }
                variant="contained"
                sx={roundedPrimaryBtn}
                fullWidth
                onClick={handleConfirm}
              >
                Xác Nhận Tạo
              </LoadingButton>
            )}

          {isAccepted() && (
            <LoadingButton
              variant="contained"
              sx={roundedPrimaryBtn}
              fullWidth
              onClick={handleNavigateCustomDesign}
            >
              Hoàn Chỉnh Thiết Kế
            </LoadingButton>
          )}
        </Grid>
      </Grid>

      <AddModal
        open={open}
        setOpen={setOpen}
        handleCreateVersion={handleCreateVersion}
      />
    </div>
  );
}

export default DesignVersions;
