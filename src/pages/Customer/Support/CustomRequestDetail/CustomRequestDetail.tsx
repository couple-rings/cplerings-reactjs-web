import { useNavigate, useParams } from "react-router-dom";
import styles from "./CustomRequestDetail.module.scss";
import { Box, Card, Grid, Skeleton } from "@mui/material";
import { getCustomRequestDetail } from "src/services/customRequest.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCustomRequestDetail,
  fetchFemaleDesignVersions,
  fetchMaleDesignVersions,
} from "src/utils/querykey";
import { useEffect, useState } from "react";
import { DesignCharacteristic } from "src/utils/enums";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import {
  getDesignVersions,
  putUpdateDesignVersion,
} from "src/services/designVersion.service";
import { secondaryBtn } from "src/utils/styles";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

function CustomRequestDetail() {
  const [maleDesign, setMaleDesign] = useState<IDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<IDesign | null>(null);

  const [selected, setSelected] = useState({
    male: 0,
    female: 0,
  });
  const [accepted, setAccepted] = useState({
    male: 0,
    female: 0,
  });

  const [maleVersions, setMaleVersions] = useState<IDesignVersion[]>([]);
  const [maleFilterObj, setMaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const [femaleVersions, setFemaleVersions] = useState<IDesignVersion[]>([]);
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

  const updateMutation = useMutation({
    mutationFn: (id: number) => {
      return putUpdateDesignVersion(id);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleChooseVersion = (gender: DesignCharacteristic, id: number) => {
    if (accepted.male !== 0 || accepted.female !== 0) return;

    if (gender === DesignCharacteristic.Male)
      setSelected({ ...selected, male: id });

    if (gender === DesignCharacteristic.Female)
      setSelected({ ...selected, female: id });
  };

  const handleConfirmVersion = async () => {
    const maleResponse = await updateMutation.mutateAsync(selected.male);
    const femaleResponse = await updateMutation.mutateAsync(selected.female);

    if (maleResponse.data && femaleResponse.data) {
      queryClient.invalidateQueries({
        queryKey: [fetchMaleDesignVersions, maleFilterObj],
      });

      queryClient.invalidateQueries({
        queryKey: [fetchFemaleDesignVersions, femaleFilterObj],
      });

      setSelected({ ...selected, male: 0, female: 0 });

      toast.success("Đã xác nhận bản thiết kế. Vui lòng chờ phản hồi");
    }
  };

  useEffect(() => {
    if (response && response.data) {
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
        pageSize: 100,
        designId: maleDesign.id,
      });
  }, [maleDesign]);

  useEffect(() => {
    if (femaleDesign)
      setFemaleFilterObj({
        page: 0,
        pageSize: 100,
        designId: femaleDesign.id,
      });
  }, [femaleDesign]);

  useEffect(() => {
    if (maleVersionResponse && maleVersionResponse.data) {
      const { items } = maleVersionResponse.data;

      setMaleVersions(items);
    }
  }, [maleVersionResponse]);

  useEffect(() => {
    if (femaleVersionResponse && femaleVersionResponse.data) {
      const { items } = femaleVersionResponse.data;

      setFemaleVersions(items);
    }
  }, [femaleVersionResponse]);

  useEffect(() => {
    if (maleVersions.length > 0 && femaleVersions.length > 0) {
      const accepted = {
        male: 0,
        female: 0,
      };

      maleVersions.forEach((version) => {
        if (version.isAccepted) accepted.male = version.id;
      });

      femaleVersions.forEach((version) => {
        if (version.isAccepted) accepted.female = version.id;
      });

      setAccepted(accepted);
    }
  }, [maleVersions, femaleVersions]);

  if (!maleDesign || !femaleDesign)
    return (
      <Grid container justifyContent={"center"} py={5}>
        <Grid container item xs={10} justifyContent={"center"}>
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={300}
            sx={{ my: 3 }}
          />
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={3.7}>
              <Skeleton variant="rectangular" width={"100%"} height={100} />
            </Grid>

            <Grid item xs={3.7}>
              <Skeleton variant="rectangular" width={"100%"} height={100} />
            </Grid>

            <Grid item xs={3.7}>
              <Skeleton variant="rectangular" width={"100%"} height={100} />
            </Grid>
          </Grid>

          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={300}
            sx={{ my: 3 }}
          />
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={3.7}>
              <Skeleton variant="rectangular" width={"100%"} height={100} />
            </Grid>

            <Grid item xs={3.7}>
              <Skeleton variant="rectangular" width={"100%"} height={100} />
            </Grid>

            <Grid item xs={3.7}>
              <Skeleton variant="rectangular" width={"100%"} height={100} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={10}>
        <div className={styles.title}>Các Phiên Bản Thiết Kế</div>

        <div className={styles.subtitle}>Bản Thiết Kế Gốc</div>
        <Card className={styles.designCard}>
          <Grid container p={3} justifyContent={"space-between"}>
            <Grid item xs={12} sm={4} md={2.5}>
              <img
                src={maleDesign?.designMetalSpecifications[0].image.url}
                width={"100%"}
                style={{ border: "1px solid #ccc" }}
              />
            </Grid>
            <Grid container item xs={12} md={9} py={3}>
              <Grid item flex={1}>
                <Grid
                  container
                  className={styles.name}
                  justifyContent={"space-between"}
                >
                  <div>Bản Thiết Kế {maleDesign?.name}</div>
                </Grid>
                <div className={styles.gender}>
                  <img src={male} width={15} />
                  Nhẫn nam
                </div>
                <div className={styles.description}>
                  {maleDesign?.description}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <div className={styles.subtitle}>
          Các Phiên Bản{" "}
          {selected.male !== 0 ||
            (accepted.male !== 0 && (
              <span style={{ marginLeft: 10 }}>
                (Chọn bản{" "}
                {
                  maleVersions.find(
                    (item) =>
                      item.id === selected.male || item.id === accepted.male
                  )?.versionNumber
                }
                )
              </span>
            ))}
        </div>
        <Grid
          container
          columnGap={{ xs: 0, md: 5 }}
          justifyContent={{ xs: "space-between", md: "flex-start" }}
          mb={3}
        >
          {maleVersions.map((item) => {
            const selectedVer =
              selected.male === item.id || accepted.male === item.id
                ? styles.selected
                : "";
            return (
              <Grid
                key={item.id}
                container
                item
                sm={5.8}
                md
                className={`${styles.version} ${selectedVer}`}
                onClick={() =>
                  handleChooseVersion(DesignCharacteristic.Male, item.id)
                }
              >
                <Grid item xs={3}>
                  <img src={item.image.url} width={"100%"} />
                </Grid>
                <Grid item xs={8}>
                  <div className={styles.versionNo}>
                    <ArticleRoundedIcon />
                    Version {item.versionNumber}
                  </div>
                  <a href={item.designFile.url} className={styles.download}>
                    <DownloadRoundedIcon />
                    File PDF
                  </a>
                </Grid>
              </Grid>
            );
          })}
          {maleVersions.length === 0 && (
            <Box sx={{ mt: 3 }}>Chưa có phiên bản nào</Box>
          )}
        </Grid>

        <Box sx={{ mt: 15 }}></Box>

        <div className={styles.subtitle}>Bản Thiết Kế Gốc</div>
        <Card className={styles.designCard}>
          <Grid container p={3} justifyContent={"space-between"}>
            <Grid item xs={12} sm={4} md={2.5}>
              <img
                src={femaleDesign?.designMetalSpecifications[0].image.url}
                width={"100%"}
                style={{ border: "1px solid #ccc" }}
              />
            </Grid>
            <Grid item xs={12} md={9} py={3}>
              <div className={styles.name}>
                Bản Thiết Kế {femaleDesign?.name}
              </div>
              <div className={styles.gender}>
                <img src={female} width={15} />
                Nhẫn nữ
              </div>
              <div className={styles.description}>
                {femaleDesign?.description}
              </div>
            </Grid>
          </Grid>
        </Card>

        <div className={styles.subtitle}>
          Các Phiên Bản
          {(selected.female !== 0 || accepted.female !== 0) && (
            <span style={{ marginLeft: 10 }}>
              (Chọn bản{" "}
              {
                femaleVersions.find(
                  (item) =>
                    item.id === selected.female || item.id === accepted.female
                )?.versionNumber
              }
              )
            </span>
          )}
        </div>
        <Grid
          container
          columnGap={{ xs: 0, md: 5 }}
          justifyContent={{ xs: "space-between", md: "flex-start" }}
          mb={10}
        >
          {femaleVersions.map((item) => {
            const selectedVer =
              selected.female === item.id || accepted.female === item.id
                ? styles.selected
                : "";
            return (
              <Grid
                key={item.id}
                container
                item
                sm={5.8}
                md
                className={`${styles.version} ${selectedVer}`}
                onClick={() =>
                  handleChooseVersion(DesignCharacteristic.Female, item.id)
                }
              >
                <Grid item xs={3}>
                  <img src={item.image.url} width={"100%"} />
                </Grid>
                <Grid item xs={8}>
                  <div className={styles.versionNo}>
                    <ArticleRoundedIcon />
                    Version {item.versionNumber}
                  </div>
                  <a href={item.designFile.url} className={styles.download}>
                    <DownloadRoundedIcon />
                    File PDF
                  </a>
                </Grid>
              </Grid>
            );
          })}
          {femaleVersions.length === 0 && (
            <Box sx={{ mt: 3 }}>Chưa có phiên bản nào</Box>
          )}
        </Grid>

        {selected.male !== 0 &&
          selected.female !== 0 &&
          accepted.male === 0 &&
          accepted.female === 0 && (
            <Box sx={{ textAlign: "center" }}>
              <LoadingButton
                loading={updateMutation.isPending}
                variant={"contained"}
                sx={{ ...secondaryBtn, py: 2 }}
                onClick={handleConfirmVersion}
              >
                Xác Nhận Bản Thiết Kế
              </LoadingButton>
            </Box>
          )}
        {accepted.male !== 0 && accepted.female !== 0 && (
          <Box
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            Đang Chờ Duyệt...
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default CustomRequestDetail;
