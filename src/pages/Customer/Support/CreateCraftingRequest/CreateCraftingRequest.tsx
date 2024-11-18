import {
  Box,
  Button,
  Card,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  SxProps,
  TextField,
} from "@mui/material";
import styles from "./CreateCraftingRequest.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { useEffect, useState } from "react";
import SizeMenu from "src/components/menu/SizeMenu";
import { menuPaperStyle, secondaryBtn, sizeMenuStyle } from "src/utils/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import _ from "lodash";
import { useAppSelector } from "src/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCraftingRequests,
  fetchCustomDesigns,
  fetchDiamondSpecs,
  fetchMetalSpecs,
} from "src/utils/querykey";
import { getCustomDesigns } from "src/services/customDesign.service";
import { getCraftingRequests } from "src/services/craftingRequest.service";
import {
  CraftingRequestStatus,
  DesignCharacteristic,
  Status,
} from "src/utils/enums";
import { useNavigate } from "react-router-dom";
import { getDiamondSpecs } from "src/services/diamondSpec.service";
import { getMetalSpecs } from "src/services/metalSpec.service";

const branches: IBranch[] = [
  {
    id: 1,
    storeName: "Cửa hàng Nhẫn Cưới Quận 1",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    phone: "0901234567",
    coverImage: {
      id: 1,
      url: "",
    },
  },
  {
    id: 2,
    storeName: "Cửa hàng Nhẫn Cưới Quận 3",
    address: "456 Đường Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh",
    phone: "0912345678",
    coverImage: {
      id: 2,
      url: "",
    },
  },
  {
    id: 3,
    storeName: "Cửa hàng Nhẫn Cưới Quận 5",
    address: "789 Đường Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh",
    phone: "0923456789",
    coverImage: {
      id: 3,
      url: "",
    },
  },
];

const sizeMenuPaperStyle: SxProps = {
  ...menuPaperStyle,
  boxShadow: "none",
  border: "1px solid",
  borderTop: "none",
};

interface IFormInput {
  branchId: number;
  male: {
    metalSpecId: number;
    diamondSpecId: number;
    engraving: string;
    fingerSize: number;
  };
  female: {
    metalSpecId: number;
    diamondSpecId: number;
    engraving: string;
    fingerSize: number;
  };
}

const specFilter = {
  page: 0,
  pageSize: 100,
};

function CreateCraftingRequest() {
  const [maleDesign, setMaleDesign] = useState<ICustomDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<ICustomDesign | null>(null);

  const [designFilterObj, setDesignFilterObj] =
    useState<ICustomDesignFilter | null>(null);
  const [maleRequestFilterObj, setMaleRequestFilterObj] =
    useState<ICraftingRequestFilter | null>(null);
  const [femaleRequestFilterObj, setFemaleRequestFilterObj] =
    useState<ICraftingRequestFilter | null>(null);

  const [maleSize, setMaleSize] = useState(0);
  const [femaleSize, setFemaleSize] = useState(0);
  const [error, setError] = useState({
    maleSizeNotSelected: false,
    femaleSizeNotSelected: false,
  });

  const { id } = useAppSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();

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

  const { data: diamondSpecResponse } = useQuery({
    queryKey: [fetchDiamondSpecs, specFilter],

    queryFn: () => {
      return getDiamondSpecs(specFilter);
    },
  });

  const { data: metalSpecResponse } = useQuery({
    queryKey: [fetchMetalSpecs, specFilter],

    queryFn: () => {
      return getMetalSpecs(specFilter);
    },
  });

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const maleEngraving = watch("male.engraving");
  const femaleEngraving = watch("female.engraving");

  const onError = () => {
    const clone = _.cloneDeep(error);

    if (maleSize === 0) clone.maleSizeNotSelected = true;
    if (femaleSize === 0) clone.femaleSizeNotSelected = true;

    setError(clone);

    if (maleSize === 0 || femaleSize === 0) return true;
    else return false;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (onError()) {
      return;
    }
    console.log(data);
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
      if (designResponse.data.items.length === 0)
        navigate("/customer/support/crafting-request");

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
      }
    }

    if (designResponse?.errors) navigate("not-found");

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    if (maleRequestResponse?.data && femaleRequestResponse?.data) {
      const malePending = maleRequestResponse.data.items.find(
        (item) => item.craftingRequestStatus === CraftingRequestStatus.Pending
      );

      const femalePending = femaleRequestResponse.data.items.find(
        (item) => item.craftingRequestStatus === CraftingRequestStatus.Pending
      );

      if (malePending || femalePending)
        navigate("/customer/support/crafting-request");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [femaleRequestResponse, maleRequestResponse]);

  useEffect(() => {
    if (maleSize > 0)
      setError((current) => ({ ...current, maleSizeNotSelected: false }));

    if (femaleSize > 0)
      setError((current) => ({ ...current, femaleSizeNotSelected: false }));
  }, [femaleSize, maleSize]);

  if (
    designLoading ||
    maleRequestLoading ||
    femaleRequestLoading ||
    !diamondSpecResponse ||
    !metalSpecResponse
  )
    return (
      <Grid container justifyContent={"center"} my={5}>
        <Grid container item xs={8} justifyContent={"space-between"}>
          <Grid container item xs={5.8} gap={1}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>

          <Grid container item xs={5.8} gap={1}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={10} lg={8}>
        <div className={styles.title}>Tạo Yêu Cầu Gia Công</div>
        <Card className={styles.body}>
          <Grid container>
            <Grid item md={6} p={{ xs: 1, sm: 5 }}>
              <div className={styles.design}>
                <Box sx={{ marginBottom: "1.5rem", textAlign: "center" }}>
                  <img src={male} width={18} />
                  <span className={styles.subtitle}>Thiết Kế Của Nam</span>
                </Box>

                <Grid container justifyContent={"center"} mb={3}>
                  <Grid item xs={8}>
                    <img
                      src={maleDesign?.designVersion.image.url}
                      className={styles.designImg}
                    />
                  </Grid>
                </Grid>

                <Grid container justifyContent={"center"} gap={11.9} mb={2}>
                  <div>Trọng lượng:</div>
                  <div>{maleDesign?.metalWeight} Chỉ</div>
                </Grid>

                <Grid container justifyContent={"center"} gap={5}>
                  <div>Số kim cương phụ:</div>
                  <div>{maleDesign?.sideDiamondsCount} Viên</div>
                </Grid>
              </div>

              <Grid container alignItems={"center"} mb={4}>
                <Grid item xs={4}>
                  <FormLabel error={!!errors.male?.metalSpecId}>
                    Chất Liệu
                  </FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <Controller
                    defaultValue={0}
                    name="male.metalSpecId"
                    rules={{
                      required: "* Vui lòng chọn chất liệu",
                      min: { value: 1, message: "* Vui lòng chọn chất liệu" },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        error={!!errors.male?.metalSpecId}
                        fullWidth
                        variant="standard"
                        defaultValue={0}
                      >
                        <MenuItem value={0} disabled>
                          <em>Chọn chất liệu</em>
                        </MenuItem>
                        {metalSpecResponse.data?.items.map((item) => {
                          return (
                            <MenuItem value={item.id} key={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                  {errors.male?.metalSpecId && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.male?.metalSpecId.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid container alignItems={"center"} mb={4}>
                <Grid item xs={4}>
                  <FormLabel error={!!errors.male?.diamondSpecId}>
                    Kim Cương
                  </FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <Controller
                    defaultValue={0}
                    name="male.diamondSpecId"
                    rules={{
                      required: "* Vui lòng chọn kim cương",
                      min: { value: 1, message: "* Vui lòng chọn kim cương" },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        error={!!errors.male?.diamondSpecId}
                        fullWidth
                        variant="standard"
                        defaultValue={0}
                      >
                        <MenuItem value={0} disabled>
                          <em>Chọn kim cương</em>
                        </MenuItem>
                        {diamondSpecResponse.data?.items.map((spec) => {
                          return (
                            <MenuItem value={spec.id} key={spec.id}>
                              {spec.shape} {spec.weight} - {spec.color} -{" "}
                              {spec.clarity}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                  {errors.male?.diamondSpecId && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.male?.diamondSpecId.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid container alignItems={"center"} mb={5}>
                <Grid item xs={4}>
                  <FormLabel>Khắc Chữ</FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    autoFocus
                    type="text"
                    fullWidth
                    variant="standard"
                    error={!!errors.male?.engraving}
                    {...register("male.engraving", {
                      maxLength: { value: 10, message: "* Vượt độ dài tối đa" },
                    })}
                  />
                  <FormHelperText>
                    {maleEngraving?.length ? maleEngraving.length : 0}
                    /10 ký tự
                  </FormHelperText>
                  {errors.male?.engraving && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.male?.engraving.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid container alignItems={"center"}>
                <Grid item xs={4}>
                  <FormLabel>Kích Thước</FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <SizeMenu
                    size={maleSize}
                    setSize={setMaleSize}
                    label={true}
                    sx={sizeMenuStyle}
                    paperStyle={sizeMenuPaperStyle}
                  />
                  {error.maleSizeNotSelected && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      * Vui lòng chọn kích thước
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={6} p={{ xs: 1, sm: 5 }}>
              <div className={styles.design}>
                <Box sx={{ marginBottom: "1.5rem", textAlign: "center" }}>
                  <img src={female} width={18} />
                  <span className={styles.subtitle}>Thiết Kế Của Nữ</span>
                </Box>

                <Grid container justifyContent={"center"} mb={3}>
                  <Grid item xs={8}>
                    <img
                      src={femaleDesign?.designVersion.image.url}
                      className={styles.designImg}
                    />
                  </Grid>
                </Grid>

                <Grid container justifyContent={"center"} gap={11.9} mb={2}>
                  <div>Trọng lượng:</div>
                  <div>{femaleDesign?.metalWeight} Chỉ</div>
                </Grid>

                <Grid container justifyContent={"center"} gap={5}>
                  <div>Số kim cương phụ:</div>
                  <div>{femaleDesign?.sideDiamondsCount} Viên</div>
                </Grid>
              </div>

              <Grid container alignItems={"center"} mb={4}>
                <Grid item xs={4}>
                  <FormLabel error={!!errors.female?.metalSpecId}>
                    Chất Liệu
                  </FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <Controller
                    defaultValue={0}
                    name="female.metalSpecId"
                    rules={{
                      required: "* Vui lòng chọn chất liệu",
                      min: { value: 1, message: "* Vui lòng chọn chất liệu" },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        error={!!errors.female?.metalSpecId}
                        fullWidth
                        variant="standard"
                        defaultValue={0}
                      >
                        <MenuItem value={0} disabled>
                          <em>Chọn chất liệu</em>
                        </MenuItem>
                        {metalSpecResponse.data?.items.map((item) => {
                          return (
                            <MenuItem value={item.id} key={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                  {errors.female?.metalSpecId && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.female?.metalSpecId.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid container alignItems={"center"} mb={4}>
                <Grid item xs={4}>
                  <FormLabel error={!!errors.female?.diamondSpecId}>
                    Kim Cương
                  </FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <Controller
                    defaultValue={0}
                    name="female.diamondSpecId"
                    rules={{
                      required: "* Vui lòng chọn kim cương",
                      min: { value: 1, message: "* Vui lòng chọn kim cương" },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        error={!!errors.female?.diamondSpecId}
                        fullWidth
                        variant="standard"
                        defaultValue={0}
                      >
                        <MenuItem value={0} disabled>
                          <em>Chọn kim cương</em>
                        </MenuItem>
                        {diamondSpecResponse.data?.items.map((spec) => {
                          return (
                            <MenuItem value={spec.id} key={spec.id}>
                              {spec.shape} {spec.weight} - {spec.color} -{" "}
                              {spec.clarity}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                  {errors.female?.diamondSpecId && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.female?.diamondSpecId.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid container alignItems={"center"} mb={5}>
                <Grid item xs={4}>
                  <FormLabel>Khắc Chữ</FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    autoFocus
                    type="text"
                    fullWidth
                    variant="standard"
                    error={!!errors.female?.engraving}
                    {...register("female.engraving", {
                      maxLength: { value: 10, message: "* Vượt độ dài tối đa" },
                    })}
                  />
                  <FormHelperText>
                    {femaleEngraving?.length ? femaleEngraving.length : 0}
                    /10 ký tự
                  </FormHelperText>
                  {errors.female?.engraving && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.female?.engraving.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid container alignItems={"center"}>
                <Grid item xs={4}>
                  <FormLabel>Kích Thước</FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <SizeMenu
                    size={femaleSize}
                    setSize={setFemaleSize}
                    label={true}
                    sx={sizeMenuStyle}
                    paperStyle={sizeMenuPaperStyle}
                  />
                  {error.femaleSizeNotSelected && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      * Vui lòng chọn kích thước
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent={"center"} my={5}>
              <Grid item xs={6}>
                <FormLabel error={!!errors.branchId}>Cửa Hàng</FormLabel>
                <Controller
                  defaultValue={0}
                  name="branchId"
                  rules={{
                    required: "* Vui lòng chọn cửa hàng",
                    min: { value: 1, message: "* Vui lòng chọn cửa hàng" },
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      error={!!errors.branchId}
                      fullWidth
                      variant="standard"
                      defaultValue={0}
                    >
                      <MenuItem value={0} disabled>
                        <em>Chọn cửa hàng gần bạn</em>
                      </MenuItem>
                      {branches.map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.storeName} - {item.address}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
                {errors.branchId && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {errors.branchId.message}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <Grid container justifyContent={"center"} mt={5}>
              <Button
                variant="contained"
                sx={secondaryBtn}
                onClick={handleSubmit(onSubmit, onError)}
              >
                Xác Nhận
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CreateCraftingRequest;
