import { Button, Card, Chip, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./CraftingRequestDetail.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import HoverCard from "src/components/product/HoverCard";
import { roundedPrimaryBtn } from "src/utils/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCraftingRequests,
  putUpdateCraftingRequests,
} from "src/services/craftingRequest.service";
import { useEffect, useState } from "react";
import { fetchCraftingRequests } from "src/utils/querykey";
import { CraftingRequestStatus, DesignCharacteristic } from "src/utils/enums";
import RejectModal from "src/components/modal/craftingRequest/Reject.modal";
import { getDiamondSpec } from "src/utils/functions";
import { toast } from "react-toastify";
import { ChipColor } from "src/utils/constants";

function CraftingRequestDetail() {
  const [needApproval, setNeedApproval] = useState(true);
  const [openReject, setOpenReject] = useState(false);
  const [filterObj, setFilterObj] = useState<ICraftingRequestFilter | null>(
    null
  );

  const [maleRequest, setMaleRequest] = useState<ICraftingRequest | null>(null);
  const [femaleRequest, setFemaleRequest] = useState<ICraftingRequest | null>(
    null
  );

  const navigate = useNavigate();

  const { customerId } = useParams<{ customerId: string }>();

  const { data: response } = useQuery({
    queryKey: [fetchCraftingRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCraftingRequests(filterObj);
    },
    enabled: !!filterObj,
  });

  const mutation = useMutation({
    mutationFn: (data: IUpdateCraftingRequest) => {
      return putUpdateCraftingRequests(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đã chấp nhận yêu cầu gia công");
        navigate("/staff/crafting-request");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleReject = (
    firstCommentCrafting: string,
    secondCommentCrafting: string
  ) => {
    if (maleRequest && femaleRequest)
      mutation.mutate({
        firstCraftingRequestId: maleRequest.id,
        secondCraftingRequestId: femaleRequest.id,
        firstCommentCrafting,
        secondCommentCrafting,
        status: CraftingRequestStatus.Rejected,
      });
  };

  const handleAccept = () => {
    if (maleRequest && femaleRequest)
      mutation.mutate({
        firstCraftingRequestId: maleRequest.id,
        secondCraftingRequestId: femaleRequest.id,
        firstCommentCrafting: "Đã chấp nhận",
        secondCommentCrafting: "Đã chấp nhận",
        status: CraftingRequestStatus.Accepted,
      });
  };

  useEffect(() => {
    if (customerId)
      setFilterObj({
        page: 0,
        pageSize: 100,
        // status: CraftingRequestStatus.Pending,
        customerId: +customerId,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response?.data) {
      // if (response.data.items.length === 0) navigate("/staff/crafting-request");

      const pendingRequests = response.data.items.filter(
        (item) => item.craftingRequestStatus === CraftingRequestStatus.Pending
      );

      if (pendingRequests.length === 2) {
        const maleRequest = pendingRequests.find(
          (item) =>
            item.customDesign.designVersion.design.characteristic ===
            DesignCharacteristic.Male
        );

        const femaleRequest = pendingRequests.find(
          (item) =>
            item.customDesign.designVersion.design.characteristic ===
            DesignCharacteristic.Female
        );

        if (maleRequest && femaleRequest) {
          setMaleRequest(maleRequest);
          setFemaleRequest(femaleRequest);
        }
      } else setNeedApproval(false);
    }

    if (response?.errors) {
      navigate("/staff/crafting-request");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (!response?.data)
    return (
      <Grid container justifyContent={"center"} my={10}>
        <Grid container item xs={8} justifyContent={"space-between"}>
          <Grid container item xs={5.8} gap={1}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>

          <Grid container item xs={5.8} gap={1}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>
        </Grid>
      </Grid>
    );

  if (needApproval && maleRequest && femaleRequest)
    return (
      <div className={styles.container}>
        <div className={styles.title}>Yêu Cầu Gia Công</div>

        <Grid container justifyContent={"center"}>
          <Grid container item lg={10} justifyContent={"space-between"}>
            <Grid item md={5}>
              <HoverCard
                image={maleRequest.customDesign.designVersion.image.url}
                file={maleRequest.customDesign.blueprint.url}
                shadow={true}
              />
              <div className={styles.label}>
                <img src={male} />
                <span>Nhẫn Nam</span>
              </div>

              <div className={styles.info}>
                <div className={styles.row}>
                  <div className={styles.field}>Chất liệu</div>
                  <div className={styles.value}>
                    {maleRequest.metalSpecification.name}
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Kim cương</div>
                  <div className={styles.value}>
                    {maleRequest.diamondSpecification.shape}{" "}
                    {getDiamondSpec(maleRequest.diamondSpecification)}
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Kích thước</div>
                  <div className={styles.value}>{maleRequest.fingerSize}</div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Trọng lượng</div>
                  <div className={styles.value}>
                    {maleRequest.customDesign.metalWeight} chỉ
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Khắc chữ</div>
                  <div className={styles.value}>{maleRequest.engraving}</div>
                </div>
              </div>
            </Grid>

            <Grid item md={5}>
              <HoverCard
                image={femaleRequest.customDesign.designVersion.image.url}
                file={femaleRequest.customDesign.blueprint.url}
                shadow={true}
              />
              <div className={styles.label}>
                <img src={female} />
                <span>Nhẫn Nữ</span>
              </div>

              <div className={styles.info}>
                <div className={styles.row}>
                  <div className={styles.field}>Chất liệu</div>
                  <div className={styles.value}>
                    {femaleRequest.metalSpecification.name}
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Kim cương</div>
                  <div className={styles.value}>
                    {femaleRequest.diamondSpecification.shape}{" "}
                    {getDiamondSpec(femaleRequest.diamondSpecification)}
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Kích thước</div>
                  <div className={styles.value}>{femaleRequest.fingerSize}</div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Trọng lượng</div>
                  <div className={styles.value}>
                    {femaleRequest.customDesign.metalWeight} chỉ
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Khắc chữ</div>
                  <div className={styles.value}>{femaleRequest.engraving}</div>
                </div>
              </div>
            </Grid>

            <Grid
              container
              item
              xs={12}
              justifyContent={"center"}
              mt={3}
              gap={3}
            >
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={roundedPrimaryBtn}
                  onClick={handleAccept}
                >
                  Chấp Nhận
                </Button>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={roundedPrimaryBtn}
                  onClick={() => setOpenReject(true)}
                >
                  Từ Chối
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <RejectModal
          open={openReject}
          setOpen={setOpenReject}
          handleReject={handleReject}
        />
      </div>
    );
  else return <PastRequests data={response.data.items} />;
}

const PastRequests = (props: IPastRequestsProps) => {
  const { data } = props;

  const formatStatus = (
    status: CraftingRequestStatus
  ): { text: string; color: ChipColor } => {
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

  return (
    <Grid container justifyContent={"center"} className={styles.container}>
      <Grid item xs={11} lg={10}>
        <div className={styles.title}>Yêu Cầu Gia Công</div>
      </Grid>

      <Grid item xs={11} lg={10}>
        {data &&
          data.map((item) => {
            const gender =
              item.customDesign.designVersion.design.characteristic;

            return (
              <Card className={styles.cardContainer} key={item.id}>
                <Grid container p={3} justifyContent={"space-between"}>
                  <Grid item xs={12} md={2.5} mb={{ xs: 2, md: 0 }}>
                    <HoverCard
                      file={item.customDesign.blueprint.url}
                      image={item.customDesign.designVersion.image.url}
                      shadow={true}
                    />
                  </Grid>
                  <Grid container item xs={12} lg={9}>
                    <Grid container item flex={1}>
                      <Grid
                        container
                        item
                        flex={1}
                        alignItems={"center"}
                        py={{ xs: 0, md: 2 }}
                      >
                        <Grid
                          item
                          xs={12}
                          className={styles.gender}
                          my={{ xs: 1, md: 0 }}
                        >
                          <img
                            src={
                              gender === DesignCharacteristic.Male
                                ? male
                                : female
                            }
                            width={15}
                          />
                          Nhẫn{" "}
                          {gender === DesignCharacteristic.Male ? "nam" : "nữ"}
                        </Grid>

                        <Grid item xs={12} mb={{ xs: 1, md: 0 }}>
                          Trọng lượng: {item.customDesign.metalWeight} chỉ
                        </Grid>

                        <Grid container>
                          <Grid item xs={12} md={7} mb={{ xs: 1, md: 0 }}>
                            Chất liệu: {item.metalSpecification.name}
                          </Grid>
                          <Grid item xs={12} md={5} mb={{ xs: 1, md: 0 }}>
                            Kích thước: {item.fingerSize}
                          </Grid>
                        </Grid>

                        <Grid container item xs={12}>
                          <Grid item xs={12} md={7} mb={{ xs: 1, md: 0 }}>
                            Kim cương: {item.diamondSpecification.shape}{" "}
                            {getDiamondSpec(item.diamondSpecification)}
                          </Grid>
                          <Grid item xs={12} md={5}>
                            Khắc chữ: {item.engraving}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Chip
                        label={formatStatus(item.craftingRequestStatus).text}
                        color={formatStatus(item.craftingRequestStatus).color}
                        variant="filled"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default CraftingRequestDetail;
