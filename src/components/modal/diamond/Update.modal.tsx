import Button from "@mui/material/Button";
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
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { toBase64 } from "src/utils/functions";
import { fetchDiamondSpecs } from "src/utils/querykey";
import { useQuery } from "@tanstack/react-query";
import { getDiamondSpecs } from "src/services/diamondSpec.service";

interface IFormInput {
  giaReportNumber: string;
  giaDocument: File;
  diamondSpecId: number;
}

const specFilter = {
  page: 0,
  pageSize: 100,
};

function UpdateModal(props: IDiamondModalProps) {
  const { open, setOpen, giaReportNumber, diamondSpecId, resetSelected } =
    props;

  const { data: specResponse } = useQuery({
    queryKey: [fetchDiamondSpecs, specFilter],

    queryFn: () => {
      return getDiamondSpecs(specFilter);
    },
  });

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return {
        giaReportNumber,
        diamondSpecId,
      };
    }, [diamondSpecId, giaReportNumber]),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.giaDocument) console.log(await toBase64(data.giaDocument));
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
      giaReportNumber,
      diamondSpecId,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giaReportNumber, diamondSpecId]);

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
      <DialogTitle>Update Diamond</DialogTitle>
      <DialogContent>
        <Grid container mb={3} justifyContent={"space-between"}>
          <Grid item xs={5.5} mb={1}>
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
          </Grid>
          {errors.giaReportNumber && (
            <FormHelperText error>
              {errors.giaReportNumber.message}
            </FormHelperText>
          )}

          <Grid item xs={5.5}>
            <FormControl
              variant="standard"
              fullWidth
              error={!!errors.diamondSpecId}
            >
              <InputLabel>4C Specification</InputLabel>
              <Controller
                name="diamondSpecId"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={0} disabled>
                      <em>Select specification</em>
                    </MenuItem>
                    {specResponse?.data?.items.map((spec) => {
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

          <Grid item xs={12} mt={3}>
            <FormLabel>GIA Document</FormLabel>
            <Controller
              name="giaDocument"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  type="file"
                  fullWidth
                  inputProps={{
                    accept: ".pdf",
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.files && e.target.files[0]);
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
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
