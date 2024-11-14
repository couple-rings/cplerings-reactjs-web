import { useNavigate, useParams } from "react-router-dom";
import styles from "./CustomRequestDetail.module.scss";
import { Grid, Skeleton } from "@mui/material";
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
        navigate("/staff");
      }

      // chat conversation already exist
      if (response.statusCode === 409) {
        navigate("/staff");
      }

      if (response.error && response.statusCode !== 409) {
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
    chatMutation.mutate({
      participants: [staffId],
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
      <div className={styles.title}>Bản Thiết Kế {maleDesign.name}</div>
      <Grid container item xs={12} justifyContent={"center"}>
        <Grid container className={styles.section}>
          <Grid item xs={12} md={4}>
            <HoverCard
              file={maleDesign.blueprint.url}
              image={maleDesign.designMetalSpecifications[0].image.url}
            />
          </Grid>

          <Grid item xs={12} md={7.5} className={styles.right}>
            <div className={styles.gender}>
              <img src={male} />
              <span>Nam Giới</span>
            </div>

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Chất Liệu:
              </Grid>
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

            <Grid container gap={3} my={2} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Kim Cương:
              </Grid>
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

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.7} className={styles.label}>
                Trọng Lượng:
              </Grid>
              <div className={styles.item}>{maleDesign.metalWeight} chỉ</div>
            </Grid>
          </Grid>
        </Grid>

        <div className={styles.title}>Bản Thiết Kế {femaleDesign.name}</div>
        <Grid container className={styles.section}>
          <Grid item xs={12} md={4}>
            <HoverCard
              file={femaleDesign.blueprint.url}
              image={femaleDesign.designMetalSpecifications[0].image.url}
            />
          </Grid>

          <Grid item xs={12} md={7.5} className={styles.right}>
            <div className={styles.gender}>
              <img src={female} />
              <span>Nữ Giới</span>
            </div>

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Chất Liệu:
              </Grid>
              <div>
                {femaleDesign.designMetalSpecifications.map((item) => {
                  return (
                    <div key={item.id} className={styles.item}>
                      <ArrowRightRoundedIcon /> {item.metalSpecification.name}
                    </div>
                  );
                })}
              </div>
            </Grid>

            <Grid container gap={3} my={2} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Kim Cương:
              </Grid>
              <div>
                {femaleDesign.designDiamondSpecifications.map((item) => {
                  return (
                    <div key={item.id} className={styles.item}>
                      <ArrowRightRoundedIcon />{" "}
                      <span style={{ marginRight: 8 }}>
                        {item.diamondSpecification.shape}
                      </span>{" "}
                      {getDiamondSpec(item.diamondSpecification)}
                    </div>
                  );
                })}
              </div>
            </Grid>

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.7} className={styles.label}>
                Trọng Lượng:
              </Grid>
              <div className={styles.item}>{femaleDesign.metalWeight} chỉ</div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid container item xs={8} md={4} gap={3}>
            {response?.data?.status === CustomRequestStatus.OnGoing && (
              <>
                <Grid item>
                  <LoadingButton
                    disabled
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
    </div>
  );
}

export default CustomRequestDetail;
