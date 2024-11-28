import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, FormHelperText, FormLabel, Grid } from "@mui/material";
import defaultImg from "src/assets/default.jpg";
import moment from "moment";

function ViewModal(props: ITransportOrderModalProps) {
  const { open, setOpen, order } = props;

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
      maxWidth={"md"}
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
              fullWidth
              variant="standard"
              defaultValue={order?.deliveryAddress}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid item xs={8} mt={3}>
            <img
              src={order?.image ? order.image.url : defaultImg}
              width={"100%"}
            />
            {!order?.image && (
              <FormHelperText>Chưa có hình ảnh giao hàng</FormHelperText>
            )}
          </Grid>
        </Grid>

        <Grid container mt={5}>
          <Divider sx={{ width: "100%", mb: 5 }} />
          <fieldset style={{ width: "100%" }}>
            <legend>Quá Trình Giao Hàng</legend>

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
