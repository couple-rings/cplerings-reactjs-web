import { Divider, Grid } from "@mui/material";
import RingImage from "../../../assets/One Ring Black.png";
import Signature from "../../../assets/HungSignature.png";
import styles from "./LoveAgreementDetail.module.scss";

function LoveAgreeMentDetail() {
  return (
    <div className={styles.zoomContainer}>
      <div className={styles.container}>
        <div className={styles.paper1}>
          <div className={styles.paper2}>
            <Grid container justifyContent={"center"} className={styles.iconBox}>
              <Grid item>
                <img src={RingImage} alt="" />
              </Grid>
              <Grid item className={styles.iconName}>
                Couple Rings
              </Grid>
            </Grid>

            <div className={styles.title}>--BẢN CAM KẾT TÌNH YÊU ĐÍCH THỰC--</div>

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
                <div className="title">Người Ký Kết:</div>
                <img src={Signature} alt="" />
                <Divider />
              </div>

              <div className={styles.sign1}>
                <div className="title">Người Ký Kết:</div>
                <img src={Signature} alt="" />
                <Divider />
              </div>
            </div>

            <div className={styles.date}>
              <div className="title">Ngày Ký Kết:</div>
              <div className="content">25 tháng 12, 2024</div>
            </div>

            <div className={styles.id}>#Mã Giấy Chứng Nhận </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoveAgreeMentDetail;
