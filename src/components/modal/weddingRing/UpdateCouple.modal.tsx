import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormHelperText, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import { toBase64 } from "src/utils/functions";

interface IFormInput {
  name: string;
  description: string;
}

function UpdateCoupleModal(props: ICoupleDesignModalProps) {
  const { open, setOpen, description, name, resetSelected, previewImage } =
    props;
  const { url } = previewImage;

  const ref = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState("");

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

  const handleChooseImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = await toBase64(e.target.files[0]);
      setImage(image);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    setImage(url);
    resetSelected && resetSelected();
  };

  useEffect(() => {
    reset({
      name,
      description,
    });

    setImage(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, url]);

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
      <DialogTitle>Update Couple Design</DialogTitle>
      <DialogContent>
        <Grid container my={3}>
          <Grid container item xs={12} justifyContent={"center"}>
            <Grid item xs={6}>
              <label
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={image}
                  width={"100%"}
                  style={{ border: "1px solid #ccc" }}
                />
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  hidden
                  ref={ref}
                  onChange={(e) => handleChooseImage(e)}
                />
              </label>
            </Grid>

            <Grid container item xs={12} justifyContent={"center"}>
              <Button
                variant="outlined"
                sx={{ width: "50%", my: 3, textTransform: "capitalize" }}
                onClick={() => ref.current?.click()}
              >
                Choose image
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={3}>
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
            <FormHelperText sx={{ mt: 1 }} error>
              {errors.name.message}
            </FormHelperText>
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

export default UpdateCoupleModal;
