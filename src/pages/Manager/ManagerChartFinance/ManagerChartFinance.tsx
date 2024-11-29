import { BarChart } from "@mui/x-charts/BarChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,122222,1222,1222,1222];
const xLabels = [
  "21 january",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
  "Page H",
  "Page I",
  "Page J",
  "Page K",
];

function ManagerChartFinace() {
  return (
    <div className="container">
      <div className="titleChartContainer">
        <div className="titleChart">
          Doanh Thu <p>(VND)</p>
        </div>
        <div className="numberContainer">
          <p>280,012,003</p>₫
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
