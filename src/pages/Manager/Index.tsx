import { Grid } from "@mui/material";
import styles from "./Index.module.scss";
import moneyBag from "src/assets/moneyBag.png";
import transactionIcon from "src/assets/TransactionIcon.png";
import customerIcon from "src/assets/CustomerIcon.png";
import productIcon from "src/assets/ProductIcon.png";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import chartArrowDescent from "src/assets/ChartArrowDescent.png";
import ManagerTopProductTable from "./ManagerTopProductTable/ManagerTopProductTable";
import ManagerChartFinace from "src/components/chart/ManagerChartFinance/ManagerChartFinance";
import ManagerPieChartCategory from "src/components/chart/ManagerPieChartCategory/ManagerPieChartCategory";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRevenueFollowingBranch } from "src/utils/querykey";
import { getTotalRevenueFollowingBranch } from "src/services/dashboard.service";

let uData: number[] = [];
let xLabels: string[] = [];

function Index() {
  const [filterObj, setFilterObj] = useState<IRevenueFilter>({
    startDate: "",
    endDate: "",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const total = response?.data?.totalRevenue?.amount;

  response?.data?.revenueForEach.forEach((data) => {
    uData = [];
    uData.push(data.amount);
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <div className={styles.topBox}>
            <div className={styles.title}>Thống Kê</div>
            <Grid container justifyContent={"space-between"}>
              <Grid item lg={2.8}>
                <div className={styles.revenueContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={moneyBag} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Tổng doanh thu</p>
                    </div>
                  </div>

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
              </Grid>

              <Grid item lg={2.8}>
                <div className={styles.transactionContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={transactionIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Tổng số giao dịch</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>281</p>giao dịch
                  </div>
                  <div className={styles.trendContainer}>
                    <div className={styles.numberTrendDown}>
                      <img src={chartArrowDescent} alt="" />
                      28%
                    </div>
                    <div className={styles.timeTrend}>so với 7 ngày</div>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2.8}>
                <div className={styles.customerContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={customerIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Tổng khách hàng</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>2,813</p>khách hàng
                  </div>
                  <div className={styles.trendContainer}>
                    <div className={styles.numberTrendUp}>
                      <img src={chartArrowRise} alt="" />
                      28%
                    </div>
                    <div className={styles.timeTrend}>so với 7 ngày</div>
                  </div>
                </div>
              </Grid>

              <Grid item lg={2.8}>
                <div className={styles.productContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={productIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Tổng sản phẩm</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>28,000</p>sản phẩm
                  </div>
                  <div className={styles.trendContainer}>
                    <div className={styles.numberTrendUp}>
                      <img src={chartArrowRise} alt="" />
                      28%
                    </div>
                    <div className={styles.timeTrend}>so với 7 ngày</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>

          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} className={styles.section}>
              <ManagerChartFinace uData={uData} xLabels={xLabels} totalRevenue={total ?? 0} />

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
                    onChange={(e) =>
                      handleChangeDate(startDate, e.target.value)
                    }
                    min={startDate || undefined}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={7} className={styles.section} mt={3} p={3}>
              <ManagerTopProductTable />
            </Grid>
            <Grid item xs={4.8} className={styles.section} mt={3} p={3}>
              <ManagerPieChartCategory />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Index;
