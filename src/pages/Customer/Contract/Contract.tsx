import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Skeleton,
} from "@mui/material";
import styles from "./Contract.module.scss";
import ring from "src/assets/One Ring.png";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import PhoneSharpIcon from "@mui/icons-material/PhoneSharp";
import ringblack from "src/assets/One Ring Black.png";
import { currencyFormatter, toBase64 } from "src/utils/functions";
import moment from "moment";
import ContractFile from "src/components/pdf/ContractFile";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import SignatureCanvas from "react-signature-canvas";
import { primaryBtn } from "src/utils/styles";
import { useEffect, useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import {
  fetchCustomerSpouse,
  fetchCustomOrderDetail,
} from "src/utils/querykey";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postUploadFile } from "src/services/file.service";
import { toast } from "react-toastify";
import { putUpdateContract } from "src/services/contract.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { getCustomerSpouse } from "src/services/spouse.service";
import { companyEmail, companyPhone } from "src/utils/constants";

function Contract() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [error, setError] = useState(false);
  const [customerSpouse, setCustomerSpouse] = useState<ISpouse | null>(null);

  const [signature, setSignature] = useState("");
  const [signed, setSigned] = useState(false);

  const [open, setOpen] = useState(false);

  const [instance, update] = usePDF({
    document: (
      <ContractFile
        signature={signature}
        name=""
        email={""}
        phone={""}
        total={0}
        address={""}
      />
    ),
  });

  const navigate = useNavigate();

  const ref = useRef<ReactSignatureCanvas>(null);

  const { orderId } = useParams<{ orderId: string }>();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, orderId],

    queryFn: () => {
      if (orderId) return getCustomOrderDetail(+orderId);
    },
    enabled: !!orderId,
  });

  const { data: spouseResponse } = useQuery({
    queryKey: [fetchCustomerSpouse, userId],

    queryFn: () => {
      return getCustomerSpouse(userId);
    },
  });

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

  const signContractMutation = useMutation({
    mutationFn: (data: { id: number; payload: IUpdateContractRequest }) => {
      return putUpdateContract(data.id, data.payload);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success(
          "Đã hoàn tất ký hợp đồng. Quý khách vui lòng thanh toán tiền cọc đợt 1"
        );
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const verifySignature = () => {
    if (ref.current?.isEmpty()) {
      setError(true);
      return;
    }
    setOpen(true);
  };

  const confirmSignature = async () => {
    const base64 = await toBase64(instance.blob as File);

    const uploadContractResponse = await uploadMutation.mutateAsync(base64);
    const uploadSignatureResponse = await uploadMutation.mutateAsync(signature);

    if (uploadContractResponse.data && uploadSignatureResponse.data && order) {
      signContractMutation.mutate({
        id: order.contract.id,
        payload: {
          documentId: uploadContractResponse.data.id,
          signatureId: uploadSignatureResponse.data.id,
          signedDate: moment().toISOString(),
        },
      });
    }

    setSigned(true);
    setOpen(false);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  useScrollTop();

  useEffect(() => {
    if (response && response.data) {
      const { customer } = response.data.customOrder;

      if (customer.id !== userId) navigate("/customer/support/custom-order");

      setOrder(response.data.customOrder);
    }

    if (response && response.errors) {
      navigate("/customer/support/custom-order");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (signature && order) {
      update(
        <ContractFile
          signature={signature}
          name={customerSpouse?.fullName ? customerSpouse?.fullName : ""}
          email={order.customer.email}
          phone={order.customer.phone ? order.customer.phone : "--"}
          total={order.totalPrice.amount}
          address={"--"}
        />
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, signature]);

  useEffect(() => {
    if (spouseResponse?.data) {
      spouseResponse.data.spouses.forEach((item) => {
        if (item.customerId) setCustomerSpouse(item);
      });
    }
  }, [spouseResponse]);

  if (!order)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid container item xs={8} mb={3} gap={3}>
          <Skeleton variant="rectangular" width={"100%"} height={300} />
          <Skeleton variant="rectangular" width={"100%"} height={300} />
          <Skeleton variant="rectangular" width={"100%"} height={300} />
          <Skeleton variant="rectangular" width={"100%"} height={300} />
          <Skeleton variant="rectangular" width={"100%"} height={300} />
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <Grid container item lg={9} xl={8}>
        <Grid item xs={12} className={styles.page}>
          <div className={styles.header}>
            <img src={ring} />
            <div className={styles.brand}>Couple Rings</div>
            <div className={styles.name}>Hợp Đồng Gia Công Nhẫn</div>
          </div>
          <Grid container justifyContent={"space-between"} my={2} px={8}>
            <div className={styles.contact}>
              <EmailSharpIcon /> <span>{companyEmail}</span>
            </div>
            <div className={styles.contact}>
              <PhoneSharpIcon /> <span>{companyPhone}</span>
            </div>
          </Grid>
          <Grid container sx={{ p: 8 }} className={styles.content}>
            <Box sx={{ mb: 5 }}>
              Hợp đồng này được ký kết vào{" "}
              <b>
                ngày {moment().format("DD")} tháng {moment().format("MM")} năm{" "}
                {moment().format("YYYY")}
              </b>{" "}
              giữa:
            </Box>
            <Grid container justifyContent={"space-between"} mb={3}>
              <Grid item xs={5}>
                <Box sx={{ fontWeight: 500 }}>Khách Hàng:</Box>
                <Divider sx={{ backgroundColor: "#555", my: 2 }} />
                <div className={styles.info}>
                  <b>Họ Tên : </b>
                  <span style={{ textTransform: "capitalize" }}>
                    {customerSpouse?.fullName.toLowerCase()}
                  </span>
                </div>
                <div className={styles.info}>
                  <b>Số Điện Thoại : </b>
                  {order.customer.phone ? order.customer.phone : "--"}
                </div>
                <div className={styles.info}>
                  <b>Email : </b>
                  {order.customer.email}
                </div>
                <div className={styles.info}>
                  <b>Địa Chỉ : </b>--
                </div>
              </Grid>
              <Grid item xs={5}>
                <div>Bên Cung Cấp Dịch Vụ:</div>
                <Divider sx={{ backgroundColor: "#555", my: 2 }} />
                <div className={styles.info}>
                  <b>Tên Công Ty : </b>Couple Rings
                </div>
                <div className={styles.info}>
                  <b>Người Đại Diện : </b>Nguyễn Văn Bê
                </div>
                <div className={styles.info}>
                  <b>Số Điện Thoại : </b>(+84)928226767
                </div>
                <div className={styles.info}>
                  <b>Email : </b>nvb@gmail.com
                </div>
                <div className={styles.info}>
                  <b>Địa Chỉ : </b>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ,
                  Thành Phố Thủ Đức, HCM
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={styles.page}>
          <Grid
            container
            sx={{ p: 5, borderRadius: "15px" }}
            className={styles.content}
          >
            <Grid container mb={5} alignItems={"center"} gap={1}>
              <img src={ringblack} width={20} />{" "}
              <span>couplering.netlify.app</span>
            </Grid>
            <div className={styles.title}>Phạm vi Công việc</div>
            <ul>
              <li>
                Khách hàng đồng ý đặt gia công nhẫn theo thiết kế, chất liệu và
                thông số kỹ thuật đã thỏa thuận.
              </li>
              <li>
                Doanh nghiệp đồng ý chế tác nhẫn theo yêu cầu của khách hàng như
                đã thảo luận và nêu chi tiết trong đơn đặt gia công nhẫn.
              </li>
            </ul>

            <div className={styles.title}>Quy Định Tiền Đặt Cọc</div>
            <Box sx={{ mt: 3 }}>
              Khách hàng đồng ý thực hiện các khoản đặt cọc như sau:
            </Box>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Giai Đoạn Gia Công</th>
                    <th>Số Tiền Cọc</th>
                    <th>Ngày Đáo Hạn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hoàn Thành 50% (Đúc khuôn nhẫn)</td>
                    <td>{currencyFormatter(order.totalPrice.amount * 0.5)}</td>
                    <td>3 ngày sau khi có hợp đồng</td>
                  </tr>
                  <tr>
                    <td>Hoàn Thành 75% (Gắn kim cương và Đánh bóng)</td>
                    <td>{currencyFormatter(order.totalPrice.amount * 0.25)}</td>
                    <td>1 tuần sau khi hoàn thành 50% tiến độ</td>
                  </tr>
                  <tr>
                    <td>Hoàn Thành 100% (Đóng gói và Hoàn tất)</td>
                    <td>{currencyFormatter(order.totalPrice.amount * 0.25)}</td>
                    <td>1 tuần sau khi hoàn thành 75% tiến độ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul>
              <li>
                Doanh nghiệp sẽ thông báo cho Khách hàng và cung cấp bằng chứng
                về hoàn thành tiến độ trước khi mỗi khoản thanh toán được thực
                hiện.
              </li>
            </ul>
          </Grid>
        </Grid>

        <Grid item xs={12} className={styles.page}>
          <Grid
            container
            sx={{ p: 5, borderRadius: "15px" }}
            className={styles.content}
          >
            <Grid container mb={5} alignItems={"center"} gap={1}>
              <img src={ringblack} width={20} />{" "}
              <span>couplering.netlify.app</span>
            </Grid>
            <div className={styles.title}>Cập Nhật Tiến Độ</div>
            <Box sx={{ mt: 3, lineHeight: "1.5rem" }}>
              Doanh nghiệp cam kết cập nhật thông tin mới nhất cho Khách hàng
              trong suốt quá trình gia công nhẫn:
            </Box>
            <ul>
              <li>
                <b>Hoàn Thành 50%:</b> Khách hàng sẽ được xem hình dáng ban đầu
                sau khi đã đúc phần đế của nhẫn.
              </li>
              <li>
                <b>Hoàn Thành 75%:</b> Khách hàng sẽ được xem kết quả sau khi
                hoàn tất gắn kim cương và hoàn thiện các chi tiết cuối cùng của
                nhẫn.
              </li>
              <li>
                <b>Hoàn Thành 100%:</b> Khách hàng sẽ được thông báo sau khi đã
                hoàn tất chuẩn bị giấy tờ và đóng gói hàng.
              </li>
            </ul>
            <Box sx={{ mb: 3 }}>
              Tất cả các cập nhật sẽ được gửi qua định dạng hình ảnh hoặc video
              nếu phù hợp.
            </Box>

            <div className={styles.title}>Chính Sách Kinh Doanh</div>
            <Box sx={{ mt: 2 }}>
              Các chính sách sau áp dụng cho hợp đồng này:
            </Box>
            <ol>
              <li>
                <b>Chính Sách Hoàn Tiền:</b>
              </li>
              <ul>
                <li>
                  Tất cả các khoản đặt cọc đều không được hoàn trả sau khi giai
                  đoạn tương ứng hoàn thành và thanh toán được thực hiện. Nếu
                  Khách hàng quyết định hủy sau khi đã đặt cọc, các giai đoạn
                  còn lại sẽ không bị tính phí, nhưng khoản đặt cọc ban đầu sẽ
                  bị mất.
                </li>
              </ul>
            </ol>
          </Grid>
        </Grid>

        <Grid item xs={12} className={styles.page}>
          <Grid
            container
            sx={{ p: 5, borderRadius: "15px" }}
            className={styles.content}
          >
            <Grid container mb={1} alignItems={"center"} gap={1}>
              <img src={ringblack} width={20} />{" "}
              <span>couplering.netlify.app</span>
            </Grid>
            <ol start={2}>
              <li>
                <b>Thay Đổi Thiết Kế:</b>
              </li>
              <ul>
                <li>
                  Sau khi ký kết hợp đồng và đặt cọc lần thứ nhất, bản thiết kế
                  thỏa thuận sẽ không thể sửa đổi. Trường hợp muốn sửa đổi sẽ
                  phải quay về giai đoạn thiết kế và đơn gia công hiện tại sẽ bị
                  hủy.
                </li>
              </ul>
              <li>
                <b>Thời Gian Hoàn Thành:</b>
              </li>
              <ul>
                <li>
                  Nhẫn dự kiến sẽ được hoàn thành trong vòng 6 tuần kể từ khi ký
                  hợp đồng này, trừ các trường hợp bất khả kháng.
                </li>
                <li>
                  Bất kỳ sự chậm trễ nào sẽ được thông báo kịp thời cho Khách
                  hàng.
                </li>
              </ul>
              <li>
                <b>Đảm Bảo Chất Lượng:</b>
              </li>
              <ul>
                <li>
                  Doanh nghiệp cam kết sản phẩm cuối cùng sẽ đáp ứng các tiêu
                  chuẩn và thông số kỹ thuật đã thỏa thuận. Trong trường hợp có
                  lỗi hoặc sai sót, nhẫn sẽ được sửa chữa miễn phí.
                </li>
              </ul>
            </ol>
            <div className={styles.title}>Giải Quyết Tranh Chấp</div>
            <Box sx={{ mt: 3, lineHeight: "1.5rem" }}>
              Mọi tranh chấp phát sinh từ hợp đồng này sẽ được giải quyết thông
              qua thương lượng. Nếu không đạt được thỏa thuận, cả hai bên đồng ý
              nhờ bên thứ ba tại Trường FPT làm trung gian giả quyết vấn đề.
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12} className={styles.page}>
          <Grid
            container
            sx={{ p: 5, borderRadius: "15px" }}
            className={styles.content}
          >
            <Grid container mb={5} alignItems={"center"} gap={1}>
              <img src={ringblack} width={20} />{" "}
              <span>couplering.netlify.app</span>
            </Grid>
            <div className={styles.title}>Chữ Ký và Cam Kết</div>
            <Box sx={{ mt: 3, mb: 6, lineHeight: "1.5rem" }}>
              <b>TRƯỚC SỰ CHỨNG KIẾN CỦA HAI BÊN</b>, bằng cách ký tên dưới đây,
              cả hai bên xác nhận rằng đã đọc, hiểu và đồng ý với các điều khoản
              và điều kiện được nêu trong Hợp đồng Gia Công Nhẫn này.
            </Box>

            <Grid container justifyContent={"space-around"} my={3}>
              <Grid item xs={4.2} textAlign={"center"}>
                <div className={styles.label}>Khách Hàng:</div>
                {signed && !order.contract.signature && <img src={signature} />}

                {!signed && !order.contract.signature && (
                  <SignatureCanvas
                    ref={ref}
                    onEnd={() => {
                      if (ref.current) setSignature(ref.current?.toDataURL());
                    }}
                    onBegin={() => setError(false)}
                    penColor="black"
                    canvasProps={{
                      height: 150,
                      width: 260,
                      className: "sigCanvas",
                    }}
                  />
                )}

                {order.contract.signature && (
                  <img src={order.contract.signature.url} />
                )}
                <Divider sx={{ backgroundColor: "#555", my: 3 }} />
                <Box sx={{ mb: 1 }}>
                  <b style={{ textTransform: "capitalize" }}>
                    {customerSpouse?.fullName.toLowerCase()}
                  </b>
                </Box>
                <div>
                  Ngày {moment().format("DD")} Tháng {moment().format("MM")} Năm{" "}
                  {moment().format("YYYY")}
                </div>
              </Grid>
              <Grid item xs={4} textAlign={"center"}>
                <div className={styles.label}>Bên Cung Cấp Dịch Vụ:</div>
                <Box sx={{ height: 158 }} />

                <Divider sx={{ backgroundColor: "#555", my: 3 }} />
                <Box sx={{ mb: 1 }}>
                  <b>Nguyễn Văn Bê</b>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <b>Công Ty TNHH Couple Ring</b>
                </Box>
                <div>
                  Ngày {"__"} Tháng {"__"} Năm {"____"}
                </div>
              </Grid>
            </Grid>

            <div className={`${styles.title} ${styles.bottom}`}>
              <span className={styles.item}>
                <EmailSharpIcon />
                <span>{companyEmail}</span>
              </span>

              <span className={styles.item}>
                <img src={ring} width={25} />
                <span>couplering.netlify.app</span>
              </span>

              <span className={styles.item}>
                <PhoneSharpIcon />
                <span>{companyPhone}</span>
              </span>
            </div>
          </Grid>
        </Grid>

        {!signed && !order.contract.signature && (
          <Grid container item xs={12} justifyContent={"center"} gap={3}>
            <Button
              variant="contained"
              sx={{ ...primaryBtn, py: 1 }}
              onClick={() => ref.current?.clear()}
            >
              Xóa Và Ký Lại
            </Button>
            <LoadingButton
              loading={instance.loading}
              disabled={instance.loading}
              variant="contained"
              sx={{ ...primaryBtn, py: 1 }}
              onClick={verifySignature}
            >
              Xác Nhận Chữ Ký
            </LoadingButton>
          </Grid>
        )}
        {error && (
          <div className={styles.errorText}>
            * Vui lòng ký vào phần dành cho khách hàng
          </div>
        )}

        {signed && (
          <Grid item xs={12} textAlign={"center"} mt={4}>
            <PDFDownloadLink
              document={
                <ContractFile
                  signature={signature}
                  name={customerSpouse?.fullName ? customerSpouse.fullName : ""}
                  email={order.customer.email}
                  phone={order.customer.phone ? order.customer.phone : "--"}
                  total={order.totalPrice.amount}
                  address={"--"}
                />
              }
              fileName="Contract.pdf"
              className={styles.download}
            >
              <DownloadForOfflineRoundedIcon fontSize="large" />
              <span>Tải File PDF</span>
            </PDFDownloadLink>

            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
              mt={5}
              className={styles.back}
              onClick={() =>
                navigate(`/customer/support/custom-order/detail/${order.id}`)
              }
            >
              <KeyboardBackspaceRoundedIcon /> Quay Về Đơn Gia Công
            </Grid>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { p: 1 },
        }}
      >
        <DialogTitle>Xác Nhận Ký</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xác nhận chữ ký này không?
          </DialogContentText>
          <Box sx={{ my: 3 }}>
            Sau khi nhấn nút <b>"Xác Nhận"</b>, hợp đồng sẽ được ký kết với chữ
            ký này và không thể thay đổi.
          </Box>

          <div>
            Nhấn <b>"Xác Nhận"</b> nếu bạn đã chắc chắn.
          </div>
        </DialogContent>
        <DialogActions sx={{ mt: 3 }}>
          <Button
            disabled={
              signContractMutation.isPending || uploadMutation.isPending
            }
            variant="outlined"
            onClick={handleClose}
          >
            Hủy
          </Button>
          <LoadingButton
            loading={signContractMutation.isPending || uploadMutation.isPending}
            variant="contained"
            onClick={confirmSignature}
          >
            Xác Nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Contract;
