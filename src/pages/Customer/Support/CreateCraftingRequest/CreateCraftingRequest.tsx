import {
  Box,
  Button,
  Card,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
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

const metalsSpecs = [
  {
    id: 1,
    name: "Gold 18K - Yellow",
  },
  {
    id: 2,
    name: "Gold 18K - White",
  },
  {
    id: 3,
    name: "Gold 18K - Rose",
  },
];

const diamondSpecs = [
  {
    id: 1,
    name: "Pure Heart",
    weight: 0.05,
    color: "D",
    clarity: "VS2",
    shape: "HEART",
    price: 3600000,
  },
  {
    id: 2,
    name: "Graceful Oval",
    weight: 0.05,
    color: "G",
    clarity: "SI1",
    shape: "OVAL",
    price: 3120000,
  },
  {
    id: 3,
    name: "Dazzling Round",
    weight: 0.15,
    color: "G",
    clarity: "VS2",
    shape: "ROUND",
    price: 3600000,
  },
];

const sizeMenuPaperStyle: SxProps = {
  ...menuPaperStyle,
  boxShadow: "none",
  border: "1px solid",
  borderTop: "none",
};

interface IFormInput {
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

function CreateCraftingRequest() {
  const [maleSize, setMaleSize] = useState(0);
  const [femaleSize, setFemaleSize] = useState(0);
  const [error, setError] = useState({
    maleSizeNotSelected: false,
    femaleSizeNotSelected: false,
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
    if (maleSize > 0)
      setError((current) => ({ ...current, maleSizeNotSelected: false }));

    if (femaleSize > 0)
      setError((current) => ({ ...current, femaleSizeNotSelected: false }));
  }, [femaleSize, maleSize]);

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={8}>
        <div className={styles.title}>Tạo Yêu Cầu Gia Công</div>
        <Card className={styles.body}>
          <Grid container>
            <Grid item xs={6} p={5}>
              <div className={styles.design}>
                <Box sx={{ marginBottom: "1.5rem", textAlign: "center" }}>
                  <img src={male} width={18} />
                  <span className={styles.subtitle}>Thiết Kế Của Nam</span>
                </Box>
                <Grid container justifyContent={"center"} gap={11.9} mb={2}>
                  <div>Trọng lượng:</div>
                  <div>3 Chỉ</div>
                </Grid>

                <Grid container justifyContent={"center"} gap={5}>
                  <div>Số kim cương phụ:</div>
                  <div>8 Viên</div>
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
                        {metalsSpecs.map((item) => {
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
                        {diamondSpecs.map((spec) => {
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

            <Grid item xs={6} p={5}>
              <div className={styles.design}>
                <Box sx={{ marginBottom: "1.5rem", textAlign: "center" }}>
                  <img src={female} width={18} />
                  <span className={styles.subtitle}>Thiết Kế Của Nữ</span>
                </Box>
                <Grid container justifyContent={"center"} gap={11.9} mb={2}>
                  <div>Trọng lượng:</div>
                  <div>3 Chỉ</div>
                </Grid>

                <Grid container justifyContent={"center"} gap={5}>
                  <div>Số kim cương phụ:</div>
                  <div>8 Viên</div>
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
                        {metalsSpecs.map((item) => {
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
                        {diamondSpecs.map((spec) => {
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
