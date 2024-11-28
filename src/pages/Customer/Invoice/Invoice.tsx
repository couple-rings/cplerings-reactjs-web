import { Divider, Grid, SxProps } from "@mui/material";
import styles from "./Invoice.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useSearchParams } from "react-router-dom";
import PulseIcon from "src/components/icon/PulseIcon";
import DoneIcon from "@mui/icons-material/Done";
import { currencyFormatter } from "src/utils/functions";
import moment from "moment";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { useMutation } from "@tanstack/react-query";
import { postCreateCustomRequest } from "src/services/customRequest.service";
import { removeRequestedDesigns } from "src/redux/slice/design.slice";

const iconStyle: SxProps = {
  color: "white",
  fontSize: 30,
};

function Invoice() {
  const { requestedDesigns } = useAppSelector((state) => state.design);
  const { id } = useAppSelector((state) => state.auth.userInfo);

  const [searchParams] = useSearchParams();

  const status = searchParams.get("vnp_TransactionStatus");
  const amount = searchParams.get("vnp_Amount");
  const customer = searchParams.get("vnp_OrderInfo");
  const date = searchParams.get("vnp_PayDate");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

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
    html2canvas(ref.current as HTMLDivElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", -30, 3, 270, 200);
      pdf.save("invoice.pdf");
    });
  };

  useEffect(() => {
    if (!status || !amount || !customer || !date) navigate("/");
    else if (requestedDesigns.length > 0) {
      mutation.mutate({
        customerId: id,
        designIds: requestedDesigns,
      });
      dispatch(removeRequestedDesigns());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, status, customer, date, requestedDesigns]);

  return (
    <div className={styles.container}>
      <Grid container item xs={11} xl={10}>
        <Grid item className={styles.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </Grid>

        <Grid container item justifyContent={"center"} ref={ref}>
          <Grid container item sm={8} lg={6} className={styles.body}>
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
                <DownloadForOfflineRoundedIcon fontSize="large" />
                <span>Tải File PDF</span>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default Invoice;
