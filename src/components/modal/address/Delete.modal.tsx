import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";

function DeleteModal(props: IModalProps) {
  const { open, setOpen } = props;

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2 },
      }}
    >
      <DialogTitle>Xóa Địa Chỉ</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xóa địa chỉ này không?
        </DialogContentText>
        {/* <Grid container spacing={4}>
          <Grid item xs={6}></Grid>

          <Grid item xs={6}></Grid>
        </Grid> */}
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained">Xác Nhận</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
