import { Divider, Grid } from "@mui/material";
import moneyBag from "src/assets/moneyBag.png";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import styles from "./ManagerFinancePage.module.scss";
// import ManagerChartFinace from "src/components/chart/ManagerChartFinance/ManagerChartFinance";

const transaction = [
  {
    id: 1,
    title: "dịch vụ bảo trì, bảo dưỡng trang sức",
    date: "2024-01-21",
    value: 10000000,
  },
  {
    id: 2,
    title: "dịch vụ bảo trì, bảo dưỡng trang sức",
    date: "2024-01-21",
    value: 10000000,
  },
  {
    id: 3,
    title: "dịch vụ bảo trì, bảo dưỡng trang sức",
    date: "2024-01-21",
    value: 10000000,
  },
  {
    id: 4,
    title: "dịch vụ bảo trì, bảo dưỡng trang sức",
    date: "2024-01-21",
    value: 10000000,
  },
  {
    id: 5,
    title: "dịch vụ bảo trì, bảo dưỡng trang sức",
    date: "2024-01-21",
    value: 10000000,
  },
  {
    id: 6,
    title: "dịch vụ bảo trì, bảo dưỡng trang sức",
    date: "2024-01-21",
    value: 10000000,
  },
];

function ManagerFiancePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <Grid container>
            <Grid lg={12} item>
              <div className={styles.revenueContainer}>
                <div className={styles.boxTitle}>
                  <div className={styles.boxIcon}>
                    <img src={moneyBag} alt="" />
                  </div>
                  <div className={styles.title}>
                    <p>Tổng doanh thu</p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <div className={styles.numberContainer}>
                    <p>280,012,003</p>₫
                  </div>
                  <div className={styles.trendContainer}>
                    <div className={styles.numberTrendUp}>
                      <img src={chartArrowRise} alt="" />
                      28%
                    </div>
                    <div className={styles.timeTrend}>so với 7 ngày</div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid container>
              <Grid lg={12} item className={styles.section}>
                {/* <ManagerChartFinace /> */}

                <div className={styles.transactionContainer}>
                  {transaction.map((item) => (
                    <>
                      <div className={styles.itemContainer} key={item.id}>
                        <div className={styles.itemTitle}>
                          <p className={styles.title}>
                            Đơn hàng {item.id}, {item.title}
                          </p>
                          <p className={styles.date}>{item.date}</p>
                        </div>
                        <div className={styles.itemPrice}>+ {item.value} ₫</div>
                      </div>

                      <Divider />
                    </>
                  ))}
                </div>
              </Grid>

              <Grid lg={12} item className=""></Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ManagerFiancePage;
