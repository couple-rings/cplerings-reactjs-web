import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormHelperText, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";

interface IFormInput {
  name: string;
  description: string;
}

function UpdateModal(props: IJewelryCategoryModalProps) {
  const { open, setOpen, description, name, resetSelected } = props;

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return {
        name,
        description,
      };
    }, [description, name]),
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
      name,
      description,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description]);

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
      <DialogTitle>Update Jewelry Category</DialogTitle>
      <DialogContent>
        <Grid container mb={3}>
          <Grid item xs={12} mb={1}>
            <TextField
              error={!!errors.name}
              autoFocus
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              {...register("name", {
                required: "* Name must not be empty",
              })}
            />
          </Grid>
          {errors.name && (
            <FormHelperText error>{errors.name.message}</FormHelperText>
          )}

          <Grid item xs={12} mt={3}>
            <TextField
              error={!!errors.description}
              autoFocus
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={6}
              variant="standard"
              {...register("description", {
                required: "* Description must not be empty",
              })}
            />
            {errors.description && (
              <FormHelperText error>
                {errors.description.message}
              </FormHelperText>
            )}
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
