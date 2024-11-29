import {
  Divider,
  FormHelperText,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NoteAltSharpIcon from "@mui/icons-material/NoteAltSharp";
import moment from "moment";
import { formatCustomRequestStatus } from "src/utils/functions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DesignCharacteristic, UserRole } from "src/utils/enums";
import styles from "./CustomRequest.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { getDesignVersions } from "src/services/designVersion.service";
import {
  fetchFemaleDesignVersions,
  fetchMaleDesignVersions,
} from "src/utils/querykey";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "src/utils/hooks";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function CustomRequest(props: ICustomRequestProps) {
  const { data } = props;

  const [maleDesign, setMaleDesign] = useState<IDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<IDesign | null>(null);

  const [maleVersions, setMaleVersions] = useState<IDesignVersion[]>([]);
  const [maleFilterObj, setMaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const [femaleVersions, setFemaleVersions] = useState<IDesignVersion[]>([]);
  const [femaleFilterObj, setFemaleFilterObj] =
    useState<IDesignVersionFilter | null>(null);

  const navigate = useNavigate();

  const { id: userId, role } = useAppSelector((state) => state.auth.userInfo);

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

  const handleNavigate = () => {
    if (role === UserRole.Customer)
      navigate(`/customer/support/custom-request/detail/${data.id}`);

    if (role === UserRole.Staff)
      navigate(`/staff/custom-request/${data.id}/design-version`);
  };

  useEffect(() => {
    if (data) {
      const maleDesign = data.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Male
      );
      const femaleDesign = data.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Female
      );

      if (maleDesign && femaleDesign) {
        setMaleDesign(maleDesign);
        setFemaleDesign(femaleDesign);
      }
    }
  }, [data]);

  useEffect(() => {
    if (maleDesign)
      setMaleFilterObj({
        page: 0,
        pageSize: 100,
        designId: maleDesign.id,
        customerId: role === UserRole.Customer ? userId : data.customer.id,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maleDesign]);

  useEffect(() => {
    if (femaleDesign)
      setFemaleFilterObj({
        page: 0,
        pageSize: 100,
        designId: femaleDesign.id,
        customerId: role === UserRole.Customer ? userId : data.customer.id,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <Grid container className={styles.container}>
      <ListItem>
        <ListItemButton
          sx={{ border: "1px solid #ccc" }}
          onClick={handleNavigate}
        >
          <ListItemIcon>
            <NoteAltSharpIcon color="warning" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ color: "#ed6c02" }}
            primary={formatCustomRequestStatus(data.status).text}
            secondary={`Ngày Tạo: ${moment(data.createdAt).format(
              "DD/MM/YYYY"
            )}`}
          />
        </ListItemButton>
      </ListItem>

      <Grid
        container
        p={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item xs={3.5}>
          <img
            src={maleDesign?.designMetalSpecifications[0].image.url}
            className={styles.designImg}
          />
        </Grid>

        <Grid item xs={7.5}>
          <FormHelperText>Bản Thiết kế {maleDesign?.name}</FormHelperText>
          <FormHelperText>
            <img src={male} width={12} /> {"Nam Tính"}
          </FormHelperText>
          <FormHelperText>
            Khối lượng: {maleDesign?.metalWeight} Chỉ
          </FormHelperText>
        </Grid>
      </Grid>

      <Grid container p={2} pt={0}>
        {maleVersions.map((item) => {
          return (
            <Grid container mb={2} className={styles.version} key={item.id}>
              <Grid item xs={3.5}>
                <img src={item.image.url} className={styles.designImg} />
              </Grid>

              <Grid container item xs={7.5} gap={0.5}>
                <Grid container gap={1}>
                  <FormHelperText>
                    Version {item.versionNumber} {item.isOld && "(Cũ)"}
                  </FormHelperText>
                  {item.isAccepted && (
                    <CheckCircleIcon fontSize="small" color="success" />
                  )}
                </Grid>

                <Grid container>
                  <a
                    download={""}
                    href={item.designFile.url}
                    className={styles.download}
                  >
                    <DownloadSharpIcon fontSize="inherit" />
                    <span>File thiết kế</span>
                  </a>
                </Grid>

                <FormHelperText>
                  Ngày tạo: {moment(item.createdAt).format("DD/MM/YYYY")}
                </FormHelperText>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Grid container px={2} pb={2}>
        <Divider sx={{ width: "100%" }} />
      </Grid>

      <Grid
        container
        p={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item xs={3.5}>
          <img
            src={femaleDesign?.designMetalSpecifications[0].image.url}
            className={styles.designImg}
          />
        </Grid>

        <Grid item xs={7.5}>
          <FormHelperText>Bản Thiết kế {femaleDesign?.name}</FormHelperText>
          <FormHelperText>
            <img src={female} width={12} /> {"Nữ Tính"}
          </FormHelperText>
          <FormHelperText>
            Khối lượng: {femaleDesign?.metalWeight} Chỉ
          </FormHelperText>
        </Grid>
      </Grid>

      <Grid container p={2} pt={0}>
        {femaleVersions.map((item) => {
          return (
            <Grid container mb={2} className={styles.version} key={item.id}>
              <Grid item xs={3.5}>
                <img src={item.image.url} className={styles.designImg} />
              </Grid>

              <Grid container item xs={7.5} gap={0.5}>
                <Grid container gap={1}>
                  <FormHelperText>
                    Version {item.versionNumber} {item.isOld && "(Cũ)"}
                  </FormHelperText>
                  {item.isAccepted && (
                    <CheckCircleIcon fontSize="small" color="success" />
                  )}
                </Grid>

                <Grid container>
                  <a
                    download={""}
                    href={item.designFile.url}
                    className={styles.download}
                  >
                    <DownloadSharpIcon fontSize="inherit" />
                    <span>File thiết kế</span>
                  </a>
                </Grid>

                <FormHelperText>
                  Ngày tạo: {moment(item.createdAt).format("DD/MM/YYYY")}
                </FormHelperText>
              </Grid>
            </Grid>
          );
        })}

        <Divider sx={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
}

export default CustomRequest;
