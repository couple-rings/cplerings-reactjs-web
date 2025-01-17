import { PieChart } from "@mui/x-charts/PieChart";
// import { mobileOS } from "./webUsageStats";
// import { mobileOS } from "./webUsageStats";
import styles from "./ManagerPieChartCategory.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

function ManagerPieChartCategory(props: ITotalOrderPieChartProps) {
  const { totalOrder, totalRevenue, orderPieChartData } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const isManagerProductPage = location.pathname === "/manager/product";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="title" style={{ fontSize: "30px" }}>
            Các loại đơn
          </div>
          {!isManagerProductPage && (
            <div
              className={styles.button}
              onClick={() => navigate("/manager/product")}
            >
              {" "}
              Xem Chi Tiết
            </div>
          )}
        </div>

        <PieChart
          sx={{ marginLeft: "100px" }}
          series={[
            {
              data: orderPieChartData,
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
          <p className={styles.date}>{totalOrder} Đơn</p>
          <p className={styles.revenue}>{totalRevenue} ₫</p>
        </div>

        <div className={styles.categoryNote}>
          <div className={styles.categoryItem1}>
            <p className="item">Đơn Gia Công</p>
          </div>
          <div className={styles.categoryItem2}>
            <p className="item">Đơn Mua Lại</p>
          </div>
          <div className={styles.categoryItem3}>
            <p className="item">Đơn Hoàn Tiền</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPieChartCategory;
