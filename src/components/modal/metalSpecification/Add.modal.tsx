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
import { GoldColor } from "src/utils/enums";
import { goldK } from "src/utils/constants";
import { capitalizeFirstLetter } from "src/utils/functions";

interface IFormInput {
  pricePerUnit: number;
  color: GoldColor | string;
  type: string;
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
    console.log(
      `Gold ${data.type} - ${capitalizeFirstLetter(data.color.toLowerCase())}`
    );
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
      <DialogTitle>Add Metal Specification</DialogTitle>
      <DialogContent>
        <Grid container mt={2} justifyContent={"space-between"}>
          <Grid item xs={5.5}>
            <FormControl variant="standard" fullWidth error={!!errors.color}>
              <InputLabel>Color</InputLabel>
              <Controller
                defaultValue=""
                name="color"
                rules={{ required: "* Must select color" }}
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={""} disabled>
                      <em>Select color</em>
                    </MenuItem>
                    {[GoldColor.Yellow, GoldColor.White, GoldColor.Rose].map(
                      (color) => {
                        return (
                          <MenuItem value={color} key={color}>
                            {color}
                          </MenuItem>
                        );
                      }
                    )}
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
              <InputLabel>Type</InputLabel>
              <Controller
                defaultValue=""
                name="type"
                rules={{ required: "* Must select type" }}
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={""} disabled>
                      <em>Select type</em>
                    </MenuItem>
                    {goldK.map((color) => {
                      return (
                        <MenuItem value={color} key={color}>
                          {color}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {errors.type && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.type.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container item xs={5.5} mt={3}>
          <TextField
            autoFocus
            label="Price Per Gram"
            type="number"
            fullWidth
            variant="standard"
            error={!!errors.pricePerUnit}
            {...register("pricePerUnit", {
              required: "* Price must not be empty",
              min: { value: 0, message: "Invalid value" },
            })}
          />
          {errors.pricePerUnit && (
            <FormHelperText error sx={{ mt: 1 }}>
              {errors.pricePerUnit.message}
            </FormHelperText>
          )}
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
