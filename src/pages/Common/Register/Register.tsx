import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styles from "./Register.module.scss";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { emailPattern, passwordPattern } from "src/utils/constants";
import { primaryBtn } from "src/utils/styles";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "src/services/customer.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

interface IFormInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  code: string;
}

const Register = () => {
  const [code, setCode] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: IRegisterRequest) => {
      return postRegister(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        const { email } = response.data;

        navigate("/verify-account", { state: { email } });
        toast.success("OTP đã được gửi đến email của bạn");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, confirmPassword, ...rest } = data;
    mutation.mutate(rest);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setCode(code);
  }, []);

  return (
    <div className={styles.container}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sm={8} md={5} lg={3}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Xin chào ~ Chào mừng bạn đến với CR</h1>

            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                // className={styles.type}
                label="Email"
                error={!!errors.email}
                {...register("email", {
                  required: "* Vui lòng nhập email",
                  pattern: {
                    value: emailPattern,
                    message: "* Email không hợp lệ",
                  },
                })}
                variant="outlined"
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                label="Username"
                error={!!errors.username}
                {...register("username", {
                  required: "* Vui lòng nhập username",
                })}
                variant="outlined"
              />
              {errors.username && (
                <FormHelperText error>{errors.username.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                fullWidth
                // className={styles.type}
                type={showPassword ? "text" : "password"}
                label="Mật khẩu"
                InputProps={{
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    margin: "0",
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ margin: "0" }}>
                      <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        edge="start"
                        sx={{
                          margin: "0!important",
                          backgroundColor: "white!important",
                          color: "black!important",
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.password}
                {...register("password", {
                  required: "* Vui lòng nhập mật khẩu",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "* Tối thiểu 8 ký tự bao gồm ký tự đặc biệt, số và chữ cái",
                  },
                })}
                variant="outlined"
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                fullWidth
                // className={styles.type}
                type={showConfirmPassword ? "text" : "password"}
                label="Xác nhận mật khẩu"
                InputProps={{
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    margin: "0",
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ margin: "0" }}>
                      <IconButton
                        onClick={() => setShowConfirmPassword((show) => !show)}
                        edge="start"
                        sx={{
                          margin: "0!important",
                          backgroundColor: "white!important",
                          color: "black!important",
                        }} // Ensure no margin and padding on IconButton
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.confirmPassword}
                {...register("confirmPassword", {
                  required: "* Vui lòng nhập xác nhận mật khẩu",
                  validate: (value) =>
                    value === watch("password") ||
                    "* Mật khẩu xác nhận không khớp",
                })}
                variant="outlined"
              />
              {errors.confirmPassword && (
                <FormHelperText error>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>

            <div className={styles.codeContainer}>
              <FormControl variant="outlined" sx={{ flex: 1 }} fullWidth>
                <TextField
                  fullWidth
                  label="Code"
                  error={!!errors.code}
                  {...register("code", {
                    required: "* Vui lòng nhập code",
                    validate: (value) => {
                      if (+value === code) {
                        return true;
                      } else {
                        return "Code không hợp lệ";
                      }
                    },
                  })}
                  variant="outlined"
                />
                {errors.code && (
                  <FormHelperText error>{errors.code.message}</FormHelperText>
                )}
              </FormControl>

              <div className={styles.code}>{code}</div>
            </div>

            <LoadingButton
              fullWidth
              type="submit"
              sx={primaryBtn}
              variant="contained"
              loading={mutation.isPending}
            >
              Tạo tài khoản
            </LoadingButton>

            <p className={styles.description}>
              Bằng cách tạo tài khoản này, bạn đồng ý với thỏa thuận đăng ký
              người dùng và các điều khoản về quyền riêng tư của CR
            </p>

            <h2 className="note">Đã có tài khoản?</h2>
            <p
              className={styles.navigateSignIn}
              onClick={() => navigate("/login")}
            >
              Đăng nhập{" "}
              <NavigateNextIcon
                sx={{
                  fontSize: 20,
                  color: "gray",
                  "&:hover": {
                    color: "#a6402a",
                  },
                }}
              />
            </p>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
