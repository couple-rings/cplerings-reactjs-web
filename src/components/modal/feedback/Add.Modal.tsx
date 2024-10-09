import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormHelperText, Rating } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  rating: number;
  title: string;
  comment: string;
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
      <DialogTitle>Tạo Đánh Giá</DialogTitle>
      <DialogContent>
        <Controller
          control={control}
          name={"rating"}
          defaultValue={0}
          rules={{ min: { value: 1, message: "* Vui lòng đánh giá" } }}
          render={({ field: { onChange, value } }) => (
            <Rating
              name={"rating"}
              onChange={onChange}
              value={Number(value)}
              sx={{ color: "#b43620", mt: 1 }}
            />
          )}
        />
        {errors.rating && (
          <FormHelperText error>{errors.rating.message}</FormHelperText>
        )}

        <TextField
          sx={{ mt: 2 }}
          autoFocus
          label="Tiêu Đề"
          type="text"
          fullWidth
          variant="standard"
          error={!!errors.title}
          {...register("title", {
            required: "* Vui lòng nhập tiêu đề",
          })}
        />
        {errors.title && (
          <FormHelperText error>{errors.title.message}</FormHelperText>
        )}

        <Box sx={{ my: 3 }}>
          <TextField
            autoFocus
            label="Nội Dung"
            type="text"
            rows={4}
            multiline
            fullWidth
            variant="outlined"
            error={!!errors.comment}
            {...register("comment", {
              required: "* Vui lòng nhập nội dung",
            })}
          />
          {errors.comment && (
            <FormHelperText error>{errors.comment.message}</FormHelperText>
          )}
        </Box>
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

export default AddModal;
