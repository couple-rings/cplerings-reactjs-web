import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "src/utils/constants";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UserRole } from "src/utils/enums";

interface IFormInput {
  email: string;
  username: string;
  role: UserRole;
  password: string;
  cfnPassword: string;
}

function AddModal(props: IModalProps) {
  const { open, setOpen } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showCfnPassword, setShowCfnPassword] = useState(false);

  const {
    reset,
    register,
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2 },
      }}
      fullWidth
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Add Account</DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.email}
              {...register("email", {
                required: "* Email must not be empty",
                pattern: {
                  value: emailPattern,
                  message: "* Invalid email format",
                },
              })}
            />
            {errors.email && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.email.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.username}
              {...register("username", {
                required: "* Username must not be empty",
              })}
            />
            {errors.username && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.username.message}
              </FormHelperText>
            )}
          </Grid>
        </Grid>

        <Grid container item xs={5.5} mt={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel error={!!errors.role}>Role</InputLabel>
            <Controller
              defaultValue={UserRole.Default}
              name="role"
              rules={{ required: "* Must select role" }}
              control={control}
              render={({ field }) => (
                <Select {...field} error={!!errors.role}>
                  <MenuItem value={""}>
                    <em>Select role</em>
                  </MenuItem>
                  {[
                    UserRole.Admin,
                    UserRole.Customer,
                    UserRole.Jeweler,
                    UserRole.Manager,
                    UserRole.Staff,
                    UserRole.Transporter,
                  ].map((role) => {
                    return (
                      <MenuItem value={role} key={role}>
                        {role.toLowerCase()}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            {errors.role && (
              <FormHelperText error>{errors.role.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
          <InputLabel error={!!errors.password}>Password</InputLabel>
          <Input
            error={!!errors.password}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  edge="start"
                >
                  {showPassword ? (
                    <VisibilityOff
                      color={errors.password ? "error" : undefined}
                    />
                  ) : (
                    <Visibility color={errors.password ? "error" : undefined} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            {...register("password", {
              required: "* Password must not be empty",
              pattern: {
                value: passwordPattern,
                message:
                  "At least 8 characters including number, alphabet and special character",
              },
            })}
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
          <InputLabel error={!!errors.cfnPassword}>Confirm Password</InputLabel>
          <Input
            error={!!errors.cfnPassword}
            type={showCfnPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCfnPassword((show) => !show)}
                  edge="start"
                >
                  {showCfnPassword ? (
                    <VisibilityOff
                      color={errors.cfnPassword ? "error" : undefined}
                    />
                  ) : (
                    <Visibility
                      color={errors.cfnPassword ? "error" : undefined}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            }
            {...register("cfnPassword", {
              required: "* Must confirm password",
              validate: (value) => {
                const { password } = getValues();
                if (value === password) {
                  return true;
                } else {
                  return "* Passwords do not match";
                }
              },
            })}
          />
          {errors.cfnPassword && (
            <FormHelperText error>{errors.cfnPassword.message}</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
