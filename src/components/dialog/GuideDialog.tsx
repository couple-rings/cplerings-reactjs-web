import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import guide1 from "src/assets/guide1.jpg";
import guide2 from "src/assets/guide2.jpg";
import styles from "./GuideDialog.module.scss";

function GuideDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={handleClickOpen}>
        Hướng Dẫn
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hướng dẫn đo ni ngón tay</DialogTitle>
        <DialogContent>
          <div className={styles.methodName}>
            Cách 1: Đo bằng tờ giấy và thước
          </div>

          <img src={guide1} className={styles.methodImg} />

          <div className={styles.methodDetail}>
            <b>Bước 1:</b> Chuẩn bị gồm bút, thước kẻ, mảnh giấy hình chữ nhật
            rộng khoảng 1cm và dài khoảng 10 cm
            <br />
            <b>Bước 2:</b> Cuộn mảnh giấy chuẩn bị ở trên vào ngón tay cần đo
            sao cho vừa khít với ngón tay.
            <br />
            Hãy đảm bảo rằng mảnh giấy không quá chật hoặc quá rộng và không để
            lại khe hở.
            <br />
            <b>Bước 3:</b> Dùng bút đánh dấu ở vị trí mà hai đầu của mảnh giấy
            giao nhau
            <br />
            <b>Bước 4:</b> Dùng thước đo khoảng cách từ điểm đầu đến điểm cuối
            đã đánh dẫu
            <br />
            <b>Bước 5:</b> Dùng thước đo khoảng cách từ điểm đầu đến điểm cuối
            đã đánh dấu. Đây sẽ là chu vi ngón tay của bạn
            <br />
            <b>Bước 6:</b> Đối chiếu với chu vi trong bảng size nhẫn và xem size
            tương ứng
          </div>

          <div className={styles.methodName}>
            Cách 2: Đo theo một chiếc nhẫn có sẵn
          </div>

          <img src={guide2} className={styles.methodImg} />

          <div className={styles.methodDetail}>
            <b>Bước 1:</b> Chuẩn bị một chiếc nhẫn có cùng kích thước với chiếc
            nhẫn cần đo, thước kẻ
            <br />
            <b>Bước 2:</b> Đo đường kính trong của nhẫn (phần tiếp xúc với ngón
            tay của bạn) bằng thước kẻ
            <br />
            <b>Bước 3:</b> Đối chiếu với đường kính trong bảng size nhẫn của
            LiLi và xem size tương ứng
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GuideDialog;
