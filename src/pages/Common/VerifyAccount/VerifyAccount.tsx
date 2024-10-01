import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
} from "@mui/material";
import styles from "./VerfifyAccount.module.scss";
import { primaryBtn } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  otp: string;
}

const VerifyAccount = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={styles.container}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sm={8} md={5} lg={3}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>Xác Minh Tài Khoản</div>
            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="Nhập mã OTP"
                error={!!errors.otp}
                {...register("otp", {
                  required: "Vui lòng nhập OTP",
                })}
              />
              {errors.otp && (
                <FormHelperText error>{errors.otp.message}</FormHelperText>
              )}
            </FormControl>

            <Button variant="contained" sx={primaryBtn} fullWidth type="submit">
              Xác Nhận
            </Button>

            <div className={styles.backBtn}>Gửi lại OTP</div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default VerifyAccount;
