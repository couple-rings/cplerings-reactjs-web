import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import guide1 from "src/assets/braceletguide1.jpg";
import guide2 from "src/assets/braceletguide2.jpg";
import styles from "./GuideDialog.module.scss";
import { FormHelperText } from "@mui/material";

function BraceletGuide() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <FormHelperText sx={{ cursor: "pointer" }} onClick={handleClickOpen}>
        Hướng Dẫn Size Vòng Tay
      </FormHelperText>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hướng dẫn đo size vòng tay</DialogTitle>
        <DialogContent>
          <div className={styles.methodName}>
            Cách 1: Đo size vòng tay bằng vòng tay sẵn có
          </div>

          <img src={guide1} className={styles.methodImg} />

          <div className={styles.methodDetail}>
            <b>Bước 1:</b> Đặt vòng tay lên bề mặt phẳng.
            <br />
            <br />
            <b>Bước 2:</b> Đặt thước trên vòng tay và đo đường kính lòng trong
            của vòng.
            <br />
            <br />
            <b>Bước 3:</b> Xác định đường kính lòng trong sẽ là đường kính vòng
            và đối chiếu với bảng size vòng
          </div>

          <div className={styles.methodName}>
            Cách 2: Đo size vòng tay bằng dây, thước dây hay giấy
          </div>

          <img src={guide2} className={styles.methodImg} />

          <div className={styles.methodDetail}>
            <b>Bước 1:</b> Nếu sử dụng mảnh giấy thì bạn tiến hành cắt tờ giấy
            A4 thành sợi dài giống như sợi dây.
            <br />
            <br />
            <b>Bước 2:</b> Quấn sợi dây/ thước dây/ mảnh giấy vừa cắt quanh cổ
            tay, bạn nhớ trừ hao hơi rộng 1 chút để khi đeo vòng cho thoải mái.
            <br />
            <br />
            <b>Bước 3:</b> Dùng bút đánh dấu và cắt vị trí đã đo.
            <br />
            <br />
            <b>Bước 3:</b> Trải sợi dây/ thước dây/ mảnh giấy ra rồi dùng thước
            đo độ dài đoạn vừa cắt. Lấy giá trị đo chia cho 3.14, bạn sẽ có
            đường kính vòng.
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BraceletGuide;
