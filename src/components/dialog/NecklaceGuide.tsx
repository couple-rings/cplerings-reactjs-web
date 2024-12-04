import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import guide1 from "src/assets/necklaceguide1.png";
import guide2 from "src/assets/necklaceguide2.png";
import styles from "./GuideDialog.module.scss";
import { FormHelperText } from "@mui/material";

function NecklaceGuide() {
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
        Hướng Dẫn Size Dây Chuyền
      </FormHelperText>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hướng dẫn đo size dây chuyền</DialogTitle>
        <DialogContent>
          <div className={styles.methodName}>
            Cách 1: Đo theo một chiếc dây chuyền có sẵn
          </div>

          <img src={guide1} className={styles.methodImg} />

          <div className={styles.methodDetail}>
            <b>Bước 1:</b> Chuẩn bị một chiếc thước kẻ/thước dây dài từ 50cm và
            dây chuyền của bạn.
            <br />
            <br />
            <b>Bước 2:</b> Mở khóa và trải dài vòng cổ ra bề mặt phẳng, sao cho
            sợi dây thẳng song song với thước đo, vạch số 0 của thước trùng với
            đầu khóa. Đo chiều dài dây chuyền và chọn kích thước dây phù hợp.
            <br />
            <br />
            <b>Lưu ý</b>
            <ul>
              <li>Bạn cần tính cả khóa khi đo chiều dài dây chuyền.</li>
              <li>Không tính kích thước mặt dây chuyền hoặc charm trên dây.</li>
              <li>
                Đặt dây chuyền ra bề mặt phẳng, giữ dây chuyền không bị xoắn để
                đo được độ dài chính xác nhất.
              </li>
              <li>Đo lại từ ít nhất 3 lần để có kết quả đo chính xác nhất.</li>
            </ul>
          </div>

          <div className={styles.methodName}>
            Cách 2: Đo thủ công bằng thước dây hoặc sợi dây/len
          </div>

          <img src={guide2} className={styles.methodImg} />

          <div className={styles.methodDetail}>
            <b>Bước 1:</b> Sử dụng thước dây/sợi dây/len để quấn quanh cổ theo
            điểm rơi trên cổ mà bạn mong muốn. Sau đó đánh dấu điểm giao nhau.
            <br />
            <br />
            <b>Bước 2:</b> Đo chiều dài của đoạn dây/len từ điểm đầu cho đến
            phần đánh dấu, ta được số đo chiều dài dây vòng cổ mà bạn mong muốn.
            <br />
            <br />
            <b>Lưu ý</b>
            <ul>
              <li>
                Nếu kiểu dây chuyền bạn chọn có mặt dây chuyền dài, bạn cần lưu
                ý đến điểm rơi trên cổ và có sự điều chỉnh thêm bớt số đo cho
                phù hợp.
              </li>
              <li>Đo lại từ ít nhất 3 lần để có kết quả đo chính xác nhất.</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NecklaceGuide;
