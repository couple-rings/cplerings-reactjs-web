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
import { fetchCustomerSpouse } from "src/utils/querykey";
import { TransactionType } from "src/utils/enums";
import {
  companyAddress,
  companyName,
  companyEmail,
  taxRate,
} from "src/utils/constants";
import LocalPrintshopSharpIcon from "@mui/icons-material/LocalPrintshopSharp";
import { secondaryBtn } from "src/utils/styles";

const iconStyle: SxProps = {
  color: "white",
  fontSize: 30,
};

function Invoice() {
  const [ownerSpouse, setOwnerSpouse] = useState<ISpouse | null>(null);

  const { requestedDesigns } = useAppSelector((state) => state.design);
  const { id, email } = useAppSelector((state) => state.auth.userInfo);

  const [searchParams] = useSearchParams();

  const status = searchParams.get("vnp_TransactionStatus");
  const amount = searchParams.get("vnp_Amount");
  const customer = searchParams.get("vnp_OrderInfo");
  const date = searchParams.get("vnp_PayDate");

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

  const mutation = useMutation({
    mutationFn: (data: ICreateCRRequest) => {
      return postCreateCustomRequest(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        console.log(response.data);
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
      !transNo
    )
      navigate("/");
    else if (requestedDesigns.length > 0) {
      mutation.mutate({
        customerId: id,
        designIds: requestedDesigns,
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

  return (
    <div className={styles.container}>
      <Grid container item xs={11} xl={10}>
        <Grid item className={styles.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </Grid>

        <Grid
          container
          item
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Grid container className={styles.title}>
            Hóa Đơn
          </Grid>

          <Grid container item xs={12} md={8} lg={6} className={styles.body}>
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
                  {customer}
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

          <Grid container item xs={12} md={8} lg={5} className={styles.detail}>
            <div className={styles.title}>Chi Tiết Thanh Toán</div>
            <Grid container>
              <div className={styles.sender}>Người thực hiện</div>
              <Grid container mb={1}>
                <Grid item xs={4}>
                  Họ tên:
                </Grid>
                <Grid item sx={{ textTransform: "capitalize" }}>
                  {ownerSpouse?.fullName.toLowerCase()}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  Email:
                </Grid>
                <Grid item>{email}</Grid>
              </Grid>
            </Grid>

            <Grid container my={2}>
              <div className={styles.sender}>Thông tin giao dịch</div>
              <Grid container mb={1}>
                <Grid item xs={4}>
                  Mã ngân hàng:
                </Grid>
                <Grid item>{bankCode}</Grid>
              </Grid>
              <Grid container mb={1}>
                <Grid item xs={4}>
                  Hình thức:
                </Grid>
                <Grid item>
                  {cardType === TransactionType.ATM && "Chuyển khoản"}
                </Grid>
                <Grid item>
                  {cardType === TransactionType.QrCode && "Quét mã QR"}
                </Grid>
              </Grid>
              <Grid container mb={1}>
                <Grid item xs={4}>
                  Mã giao dịch:
                </Grid>
                <Grid item>{transNo}</Grid>
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

            <TableContainer component={Paper}>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell align="center" className={styles.cell}>
                      Nội Dung
                    </TableCell>
                    <TableCell align="right" className={styles.cell}>
                      Giá Tiền
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      Thanh toán phí thiết kế
                    </TableCell>
                    <TableCell align="right">
                      {amount && currencyFormatter(+amount / 100)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    {/* <TableCell colSpan={1} /> */}
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right">
                      {amount && currencyFormatter(+amount / 100)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Tax</TableCell>
                    <TableCell align="right">{`${taxRate} %`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">
                      {amount &&
                        currencyFormatter(
                          +amount / 100 + ((+amount / 100) * taxRate) / 100
                        )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid container mt={10} justifyContent={"center"}>
            <Button
              variant="contained"
              sx={secondaryBtn}
              onClick={() => navigate("/customer/support/custom-request")}
            >
              Xem Yêu Cầu
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Invoice;
