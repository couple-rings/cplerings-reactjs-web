import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./ManagerChartFinance.module.scss";
import { useNavigate } from "react-router-dom";


function ManagerChartFinace(props: IManagerChartFinanceProps) {
  const { uData, xLabels, totalRevenue } = props;

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.titleChartContainer}>
        <div
          className={styles.titleChart}
          onClick={() => navigate("/manager/financial")}
        >
          Doanh Thu <p>(VND)</p>
        </div>
        <div className={styles.numberContainer}>
          {totalRevenue}
          <p>₫</p>
        </div>
      </div>

      <BarChart
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        series={[{ data: uData, label: "Doanh Thu", id: "pvId" }]}
        height={300}
      />
    </div>
  );
}

export default ManagerChartFinace;
