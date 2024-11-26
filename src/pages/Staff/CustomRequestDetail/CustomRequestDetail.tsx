import { useNavigate, useParams } from "react-router-dom";
import styles from "./CustomRequestDetail.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Skeleton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { roundedPrimaryBtn } from "src/utils/styles";
import HoverCard from "src/components/product/HoverCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomRequestDetail } from "src/utils/querykey";
import {
  getCustomRequestDetail,
  putUpdateCustomRequest,
} from "src/services/customRequest.service";
import { useEffect, useState } from "react";
import { CustomRequestStatus, DesignCharacteristic } from "src/utils/enums";
import { getDiamondSpec } from "src/utils/functions";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { toast } from "react-toastify";
import { useAppSelector } from "src/utils/hooks";
import { postCreateConversation } from "src/services/conversation.service";
import CustomExpandIcon from "src/components/icon/CustomExpandIcon";

function CustomRequestDetail() {
  const [maleDesign, setMaleDesign] = useState<IDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<IDesign | null>(null);

  const { id } = useParams<{ id: string }>();
  const { id: staffId } = useAppSelector((state) => state.auth.userInfo);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: response } = useQuery({
    queryKey: [fetchCustomRequestDetail, id],

    queryFn: () => {
      if (id) return getCustomRequestDetail(+id);
    },
    enabled: !!id,
  });

  const statusMutation = useMutation({
    mutationFn: (data: IUpdateCRRequest) => {
      return putUpdateCustomRequest(data, +(id as string));
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đã nhận yêu cầu");
        queryClient.invalidateQueries({
          queryKey: [fetchCustomRequestDetail, id],
        });
      }

      if (response.errors) {
        response.errors.forEach((err) => {
          toast.error(err.description);
        });
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

  const handleAccept = () => {
    statusMutation.mutate({
      staffId,
      customRequestStatus: CustomRequestStatus.OnGoing,
    });
  };

  const handleChat = () => {
    if (response?.data?.customer)
      chatMutation.mutate({
        participants: [staffId, response.data.customer.id],
      });
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

  if (!maleDesign || !femaleDesign)
    return (
      <Grid container justifyContent={"center"} py={5}>
        <Grid container item xs={10} justifyContent={"center"}>
          <Skeleton
            variant="rectangular"
            width={"50%"}
            height={50}
            sx={{ my: 3 }}
          />
          <Skeleton variant="rectangular" width={"100%"} height={300} />

          <Skeleton
            variant="rectangular"
            width={"50%"}
            height={50}
            sx={{ my: 3 }}
          />
          <Skeleton variant="rectangular" width={"100%"} height={300} />
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>Yêu Cầu Thiết Kế</div>

      <Grid container justifyContent={"center"} mb={5}>
        <Grid container item xs={11} lg={9} className={styles.customer}>
          <fieldset style={{ width: "100%", padding: "1rem" }}>
            <legend className={styles.title}>Khách Hàng</legend>
            <Grid container mb={1}>
              <Grid item xs={3}>
                Tên tài khoản:
              </Grid>
              <Grid item>{response?.data?.customer.username}</Grid>
            </Grid>

            <Grid container mb={1}>
              <Grid item xs={3}>
                Email:
              </Grid>
              <Grid item>{response?.data?.customer.email}</Grid>
            </Grid>

            <Grid container>
              <Grid item xs={3}>
                Số điện thoại:
              </Grid>
              <Grid item>{response?.data?.customer.phone ?? "--"}</Grid>
            </Grid>
          </fieldset>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid container item xs={11} lg={9}>
          <div className={styles.title}>Thiết Kế Gốc</div>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          xs={11}
          lg={9}
          py={6}
          className={styles.sectionContainer}
        >
          <Grid container item xs={5.8} className={styles.section}>
            <div className={styles.title}>Bản Thiết Kế {maleDesign.name}</div>
            <Grid item xs={9}>
              <HoverCard
                shadow={true}
                file={maleDesign.blueprint.url}
                image={maleDesign.designMetalSpecifications[0].image.url}
              />
            </Grid>

            <Grid item xs={12} md={9} className={styles.info}>
              <div className={styles.gender}>
                <img src={male} />
                <span>Nam Tính</span>
              </div>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Chất Liệu</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {maleDesign.designMetalSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span>{item.metalSpecification.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Kim Cương</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {maleDesign.designDiamondSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span style={{ marginRight: 8 }}>
                              {item.diamondSpecification.shape}
                            </span>
                            {getDiamondSpec(item.diamondSpecification)}
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Trọng Lượng:
                </Grid>
                <div className={styles.item}>{maleDesign.metalWeight} Chỉ</div>
              </Grid>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Kim Cương Phụ:
                </Grid>
                <div className={styles.item}>
                  {maleDesign.sideDiamondsCount} Viên
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={5.8} className={styles.section}>
            <div className={styles.title}>Bản Thiết Kế {femaleDesign.name}</div>
            <Grid item xs={9}>
              <HoverCard
                shadow={true}
                file={femaleDesign.blueprint.url}
                image={femaleDesign.designMetalSpecifications[0].image.url}
              />
            </Grid>

            <Grid item xs={12} md={9} className={styles.info}>
              <div className={styles.gender}>
                <img src={female} />
                <span>Nữ Tính</span>
              </div>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Chất Liệu</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {femaleDesign.designMetalSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span>{item.metalSpecification.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Kim Cương</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {femaleDesign.designDiamondSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span style={{ marginRight: 8 }}>
                              {item.diamondSpecification.shape}
                            </span>
                            {getDiamondSpec(item.diamondSpecification)}
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Trọng Lượng:
                </Grid>
                <div className={styles.item}>
                  {femaleDesign.metalWeight} Chỉ
                </div>
              </Grid>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Kim Cương Phụ:
                </Grid>
                <div className={styles.item}>
                  {femaleDesign.sideDiamondsCount} Viên
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent={"center"} mt={5}>
            <Grid
              container
              item
              xs={8}
              md={6}
              gap={3}
              justifyContent={"center"}
            >
              {response?.data?.status === CustomRequestStatus.OnGoing && (
                <>
                  <Grid item>
                    <LoadingButton
                      loading={chatMutation.isPending}
                      variant="contained"
                      fullWidth
                      sx={roundedPrimaryBtn}
                      onClick={handleChat}
                    >
                      Chat Với Khách Hàng
                    </LoadingButton>
                  </Grid>

                  <Grid item>
                    <LoadingButton
                      disabled={chatMutation.isPending}
                      variant="contained"
                      fullWidth
                      sx={{ ...roundedPrimaryBtn, px: 3 }}
                      onClick={() =>
                        navigate(`/staff/custom-request/${id}/design-version`)
                      }
                    >
                      Qua Thiết Kế
                    </LoadingButton>
                  </Grid>
                </>
              )}

              {response?.data?.status === CustomRequestStatus.Canceled && (
                <LoadingButton
                  variant="contained"
                  fullWidth
                  sx={roundedPrimaryBtn}
                  disabled
                >
                  Đã Hủy Yêu Cầu
                </LoadingButton>
              )}

              {response?.data?.status === CustomRequestStatus.Waiting && (
                <LoadingButton
                  loading={statusMutation.isPending}
                  variant="contained"
                  fullWidth
                  sx={{ ...roundedPrimaryBtn, px: 3 }}
                  onClick={handleAccept}
                >
                  Nhận Yêu Cầu
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomRequestDetail;
