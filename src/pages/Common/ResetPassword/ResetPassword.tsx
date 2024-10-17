import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import styles from "./ResetPassword.module.scss";
import { primaryBtn } from "src/utils/styles";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordPattern } from "src/utils/constants";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postResetPassword } from "src/services/customer.service";
import { toast } from "react-toastify";
import { ResponseType } from "src/utils/enums";
import LoadingButton from "@mui/lab/LoadingButton";

interface IFormInput {
  password: string;
  cfnPassword: string;
  otp: string;
}

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCfnPassword, setShowCfnPassword] = useState(false);

  const navigate = useNavigate();
  const location: Location<{ email: string }> = useLocation();

  const mutation = useMutation({
    mutationFn: (data: IResetPasswordRequest) => {
      return postResetPassword(data);
    },
    onSuccess: (response) => {
      if (response.type === ResponseType.Info) {
        const { email } = location.state;
        navigate("/login", { state: { email } });
        toast.success("Đổi mật khẩu thành công");
      }

      if (response.type === ResponseType.Error && response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { email } = location.state;

    mutation.mutate({
      otp: data.otp,
      email,
      newPassword: data.password,
    });
  };
  useEffect(() => {
    if (!location.state) {
      navigate("/forget-password");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div className={styles.container}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sm={8} md={5} lg={3}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>Đổi Mật Khẩu</div>

            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="Mật khẩu mới"
                type={showPassword ? "text" : "password"}
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

            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="Nhập lại mật khẩu"
                type={showCfnPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCfnPassword((show) => !show)}
                      edge="start"
                    >
                      {showCfnPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={!!errors.cfnPassword}
                {...register("cfnPassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (value) => {
                    const { password } = getValues();
                    if (value === password) {
                      return true;
                    } else {
                      return "Mật khẩu xác nhận không chính xác";
                    }
                  },
                })}
              />
              {errors.cfnPassword && (
                <FormHelperText error>
                  {errors.cfnPassword.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="Nhập mã OTP"
                error={!!errors.otp}
                {...register("otp", {
                  required: "Vui lòng nhập mã OTP",
                })}
              />
              {errors.otp && (
                <FormHelperText error>{errors.otp.message}</FormHelperText>
              )}
            </FormControl>

            <LoadingButton
              fullWidth
              type="submit"
              sx={primaryBtn}
              variant="contained"
              loading={mutation.isPending}
            >
              Xác Nhận
            </LoadingButton>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPassword;
