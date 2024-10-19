import {
  FormControl,
  FormControlLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  IconButton,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { primaryBtn } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "src/utils/constants";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { passwordPattern } from "src/utils/constants";
import { postLogin } from "src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { login } from "src/redux/slice/auth.slice";
import { jwtDecode } from "jwt-decode";
import LoadingButton from "@mui/lab/LoadingButton";
import { ErrorCode } from "src/utils/enums";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location: Location<{ email: string }> = useLocation();
  const dispatch = useAppDispatch();
  const { currentRoute } = useAppSelector((state) => state.route);

  const mutation = useMutation({
    mutationFn: (data: IFormInput) => {
      return postLogin(data);
    },
    onSuccess: (response, request) => {
      if (response.data) {
        const { refreshToken, token: accessToken } = response.data;
        const userInfo = jwtDecode<ITokenData>(accessToken);
        const { id, sub, role } = userInfo;
        dispatch(
          login({ id: +id, role, email: sub, accessToken, refreshToken })
        );

        navigate(currentRoute);
      }

      if (response.errors) {
        response.errors.forEach((err) => {
          if (err.code === ErrorCode.UnVerifiedAccount) {
            const { email } = request;
            navigate("/verify-account", { state: { email } });
            toast.info("Vui lòng kích hoạt tài khoản");
          } else toast.error(err.description);
        });
      }
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      email: location.state ? location.state.email : "",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    mutation.mutate(data);
  };

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
                type={showPassword ? "text" : "password"}
                placeholder="Nhập Mật Khẩu"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="start"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={!!errors.password}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "Tối thiểu 8 ký tự bao gồm ký tự đặc biệt, số và chữ cái",
                  },
                })}
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl className={styles.newsLetter}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Email tôi về tin tức, cập nhật và ưu đãi của Couple Rings."
              />
            </FormControl>

            <LoadingButton
              type="submit"
              sx={primaryBtn}
              variant="contained"
              loading={mutation.isPending}
            >
              Đăng Nhập
            </LoadingButton>

            <div
              className={styles.fwdBtn}
              onClick={() => navigate("/forget-password")}
            >
              <span>Quên mật khẩu?</span>
            </div>
          </form>

          <div
            className={styles.title}
            style={{ marginTop: "3.5rem", marginBottom: "0.05rem" }}
          >
            Tôi là người mới
          </div>
          <div className={styles.fwdBtn} onClick={() => navigate("/register")}>
            <span>Tạo tài khoản mới {">"}</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
