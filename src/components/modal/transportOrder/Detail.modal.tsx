import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, FormHelperText, FormLabel, Grid } from "@mui/material";
import defaultImg from "src/assets/default.jpg";
import moment from "moment";
import StaffTransportOrderTimeline from "src/components/timeline/staffTransportOrder/StaffTransportOrderTimeline";
import { primaryBtn } from "src/utils/styles";
import { useState } from "react";
import { TransportOrderStatus } from "src/utils/enums";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

function ViewModal(props: ITransportOrderModalProps) {
  const { open, setOpen, order } = props;

  const [deliveryImage, setDeliveryImage] = useState<File | null>(null);
  const [error, setError] = useState(false);

  const handleComplete = () => {
    if (!deliveryImage) {
      setError(true);
      return;
    }

    toast.success("Call api...");
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    setError(false);
    setDeliveryImage(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { px: 6, py: 3 },
      }}
      maxWidth={"md"}
      fullScreen
    >
      <DialogTitle>Đơn Giao Hàng</DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"space-between"} mb={3}>
          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Người Nhận"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={order?.receiverName}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Số Điện Thoại"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={order?.receiverPhone}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container mb={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              label="Địa Chỉ"
              type="text"
              multiline
              rows={3}
              fullWidth
              variant="standard"
              defaultValue={order?.deliveryAddress}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent={"space-between"} mt={3}>
          <Grid item xs={5}>
            {order.transportOrderHistories.find(
              (item) => item.status === TransportOrderStatus.Rejected
            ) &&
            order.transportOrderHistories.every(
              (item) => item.status !== TransportOrderStatus.Completed
            ) ? (
              <label>
                <img
                  src={
                    deliveryImage
                      ? URL.createObjectURL(deliveryImage)
                      : defaultImg
                  }
                  width={"100%"}
                  height={550}
                  style={{
                    cursor: "pointer",
                    objectFit: "contain",
                    border: "1px dashed #ccc",
                  }}
                />
                <input
                  accept=".jpg,.png,.jpeg"
                  type="file"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setDeliveryImage(e.target.files[0]);
                      setError(false);
                    }
                  }}
                />
              </label>
            ) : (
              <img
                src={order?.image ? order.image.url : defaultImg}
                width={"100%"}
                height={550}
                style={{
                  objectFit: "contain",
                  border: "1px dashed #ccc",
                }}
              />
            )}

            {!order?.image && !deliveryImage && (
              <FormHelperText>Chưa có hình ảnh giao hàng</FormHelperText>
            )}

            {order.transportOrderHistories.find(
              (item) => item.status === TransportOrderStatus.Rejected
            ) &&
              order.transportOrderHistories.every(
                (item) => item.status !== TransportOrderStatus.Completed
              ) && (
                <Grid container justifyContent={"flex-end"} mt={1}>
                  <LoadingButton
                    variant="contained"
                    sx={{ ...primaryBtn, py: 1 }}
                    onClick={handleComplete}
                  >
                    Xác Nhận Hoàn Thành
                  </LoadingButton>
                  {error && (
                    <Grid item xs={12} mt={1}>
                      <FormHelperText error sx={{ textAlign: "right" }}>
                        * Chưa upload hình ảnh giao hàng
                      </FormHelperText>
                    </Grid>
                  )}
                </Grid>
              )}
          </Grid>

          <Grid item xs={6}>
            <StaffTransportOrderTimeline order={order} />
          </Grid>
        </Grid>

        <Grid container mt={5}>
          <Divider sx={{ width: "100%", mb: 5 }} />
          <fieldset style={{ width: "100%" }}>
            <legend>Ghi Chú Giao Hàng</legend>

            {order.transportationNotes?.length !== 0 ? (
              <Grid container item justifyContent={"space-between"} my={2}>
                <Grid item xs={3}>
                  <FormLabel focused>Thời Gian</FormLabel>
                </Grid>

                <Grid item xs={8}>
                  <FormLabel focused>Ghi Chú</FormLabel>
                </Grid>
              </Grid>
            ) : (
              <FormHelperText>Chưa bắt đầu giao hàng</FormHelperText>
            )}

            {order.transportationNotes?.map((item) => {
              return (
                <Grid
                  container
                  item
                  justifyContent={"space-between"}
                  key={item.id}
                  mb={2}
                >
                  <Grid item xs={3}>
                    {moment(item.date).format("DD/MM/YYYY HH:mm")}
                  </Grid>

                  <Grid item xs={8}>
                    {item.note}
                  </Grid>
                </Grid>
              );
            })}
          </fieldset>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewModal;
