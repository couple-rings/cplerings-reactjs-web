import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  giaReportNumber: string;
  giaDocument: File;
  diamondSpecId: number;
}

const diamondSpecs = [
  {
    id: 1,
    name: "Pure Heart",
    weight: 0.05,
    color: "D",
    clarity: "VS2",
    shape: "HEART",
    price: 3600000,
  },
  {
    id: 2,
    name: "Graceful Oval",
    weight: 0.05,
    color: "G",
    clarity: "SI1",
    shape: "OVAL",
    price: 3120000,
  },
  {
    id: 3,
    name: "Dazzling Round",
    weight: 0.15,
    color: "G",
    clarity: "VS2",
    shape: "ROUND",
    price: 3600000,
  },
];

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
      <DialogTitle>Add Diamond</DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5.5}>
            <TextField
              error={!!errors.giaReportNumber}
              autoFocus
              label="GIA Report No"
              type="number"
              fullWidth
              variant="standard"
              {...register("giaReportNumber", {
                required: "* Report number must not be empty",
              })}
            />
            {errors.giaReportNumber && (
              <FormHelperText error>
                {errors.giaReportNumber.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={5.5}>
            <FormControl variant="standard" fullWidth>
              <InputLabel error={!!errors.diamondSpecId}>
                4C Specification
              </InputLabel>
              <Controller
                defaultValue={0}
                name="diamondSpecId"
                rules={{
                  required: "* Must select specification",
                  min: { value: 1, message: "* Must select specification" },
                }}
                control={control}
                render={({ field }) => (
                  <Select {...field} error={!!errors.diamondSpecId}>
                    <MenuItem value={0} disabled>
                      <em>Select specification</em>
                    </MenuItem>
                    {diamondSpecs.map((spec) => {
                      return (
                        <MenuItem value={spec.id} key={spec.id}>
                          {spec.shape} {spec.weight} - {spec.color} -{" "}
                          {spec.clarity}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {errors.diamondSpecId && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.diamondSpecId.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={5}>
          <FormLabel error={!!errors.giaDocument}>GIA Document</FormLabel>
          <Controller
            name="giaDocument"
            control={control}
            rules={{ required: "* Must provide GIA document file" }}
            render={({ field: { onChange } }) => (
              <TextField
                type="file"
                fullWidth
                inputProps={{
                  accept: ".pdf",
                }}
                error={!!errors.giaDocument}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e.target.files && e.target.files[0]);
                }}
              />
            )}
          />
          {errors.giaDocument && (
            <FormHelperText error sx={{ mt: 1 }}>
              {errors.giaDocument.message}
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
