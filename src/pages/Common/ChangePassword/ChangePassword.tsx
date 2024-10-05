import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordPattern } from "src/utils/constants";
import { primaryBtn } from "src/utils/styles";
import styles from "./ChangePassword.module.scss";

interface IFormInput {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={styles.container}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sm={8} md={5} lg={3}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Thay đổi mật khẩu</h1>

            <FormControl fullWidth>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Mật khẩu hiện tại"
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
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
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
                type={showNewPassword ? "text" : "password"}
                label="Mật khẩu mới"
                InputProps={{
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    margin: "0",
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ margin: "0" }}>
                      <IconButton
                        onClick={() => setShowNewPassword((show) => !show)}
                        edge="start"
                        sx={{
                          margin: "0!important",
                          backgroundColor: "white!important",
                          color: "black!important",
                        }}
                      >
                        {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.newPassword}
                {...register("newPassword", {
                  required: "* Vui lòng nhập mật khẩu mới",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "* Tối thiểu 8 ký tự bao gồm ký tự đặc biệt, số và chữ cái",
                  },
                })}
                variant="outlined"
              />
              {errors.newPassword && (
                <FormHelperText error>{errors.newPassword.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                fullWidth
                type={showConfirmNewPassword ? "text" : "password"}
                label="Xác nhận mật khẩu mới"
                InputProps={{
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    margin: "0",
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ margin: "0" }}>
                      <IconButton
                        onClick={() => setShowConfirmNewPassword((show) => !show)}
                        edge="start"
                        sx={{
                          margin: "0!important",
                          backgroundColor: "white!important",
                          color: "black!important",
                        }}
                      >
                        {showConfirmNewPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.confirmNewPassword}
                {...register("confirmNewPassword", {
                  required: "* Vui lòng xác nhận mật khẩu mới",
                    validate: (value) =>
                        value === watch("newPassword") ||
                        "* Mật khẩu xác nhận không khớp",
                
                })}
                variant="outlined"
              />
              {errors.confirmNewPassword && (
                <FormHelperText error>{errors.confirmNewPassword.message}</FormHelperText>
              )}
            </FormControl>

            <Button variant="contained" sx={primaryBtn} fullWidth type="submit">
              Xác nhận
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePassword;
