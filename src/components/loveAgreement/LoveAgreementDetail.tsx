import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import RingImage from "src/assets/One Ring Black.png";
import styles from "./LoveAgreementDetail.module.scss";
import moment from "moment";
import ReactSignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import { secondaryBtn } from "src/utils/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  mainName: string;
  partnerName: string;
}

function LoveAgreeMentDetail(props: IAgreementDetailProps) {
  const { data, handleSignAgreement, loading } = props;
  const { mainName, partnerName, mainSignature, partnerSignature, signedDate } =
    data;

  const [mainSign, setMainSign] = useState("");
  const [partnerSign, setPartnerSign] = useState("");
  const [mainError, setMainError] = useState(false);
  const [partnerError, setPartnerError] = useState(false);

  const [open, setOpen] = useState(false);

  const mainRef = useRef<ReactSignatureCanvas>(null);
  const partnerRef = useRef<ReactSignatureCanvas>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    verifySignature();
    console.log(data);
  };
  const verifySignature = () => {
    if (mainRef.current?.isEmpty()) {
      setMainError(true);
    }

    if (partnerRef.current?.isEmpty()) {
      setPartnerError(true);
    }

    if (mainRef.current?.isEmpty() || partnerRef.current?.isEmpty()) return;

    setOpen(true);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  const handleSign = async () => {
    if (handleSignAgreement) {
      const res = await handleSignAgreement(
        mainSign,
        getValues().mainName,
        partnerSign,
        getValues().partnerName
      );

      if (res?.data) {
        setOpen(false);
      }
    }
  };

  return (
    <Grid container className={styles.zoomContainer}>
      <Grid item className={styles.container}>
        <div className={styles.paper1}>
          <div className={styles.paper2}>
            <Grid
              container
              justifyContent={"center"}
              className={styles.iconBox}
            >
              <Grid item>
                <img src={RingImage} alt="" />
              </Grid>
              <Grid item className={styles.iconName}>
                Couple Rings
              </Grid>
            </Grid>

            <div className={styles.title}>
              --BẢN CAM KẾT TÌNH YÊU ĐÍCH THỰC--
            </div>

            <div className={styles.description}>
              <p>Với chiếc nhẫn Couple độc đáo này,</p>
              <p>nhân danh tình yêu,</p>
              <p>
                anh xin nhận em làm người bạn đời chung thủy và là tình yêu đích
                thực của anh,
              </p>
              <p>để anh có và giữ, từ ngày này trở đi,</p>
              <p>
                dù tốt đẹp hay tệ hại, dù giàu có hay nghèo khó, dù ốm đau hay
                hạnh phúc,
              </p>
              <p>
                anh vẫn yêu và trân trọng, cho đến khi cái chết chia lìa đôi ta.
              </p>
              <p>Tình yêu đích thực không bao giờ kết thúc.</p>
            </div>

            <div className={styles.boxSign}>
              <div className={styles.sign1}>
                <div className={styles.title}>Chữ Ký Của Bạn:</div>
                {mainSignature && (
                  <img src={mainSignature.url} style={{ margin: 0 }} />
                )}

                {!mainSignature && (
                  <ReactSignatureCanvas
                    ref={mainRef}
                    onEnd={() => {
                      if (mainRef.current)
                        setMainSign(mainRef.current.toDataURL());
                    }}
                    onBegin={() => setMainError(false)}
                    penColor="black"
                    canvasProps={{
                      height: 120,
                      width: 260,
                      className: "sigCanvas",
                    }}
                  />
                )}
                <Divider sx={{ my: 2 }} />

                {mainName && <Box sx={{ mt: 3 }}>{mainName}</Box>}

                {!mainName && (
                  <>
                    <TextField
                      error={!!errors.mainName}
                      variant="standard"
                      {...register("mainName", {
                        required: "* Nhập tên của bạn",
                      })}
                    />
                    {errors.mainName && (
                      <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                        {errors.mainName.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              </div>

              <div className={styles.sign1}>
                <div className={styles.title}>Chữ Ký Bạn Đời:</div>
                {partnerSignature && (
                  <img src={partnerSignature.url} style={{ margin: 0 }} />
                )}

                {!partnerSignature && (
                  <ReactSignatureCanvas
                    ref={partnerRef}
                    onEnd={() => {
                      if (partnerRef.current)
                        setPartnerSign(partnerRef.current.toDataURL());
                    }}
                    onBegin={() => setPartnerError(false)}
                    penColor="black"
                    canvasProps={{
                      height: 120,
                      width: 260,
                      className: "sigCanvas",
                    }}
                  />
                )}

                <Divider sx={{ my: 2 }} />

                {partnerName && <Box sx={{ mt: 3 }}>{partnerName}</Box>}

                {!partnerName && (
                  <>
                    <TextField
                      error={!!errors.partnerName}
                      variant="standard"
                      {...register("partnerName", {
                        required: "* Nhập tên bạn đời",
                      })}
                    />
                    {errors.partnerName && (
                      <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                        {errors.partnerName.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className={styles.date}>
              <div className="title">Ngày Ký Kết:</div>
              {signedDate && (
                <div className="content">
                  {moment(signedDate).format("DD")} tháng{" "}
                  {moment(signedDate).format("MM")},{" "}
                  {moment(signedDate).format("YYYY")}
                </div>
              )}

              {!signedDate && (
                <div className="content"> __ tháng __ , ____</div>
              )}
            </div>

            {/* <div className={styles.id}>#Mã Giấy Chứng Nhận </div> */}
          </div>
        </div>
      </Grid>

      {!mainName && !partnerName && (
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          gap={3}
          mt={10}
          mb={3}
        >
          <Button
            variant="contained"
            sx={{ ...secondaryBtn, py: 1 }}
            onClick={() => {
              mainRef.current?.clear();
              partnerRef.current?.clear();
            }}
          >
            Xóa Và Ký Lại
          </Button>
          <Button
            variant="contained"
            sx={{ ...secondaryBtn, py: 1 }}
            onClick={handleSubmit(onSubmit)}
          >
            Xác Nhận Chữ Ký
          </Button>
        </Grid>
      )}

      {(mainError || partnerError) && (
        <Grid container item xs={12} justifyContent={"center"}>
          <FormHelperText error>* Vui lòng ký vào cả hai phần</FormHelperText>
        </Grid>
      )}

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
            Sau khi nhấn nút <b>"Xác Nhận"</b>, bản cam kết sẽ được ký kết với
            chữ ký này và không thể thay đổi.
          </Box>

          <div>
            Nhấn <b>"Xác Nhận"</b> nếu bạn đã chắc chắn.
          </div>
        </DialogContent>
        <DialogActions sx={{ mt: 3 }}>
          <Button disabled={loading} variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSign}
          >
            Xác Nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default LoveAgreeMentDetail;
