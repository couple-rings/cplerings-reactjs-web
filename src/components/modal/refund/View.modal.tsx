import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import {
  currencyFormatter,
  formatRefundMethodTitle,
} from "src/utils/functions";
import { CustomOrderStatus } from "src/utils/enums";
import WeddingRing from "src/components/product/WeddingRing";
import { primaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";

function ViewModal(props: IRefundModalProps) {
  const { open, setOpen, data } = props;

  const navigate = useNavigate();

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };
  console.log(data);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
      fullWidth
      fullScreen
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#313131" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Chi Tiết Đơn
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Container sx={{ mt: 3 }}>
          <Grid container mb={3}>
            <Grid container mb={1}>
              <Grid container item sm={6}>
                <Grid item xs={4} md={3} mb={1}>
                  <FormLabel>Mã đơn:</FormLabel>
                </Grid>

                <Grid item>{data.orderNo}</Grid>
              </Grid>

              <Grid container item sm={6}>
                <Grid item xs={4} md={3}>
                  <FormLabel>Ngày tạo:</FormLabel>
                </Grid>

                <Grid item>
                  {moment(data.createdAt).format("DD/MM/YYYY HH:mm")}
                </Grid>
              </Grid>
            </Grid>

            <Grid container mb={3}>
              <Grid container item sm={6} alignItems={"center"}>
                <Grid item xs={4} md={3}>
                  <FormLabel>Số tiền:</FormLabel>
                </Grid>

                <Grid item fontWeight={600} color={"#b43620"}>
                  {currencyFormatter(data.amount.amount)}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} mb={3}>
              <fieldset style={{ margin: 0, width: "100%" }}>
                <legend>Nhân Viên Thực Hiện</legend>
                <Grid container p={2}>
                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Tên tài khoản:</Grid>

                    <Grid item>{data.staff.username}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Email:</Grid>

                    <Grid item>{data.staff.email}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Số điện thoại:</Grid>

                    <Grid item>
                      {data.staff.phone ? data.staff.phone : "--"}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Chi nhánh:</Grid>

                    <Grid item>{data.staff.branch?.storeName}</Grid>
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid container mb={6}>
              <Grid item mb={2}>
                Lý do hoàn trả:
              </Grid>

              <Grid item xs={12}>
                <OutlinedInput
                  sx={{ borderRadius: 0 }}
                  fullWidth
                  readOnly
                  multiline
                  rows={4}
                  defaultValue={data.reason}
                />
              </Grid>
            </Grid>

            <Grid container mb={1}>
              <Grid container>
                <Grid item xs={4} md={3} mb={1}>
                  <FormLabel>Mã giao dịch:</FormLabel>
                </Grid>

                <Grid item>{data.payment.paymentNo}</Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4} md={3}>
                  <FormLabel>Phương thức:</FormLabel>
                </Grid>

                <Grid item>{formatRefundMethodTitle(data.method)}</Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent={"space-between"} mb={6}>
              <Grid item xs={5.7}>
                <Box sx={{ mb: 2 }}>Hình ảnh giao dịch:</Box>
                <img
                  src={data.proofImage.url}
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                  }}
                />
              </Grid>

              <Grid item xs={5.7}>
                <Grid item mb={2}>
                  Nội dung:
                </Grid>

                <Grid item xs={12}>
                  <OutlinedInput
                    sx={{ borderRadius: 0 }}
                    fullWidth
                    readOnly
                    multiline
                    rows={4}
                    defaultValue={data.payment.description}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container mb={3}>
              <Box sx={{ mb: 2, fontWeight: 600 }}>Đơn Hàng Gốc</Box>
              <Grid container mb={1}>
                <Grid container item sm={6}>
                  <Grid item xs={4} md={3} mb={1}>
                    <FormLabel>Mã đơn:</FormLabel>
                  </Grid>

                  <Grid item>{data.customOrder?.orderNo}</Grid>
                </Grid>

                <Grid container item sm={6}>
                  <Grid item xs={4} md={3}>
                    <FormLabel>Ngày bắt đầu:</FormLabel>
                  </Grid>

                  <Grid item>
                    {moment(data.customOrder?.createdAt).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid container mb={1}>
                <Grid container item sm={6}>
                  <Grid item xs={4} md={3}>
                    <FormLabel>Số tiền:</FormLabel>
                  </Grid>

                  <Grid item fontWeight={600} color={"#b43620"}>
                    {currencyFormatter(
                      data.customOrder?.totalPrice.amount ?? 0
                    )}
                  </Grid>
                </Grid>

                <Grid container item sm={6}>
                  <Grid item xs={4} md={3}>
                    <FormLabel>Ngày kết thúc:</FormLabel>
                  </Grid>

                  <Grid item>
                    {moment(
                      data.customOrder?.customOrderHistories.find(
                        (item) => item.status === CustomOrderStatus.Completed
                      )?.createdAt
                    ).format("DD/MM/YYYY HH:mm")}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {data.customOrder && (
              <WeddingRing
                ring={data.customOrder.firstRing}
                gender={
                  data.customOrder.firstRing.customDesign.designVersion.design
                    .characteristic
                }
              />
            )}

            {data.customOrder && (
              <WeddingRing
                ring={data.customOrder.secondRing}
                gender={
                  data.customOrder.secondRing.customDesign.designVersion.design
                    .characteristic
                }
              />
            )}

            <Grid container justifyContent={"flex-end"}>
              <Button
                variant="contained"
                sx={{ ...primaryBtn, py: 1 }}
                onClick={() =>
                  navigate(`/staff/custom-order/detail/${data.customOrder?.id}`)
                }
              >
                Xem Đơn Gốc
              </Button>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default ViewModal;
