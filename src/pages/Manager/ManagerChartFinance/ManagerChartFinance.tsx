import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./ManagerChartFinance.module.scss";
import { useState } from "react";

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,122222,1222,1222,1222];
// const xLabels = [
//   "21 january",
//   "Page B",
//   "Page C",
//   "Page D",
//   "Page E",
//   "Page F",
//   "Page G",
//   "Page H",
//   "Page I",
//   "Page J",
//   "Page K",
// ];

const initialData = [
  { date: "2024-01-21", value: 4000 },
  { date: "2024-01-22", value: 3000 },
  { date: "2024-01-23", value: 2000 },
  { date: "2024-01-24", value: 2780 },
  { date: "2024-01-25", value: 1890 },
  { date: "2024-01-26", value: 2390 },
  { date: "2024-01-27", value: 3490 },
  { date: "2024-01-28", value: 12222 },
  { date: "2024-01-29", value: 1222 },
  { date: "2024-01-30", value: 1222 },
  { date: "2024-01-31", value: 1222 },
  { date: "2024-02-01", value: 1222 },
  { date: "2024-02-02", value: 1222 },
  { date: "2024-02-03", value: 1222 },
];

function ManagerChartFinace() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = initialData.filter((data) => {
    const dataDate = new Date(data.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (!start || dataDate >= start) && (!end || dataDate <= end);
  });

  const xLabels = filteredData.map((data) =>
    new Date(data.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })
  );
  const uData = filteredData.map((data) => data.value);

  return (
    <div className={styles.container}>
      <div className={styles.titleChartContainer}>
        <div className={styles.titleChart}>
          Doanh Thu <p>(VND)</p>
        </div>
        <div className={styles.numberContainer}>
          280,012,003<p>₫</p>
        </div>
      </div>

      <BarChart
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        series={[{ data: uData, label: "Doanh Thu", id: "pvId" }]}
        height={300}
      />

      <div style={{ display: "flex", justifyContent:"space-evenly",  gap: "50px", marginBottom: "20px" }}>
        <div style={{ display: "flex", flexDirection:"column", gap: "10px", marginBottom: "20px" }}>
          <label>Từ ngày: </label>
          <input
            style={{ width: "400px", height: "30px", borderRadius:"5px", padding:"5px"}}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection:"column", gap: "10px", marginBottom: "20px" }}>
          <label>Đến ngày: </label>
          <input
          style={{ width: "400px", height: "30px", borderRadius:"5px", padding:"5px"}}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ManagerChartFinace;
