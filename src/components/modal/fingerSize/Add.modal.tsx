import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormHelperText, Grid } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  size: number;
  diameter: number;
}

function AddModal(props: IModalProps) {
  const { open, setOpen } = props;

  const {
    reset,
    register,
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
      <DialogTitle>Add Finger Size</DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Size"
              type="number"
              fullWidth
              variant="standard"
              error={!!errors.size}
              {...register("size", {
                required: "* Size must not be empty",
                min: { value: 1, message: "Invalid size" },
              })}
            />
            {errors.size && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.size.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={5.5}>
            <TextField
              error={!!errors.diameter}
              autoFocus
              label="Diameter"
              type="number"
              fullWidth
              variant="standard"
              inputProps={{
                step: 0.1,
              }}
              {...register("diameter", {
                required: "* Diameter must not be empty",
                min: { value: 0, message: "Invalid value" },
              })}
            />
            {errors.diameter && (
              <FormHelperText error>{errors.diameter.message}</FormHelperText>
            )}
          </Grid>
        </Grid>
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
