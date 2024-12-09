import {
  Button,
  Divider,
  Grid,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./Invoice.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useSearchParams } from "react-router-dom";
import PulseIcon from "src/components/icon/PulseIcon";
import DoneIcon from "@mui/icons-material/Done";
import { currencyFormatter } from "src/utils/functions";
import moment from "moment";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postCreateCustomRequest } from "src/services/customRequest.service";
import { removeRequestedDesigns } from "src/redux/slice/design.slice";
import { getCustomerSpouse } from "src/services/spouse.service";
import {
  fetchCustomerSpouse,
  fetchCustomOrderDetail,
  fetchPaymentDetail,
} from "src/utils/querykey";
import {
  companyAddress,
  companyName,
  companyEmail,
  standardOrderPayment,
  designFeePayment,
  depositPayment,
  firstStageName,
  secondStageName,
  thirdStageName,
} from "src/utils/constants";
import LocalPrintshopSharpIcon from "@mui/icons-material/LocalPrintshopSharp";
import { secondaryBtn } from "src/utils/styles";
import { getPaymentDetail } from "src/services/payment.service";
import { ConfigurationKey } from "src/utils/enums";
import { getCustomOrderDetail } from "src/services/customOrder.service";

const iconStyle: SxProps = {
  color: "white",
  fontSize: 30,
};

function Invoice() {
  const [ownerSpouse, setOwnerSpouse] = useState<ISpouse | null>(null);
  const [customRequest, setCustomRequest] = useState<ICustomRequest | null>(
    null
  );

  const { requestedDesigns } = useAppSelector((state) => state.design);
  const { id, email, username } = useAppSelector(
    (state) => state.auth.userInfo
  );

  const [searchParams] = useSearchParams();

  const status = searchParams.get("vnp_TransactionStatus");
  const amount = searchParams.get("vnp_Amount");
  const customer = searchParams.get("vnp_OrderInfo");
  const date = searchParams.get("vnp_PayDate");

  const paymentId = searchParams.get("vnp_TxnRef");
  const bankCode = searchParams.get("vnp_BankCode");
  const cardType = searchParams.get("vnp_CardType");
  const transNo = searchParams.get("vnp_TransactionNo");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: spouseResponse } = useQuery({
    queryKey: [fetchCustomerSpouse, id],

    queryFn: () => {
      return getCustomerSpouse(id);
    },
  });

  const { data: paymentResponse } = useQuery({
    queryKey: [fetchPaymentDetail, paymentId],

    queryFn: () => {
      if (paymentId) return getPaymentDetail(+paymentId);
    },
  });

  const { data: orderResponse } = useQuery({
    queryKey: [
      fetchCustomOrderDetail,
      paymentResponse?.data?.craftingStage?.customOrderId,
    ],

    queryFn: () => {
      if (paymentResponse?.data?.craftingStage?.customOrderId)
        return getCustomOrderDetail(
          paymentResponse?.data?.craftingStage?.customOrderId
        );
    },
    enabled: !!paymentResponse?.data?.craftingStage?.customOrderId,
  });

  const mutation = useMutation({
    mutationFn: (data: ICreateCRRequest) => {
      return postCreateCustomRequest(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        setCustomRequest(response.data);
      }

      if (response.errors) {
        console.log(response.errors);
      }
    },
  });

  const print = () => {
    window.print();
  };

  useEffect(() => {
    if (spouseResponse?.data) {
      const ownerSpouse = spouseResponse.data.spouses.find(
        (item) => !!item.customerId
      );
      if (ownerSpouse) setOwnerSpouse(ownerSpouse);
    }
  }, [spouseResponse]);

  useEffect(() => {
    if (
      !status ||
      !amount ||
      !customer ||
      !date ||
      !bankCode ||
      !cardType ||
      !transNo ||
      !paymentId
    )
      navigate("/");
    else if (requestedDesigns.length > 0) {
      mutation.mutate({
        customerId: id,
        designIds: requestedDesigns,
        paymentId: +paymentId,
      });
      dispatch(removeRequestedDesigns());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    amount,
    status,
    customer,
    date,
    requestedDesigns,
    bankCode,
    cardType,
    transNo,
  ]);

  useEffect(() => {
    if (paymentResponse?.errors) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentResponse]);

  return (
    <div className={styles.container}>
      <Grid container item xs={11} justifyContent={"center"}>
        <Grid container item md={9} lg={8}>
          <Grid item className={styles.homeLink} onClick={() => navigate("/")}>
            <ArrowBackIosIcon />
            <span>Trang Chủ</span>
          </Grid>
        </Grid>

        <Grid container item md={8} lg={7}>
          <Grid container className={styles.title}>
            Hóa Đơn
          </Grid>

          <Grid container item xs={12} className={styles.body}>
            <Grid item xs={12} className={styles.upper}>
              <PulseIcon
                backgroundColor={status === "00" ? "#23A26D" : "#B43620"}
                icon={
                  status === "00" ? (
                    <DoneIcon sx={iconStyle} />
                  ) : (
                    <CloseIcon sx={iconStyle} />
                  )
                }
              />
              <div className={styles.status}>
                {status === "00"
                  ? "Thanh Toán Thành Công!"
                  : "Thanh Toán Không Thành Công!"}
              </div>
              <div className={styles.amount}>
                {status === "00"
                  ? currencyFormatter(amount ? +amount / 100 : 0)
                  : currencyFormatter(0)}
              </div>

              <Divider sx={{ width: "80%", mb: 5 }} />
            </Grid>

            <Grid container item xs={12} justifyContent={"space-between"}>
              <Grid container item xs={12} mb={3}>
                <Grid item xs={6} className={styles.label}>
                  Ngày Giao Dịch
                </Grid>
                <Grid item xs={6} className={styles.info}>
                  {moment(date, "YYYYMMDDHHmmss").format(
                    "DD-MM-YYYY, HH:mm:ss"
                  )}
                </Grid>
              </Grid>

              <Grid container item xs={12} mb={3}>
                <Grid item xs={6} className={styles.label}>
                  Phương Thức Thanh Toán
                </Grid>
                <Grid item xs={6} className={styles.info}>
                  VNPAY
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={6} className={styles.label}>
                  Nội Dung
                </Grid>
                <Grid item xs={6} className={styles.info}>
                  {paymentResponse?.data?.standardOrder && standardOrderPayment}
                  {customRequest && designFeePayment}
                  {paymentResponse?.data?.craftingStage && depositPayment}
                </Grid>
              </Grid>

              <Grid container item justifyContent={"center"}>
                <Divider sx={{ width: "80%", borderStyle: "dashed", my: 3 }} />
              </Grid>

              {true && (
                <>
                  <Grid container item xs={6} gap={3} className={styles.label}>
                    <div>Tổng Tiền</div>
                  </Grid>

                  <Grid container item xs={6} gap={3} className={styles.info}>
                    <div>
                      {status === "00"
                        ? currencyFormatter(amount ? +amount / 100 : 0)
                        : currencyFormatter(0)}
                    </div>
                  </Grid>
                </>
              )}
            </Grid>

            {status === "00" && (
              <Grid item xs={12} className={styles.bottom} onClick={print}>
                <LocalPrintshopSharpIcon />
                <span>In Hóa Đơn</span>
              </Grid>
            )}

            {status !== "00" && (
              <Grid
                container
                item
                xs={12}
                className={styles.error}
                onClick={() => navigate("/customer/support")}
              >
                <Grid item className={styles.left}>
                  <div className={styles.iconContainer}>
                    <HelpOutlineOutlinedIcon sx={{ color: "#B43620" }} />
                  </div>
                  <div>
                    <div className={styles.upperText}>
                      Gặp vấn đề khi thanh toán?
                    </div>
                    <div className={styles.lowerText}>
                      Hãy cho chúng tôi biết tại Trung Tâm Hỗ Trợ.
                    </div>
                  </div>
                </Grid>

                <Grid item>
                  <KeyboardArrowRightOutlinedIcon sx={{ color: "#B43620" }} />
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} className={styles.detail}>
            <div className={styles.title}>Chi Tiết Thanh Toán</div>
            {paymentResponse?.data?.standardOrder && (
              <Grid container mb={2}>
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    Mã Đơn:
                  </Grid>
                  <Grid item sx={{ textTransform: "capitalize" }}>
                    {paymentResponse.data.standardOrder.orderNo}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    Ngày Tạo:
                  </Grid>
                  <Grid item>
                    {moment(
                      paymentResponse.data.standardOrder.createdAt
                    ).format("DD/MM/YYYY HH:mm")}
                  </Grid>
                </Grid>
              </Grid>
            )}

            {customRequest && (
              <Grid container mb={2}>
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    Yêu Cầu Thiết Kế:
                  </Grid>
                  <Grid item sx={{ textTransform: "capitalize" }}>
                    Bản thiết kế {customRequest.designs[0].name} &{" "}
                    {customRequest.designs[1].name}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    Ngày Tạo:
                  </Grid>
                  <Grid item>
                    {moment(customRequest.createdAt).format("DD/MM/YYYY HH:mm")}
                  </Grid>
                </Grid>
              </Grid>
            )}

            {orderResponse?.data && (
              <Grid container mb={2}>
                <Grid container mb={1}>
                  Đặt cọc đơn gia công
                </Grid>
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    Mã Đơn:
                  </Grid>
                  <Grid item sx={{ textTransform: "capitalize" }}>
                    {orderResponse.data.customOrder.orderNo}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    Ngày Tạo:
                  </Grid>
                  <Grid item>
                    {moment(orderResponse.data.customOrder.createdAt).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid container mb={2}>
              <div className={styles.sender}>Người thực hiện</div>
              {ownerSpouse ? (
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    Họ tên:
                  </Grid>
                  <Grid item sx={{ textTransform: "capitalize" }}>
                    {ownerSpouse?.fullName.toLowerCase()}
                  </Grid>
                </Grid>
              ) : (
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    Username:
                  </Grid>
                  <Grid item sx={{ textTransform: "capitalize" }}>
                    {username}
                  </Grid>
                </Grid>
              )}

              <Grid container>
                <Grid item xs={4}>
                  Email:
                </Grid>
                <Grid item>{email}</Grid>
              </Grid>
            </Grid>

            <Grid container mb={4}>
              <div className={styles.sender}>Người thụ hưởng</div>
              <Grid container mb={1}>
                <Grid item>{companyName}</Grid>
              </Grid>
              <Grid container mb={1}>
                <Grid item xs={2}>
                  Email:
                </Grid>
                <Grid item>{companyEmail}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  Địa chỉ:
                </Grid>
                <Grid item xs={10}>
                  {companyAddress}
                </Grid>
              </Grid>
            </Grid>

            {paymentResponse?.data?.standardOrder && (
              <StandardOrderTable order={paymentResponse.data.standardOrder} />
            )}

            {customRequest && <CustomRequestTable request={customRequest} />}

            {paymentResponse?.data?.craftingStage && orderResponse?.data && (
              <CraftingStageTable
                data={paymentResponse.data}
                orderPrice={orderResponse.data.customOrder.totalPrice.amount}
              />
            )}
          </Grid>

          <Grid container mt={10} justifyContent={"center"}>
            {customRequest && (
              <Button
                variant="contained"
                sx={secondaryBtn}
                onClick={() => navigate("/customer/support/custom-request")}
              >
                Xem Yêu Cầu
              </Button>
            )}

            {paymentResponse?.data?.standardOrder && (
              <Button
                variant="contained"
                sx={secondaryBtn}
                onClick={() =>
                  navigate(
                    `/customer/order-detail/${paymentResponse.data?.standardOrder?.id}`
                  )
                }
              >
                Xem Đơn Hàng
              </Button>
            )}

            {paymentResponse?.data?.craftingStage && (
              <Button
                variant="contained"
                sx={secondaryBtn}
                onClick={() =>
                  navigate(
                    `/customer/support/custom-order/${paymentResponse.data?.craftingStage?.customOrderId}/crafting-process`
                  )
                }
              >
                Xem Quá Trình
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const StandardOrderTable = (props: IStandardOrderTableProps) => {
  const { order } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell align="center" className={styles.cell} colSpan={3}>
              Nội Dung
            </TableCell>
            <TableCell align="right" className={styles.cell}>
              Giá Tiền
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              {standardOrderPayment}
            </TableCell>
            <TableCell align="right">
              {currencyFormatter(order.totalPrice.amount)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Tên Trang Sức</TableCell>
            <TableCell align="right">Phân Loại</TableCell>
            <TableCell align="right">Số Lượng</TableCell>
            <TableCell align="right">Giá Tiền</TableCell>
          </TableRow>

          {order.standardOrderItems.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell sx={{ width: 200 }}>{item.design.name}</TableCell>
                <TableCell align="right">
                  {item.design.jewelryCategory.name}
                </TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">
                  {currencyFormatter(item.price.amount)}
                </TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell align="right" colSpan={2}>
              Thành Tiền
            </TableCell>
            <TableCell align="right" colSpan={2}>
              {currencyFormatter(order.totalPrice.amount)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="right" colSpan={2}>
              Giảm Giá
            </TableCell>
            <TableCell align="right" colSpan={2}>
              {0}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="right" colSpan={2}>
              Tổng Cộng
            </TableCell>
            <TableCell align="right" colSpan={2}>
              {currencyFormatter(order.totalPrice.amount)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CustomRequestTable = (props: ICustomRequestTableProps) => {
  const { request } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell align="center" className={styles.cell} colSpan={3}>
              Nội Dung
            </TableCell>
            <TableCell align="right" className={styles.cell}>
              Giá Tiền
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              {designFeePayment}
            </TableCell>
            <TableCell align="right">
              {currencyFormatter(request.designFee.amount)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="right" colSpan={2}>
              Thành Tiền
            </TableCell>
            <TableCell align="right" colSpan={2}>
              {currencyFormatter(request.designFee.amount)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CraftingStageTable = (props: ICraftingStageTableProps) => {
  const { data, orderPrice } = props;

  const { amount, craftingStage } = data;

  const { configs } = useAppSelector((state) => state.config);

  const firstStageProgress = configs.find(
    (item) => item.key === ConfigurationKey.FirstStageProgress
  )?.value;
  const secondStageProgress = configs.find(
    (item) => item.key === ConfigurationKey.FirstStageProgress
  )?.value;
  const thirdStageProgress = configs.find(
    (item) => item.key === ConfigurationKey.FirstStageProgress
  )?.value;

  if (
    craftingStage &&
    firstStageProgress &&
    secondStageProgress &&
    thirdStageProgress
  ) {
    const stages = [
      +firstStageProgress,
      +secondStageProgress,
      +thirdStageProgress,
    ];

    let depositValue = 0;

    if (craftingStage.progress === +firstStageProgress)
      depositValue = craftingStage.progress;
    else {
      const index = stages.findIndex((item) => item === craftingStage.progress);
      if (index !== -1) {
        depositValue = stages[index] - stages[index - 1];
      }
    }

    let stageName = "";
    if (craftingStage.progress === +firstStageProgress)
      stageName = firstStageName;
    if (craftingStage.progress === +secondStageProgress)
      stageName = secondStageName;
    if (craftingStage.progress === +thirdStageProgress)
      stageName = thirdStageName;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell align="center" className={styles.cell} colSpan={3}>
                Nội Dung
              </TableCell>
              <TableCell align="right" className={styles.cell}>
                Giá Tiền
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                {depositPayment}
              </TableCell>
              <TableCell align="right">
                {currencyFormatter(amount.amount)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Giai Đoạn Đặt Cọc</TableCell>
              <TableCell align="right">Tổng Tiền Đơn Hàng</TableCell>
              <TableCell align="right">Tỷ Lệ</TableCell>
              <TableCell align="right">Giá Tiền</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ width: 200 }}>{stageName}</TableCell>
              <TableCell align="right">
                {currencyFormatter(orderPrice)}
              </TableCell>
              <TableCell align="right">{depositValue} %</TableCell>
              <TableCell align="right">
                {currencyFormatter(amount.amount)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right" colSpan={2}>
                Tổng Cộng
              </TableCell>
              <TableCell align="right" colSpan={2}>
                {currencyFormatter(amount.amount)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default Invoice;
