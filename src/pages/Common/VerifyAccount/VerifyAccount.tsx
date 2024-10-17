import {
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
} from "@mui/material";
import styles from "./VerfifyAccount.module.scss";
import { primaryBtn } from "src/utils/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  postAccountVerify,
  postResendOtp,
} from "src/services/customer.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

interface IFormInput {
  otp: string;
}

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location: Location<{ email: string }> = useLocation();

  const mutation = useMutation({
    mutationFn: (data: IAccountVerifyRequest) => {
      return postAccountVerify(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        const { email } = location.state;
        navigate("/login", { state: { email } });
        toast.success("Tài khoản đã được kích hoạt");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: (data: ISendOtpRequest) => {
      return postResendOtp(data);
    },
    onSuccess: (response) => {
      if (response.data) {
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
    const { email } = location.state;

    mutation.mutate({
      verificationCode: data.otp,
      email,
    });
  };

  const resendOtp = () => {
    const { email } = location.state;

    resendMutation.mutate({ email });
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/register");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

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

            <LoadingButton
              fullWidth
              type="submit"
              sx={primaryBtn}
              variant="contained"
              loading={mutation.isPending || resendMutation.isPending}
            >
              Xác Nhận
            </LoadingButton>

            <div className={styles.backBtn} onClick={resendOtp}>
              Gửi lại OTP
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default VerifyAccount;
