import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormHelperText } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  name: string;
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
      <DialogTitle>Add Tag</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          error={!!errors.name}
          {...register("name", {
            required: "* Name must not be empty",
          })}
        />
        {errors.name && (
          <FormHelperText error sx={{ mt: 1 }}>
            {errors.name.message}
          </FormHelperText>
        )}
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
