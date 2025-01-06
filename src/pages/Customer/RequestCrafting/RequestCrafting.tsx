import { Location, useLocation, useNavigate } from "react-router-dom";
import styles from "./RequestCrafting.module.scss";
import {
  Grid,
  Divider,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import { primaryBtn } from "src/utils/styles";
import { currencyFormatter, getDiamondSpec } from "src/utils/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchBranches,
  fetchCustomerSpouse,
  fetchDesignDetail,
} from "src/utils/querykey";
import { getDesignDetail } from "src/services/design.service";
import { ConfigurationKey, ResponseType, VersionOwner } from "src/utils/enums";
import { getBranches } from "src/services/branch.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { getCustomerSpouse } from "src/services/spouse.service";
import { postCreateCraftingRing } from "src/services/craftingRequest.service";
import { toast } from "react-toastify";
import { metalWeightUnit } from "src/utils/constants";

interface ICraftingData {
  designId: number;
  size: number;
  engraving: string;
  metalSpec: {
    id: number;
    metalSpecification: IMetalSpec;
    image: {
      url: string;
    };
  };
  diamondSpec: IDiamondSpec;
}

const branchFilter: IBranchFilter = {
  page: 0,
  pageSize: 100,
};

function RequestCrafting() {
  const [maleOwner, setMaleOwner] = useState(VersionOwner.Self);
  const [femaleOwner, setFemaleOwner] = useState(VersionOwner.Partner);

  const [branchId, setBranchId] = useState(0);
  const [emptyBranch, setEmptyBranch] = useState(false);

  const [malePrice, setMalePrice] = useState(0);
  const [femalePrice, setFemalePrice] = useState(0);

  const navigate = useNavigate();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { configs } = useAppSelector((state) => state.config);

  const location: Location<{
    maleRequest: ICraftingData;
    femaleRequest: ICraftingData;
  }> = useLocation();

  const { maleRequest, femaleRequest } = location.state || {};

  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;
  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;
  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;
  const craftingFee = configs.find(
    (item) => item.key === ConfigurationKey.CraftingFee
  )?.value;

  const { data: maleResponse } = useQuery({
    queryKey: [fetchDesignDetail, maleRequest?.designId],

    queryFn: () => {
      if (maleRequest) return getDesignDetail(maleRequest.designId);
    },
    enabled: !!maleRequest,
  });

  const { data: femaleResponse } = useQuery({
    queryKey: [fetchDesignDetail, femaleRequest?.designId],

    queryFn: () => {
      if (femaleRequest) return getDesignDetail(femaleRequest.designId);
    },
    enabled: !!femaleRequest,
  });

  const { data: branchResponse } = useQuery({
    queryKey: [fetchBranches, branchFilter],

    queryFn: () => {
      return getBranches(branchFilter);
    },
  });

  const { data: spouseResponse } = useQuery({
    queryKey: [fetchCustomerSpouse, userId],

    queryFn: () => {
      return getCustomerSpouse(userId);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ICreateCraftingRingRequest) => {
      return postCreateCraftingRing(data);
    },
    onSuccess: (response) => {
      if (response.type === ResponseType.Info) {
        toast.success(
          "Đã tạo yêu cầu gia công, quý khách vui lòng chờ phản hồi"
        );
        navigate("/customer/support/crafting-request");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleChangeMaleOwner = (value: VersionOwner) => {
    setMaleOwner(value);
    if (value === VersionOwner.Self) setFemaleOwner(VersionOwner.Partner);
    if (value === VersionOwner.Partner) setFemaleOwner(VersionOwner.Self);
  };

  const handleChangeFemaleOwner = (value: VersionOwner) => {
    setFemaleOwner(value);
    if (value === VersionOwner.Self) setMaleOwner(VersionOwner.Partner);
    if (value === VersionOwner.Partner) setMaleOwner(VersionOwner.Self);
  };

  const handleRequestCrafting = () => {
    if (branchId === 0) {
      setEmptyBranch(true);
      return;
    }

    const ownSpouse = spouseResponse?.data?.spouses.find(
      (item) => !!item.customerId
    );
    const partnerSpouse = spouseResponse?.data?.spouses.find(
      (item) => !item.customerId
    );

    if (maleRequest && femaleRequest && ownSpouse && partnerSpouse) {
      const maleOwnerdata: ICreateCraftingRingRequest = {
        customerId: userId,
        branchId,
        self: {
          designId: +maleRequest.designId,
          diamondSpecId: maleRequest.diamondSpec.id,
          metalSpecId: maleRequest.metalSpec.metalSpecification.id,
          fingerSize: maleRequest.size,
          engraving: maleRequest.engraving,
          spouseId: ownSpouse.id,
        },
        partner: {
          designId: +femaleRequest.designId,
          diamondSpecId: femaleRequest.diamondSpec.id,
          metalSpecId: femaleRequest.metalSpec.metalSpecification.id,
          fingerSize: femaleRequest.size,
          engraving: femaleRequest.engraving,
          spouseId: partnerSpouse.id,
        },
      };

      const femaleOwnerdata: ICreateCraftingRingRequest = {
        customerId: userId,
        branchId,
        self: {
          designId: femaleRequest.designId,
          diamondSpecId: femaleRequest.diamondSpec.id,
          metalSpecId: femaleRequest.metalSpec.metalSpecification.id,
          fingerSize: femaleRequest.size,
          engraving: femaleRequest.engraving,
          spouseId: ownSpouse.id,
        },
        partner: {
          designId: maleRequest.designId,
          diamondSpecId: maleRequest.diamondSpec.id,
          metalSpecId: maleRequest.metalSpec.metalSpecification.id,
          fingerSize: maleRequest.size,
          engraving: maleRequest.engraving,
          spouseId: partnerSpouse.id,
        },
      };

      mutation.mutate(
        maleOwner === VersionOwner.Self ? maleOwnerdata : femaleOwnerdata
      );
    }
  };

  useEffect(() => {
    if (!location.state) navigate("/wedding-rings");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (!maleRequest || !femaleRequest) navigate("/wedding-rings");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maleRequest, femaleRequest]);

  useEffect(() => {
    if (spouseResponse?.errors || branchResponse?.errors)
      navigate("/wedding-rings");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchResponse, spouseResponse]);

  // calculate price
  useEffect(() => {
    if (
      maleResponse?.data &&
      femaleResponse?.data &&
      maleRequest &&
      femaleRequest
    ) {
      if (profitRatio && sideDiamondPrice && craftingFee) {
        const maleDesign = maleResponse.data;
        const femaleDesign = femaleResponse.data;

        const firstDesignPrice =
          (maleDesign.metalWeight *
            metalWeightUnit *
            maleRequest.metalSpec.metalSpecification.pricePerUnit +
            maleRequest.diamondSpec.price +
            maleDesign.sideDiamondsCount * +sideDiamondPrice +
            +craftingFee) *
          +profitRatio;

        const secondDesignPrice =
          (femaleDesign.metalWeight *
            metalWeightUnit *
            femaleRequest.metalSpec.metalSpecification.pricePerUnit +
            femaleRequest.diamondSpec.price +
            femaleDesign.sideDiamondsCount * +sideDiamondPrice +
            +craftingFee) *
          +profitRatio;

        const malePrice = Math.round(firstDesignPrice / 1000) * 1000;
        const femalePrice = Math.round(secondDesignPrice / 1000) * 1000;

        setMalePrice(malePrice);
        setFemalePrice(femalePrice);
      }
    }
  }, [
    maleResponse,
    femaleResponse,
    maleRequest,
    femaleRequest,
    profitRatio,
    sideDiamondPrice,
    craftingFee,
  ]);

  useScrollTop();

  if (
    maleRequest &&
    femaleRequest &&
    maleResponse?.data &&
    femaleResponse?.data &&
    sideDiamondPrice &&
    shippingFee &&
    craftingFee
  )
    return (
      <Grid container className={styles.container}>
        <Grid container item xs={10}>
          <div className={styles.title}>Xác Nhận Gia Công</div>
          <Grid item xs={12} className={styles.note}>
            Vui lòng xác nhận thông tin chi tiết cho yêu cầu gia công của quý
            khách
          </Grid>

          {/* Male Design  */}
          <Grid
            container
            item
            justifyContent={{ xs: "center", md: "space-between" }}
            className={styles.content}
          >
            <Grid item sm={7} md={4} sx={{ mb: 2 }}>
              <img
                src={maleRequest?.metalSpec.image.url}
                className={styles.previewImg}
              />

              <FormControl>
                <FormLabel>Gia công cho:</FormLabel>
                <RadioGroup
                  row
                  value={maleOwner}
                  onChange={(e) =>
                    handleChangeMaleOwner(e.target.value as VersionOwner)
                  }
                >
                  <FormControlLabel
                    value={VersionOwner.Self}
                    control={<Radio />}
                    label="Tôi"
                  />
                  <FormControlLabel
                    value={VersionOwner.Partner}
                    control={<Radio />}
                    label="Bạn Đời"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={7}>
              <div className={styles.name}>
                CR {maleResponse?.data?.designCollection.name.toUpperCase()}{" "}
                {maleResponse?.data?.name}
              </div>

              <Divider sx={{ backgroundColor: "#555", mb: 3 }} />

              <Box>
                <Button
                  variant="contained"
                  sx={{ ...primaryBtn, px: 5, py: 1 }}
                >
                  Nam Tính
                </Button>

                <div className={styles.info}>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Chất Liệu:</Grid>

                    <Grid item>
                      {maleRequest?.metalSpec.metalSpecification.name}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim Cương:</Grid>

                    <Grid item>
                      {maleRequest.diamondSpec.shape}{" "}
                      {getDiamondSpec(maleRequest.diamondSpec)}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kích Thước:</Grid>

                    <Grid item>{maleRequest.size}</Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Khắc Chữ:</Grid>

                    <Grid item>{maleRequest.engraving}</Grid>
                  </Grid>
                </div>
              </Box>

              <Divider sx={{ backgroundColor: "#ccc" }} />

              <Box>
                <div className={styles.info}>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Khối Lượng:</Grid>

                    <Grid item>{maleResponse?.data?.metalWeight} Chỉ</Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim Cương Phụ:</Grid>

                    <Grid item>
                      {maleResponse?.data?.sideDiamondsCount} Viên
                    </Grid>
                  </Grid>
                </div>
              </Box>

              <Divider sx={{ backgroundColor: "#ccc" }} />

              <Box>
                <div className={styles.info}>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Giá vàng:</Grid>

                    <Grid item>
                      {currencyFormatter(
                        maleRequest.metalSpec.metalSpecification.pricePerUnit *
                          maleResponse.data.metalWeight *
                          metalWeightUnit
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim cương chính:</Grid>

                    <Grid item>
                      {currencyFormatter(maleRequest.diamondSpec.price)}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim cương phụ:</Grid>

                    <Grid item>
                      {currencyFormatter(+sideDiamondPrice)}/viên
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Dự Trù Chi Phí:</Grid>

                    <Grid item>{currencyFormatter(malePrice)}</Grid>
                  </Grid>
                </div>
              </Box>
              <Divider sx={{ backgroundColor: "#ccc" }} />
            </Grid>
          </Grid>
          {/* Male Design  */}

          {/* Female Design  */}
          <Grid
            container
            item
            justifyContent={{ xs: "center", md: "space-between" }}
            className={styles.content}
          >
            <Grid item sm={7} md={4} sx={{ mb: 2 }}>
              <img
                src={femaleRequest.metalSpec.image.url}
                className={styles.previewImg}
              />

              <FormControl>
                <FormLabel>Gia công cho:</FormLabel>
                <RadioGroup
                  row
                  value={femaleOwner}
                  onChange={(e) =>
                    handleChangeFemaleOwner(e.target.value as VersionOwner)
                  }
                >
                  <FormControlLabel
                    value={VersionOwner.Self}
                    control={<Radio />}
                    label="Tôi"
                  />
                  <FormControlLabel
                    value={VersionOwner.Partner}
                    control={<Radio />}
                    label="Bạn Đời"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={7}>
              <div className={styles.name}>
                CR {femaleResponse?.data?.designCollection.name.toUpperCase()}{" "}
                {femaleResponse?.data?.name}
              </div>

              <Divider sx={{ backgroundColor: "#555", mb: 3 }} />

              <Box>
                <Button
                  variant="contained"
                  sx={{ ...primaryBtn, px: 5, py: 1 }}
                >
                  Nữ Tính
                </Button>

                <div className={styles.info}>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Chất Liệu:</Grid>

                    <Grid item>
                      {femaleRequest.metalSpec.metalSpecification.name}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim Cương:</Grid>

                    <Grid item>
                      {femaleRequest.diamondSpec.shape}{" "}
                      {getDiamondSpec(femaleRequest.diamondSpec)}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kích Thước:</Grid>

                    <Grid item>{femaleRequest.size}</Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Khắc Chữ:</Grid>

                    <Grid item>{femaleRequest.engraving}</Grid>
                  </Grid>
                </div>
              </Box>

              <Divider sx={{ backgroundColor: "#ccc" }} />

              <Box>
                <div className={styles.info}>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Khối Lượng:</Grid>

                    <Grid item>{femaleResponse?.data?.metalWeight} Chỉ</Grid>
                  </Grid>

                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim Cương Phụ:</Grid>

                    <Grid item>
                      {femaleResponse?.data?.sideDiamondsCount} Viên
                    </Grid>
                  </Grid>
                </div>
              </Box>

              <Divider sx={{ backgroundColor: "#ccc" }} />

              <Box>
                <div className={styles.info}>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Giá vàng:</Grid>

                    <Grid item>
                      {currencyFormatter(
                        femaleRequest.metalSpec.metalSpecification
                          .pricePerUnit *
                          femaleResponse.data.metalWeight *
                          metalWeightUnit
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim cương chính:</Grid>

                    <Grid item>
                      {currencyFormatter(femaleRequest.diamondSpec.price)}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Kim cương phụ:</Grid>

                    <Grid item>
                      {currencyFormatter(+sideDiamondPrice)}/viên
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={styles.label}
                    justifyContent={"space-between"}
                  >
                    <Grid item>Dự Trù Chi Phí:</Grid>

                    <Grid item>{currencyFormatter(femalePrice)}</Grid>
                  </Grid>
                </div>
              </Box>

              <Divider sx={{ backgroundColor: "#ccc" }} />

              <Grid container my={3}>
                <FormLabel>
                  Lưu ý: Mức giá trên chỉ mang tính tham khảo và có thể thay đổi
                  tùy theo mức độ phức tạp khi gia công.
                </FormLabel>
                <FormLabel sx={{ fontStyle: "italic", mt: 3 }}>
                  Phí gia công hiện đang áp dụng là{" "}
                  {currencyFormatter(+craftingFee)} và có thể tăng đối với từng
                  chiếc nhẫn.
                </FormLabel>
              </Grid>

              <Divider sx={{ backgroundColor: "#ccc" }} />

              <Grid container mt={3}>
                <FormLabel error={emptyBranch} sx={{ mb: 1 }}>
                  Cửa Hàng
                </FormLabel>
                <Select
                  error={emptyBranch}
                  fullWidth
                  variant="standard"
                  value={branchId}
                  onChange={(e) => {
                    setBranchId(+e.target.value);
                    setEmptyBranch(false);
                  }}
                >
                  <MenuItem value={0} disabled>
                    <em>Chọn cửa hàng gần bạn</em>
                  </MenuItem>
                  {branchResponse?.data?.items.map((item) => {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {item.storeName} - {item.address}
                      </MenuItem>
                    );
                  })}
                </Select>
                {emptyBranch && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    * Vui lòng chọn cửa hàng
                  </FormHelperText>
                )}
              </Grid>

              <Grid container mt={6}>
                <LoadingButton
                  loading={mutation.isPending}
                  sx={primaryBtn}
                  variant="contained"
                  fullWidth
                  onClick={handleRequestCrafting}
                >
                  Yêu Cầu Gia Công
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
          {/* Female Design  */}
        </Grid>
      </Grid>
    );
}

export default RequestCrafting;
