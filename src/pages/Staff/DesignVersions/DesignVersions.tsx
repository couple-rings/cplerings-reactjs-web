import { Card, Divider, Grid, Pagination, Skeleton } from "@mui/material";
import styles from "./DesignVersions.module.scss";
import HoverCard from "src/components/product/HoverCard";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { roundedPrimaryBtn } from "src/utils/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddModal from "src/components/modal/version/Add.modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
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

const initMetaData = {
  page: 0,
  pageSize: 3,
  totalPages: 0,
  count: 0,
};

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

  const [maleDesign, setMaleDesign] = useState<IDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<IDesign | null>(null);

  const [maleNewVersion, setMaleNewVersion] = useState(initDraft);
  const [femaleNewVersion, setFemaleNewVersion] = useState(initDraft);

  const [maleMetaData, setMaleMetaData] = useState<IListMetaData>(initMetaData);
  const [maleFilterObj, setMaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const [femaleMetaData, setFemaleMetaData] =
    useState<IListMetaData>(initMetaData);
  const [femaleFilterObj, setFemaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: response } = useQuery({
    queryKey: [fetchCustomRequestDetail, id],

    queryFn: () => {
      if (id) return getCustomRequestDetail(+id);
    },
    enabled: !!id,
  });

  const { data: maleVersionResponse } = useQuery({
    queryKey: [fetchMaleDesignVersions, maleFilterObj],

    queryFn: () => {
      if (maleFilterObj) return getDesignVersions(maleFilterObj);
    },

    enabled: !!maleFilterObj,
  });

  const { data: femaleVersionResponse } = useQuery({
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

  const handleMaleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (maleFilterObj)
      setMaleFilterObj({
        ...maleFilterObj,
        page: value - 1,
      });
  };

  const handleFemaleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (femaleFilterObj)
      setFemaleFilterObj({
        ...femaleFilterObj,
        page: value - 1,
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
        const maleResponse = await createVersionMutation.mutateAsync({
          customerId: response.data.customer.id,
          designId: maleDesign.id,
          previewImageId: maleImageResponse.data.id,
          designFileId: malePdfResponse.data.id,
        });

        const femaleResponse = await createVersionMutation.mutateAsync({
          customerId: response.data.customer.id,
          designId: femaleDesign.id,
          previewImageId: femaleImageResponse.data.id,
          designFileId: femalePdfResponse.data.id,
        });

        if (maleResponse.data && femaleResponse.data) {
          setMaleNewVersion(initDraft);
          setFemaleNewVersion(initDraft);

          queryClient.invalidateQueries({
            queryKey: [fetchMaleDesignVersions, maleFilterObj],
          });
          queryClient.invalidateQueries({
            queryKey: [fetchFemaleDesignVersions, femaleFilterObj],
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
        `/staff/custom-request/custom-design/${maleVersionId}/${femaleVersionId}`
      );
    }
  };

  useEffect(() => {
    if (response && response.data) {
      if (response.data.status === CustomRequestStatus.Waiting)
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
    if (maleDesign)
      setMaleFilterObj({
        page: 0,
        pageSize: 3,
        designId: maleDesign.id,
      });
  }, [maleDesign]);

  useEffect(() => {
    if (femaleDesign)
      setFemaleFilterObj({
        page: 0,
        pageSize: 3,
        designId: femaleDesign.id,
      });
  }, [femaleDesign]);

  useEffect(() => {
    if (maleVersionResponse && maleVersionResponse.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = maleVersionResponse.data;
      setMaleMetaData(rest);
    }
  }, [maleVersionResponse]);

  useEffect(() => {
    if (femaleVersionResponse && femaleVersionResponse.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = femaleVersionResponse.data;
      setFemaleMetaData(rest);
    }
  }, [femaleVersionResponse]);

  if (!maleDesign || !femaleDesign)
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
      <div className={styles.title}>Thiết Kế Gốc</div>
      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          sm={10}
          md={8}
          justifyContent={"center"}
          className={styles.original}
        >
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
              <span>Nhẫn Nam</span>
            </div>
          </Grid>
          <Grid item md={5}>
            <HoverCard
              image={femaleDesign.designMetalSpecifications[0].image.url}
              file={femaleDesign.blueprint.url}
            />
            <div className={styles.label}>
              <img src={female} />
              <span>Nhẫn Nữ</span>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <div className={styles.title}>Các Phiên Bản</div>

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
            <img src={male} />
            <span>Nhẫn Nam</span>
          </Grid>

          {maleVersionResponse?.data?.items?.map((item) => {
            return (
              <Grid item md={3} key={item.id}>
                <Card className={styles.version}>
                  <HoverCard
                    image={item.image.url}
                    file={item.designFile.url}
                  />
                  <div className={styles.versionNo}>
                    Version {item.versionNumber}
                  </div>
                  {item.isAccepted && <CheckCircleIcon color="success" />}
                </Card>
              </Grid>
            );
          })}

          {/* Male newly created version in draft state */}
          {maleNewVersion.versionNo !== 0 && (
            <Grid item md={3}>
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

          {maleNewVersion.versionNo === 0 && (
            <Grid
              item
              xs={12}
              md={3}
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

          <Grid container justifyContent={"center"}>
            <Pagination
              count={maleMetaData.totalPages}
              size="medium"
              onChange={handleMaleChange}
            />
          </Grid>

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
            <img src={female} />
            <span>Nhẫn Nữ</span>
          </Grid>

          {femaleVersionResponse?.data?.items?.map((item) => {
            return (
              <Grid item md={3} key={item.id}>
                <Card className={styles.version}>
                  <HoverCard
                    image={item.image.url}
                    file={item.designFile.url}
                  />
                  <div className={styles.versionNo}>
                    Version {item.versionNumber}
                  </div>
                  {item.isAccepted && <CheckCircleIcon color="success" />}
                </Card>
              </Grid>
            );
          })}

          {/* Female newly created version in draft state */}
          {femaleNewVersion.versionNo !== 0 && (
            <Grid item md={3}>
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

          {femaleNewVersion.versionNo === 0 && (
            <Grid
              item
              xs={12}
              md={3}
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

          <Grid container justifyContent={"center"}>
            <Pagination
              count={femaleMetaData.totalPages}
              size="medium"
              onChange={handleFemaleChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} mt={10}>
        <Grid item xs={11} md={4}>
          {response?.data?.status === CustomRequestStatus.OnGoing && (
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

          {response?.data?.status === CustomRequestStatus.Completed && (
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
