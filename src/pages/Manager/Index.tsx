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
import {
  fetchRevenueFollowingBranch,
  fetchTotalExpenditureOfAllTimeFollowingBranch,
  fetchTotalIncomeOfAllTimeFollowingBranch,
  fetchTotalOrderFollowingBranch,
  fetchTotalOrderOfAllTimeFollowingBranch,
  fetchTotalRevenueOfAllTimeFollowingBranch,
  fetchTotalTransactionOfAllTimeFollowingBranch,
} from "src/utils/querykey";
import {
  getTotalExpenditureOfAllTimeFollowingBranch,
  getTotalIncomeOfAllTimeFollowingBranch,
  getTotalOrderFollowingBranch,
  getTotalOrderOfAllTimeFollowingBranch,
  getTotalRevenueFollowingBranch,
  getTotalRevenueOfAllTimeFollowingBranch,
  getTotalTransactionOfAllTimeFollowingBranch,
} from "src/services/dashboard.service";

function Index() {
  const [filterObj, setFilterObj] = useState<IRevenueFilter>({
    startDate: "",
    endDate: "",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRevenueAll, setTotalRevenueAll] = useState("0");
  const [totalTransactionAll, setTotalTransactionAll] = useState("0");
  const [totalIncomeAll, setTotalIncomeAll] = useState("0");
  const [totalExpenditureAll, setTotalExpenditure] = useState("0");
  // const [totalOrderAll, setTotalOrderAll] = useState("0");
  const [chartData, setChartData] = useState<{
    xLabels: string[];
    uData: (number | null)[];
  }>({ xLabels: [], uData: [] });
  const [pieChartData, setPieChartData] = useState<ITotalOrderPieChartProps>({
    orderPieChartData: [],
    totalOrder: "0",
    totalRevenue: "0",
  });

  useEffect(() => {
    const initialStartDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    ).toISOString();
    const initialEndDate = new Date().toISOString();

    setFilterObj({
      startDate: initialStartDate,
      endDate: initialEndDate,
    });
  }, []);

  const { data: response } = useQuery({
    queryKey: [fetchRevenueFollowingBranch, filterObj],
    queryFn: () => getTotalRevenueFollowingBranch(filterObj),
  });

  const { data: pieChartResponse } = useQuery({
    queryKey: [fetchTotalOrderFollowingBranch, filterObj],
    queryFn: () => getTotalOrderFollowingBranch(filterObj),
  });

  const { data: totalRevenueOfAllTime } = useQuery({
    queryKey: [fetchTotalRevenueOfAllTimeFollowingBranch],
    queryFn: getTotalRevenueOfAllTimeFollowingBranch,
  });

  const { data: totalTransactionOfAllTime } = useQuery({
    queryKey: [fetchTotalTransactionOfAllTimeFollowingBranch],
    queryFn: getTotalTransactionOfAllTimeFollowingBranch,
  });

  const { data: totalOrderOfAllTime } = useQuery({
    queryKey: [fetchTotalOrderOfAllTimeFollowingBranch],
    queryFn: getTotalOrderOfAllTimeFollowingBranch,
  });

  const {data : totalIncomeOfAllTime} = useQuery({
    queryKey: [fetchTotalIncomeOfAllTimeFollowingBranch],
    queryFn: getTotalIncomeOfAllTimeFollowingBranch,
  })

  const {data: totalExpenditureOfAllTime} = useQuery({
    queryKey: [fetchTotalExpenditureOfAllTimeFollowingBranch],
    queryFn: getTotalExpenditureOfAllTimeFollowingBranch,
  })

  

  useEffect(() => {
    if (response && response.data) {
      const items = response.data;

      const labels: string[] = Object.keys(items.revenueForEach || {}).sort(
        (a, b) => {
          const startDateA = new Date(a.split(" - ")[0]).getTime();
          const startDateB = new Date(b.split(" - ")[0]).getTime();
          return startDateA - startDateB;
        }
      );
      const data = labels.map(
        (date) => items.revenueForEach[date]?.amount || null
      );

      setChartData({
        xLabels: labels,
        uData: data,
      });

      if (pieChartResponse && pieChartResponse.data) {
        const pieItems = pieChartResponse.data.orders;

        const totalCustom = pieItems?.totalCustomOrder || 0;
        const totalRefund = pieItems?.totalRefundOrder || 0;
        const totalResell = pieItems?.totalResellOrder || 0;
        const total = totalCustom + totalRefund + totalResell;

        const updateOrderPieChartData = {
          orderPieChartData: [
            {
              label: "Đơn Gia Công",
              value: Number(((totalCustom / total) * 100).toFixed(2)),
              // value: 15,
            },
            {
              label: "Đơn Hoàn Tiền",
              value: Number(((totalRefund / total) * 100).toFixed(2)),
              // value: 15,
            },
            {
              label: "Đơn Bán Lại",
              value: Number(((totalResell / total) * 100).toFixed(2)),
              // value: 75,
            },
          ],
          totalOrder: total.toLocaleString(),
          totalRevenue: response?.data?.totalRevenue?.amount.toLocaleString(),
        };

        setPieChartData(updateOrderPieChartData);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

      if (totalRevenueOfAllTime && totalRevenueOfAllTime.data) {
        const total = totalRevenueOfAllTime.data;
        setTotalRevenueAll(total.totalRevenue.amount.toLocaleString());
      }

      if (totalTransactionOfAllTime && totalTransactionOfAllTime.data) {
        const total = totalTransactionOfAllTime.data;
        setTotalTransactionAll(total.totalTransaction.toLocaleString());
      }

      // if (totalOrderOfAllTime && totalOrderOfAllTime.data) {
      //   const total = totalOrderOfAllTime.data;
      //   setTotalOrderAll(total.totalOrders.toLocaleString());
      // }
      if (totalIncomeOfAllTime && totalIncomeOfAllTime.data) {
        const total = totalIncomeOfAllTime.data;
        setTotalIncomeAll(total.totalIn.amount.toLocaleString());
      }
      if (totalExpenditureOfAllTime && totalExpenditureOfAllTime.data) {
        const total = totalExpenditureOfAllTime.data;
        setTotalExpenditure(total.totalExpenditure.amount.toLocaleString());
      }

    }
  }, [
    response,
    pieChartResponse,
    totalRevenueOfAllTime,
    totalTransactionOfAllTime,
    totalOrderOfAllTime,
    totalExpenditureOfAllTime,
    totalIncomeOfAllTime,
  ]);

  const handleChangeDate = (startDate: string, endDate: string) => {
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    setStartDate(startDate);
    setEndDate(endDate);
    setFilterObj({
      startDate: startDate ? new Date(startDate).toISOString() : "",
      endDate: endDate ? new Date(endDate).toISOString() : "",
    });
  };

  const total = response?.data?.totalRevenue?.amount.toLocaleString();

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
                    <p>{totalRevenueAll}</p>₫
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
                <div className={styles.customerContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={customerIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Tổng thu vào</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>{totalIncomeAll}</p>₫
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
                      <p>Tổng chi tiêu</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>{totalExpenditureAll}</p>₫
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
                    <p>{totalTransactionAll}</p>giao dịch
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

                
            </Grid>
          </div>

          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} className={styles.section}>
              <ManagerChartFinace
                uData={chartData.uData}
                xLabels={chartData.xLabels}
                totalRevenue={total ?? "0"}
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
                    onChange={(e) =>
                      handleChangeDate(startDate, e.target.value)
                    }
                    min={startDate || undefined}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={7} className={styles.section} mt={3} p={3}>
              <ManagerTopProductTable/>
            </Grid>
            <Grid item xs={4.8} className={styles.section} mt={3} p={3}>
              <ManagerPieChartCategory
                totalOrder={pieChartData.totalOrder}
                totalRevenue={pieChartData.totalRevenue}
                orderPieChartData={pieChartData.orderPieChartData}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Index;
