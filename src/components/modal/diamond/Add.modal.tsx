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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDiamondSpecs, fetchDiamonds } from "src/utils/querykey";
import { getDiamondSpecs } from "src/services/diamondSpec.service";
import { postUploadFile } from "src/services/file.service";
import { toast } from "react-toastify";
import { postCreateDiamond } from "src/services/diamond.service";
import { toBase64 } from "src/utils/functions";
import { useAppSelector } from "src/utils/hooks";

interface IFormInput {
  giaReportNumber: string;
  giaDocument: File;
  diamondSpecId: number;
}

const specFilter = {
  page: 0,
  pageSize: 100,
};

function AddModal(props: IAddDiamondModalProps) {
  const { open, setOpen, filterObj } = props;

  const queryClient = useQueryClient();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: specResponse } = useQuery({
    queryKey: [fetchDiamondSpecs, specFilter],

    queryFn: () => {
      return getDiamondSpecs(specFilter);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (base64: string) => {
      return postUploadFile(base64);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ICreateDiamondRequest) => {
      return postCreateDiamond(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Thêm kim cương thành công");

        queryClient.invalidateQueries({
          queryKey: [fetchDiamonds, filterObj],
        });

        handleClose();
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const {
    control,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const base64 = await toBase64(data.giaDocument);

    const uploadResponse = await uploadMutation.mutateAsync(base64);

    if (uploadResponse.data) {
      createMutation.mutate({
        branchId,
        giaDocumentId: uploadResponse.data.id,
        diamondSpecificationId: data.diamondSpecId,
        giaReportNumber: data.giaReportNumber,
      });
    }
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
