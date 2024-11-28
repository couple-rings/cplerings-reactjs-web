import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormHelperText, FormLabel, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postUploadFile } from "src/services/file.service";
import { toast } from "react-toastify";
import { toBase64 } from "src/utils/functions";
import { StagePercentage } from "src/utils/enums";
import LoadingButton from "@mui/lab/LoadingButton";

interface IFormInput {
  maleDocument: File;
  femaleDocument: File;
}

function CompleteModal(props: ICompleteCraftingStageModalProps) {
  const { open, setOpen, handleComplete, updatingStage } = props;

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

  const {
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { maleDocument, femaleDocument } = data;

    const maleBase64 = await toBase64(maleDocument);
    const femaleBase64 = await toBase64(femaleDocument);

    const maleResponse = await uploadMutation.mutateAsync(maleBase64);
    const femaleResponse = await uploadMutation.mutateAsync(femaleBase64);

    if (maleResponse.data && femaleResponse.data) {
      handleComplete(
        StagePercentage.Third,
        maleResponse.data.id,
        femaleResponse.data.id
      );

      handleClose();
    }
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
      <DialogTitle>Xác Nhận Hoàn Thành</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>Cập nhật giấy bảo hành</Box>
        <Box sx={{ mb: 4 }}>
          <FormLabel error={!!errors.maleDocument}>
            Giấy bảo hành nhẫn nam
          </FormLabel>
          <Controller
            name="maleDocument"
            control={control}
            rules={{ required: "* Upload giấy bảo hành" }}
            render={({ field: { onChange } }) => (
              <TextField
                type="file"
                fullWidth
                inputProps={{
                  accept: ".pdf",
                }}
                error={!!errors.maleDocument}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e.target.files && e.target.files[0]);
                }}
              />
            )}
          />
          {errors.maleDocument && (
            <FormHelperText error sx={{ mt: 1 }}>
              {errors.maleDocument.message}
            </FormHelperText>
          )}
        </Box>

        <FormLabel error={!!errors.femaleDocument}>
          Giấy bảo hành nhẫn nữ
        </FormLabel>
        <Controller
          name="femaleDocument"
          control={control}
          rules={{ required: "* Upload giấy bảo hành" }}
          render={({ field: { onChange } }) => (
            <TextField
              type="file"
              fullWidth
              inputProps={{
                accept: ".pdf",
              }}
              error={!!errors.femaleDocument}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.files && e.target.files[0]);
              }}
            />
          )}
        />
        {errors.femaleDocument && (
          <FormHelperText error sx={{ mt: 1 }}>
            {errors.femaleDocument.message}
          </FormHelperText>
        )}
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Hủy
        </Button>
        <LoadingButton
          loading={uploadMutation.isPending || updatingStage}
          variant="contained"
          type="submit"
        >
          Xác Nhận
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default CompleteModal;
