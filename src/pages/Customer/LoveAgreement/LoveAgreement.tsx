import { Divider, Grid } from "@mui/material";
import styles from "./LoveAgreement.module.scss";
import BoxLoveAgreement from "./BoxLoveAgreement";
import { useNavigate } from "react-router-dom";

const agreement = [
  {
    id: 1,
    spouse: "Bean & Hung",
    date: "25 tháng 12, 2024"
  },
  {
    id: 2,
    spouse: "Bean & Boo",
    date: "25 tháng 12, 2024"
  },
  {
    id: 3,
    spouse: "Bean & Blaa",
    date: "25 tháng 12, 2024"
  },
  {
    id: 4,
    spouse: "Bean & Hung",
    date: "25 tháng 12, 2024"
  },
  {
    id: 5,
    spouse: "Bean & Hung",
    date: "25 tháng 12, 2024"
  },
  {
    id: 6,
    spouse: "Bean & Hung",
    date: "25 tháng 12, 2024"
  },
];

function LoveAgreement() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Grid container alignItems={"center"} className={styles.header}>
        <Grid item container className={styles.box}>
          <Grid item md={4} lg={12} className={styles.headerTitle}>
            Bản Cam Kết Tình Yêu Đích Thực
          </Grid>
          <Grid item md={9} lg={4} className={styles.headerDescription}>
            Ký Thỏa thuận Tình yêu Đích thực là khoảnh khắc quan trọng, thể hiện
            triết lý “Một tình yêu, Một cuộc đời”. Darry Ring tích hợp Xác minh
            tình yêu và Thỏa thuận này, đảm bảo mỗi khách hàng chỉ mua một nhẫn
            đính hôn cho Người duy nhất của mình.
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        lg={12}
        justifyContent={"center"}
        className={styles.honorBoard}
      >
        <Grid item lg={12} container className={styles.honorTitleBoard}>
          <Grid item xs={12} md={12} lg={12} justifyContent={"center"} className={styles.title}>
            Những Cặp Đôi Lâu Năm
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={styles.description}>
            Vinh danh những cặp đôi lâu năm
          </Grid>
        </Grid>

        <Grid
          item
          container
          lg={12}
          p={10}
          justifyContent={"center"}
          alignItems={"center"}
          className={styles.agreementBox}
        >
          <Grid item xs={12} md={3.75} lg={3.75} className={styles.second}>
            <div className={styles.abc} onClick={() => navigate(`/love-agreement/2`)}>
              <BoxLoveAgreement  spouseName="Bean & Bean" date="28 tháng 1, 2003"/>
            </div>

            <div className={styles.boxContainer}>
              <div className={styles.box}>8 năm</div>
            </div>
          </Grid>
          <Grid item xs={12} md={5.25} lg={5.25} className={styles.second}>
          <div className={styles.abc} onClick={() => navigate(`/love-agreement/3`)}>
              <BoxLoveAgreement spouseName="Bean & Bean" date="28 tháng 1, 2003"/>
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.box}>10 năm</div>
            </div>
          </Grid>
          <Grid item xs={12} md={3} lg={3} className="third">
            <div className={styles.abc} onClick={() => navigate(`/love-agreement/7`)}>
              <BoxLoveAgreement spouseName="Bean & Bean" date="28 tháng 1, 2003"/>
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.box}>5 năm</div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Divider />
      </Grid>

      <Grid container justifyContent={"center"} className={styles.list}>
        <Grid item container className={styles.listTitle}>
          Các Bản Cam Kết
        </Grid>
        <Grid item container >
          {agreement.map((item) => (
            <Grid item md={3} lg={3} onClick={() => navigate(`/love-agreement/${item.id}`)}>
              <div className={styles.abc} key={item.id} >
                <BoxLoveAgreement spouseName={item.spouse} date={item.date} />
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default LoveAgreement;
