import { Box, Button, Chip, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./CraftingRequests.module.scss";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCraftingRequests, fetchCustomDesigns } from "src/utils/querykey";
import { getCustomDesigns } from "src/services/customDesign.service";
import { useEffect, useState } from "react";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import {
  CraftingRequestStatus,
  DesignCharacteristic,
  Status,
} from "src/utils/enums";
import { getCraftingRequests } from "src/services/craftingRequest.service";
import { getDiamondSpec } from "src/utils/functions";
import { ChipColor } from "src/utils/constants";

function CraftingRequests() {
  const [maleDesign, setMaleDesign] = useState<ICustomDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<ICustomDesign | null>(null);

  const [designFilterObj, setDesignFilterObj] =
    useState<ICustomDesignFilter | null>(null);
  const [maleRequestFilterObj, setMaleRequestFilterObj] =
    useState<ICraftingRequestFilter | null>(null);
  const [femaleRequestFilterObj, setFemaleRequestFilterObj] =
    useState<ICraftingRequestFilter | null>(null);

  const navigate = useNavigate();

  const { id } = useAppSelector((state) => state.auth.userInfo);

  const { data: designResponse, isLoading: designLoading } = useQuery({
    queryKey: [fetchCustomDesigns, designFilterObj],

    queryFn: () => {
      if (designFilterObj) return getCustomDesigns(designFilterObj);
    },
    enabled: !!designFilterObj,
  });

  const { data: maleRequestResponse, isLoading: maleRequestLoading } = useQuery(
    {
      queryKey: [fetchCraftingRequests, maleRequestFilterObj],

      queryFn: () => {
        if (maleRequestFilterObj)
          return getCraftingRequests(maleRequestFilterObj);
      },
      enabled: !!maleRequestFilterObj,
    }
  );

  const { data: femaleRequestResponse, isLoading: femaleRequestLoading } =
    useQuery({
      queryKey: [fetchCraftingRequests, femaleRequestFilterObj],

      queryFn: () => {
        if (femaleRequestFilterObj)
          return getCraftingRequests(femaleRequestFilterObj);
      },
      enabled: !!femaleRequestFilterObj,
    });

  const formatStatus = (
    status: CraftingRequestStatus
  ): { text: string; color: ChipColor } => {
    if (status === CraftingRequestStatus.Pending)
      return {
        text: "Đang duyệt",
        color: "warning",
      };

    if (status === CraftingRequestStatus.Rejected)
      return {
        text: "Từ chối",
        color: "error",
      };

    return {
      text: "Đã duyệt",
      color: "success",
    };
  };

  const canCreate = () => {
    if (maleRequestResponse?.data && femaleRequestResponse?.data) {
      const malePending = maleRequestResponse.data.items.find(
        (item) => item.craftingRequestStatus === CraftingRequestStatus.Pending
      );

      const femalePending = femaleRequestResponse.data.items.find(
        (item) => item.craftingRequestStatus === CraftingRequestStatus.Pending
      );

      if (!malePending && !femalePending) return true;
      else return false;
    } else return false;
  };

  useEffect(() => {
    setDesignFilterObj({
      page: 0,
      pageSize: 100,
      state: Status.Active,
      customerId: id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (designResponse?.data) {
      const maleDesign = designResponse.data.items.find(
        (item) =>
          item.designVersion.design.characteristic === DesignCharacteristic.Male
      );

      const femaleDesign = designResponse.data.items.find(
        (item) =>
          item.designVersion.design.characteristic ===
          DesignCharacteristic.Female
      );

      if (maleDesign && femaleDesign) {
        setMaleDesign(maleDesign);
        setFemaleDesign(femaleDesign);
      } else {
        setMaleDesign(null);
        setFemaleDesign(null);
      }
    }
  }, [designResponse]);

  useEffect(() => {
    if (maleDesign)
      setMaleRequestFilterObj({
        page: 0,
        pageSize: 100,
        customDesignId: maleDesign.id,
      });
  }, [maleDesign]);

  useEffect(() => {
    if (femaleDesign)
      setFemaleRequestFilterObj({
        page: 0,
        pageSize: 100,
        customDesignId: femaleDesign.id,
      });
  }, [femaleDesign]);

  useScrollTop();

  if (designLoading || maleRequestLoading || femaleRequestLoading)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid item xs={9}>
          <Skeleton variant="rectangular" width={"100%"} height={60} />
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={200}
            sx={{ my: 3 }}
          />
        </Grid>

        <Grid item xs={9} mb={5}>
          <Skeleton variant="rectangular" width={"100%"} height={60} />
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={200}
            sx={{ my: 3 }}
          />
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid
        container
        item
        xs={11}
        lg={10}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={7}
      >
        <Box sx={{ mb: 3 }} className={styles.title}>
          Yêu Cầu Gia Công
        </Box>
        {maleDesign && femaleDesign && canCreate() && (
          <Button
            variant="contained"
            sx={{ ...secondaryBtn, mb: 3 }}
            onClick={() =>
              navigate("/customer/support/crafting-request/create")
            }
          >
            Tạo Yêu Cầu
          </Button>
        )}
      </Grid>

      {maleDesign && (
        <>
          <Grid container item xs={11} lg={10}>
            <Box sx={{ marginBottom: "2.5rem" }}>
              <span className={styles.subtitle}>Thiết Kế Của Bạn</span>
            </Box>
          </Grid>

          <Grid
            container
            item
            xs={11}
            lg={10}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
          >
            <Grid container item md={3.9} mb={3}>
              <Grid container item md={10} mb={5}>
                <img
                  src={maleDesign.designVersion.image.url}
                  className={styles.ringImg}
                />
              </Grid>

              <Grid
                container
                item
                md={10}
                mb={2}
                justifyContent={"space-between"}
              >
                <Grid item>File thiết kế:</Grid>
                <a
                  download={""}
                  href={maleDesign.blueprint.url}
                  className={styles.download}
                >
                  <DownloadRoundedIcon />
                  Tải Về
                </a>
              </Grid>

              <Grid
                container
                item
                md={10}
                mb={2}
                justifyContent={"space-between"}
              >
                <Grid item>Trọng lượng:</Grid>
                <div>{maleDesign.metalWeight} Chỉ</div>
              </Grid>

              <Grid
                container
                item
                md={10}
                mb={2}
                justifyContent={"space-between"}
              >
                <Grid item>Số kim cương phụ:</Grid>
                <div>{maleDesign.sideDiamondsCount} Viên</div>
              </Grid>
            </Grid>

            <Grid container item md={8}>
              {maleRequestResponse?.data?.items.map((item) => {
                return (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    lg={5.8}
                    className={styles.request}
                  >
                    <Chip
                      label={formatStatus(item.craftingRequestStatus).text}
                      color={formatStatus(item.craftingRequestStatus).color}
                      className={styles.status}
                    />
                    <Grid container gap={5} mb={1} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Kim Cương
                      </div>
                      <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                        {getDiamondSpec(item.diamondSpecification)}
                      </div>
                    </Grid>
                    <Grid container gap={6} mb={1} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Chất Liệu
                      </div>
                      <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                        {item.metalSpecification.name}
                      </div>
                    </Grid>
                    <Grid container gap={6} mb={1} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Khắc Chữ
                      </div>
                      <div style={{ fontWeight: 300 }}>
                        {item.engraving ? item.engraving : "None"}
                      </div>
                    </Grid>
                    <Grid container gap={4.5} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Kích Thước
                      </div>
                      <div style={{ fontWeight: 300 }}>{item.fingerSize}</div>
                    </Grid>
                  </Grid>
                );
              })}

              {maleRequestResponse?.data?.items.length === 0 && (
                <div>Chưa tạo yêu cầu nào</div>
              )}
            </Grid>
          </Grid>
        </>
      )}

      {!maleDesign && !femaleDesign && (
        <Grid container item xs={10}>
          Chưa có bản thiết kế nào
        </Grid>
      )}
      <Grid container item xs={10}>
        <Divider sx={{ width: "100%", mt: 8, mb: 10 }} />
      </Grid>

      {femaleDesign && (
        <>
          <Grid container item xs={11} lg={10}>
            <Box sx={{ marginBottom: "2.5rem" }}>
              <span className={styles.subtitle}>Thiết Kế Của Bạn Đời</span>
            </Box>
          </Grid>

          <Grid
            container
            item
            xs={11}
            lg={10}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
          >
            <Grid container item md={3.9} mb={3}>
              <Grid container item md={10} mb={5}>
                <img
                  src={femaleDesign.designVersion.image.url}
                  className={styles.ringImg}
                />
              </Grid>

              <Grid
                container
                item
                md={10}
                mb={2}
                justifyContent={"space-between"}
              >
                <Grid item>File thiết kế:</Grid>
                <a
                  download={""}
                  href={femaleDesign.blueprint.url}
                  className={styles.download}
                >
                  <DownloadRoundedIcon />
                  Tải Về
                </a>
              </Grid>

              <Grid
                container
                item
                md={10}
                mb={2}
                justifyContent={"space-between"}
              >
                <Grid item>Trọng lượng:</Grid>
                <div>{femaleDesign.metalWeight} Chỉ</div>
              </Grid>

              <Grid
                container
                item
                md={10}
                mb={2}
                justifyContent={"space-between"}
              >
                <Grid item>Số kim cương phụ:</Grid>
                <div>{femaleDesign.sideDiamondsCount} Viên</div>
              </Grid>
            </Grid>

            <Grid container item md={8}>
              {femaleRequestResponse?.data?.items.map((item) => {
                return (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    lg={5.8}
                    className={styles.request}
                  >
                    <Chip
                      label={formatStatus(item.craftingRequestStatus).text}
                      color={formatStatus(item.craftingRequestStatus).color}
                      className={styles.status}
                    />
                    <Grid container gap={5} mb={1} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Kim Cương
                      </div>
                      <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                        {getDiamondSpec(item.diamondSpecification)}
                      </div>
                    </Grid>
                    <Grid container gap={6} mb={1} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Chất Liệu
                      </div>
                      <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                        {item.metalSpecification.name}
                      </div>
                    </Grid>
                    <Grid container gap={6} mb={1} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Khắc Chữ
                      </div>
                      <div style={{ fontWeight: 300 }}>
                        {item.engraving ? item.engraving : "None"}
                      </div>
                    </Grid>
                    <Grid container gap={4.5} alignItems={"center"}>
                      <div className={styles.label}>
                        <ArrowRightRoundedIcon />
                        Kích Thước
                      </div>
                      <div style={{ fontWeight: 300 }}>{item.fingerSize}</div>
                    </Grid>
                  </Grid>
                );
              })}

              {femaleRequestResponse?.data?.items.length === 0 && (
                <div>Chưa tạo yêu cầu nào</div>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default CraftingRequests;
