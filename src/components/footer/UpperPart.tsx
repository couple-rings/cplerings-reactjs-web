import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import styles from "./Footer.module.scss";
import fb from "src/assets/facebook.png";
import pin from "src/assets/pinterest.png";
import ins from "src/assets/instagram.png";
import dou from "src/assets/douyin.png";
import { iconBtn } from "src/utils/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "src/utils/constants";

interface IFormInput {
  email: string;
}

const UpperPart = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={styles.upper}>
      <div className={styles.primaryText}>
        Hãy Luôn Cập Nhật Thông Tin Mới Nhất
      </div>

      <div className={styles.secondaryText}>
        Đăng Ký Để Nhận Tin Tức Qua Email
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                size="small"
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
            </FormControl>
          </Grid>
          <IconButton sx={iconBtn} type="submit">
            <ArrowForwardIosIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={10} sm={8} md={6} lg={4}>
            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
          </Grid>
        </Grid>
      </form>

      <div className={styles.iconBar}>
        <img src={ins} className={styles.icon} />
        <img src={fb} className={styles.icon} />
        <img src={pin} className={styles.icon} />
        <img src={dou} className={styles.icon} />
      </div>
    </div>
  );
};

export default UpperPart;
