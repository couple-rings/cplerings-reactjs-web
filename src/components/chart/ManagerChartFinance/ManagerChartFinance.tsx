import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./ManagerChartFinance.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRevenueFollowingBranch } from "src/utils/querykey";
import { getTotalRevenueFollowingBranch } from "src/services/dashboard.service";

let uData: number[] = [];
let xLabels: string[] = [];

// const initFilter: IRevenueFilter = {
//   startDate: new Date(
//     new Date().setDate(new Date().getDate() - 7)
//   ).toISOString(),
//   endDate: new Date().toISOString(),
// };

function ManagerChartFinace() {
  const [filterObj, setFilterObj] = useState<IRevenueFilter>({
    startDate: "",
    endDate: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const generateDatesInRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: string[] = [];

    if (start > end) {
      console.error("Start date must be before or equal to end date.");
      return dates;
    }

    xLabels = [];

    while (start <= end) {
      xLabels.push(new Date(start).toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }
  };

  useEffect(() => {
    const initialStartDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    ).toISOString();
    const initialEndDate = new Date().toISOString();

    generateDatesInRange(initialStartDate, initialEndDate);

    setFilterObj({
      startDate: initialStartDate,
      endDate: initialEndDate,
    });
  }, []);

  const { data: response } = useQuery({
    queryKey: [fetchRevenueFollowingBranch, filterObj],
    queryFn: () => getTotalRevenueFollowingBranch(filterObj),
  });

  useEffect(() => {
    if (response && response.data) {
      console.log("response", response.data);
      const items = response.data;
      console.log("items", items);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [response]);

  const handleChangeDate = (startDate: string, endDate: string) => {
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    generateDatesInRange(startDate, endDate);
    setStartDate(startDate);
    setEndDate(endDate);
    setFilterObj({
      startDate: startDate ? new Date(startDate).toISOString() : "",
      endDate: endDate ? new Date(endDate).toISOString() : "",
    });
  };

  const totalRevenue = response?.data?.totalRevenue.amount;

  response?.data?.revenueForEach.forEach((data) => {
    uData = [];
    uData.push(data.amount);
  });

  console.log("uData", uData);

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

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "50px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <label>Từ ngày: </label>
          <input
            style={{
              width: "400px",
              height: "30px",
              borderRadius: "5px",
              padding: "5px",
            }}
            type="date"
            value={startDate}
            onChange={(e) => handleChangeDate(e.target.value, endDate)}
            max={endDate || undefined}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <label>Đến ngày: </label>
          <input
            style={{
              width: "400px",
              height: "30px",
              borderRadius: "5px",
              padding: "5px",
            }}
            type="date"
            value={endDate}
            onChange={(e) => handleChangeDate(startDate, e.target.value)}
            min={startDate || undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default ManagerChartFinace;
