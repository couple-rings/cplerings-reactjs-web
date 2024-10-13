import {
  FormControl,
  OutlinedInput,
  Grid,
  FormHelperText,
} from "@mui/material";
import styles from "./ForgetPassword.module.scss";
import { primaryBtn } from "src/utils/styles";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "src/utils/constants";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postRequestResetPW } from "src/services/customer.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

interface IFormInput {
  email: string;
  code: string;
}

const ForgetPassword = () => {
  const [code, setCode] = useState(0);

  const mutation = useMutation({
    mutationFn: (data: ISendOtpRequest) => {
      return postRequestResetPW(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        const { email } = response.data;

        navigate("/reset-password", { state: { email } });
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
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, ...rest } = data;
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
            <div className={styles.title}>Quên Mật Khẩu?</div>

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

            <div className={styles.codeContainer}>
              <FormControl variant="outlined" sx={{ flex: 1 }}>
                <OutlinedInput
                  sx={{ borderRadius: 0 }}
                  placeholder="Nhập Code"
                  error={!!errors.code}
                  {...register("code", {
                    required: "Vui lòng nhập code",
                    validate: (value) => {
                      if (+value === code) {
                        return true;
                      } else {
                        return "Code không hợp lệ";
                      }
                    },
                  })}
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
              Xác Nhận
            </LoadingButton>

            <div className={styles.backBtn} onClick={() => navigate("/login")}>
              Quay Lại
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgetPassword;
