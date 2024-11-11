import {
  Button,
  Card,
  Divider,
  Grid,
  Pagination,
  Skeleton,
} from "@mui/material";
import styles from "./DesignVersions.module.scss";
import menring from "src/assets/sampledata/menring.png";
import blueprint from "src/assets/sampledata/blueprint.pdf";
import HoverCard from "src/components/product/HoverCard";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { roundedPrimaryBtn } from "src/utils/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddModal from "src/components/modal/version/Add.modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCustomRequestDetail,
  fetchFemaleDesignVersions,
  fetchMaleDesignVersions,
} from "src/utils/querykey";
import { getCustomRequestDetail } from "src/services/customRequest.service";
import { CustomRequestStatus, DesignCharacteristic } from "src/utils/enums";
import { getDesignVersions } from "src/services/designVersion.service";

const initMetaData = {
  page: 0,
  pageSize: 3,
  totalPages: 0,
  count: 0,
};

function DesignVersions() {
  const [open, setOpen] = useState(false);
  const [maleDesign, setMaleDesign] = useState<IDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<IDesign | null>(null);

  const [maleMetaData, setMaleMetaData] = useState<IListMetaData>(initMetaData);
  const [maleFilterObj, setMaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const [femaleMetaData, setFemaleMetaData] =
    useState<IListMetaData>(initMetaData);
  const [femaleFilterObj, setFemaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

          {[1, 2, 3].map((item) => {
            return (
              <Grid item md={3} key={item}>
                <Card className={styles.version}>
                  <HoverCard image={menring} file={blueprint} />
                  <div className={styles.versionNo}>Version {item}</div>
                  {item === 1 && <CheckCircleIcon color="success" />}
                </Card>
              </Grid>
            );
          })}

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

          {[1, 2].map((item) => {
            return (
              <Grid item md={3} key={item}>
                <Card className={styles.version}>
                  <HoverCard image={menring} file={blueprint} />
                  <div className={styles.versionNo}>Version {item}</div>
                </Card>
              </Grid>
            );
          })}

          <Grid item xs={12} md={3} onClick={() => setOpen(true)}>
            <Card className={`${styles.version} ${styles.addVersion}`}>
              <AddBoxOutlinedIcon className={styles.addIcon} />
              <div className={styles.addText}>Tạo Bản Mới</div>
            </Card>
          </Grid>

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
          <Button variant="contained" sx={roundedPrimaryBtn} fullWidth>
            Xác Nhận Tạo
          </Button>
        </Grid>
      </Grid>

      <AddModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default DesignVersions;
