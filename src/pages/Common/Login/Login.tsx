import {
  Button,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Grid,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { primaryBtn } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "src/utils/constants";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {

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
            <div className={styles.title}>Đăng Nhập</div>

            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="Nhập Email"
                error={!!errors.email}
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: emailPattern,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="password"
                placeholder="Nhập Mật Khẩu"
                error={!!errors.password}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl className={styles.newsLetter}>
              <FormControlLabel
                control={
                  <Checkbox color="primary" />
                }
                label="Email me Darry Ring news, updates and offers."
              />
            </FormControl>

            <Button variant="contained" sx={primaryBtn} fullWidth type="submit">
              Đăng Nhập
            </Button>

            <div className={styles.fwdBtn}>
              <Link to="/forget-password">Quên mật khẩu?</Link>
            </div>
          </form>

          <div className={styles.title} style={{ marginTop: '3.5rem', marginBottom: '0.05rem' }}>Tôi là người mới</div>
          <div className={styles.fwdBtn}>
            <Link to="">Tạo tài khoản mới {'>'}</Link>
          </div>
        </Grid>
      </Grid>

    </div>
  );
};

export default Login;