import { PieChart } from "@mui/x-charts/PieChart";
import { mobileOS } from "./webUsageStats";
import styles from "./ManagerPieChartCategory.module.scss";

function ManagerPieChartCategory() {
  return (
    <>
      <div className={styles.container}>
        <PieChart
          sx={{ marginLeft: "100px" }}
          series={[
            {
              data: mobileOS,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              innerRadius: 80,
              outerRadius: 130,
            },
          ]}
          height={300}
          slotProps={{
            legend: { hidden: true },
          }}
        />

        <div className={styles.revenueContainer}>
          <p className={styles.date}>Tháng 12, 2024</p>
          <p className={styles.revenue}>20,000,000 ₫</p>
        </div>

        <div className={styles.categoryNote}>
          <div className={styles.categoryItem1}>
            <p className="item">Thể loại 2</p>
          </div>
          <div className={styles.categoryItem2}>
            <p className="item">Thể loại 1</p>
          </div>
          <div className={styles.categoryItem3}>
            <p className="item">Thể loại 3</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPieChartCategory;
