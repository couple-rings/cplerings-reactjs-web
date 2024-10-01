import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styles from "./Register.module.scss";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { emailPattern, passwordPattern } from "src/utils/constants";
import { primaryBtn } from "src/utils/styles";

interface IFormInput {
  email: string;
  password: string;
  code: string;
}

const Register = () => {
  const [code, setCode] = useState(0);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
                id="outlined-basic"
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

            <FormControl fullWidth>
              <TextField
              fullWidth
                // className={styles.type}
                type="password"
                id="outlined-basic"
                label="Mật khẩu"
                error={!!errors.password}
                {...register("password", {
                  required: "* Vui lòng nhập mật khẩu",
                  pattern: {
                    value: passwordPattern,
                    message: "* Mật khẩu không hợp lệ",
                  },
                })}
                variant="outlined"
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <div className={styles.codeContainer}>
  <FormControl variant="outlined" sx={{ flex: 1 }} fullWidth>
    <TextField
      fullWidth
      id="outlined-basic"
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


            

            

            <Button variant="contained" sx={primaryBtn} fullWidth type="submit">
              Tạo tài khoản
            </Button>

            <p className={styles.description}>
              By creating this account, you agree to the DR’s user registration
              agreement and privacy terms
            </p>

            <h2 className="note">Already have one</h2>
            <p className={styles.navigateSignIn}>
              Sign in{" "}
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
