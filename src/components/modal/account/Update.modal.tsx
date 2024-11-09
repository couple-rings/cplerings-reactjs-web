import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AccountStatus, UserRole } from "src/utils/enums";
import { useEffect, useMemo } from "react";

interface IFormInput {
  status: boolean;
  role: UserRole;
}

function UpdateModal(props: IAccountModalProps) {
  const { open, setOpen, role, status, resetSelected } = props;

  const { reset, handleSubmit, control } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return {
        role,
        status: status === AccountStatus.Active ? true : false,
      };
    }, [role, status]),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    resetSelected && resetSelected();
  };

  useEffect(() => {
    reset({
      role,
      status: status === AccountStatus.Active ? true : false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, status]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2, width: "25%" },
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Update Account</DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"space-between"} mb={3}>
          <Grid item xs={12} mb={3}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Role</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
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
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch checked={value} onChange={onChange} />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateModal;
