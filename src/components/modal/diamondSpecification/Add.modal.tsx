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
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  diamondClarity,
  diamondColors,
  diamondShapes,
} from "src/utils/constants";

interface IFormInput {
  name: string;
  weight: number;
  color: string;
  clarity: string;
  shape: string;
  price: number;
}

function AddModal(props: IModalProps) {
  const { open, setOpen } = props;

  const {
    control,
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
      <DialogTitle>Add Diamond Specification</DialogTitle>
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

        <Grid container justifyContent={"space-between"} mt={2}>
          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Carat Weight"
              type="number"
              inputProps={{
                step: 0.01,
              }}
              fullWidth
              variant="standard"
              error={!!errors.weight}
              {...register("weight", {
                required: "* Weight must not be empty",
                min: { value: 0.05, message: "Min weight is 0.05 carat" },
                max: { value: 0.15, message: "Max weight is 0.15 carat" },
              })}
            />
            {errors.weight && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.weight.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              error={!!errors.price}
              {...register("price", {
                required: "* Price must not be empty",
                min: { value: 0, message: "Invalid value" },
              })}
            />
            {errors.price && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.price.message}
              </FormHelperText>
            )}
          </Grid>
        </Grid>

        <Grid container mt={2} justifyContent={"space-between"}>
          <Grid item xs={5.5}>
            <FormControl variant="standard" fullWidth error={!!errors.color}>
              <InputLabel>Color</InputLabel>
              <Controller
                defaultValue={""}
                name="color"
                rules={{ required: "* Must select color" }}
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={""}>
                      <em>Select color</em>
                    </MenuItem>
                    {diamondColors.map((color) => {
                      return (
                        <MenuItem value={color} key={color}>
                          {color}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {errors.color && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.color.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={5.5}>
            <FormControl variant="standard" fullWidth error={!!errors.color}>
              <InputLabel>Clarity</InputLabel>
              <Controller
                defaultValue={""}
                name="clarity"
                rules={{ required: "* Must select clarity" }}
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={""}>
                      <em>Select clarity</em>
                    </MenuItem>
                    {diamondClarity.map((clarity) => {
                      return (
                        <MenuItem value={clarity} key={clarity}>
                          {clarity}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {errors.clarity && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.clarity.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container item xs={5.5} mt={2}>
          <FormControl variant="standard" fullWidth error={!!errors.color}>
            <InputLabel>Shape</InputLabel>
            <Controller
              defaultValue={""}
              name="shape"
              rules={{ required: "* Must select shape" }}
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value={""}>
                    <em>Select shape</em>
                  </MenuItem>
                  {diamondShapes.map((shape) => {
                    return (
                      <MenuItem value={shape} key={shape}>
                        {shape}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            {errors.shape && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.shape.message}
              </FormHelperText>
            )}
          </FormControl>
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
