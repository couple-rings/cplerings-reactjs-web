import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Avatar,
} from "@mui/material";
import styles from "./EditProfile.module.scss";
import { useNavigate } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import { phonePattern } from "src/utils/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";

interface IFormInput {
  username: string;
  avatarImage: FileList;
  phone: string;
}

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const navigate = useNavigate();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.container}>
      <Grid
        container
        className={styles.head}
        onClick={() => navigate("../../")}
      >
        <Grid item xs={10} className={styles.homeLink}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sm={8} md={5} lg={3}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>Chỉnh sửa thông tin tài khoản</div>

            <Box display="flex" justifyContent="center">
              <Avatar
                src={avatarPreview || ""}
                sx={{ width: 200, height: 200, borderRadius: "50%" }}
              >
                {!avatarPreview && ""}
              </Avatar>
            </Box>

            <Button
              sx={primaryBtn}
              fullWidth
              variant="contained"
              component="label"
            >
              Chọn ảnh đại diện
              <input
                type="file"
                hidden
                accept="image/*"
                {...register("avatarImage", {
                  required: "Vui lòng chọn ảnh đại diện",
                  onChange: handleAvatarChange,
                })}
              />
            </Button>
            {errors.avatarImage && (
              <FormHelperText error>
                {errors.avatarImage.message}
              </FormHelperText>
            )}

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="display-name">Họ và Tên</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="Họ và Tên"
                label="Họ và Tên"
                error={!!errors.username}
                {...register("username", {
                  required: "Vui lòng nhập tên tài khoản",
                })}
              />
              {errors.username && (
                <FormHelperText error>{errors.username.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal">
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                readOnly
                value={"customer@gmail.com"}
              />
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="0123456789"
                label="Số điện thoại"
                type="tel"
                error={!!errors.phone}
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: phonePattern,
                    message: "Số điện thoại không đúng",
                  },
                })}
              />
              {errors.phone && (
                <FormHelperText error>{errors.phone.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl className={styles.newsLetter}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Email tôi về tin tức, cập nhật và ưu đãi của Couple Rings."
              />
            </FormControl>

            <Button variant="contained" sx={primaryBtn} fullWidth type="submit">
              Lưu Thay Đổi
            </Button>
          </form>

          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                className={styles.navBtn}
                fullWidth
                onClick={() => navigate("../change-password")}
              >
                Đổi mật khẩu
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                className={styles.fwdBtn}
                onClick={() => navigate("../address")}
              >
                <span>Quản lý địa chỉ {">"}</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProfile;
