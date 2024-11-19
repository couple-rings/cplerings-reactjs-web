import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormHelperText, FormLabel, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  maleDocument: File;
  femaleDocument: File;
}

function CompleteModal(props: IModalProps) {
  const { open, setOpen } = props;

  const {
    reset,
    formState: { errors },
    handleSubmit,
    control,
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
        <Button variant="contained" type="submit">
          Xác Nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CompleteModal;
