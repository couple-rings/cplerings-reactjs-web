import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, FormLabel, Grid } from "@mui/material";
import { currencyFormatter, formatPaymentStatus } from "src/utils/functions";
import moment from "moment";
import { PaymentType } from "src/utils/enums";

function ViewModal(props: IPaymentModalProps) {
  const { open, setOpen, amount, date, description, status, type, paymentNo } =
    props;

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
      <DialogTitle>Thông tin thanh toán</DialogTitle>
      <DialogContent>
        <Grid container mb={1}>
          <Grid item xs={4}>
            <FormLabel>Mã giao dịch:</FormLabel>
          </Grid>
          <Grid item>{paymentNo}</Grid>
        </Grid>
        <Grid container mb={1}>
          <Grid item xs={4}>
            <FormLabel>Phương thức:</FormLabel>
          </Grid>
          <Grid item>
            {type === PaymentType.VnPay && "Thanh toán qua VnPay"}
          </Grid>
        </Grid>
        <Grid container mb={1}>
          <Grid item xs={4}>
            <FormLabel>Ngày thực hiện:</FormLabel>
          </Grid>
          <Grid item>{moment(date).format("DD/MM/YYYY, HH:mm")}</Grid>
        </Grid>
        <Grid container mb={1}>
          <Grid item xs={4}>
            <FormLabel>Số tiền:</FormLabel>
          </Grid>
          <Grid item>{currencyFormatter(amount)}</Grid>
        </Grid>
        <Grid container mb={3}>
          <Grid item xs={4}>
            <FormLabel>Nội dung:</FormLabel>
          </Grid>
          <Grid item flex={1}>
            {description}
          </Grid>
        </Grid>
        <Grid container mb={1} alignItems={"center"}>
          <Grid item xs={4}>
            <FormLabel>Trạng thái:</FormLabel>
          </Grid>
          <Grid item>
            <Chip
              label={formatPaymentStatus(status).text}
              color={formatPaymentStatus(status).color}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewModal;
