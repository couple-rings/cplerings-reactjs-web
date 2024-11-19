import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, DialogContentText } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SpouseModal(props: IModalProps) {
  const { open, setOpen } = props;

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/customer/love-verification");
  };

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
      fullWidth
    >
      <DialogTitle>Xác Minh Danh Tính</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>
          Bạn chưa thực hiện xác minh danh tính.
        </DialogContentText>
        <Box sx={{ lineHeight: "1.7rem" }}>
          Vui lòng xác minh danh tính bằng căn cước công dân hoặc chứng minh
          nhân dân trước khi tiếp tục.
        </Box>
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" onClick={handleRedirect}>
          Bắt Đầu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SpouseModal;
