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
import { fetchDiamonds, fetchDiamondSpecs } from "src/utils/querykey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDiamondSpecs } from "src/services/diamondSpec.service";
import { postUploadFile } from "src/services/file.service";
import { toast } from "react-toastify";
import { putUpdateDiamond } from "src/services/diamond.service";
import LoadingButton from "@mui/lab/LoadingButton";

interface IFormInput {
  giaReportNumber: string;
  giaDocument: File;
  diamondSpecId: number;
}

const specFilter = {
  page: 0,
  pageSize: 100,
};

function UpdateModal(props: IUpdateDiamondModalProps) {
  const { open, setOpen, resetSelected, selected, filterObj } = props;

  const queryClient = useQueryClient();

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

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; payload: IUpdateDiamondRequest }) => {
      return putUpdateDiamond(data.id, data.payload);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Cập nhật thành công");

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
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return {
        giaReportNumber: selected.giaReportNumber,
        diamondSpecId: selected.diamondSpecification.id,
      };
    }, [selected]),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let documentId = selected.giaDocument.id;

    if (data.giaDocument) {
      const base64 = await toBase64(data.giaDocument);
      const uploadRes = await uploadMutation.mutateAsync(base64);

      if (uploadRes.data) {
        documentId = uploadRes.data.id;
      }
    }

    updateMutation.mutate({
      id: selected.id,
      payload: {
        diamondSpecificationId: data.diamondSpecId,
        giaDocumentId: documentId,
        giaReportNumber: data.giaReportNumber,
      },
    });
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
      giaReportNumber: selected.giaReportNumber,
      diamondSpecId: selected.diamondSpecification.id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
        <LoadingButton
          loading={uploadMutation.isPending || updateMutation.isPending}
          variant="contained"
          type="submit"
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateModal;
