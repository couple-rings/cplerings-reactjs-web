import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormHelperText, FormLabel, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  maleReason: string;
  femaleReason: string;
}

function RejectModal(props: IRejectModalProps) {
  const { open, setOpen, handleReject } = props;

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleReject(data.maleReason, data.femaleReason);
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
      <DialogTitle>Lý Do Cụ Thể</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>Nêu lý do từ chối yêu cầu</Box>
        <Box sx={{ mb: 4 }}>
          <FormLabel error={!!errors.maleReason}>
            Yêu Cầu Gia Công Nhẫn Nam
          </FormLabel>
          <TextField
            error={!!errors.maleReason}
            autoFocus
            placeholder="Nêu lý do..."
            type="text"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 1 }}
            variant="outlined"
            {...register("maleReason", {
              required: "* Vui lòng nêu lý do",
            })}
          />
          {errors.maleReason && (
            <FormHelperText error>{errors.maleReason.message}</FormHelperText>
          )}
        </Box>
        <FormLabel error={!!errors.femaleReason}>
          Yêu Cầu Gia Công Nhẫn Nữ
        </FormLabel>
        <TextField
          error={!!errors.femaleReason}
          autoFocus
          placeholder="Nêu lý do..."
          type="text"
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 1 }}
          variant="outlined"
          {...register("femaleReason", {
            required: "* Vui lòng nêu lý do",
          })}
        />
        {errors.femaleReason && (
          <FormHelperText error>{errors.femaleReason.message}</FormHelperText>
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

export default RejectModal;
