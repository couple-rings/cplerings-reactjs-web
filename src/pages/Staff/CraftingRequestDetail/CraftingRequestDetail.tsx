import {
  Button,
  Card,
  Chip,
  Divider,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
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
import {
  ConfigurationKey,
  CraftingDifficulty,
  CraftingRequestStatus,
  DesignCharacteristic,
} from "src/utils/enums";
import RejectModal from "src/components/modal/craftingRequest/Reject.modal";
import {
  currencyFormatter,
  formatCraftingRequestStatus,
  getDiamondSpec,
} from "src/utils/functions";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppSelector } from "src/utils/hooks";
import { metalWeightUnit } from "src/utils/constants";

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

  const [malePrice, setMalePrice] = useState(0);
  const [femalePrice, setFemalePrice] = useState(0);

  const [maleDifficulty, setMaleDifficulty] = useState(
    CraftingDifficulty.Normal
  );
  const [femaleDifficulty, setFemaleDifficulty] = useState(
    CraftingDifficulty.Normal
  );

  const navigate = useNavigate();

  const { customerId } = useParams<{ customerId: string }>();

  const { configs } = useAppSelector((state) => state.config);

  const { data: response } = useQuery({
    queryKey: [fetchCraftingRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCraftingRequests(filterObj);
    },
    enabled: !!filterObj,
  });

  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;
  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;
  const craftingFee = configs.find(
    (item) => item.key === ConfigurationKey.CraftingFee
  )?.value;
  const difficultyMultiply = configs.find(
    (item) => item.key === ConfigurationKey.DifficultyMultiply
  )?.value;

  const mutation = useMutation({
    mutationFn: (data: IUpdateCraftingRequest) => {
      return putUpdateCraftingRequests(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        navigate("/staff/crafting-request");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleReject = async (
    firstCommentCrafting: string,
    secondCommentCrafting: string
  ) => {
    if (maleRequest && femaleRequest) {
      const response = await mutation.mutateAsync({
        firstCraftingRequestId: maleRequest.id,
        secondCraftingRequestId: femaleRequest.id,
        firstCommentCrafting,
        secondCommentCrafting,
        status: CraftingRequestStatus.Rejected,
        firstCraftingRequestDifficulty: maleDifficulty,
        secondCraftingRequestDifficulty: femaleDifficulty,
      });

      if (response.data) {
        toast.success("Đã từ chối yêu cầu gia công");
      }
    }
  };

  const handleAccept = async () => {
    if (maleRequest && femaleRequest) {
      const response = await mutation.mutateAsync({
        firstCraftingRequestId: maleRequest.id,
        secondCraftingRequestId: femaleRequest.id,
        firstCommentCrafting: "Đã chấp nhận",
        secondCommentCrafting: "Đã chấp nhận",
        status: CraftingRequestStatus.Accepted,
        firstCraftingRequestDifficulty: maleDifficulty,
        secondCraftingRequestDifficulty: femaleDifficulty,
      });

      if (response.data) {
        toast.success("Đã chấp nhận yêu cầu gia công");
      }
    }
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

  useEffect(() => {
    if (maleRequest && femaleRequest) {
      if (
        profitRatio &&
        sideDiamondPrice &&
        craftingFee &&
        difficultyMultiply
      ) {
        const maleDesign = maleRequest.customDesign;
        const maleCraftingFee =
          maleDifficulty === CraftingDifficulty.Normal
            ? +craftingFee
            : +craftingFee * +difficultyMultiply;

        const femaleDesign = femaleRequest.customDesign;
        const femaleCraftingFee =
          femaleDifficulty === CraftingDifficulty.Normal
            ? +craftingFee
            : +craftingFee * +difficultyMultiply;

        const firstDesignPrice =
          (maleDesign.metalWeight *
            metalWeightUnit *
            maleRequest.metalSpecification.pricePerUnit +
            maleRequest.diamondSpecification.price +
            maleDesign.sideDiamondsCount * +sideDiamondPrice +
            maleCraftingFee) *
          +profitRatio;

        const secondDesignPrice =
          (femaleDesign.metalWeight *
            metalWeightUnit *
            femaleRequest.metalSpecification.pricePerUnit +
            femaleRequest.diamondSpecification.price +
            femaleDesign.sideDiamondsCount * +sideDiamondPrice +
            femaleCraftingFee) *
          +profitRatio;

        const malePrice = Math.round(firstDesignPrice / 1000) * 1000;
        const femalePrice = Math.round(secondDesignPrice / 1000) * 1000;

        setMalePrice(malePrice);
        setFemalePrice(femalePrice);
      }
    }
  }, [
    craftingFee,
    difficultyMultiply,
    femaleDifficulty,
    femaleRequest,
    maleDifficulty,
    maleRequest,
    profitRatio,
    sideDiamondPrice,
  ]);

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

  if (
    needApproval &&
    maleRequest &&
    femaleRequest &&
    sideDiamondPrice &&
    craftingFee &&
    difficultyMultiply
  )
    return (
      <div className={styles.container}>
        <Grid container mb={7} justifyContent={"center"}>
          <Grid container item xs={11} lg={10} gap={5} mb={5}>
            <Grid item className={styles.title}>
              Yêu Cầu Gia Công
            </Grid>

            <Chip label={"Đang chờ duyệt"} color="warning" />
          </Grid>

          <Grid container item xs={11} lg={10}>
            <Grid item xs={12} md={5.5}>
              <fieldset style={{ margin: 0 }}>
                <legend>Khách Hàng</legend>
                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Tên tài khoản:</Grid>

                  <Grid item>{maleRequest.customer.username}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Email:</Grid>

                  <Grid item>{maleRequest.customer.email}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"}>
                  <Grid item>Số điện thoại:</Grid>

                  <Grid item>
                    {maleRequest.customer.phone
                      ? maleRequest.customer.phone
                      : "--"}
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid container item xs={11} lg={10} justifyContent={"space-between"}>
            <Grid item md={5.5}>
              <Grid container justifyContent={"center"}>
                <Grid item>
                  <HoverCard
                    image={maleRequest.customDesign.designVersion.image.url}
                    file={maleRequest.customDesign.blueprint.url}
                    shadow={true}
                  />
                </Grid>
              </Grid>

              <fieldset style={{ margin: 0 }}>
                <legend>
                  <Grid item xs={12} my={2} className={styles.label}>
                    <img src={male} />
                    <span>Nhẫn Nam</span>
                  </Grid>
                </legend>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Dành cho:</Grid>

                  <Grid item>{maleRequest.customDesign.spouse.fullName}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Số CCCD:</Grid>

                  <Grid item>{maleRequest.customDesign.spouse.citizenId}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"}>
                  <Grid item>Ngày tạo:</Grid>

                  <Grid item>
                    {moment(maleRequest.createdAt).format("DD/MM/YYYY")}
                  </Grid>
                </Grid>
              </fieldset>

              <Grid container mt={3}>
                <FormLabel sx={{ mb: 1 }}>Độ phức tạp</FormLabel>
                <Select
                  fullWidth
                  variant="standard"
                  value={maleDifficulty}
                  onChange={(e) => {
                    setMaleDifficulty(e.target.value as CraftingDifficulty);
                  }}
                >
                  <MenuItem value={CraftingDifficulty.Normal}>
                    Bình thường
                  </MenuItem>
                  <MenuItem value={CraftingDifficulty.Hard}>Khó</MenuItem>
                </Select>
              </Grid>

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
                  <div className={styles.field}>Khối lượng</div>
                  <div className={styles.value}>
                    {maleRequest.customDesign.metalWeight} chỉ
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Kim cương phụ</div>
                  <div className={styles.value}>
                    {maleRequest.customDesign.sideDiamondsCount} viên
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Khắc chữ</div>
                  <div className={styles.value}>{maleRequest.engraving}</div>
                </div>

                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Giá vàng (/gram)</div>
                  <div className={styles.value}>
                    {currencyFormatter(
                      maleRequest.metalSpecification.pricePerUnit
                    )}
                  </div>
                </Grid>
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Kim cương chính</div>
                  <div className={styles.value}>
                    {currencyFormatter(maleRequest.diamondSpecification.price)}
                  </div>
                </Grid>
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Kim cương phụ</div>
                  <div className={styles.value}>
                    {currencyFormatter(
                      maleRequest.customDesign.sideDiamondsCount *
                        +sideDiamondPrice
                    )}
                  </div>
                </Grid>
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Phí gia công</div>
                  <div className={styles.value}>
                    {maleDifficulty === CraftingDifficulty.Normal
                      ? currencyFormatter(+craftingFee)
                      : currencyFormatter(+craftingFee * +difficultyMultiply)}
                  </div>
                </Grid>

                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />
                <div className={styles.row}>
                  <div className={styles.field}>Tổng tiền</div>
                  <div className={styles.value}>
                    {currencyFormatter(malePrice)}
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item md={5.5}>
              <Grid container justifyContent={"center"}>
                <Grid item>
                  <HoverCard
                    image={femaleRequest.customDesign.designVersion.image.url}
                    file={femaleRequest.customDesign.blueprint.url}
                    shadow={true}
                  />
                </Grid>
              </Grid>

              <fieldset style={{ margin: 0 }}>
                <legend>
                  <Grid item xs={12} my={2} className={styles.label}>
                    <img src={female} />
                    <span>Nhẫn Nữ</span>
                  </Grid>
                </legend>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Dành cho:</Grid>

                  <Grid item>{femaleRequest.customDesign.spouse.fullName}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Số CCCD:</Grid>

                  <Grid item>
                    {femaleRequest.customDesign.spouse.citizenId}
                  </Grid>
                </Grid>

                <Grid container justifyContent={"space-between"}>
                  <Grid item>Ngày tạo:</Grid>

                  <Grid item>
                    {moment(femaleRequest.createdAt).format("DD/MM/YYYY")}
                  </Grid>
                </Grid>
              </fieldset>

              <Grid container mt={3}>
                <FormLabel sx={{ mb: 1 }}>Độ phức tạp</FormLabel>
                <Select
                  fullWidth
                  variant="standard"
                  value={femaleDifficulty}
                  onChange={(e) => {
                    setFemaleDifficulty(e.target.value as CraftingDifficulty);
                  }}
                >
                  <MenuItem value={CraftingDifficulty.Normal}>
                    Bình thường
                  </MenuItem>
                  <MenuItem value={CraftingDifficulty.Hard}>Khó</MenuItem>
                </Select>
              </Grid>

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
                  <div className={styles.field}>Khối lượng</div>
                  <div className={styles.value}>
                    {femaleRequest.customDesign.metalWeight} chỉ
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Kim cương phụ</div>
                  <div className={styles.value}>
                    {femaleRequest.customDesign.sideDiamondsCount} viên
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

                <div className={styles.row}>
                  <div className={styles.field}>Khắc chữ</div>
                  <div className={styles.value}>{femaleRequest.engraving}</div>
                </div>

                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Giá vàng (/gram)</div>
                  <div className={styles.value}>
                    {currencyFormatter(
                      femaleRequest.metalSpecification.pricePerUnit
                    )}
                  </div>
                </Grid>
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Kim cương chính</div>
                  <div className={styles.value}>
                    {currencyFormatter(
                      femaleRequest.diamondSpecification.price
                    )}
                  </div>
                </Grid>
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Kim cương phụ</div>
                  <div className={styles.value}>
                    {currencyFormatter(
                      femaleRequest.customDesign.sideDiamondsCount *
                        +sideDiamondPrice
                    )}
                  </div>
                </Grid>
                <Grid container mb={1} className={styles.row}>
                  <div className={styles.field}>Phí gia công</div>
                  <div className={styles.value}>
                    {femaleDifficulty === CraftingDifficulty.Normal
                      ? currencyFormatter(+craftingFee)
                      : currencyFormatter(+craftingFee * +difficultyMultiply)}
                  </div>
                </Grid>

                <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />
                <div className={styles.row}>
                  <div className={styles.field}>Tổng tiền</div>
                  <div className={styles.value}>
                    {currencyFormatter(femalePrice)}
                  </div>
                </div>
              </div>
            </Grid>

            <Grid container flexDirection={"column"} gap={1} mt={3} mb={6}>
              <FormLabel>
                Tổng tiền = (Giá vàng x Lượng vàng x 3.75 + Giá kim cương chính
                + Giá kim cương phụ + Phí gia công) x Tỷ lệ lợi nhuận
              </FormLabel>
              <FormLabel>* 1 chỉ = {metalWeightUnit} gram</FormLabel>
              <FormLabel>* Tỷ lệ lợi nhuận = {profitRatio} </FormLabel>
              <FormLabel>
                * Kim cương phụ: {currencyFormatter(+sideDiamondPrice)}/viên
              </FormLabel>
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
                  onClick={() => setOpenReject(true)}
                >
                  Từ Chối
                </Button>
              </Grid>

              <Grid item xs={12} sm={4}>
                <LoadingButton
                  loading={mutation.isPending}
                  variant="contained"
                  fullWidth
                  sx={roundedPrimaryBtn}
                  onClick={handleAccept}
                >
                  Chấp Nhận
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <RejectModal
          open={openReject}
          setOpen={setOpenReject}
          handleReject={handleReject}
          loading={mutation.isPending}
        />
      </div>
    );
  else return <PastRequests data={response.data.items} />;
}

const PastRequests = (props: IPastRequestsProps) => {
  const { data } = props;

  return (
    <Grid container justifyContent={"center"} className={styles.container}>
      <Grid item xs={11} lg={10} mb={4}>
        <div className={styles.title}>Yêu Cầu Gia Công</div>
      </Grid>

      <Grid item xs={11} lg={10} mb={4}>
        <fieldset style={{ margin: 0 }}>
          <legend>Khách hàng</legend>
          <Grid container my={1}>
            <Grid item xs={3}>
              Tên tài khoản:
            </Grid>
            <Grid item>{data[0].customer.username}</Grid>
          </Grid>

          <Grid container mb={1}>
            <Grid item xs={3}>
              Email:
            </Grid>
            <Grid item>{data[0].customer.email}</Grid>
          </Grid>

          <Grid container mb={1}>
            <Grid item xs={3}>
              Số điện thoại:
            </Grid>
            <Grid item>
              {data[0].customer.phone ? data[0].customer.phone : "--"}
            </Grid>
          </Grid>
        </fieldset>
      </Grid>

      <Grid item xs={11} lg={10}>
        {data &&
          data.map((item) => {
            const gender =
              item.customDesign.designVersion.design.characteristic;
            const currentStatus = item.craftingRequestHistories.find(
              (i) => i.status === item.craftingRequestStatus
            );

            return (
              <Card className={styles.cardContainer} key={item.id}>
                <Grid
                  container
                  p={3}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                >
                  <Grid item xs={12} md={3} mb={{ xs: 3, md: 0 }}>
                    <HoverCard
                      file={item.customDesign.blueprint.url}
                      image={item.customDesign.designVersion.image.url}
                      shadow={true}
                    />
                    <Grid item className={styles.gender} mt={1}>
                      <img
                        src={
                          gender === DesignCharacteristic.Male ? male : female
                        }
                        width={15}
                      />
                      Nhẫn {gender === DesignCharacteristic.Male ? "nam" : "nữ"}
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} md={8.5} gap={2}>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"flex-start"}
                    >
                      <Grid container item xs={8}>
                        <Grid item xs={12}>
                          Dành cho: {item.customDesign.spouse.fullName}
                        </Grid>

                        <Grid item xs={12}>
                          <FormLabel>
                            Số CCCD: {item.customDesign.spouse.citizenId}
                          </FormLabel>
                        </Grid>
                      </Grid>

                      <Chip
                        label={
                          formatCraftingRequestStatus(
                            item.craftingRequestStatus
                          ).text
                        }
                        color={
                          formatCraftingRequestStatus(
                            item.craftingRequestStatus
                          ).color
                        }
                        variant="filled"
                      />
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid item my={{ xs: 1, md: 0 }}>
                        Ngày tạo:{" "}
                        {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                      </Grid>

                      <Grid item>
                        Cập nhật:{" "}
                        {moment(currentStatus?.createdAt).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid item mb={{ xs: 1, md: 0 }}>
                        Chất liệu: {item.metalSpecification.name}
                      </Grid>
                      <Grid item mb={{ xs: 1, md: 0 }}>
                        Kích thước: {item.fingerSize}
                      </Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid item mb={{ xs: 1, md: 0 }}>
                        Kim cương: {item.diamondSpecification.shape}{" "}
                        {getDiamondSpec(item.diamondSpecification)}
                      </Grid>
                      <Grid item>Khắc chữ: {item.engraving}</Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid item mb={{ xs: 1, md: 0 }}>
                        Khối lượng: {item.customDesign.metalWeight} chỉ
                      </Grid>
                      <Grid item mb={{ xs: 1, md: 0 }}>
                        Kim cương phụ: {item.customDesign.sideDiamondsCount}{" "}
                        viên
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item>Ghi chú: {item.comment}</Grid>
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
