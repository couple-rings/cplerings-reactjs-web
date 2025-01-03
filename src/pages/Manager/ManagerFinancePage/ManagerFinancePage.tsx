import { Grid } from "@mui/material";
import moneyBag from "src/assets/moneyBag.png";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import styles from "./ManagerFinancePage.module.scss";
import transactionIcon from "src/assets/TransactionIcon.png";
import cashIcon from "src/assets/Cash.png";
import ManagerChartFinace from "src/components/chart/ManagerChartFinance/ManagerChartFinance";
import { useEffect, useState } from "react";
import { fetchRevenueFollowingBranch } from "src/utils/querykey";
import { getTotalRevenueFollowingBranch } from "src/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import RevenueTypeMenu from "src/components/menu/hover/RevenueTypeMenu";
import TableOrderList from "./TableOrderList";
import { OrderTypeForTableOrderList } from "src/utils/enums";

function ManagerFiancePage() {
  const [filterObj, setFilterObj] = useState<IRevenueFilter>({
    startDate: "",
    endDate: "",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<OrderTypeForTableOrderList>(
    OrderTypeForTableOrderList.Custom
  );
  const [chartData, setChartData] = useState<{
    xLabels: string[];
    uData: (number | null)[];
  }>({ xLabels: [], uData: [] });

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

  useEffect(() => {
    if (response && response.data) {
      const items = response.data;

      const labels = Object.keys(items.revenueForEach || {}).sort(
        (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
      );
      const data = labels.map(
        (date) => items.revenueForEach[date]?.amount || null
      );

      setChartData({
        xLabels: labels,
        uData: data,
      });

      console.log(">>>DATA OF REVENUE", items);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [response]);

  const handleChangeDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setFilterObj({
      startDate: startDate ? new Date(startDate).toISOString() : "",
      endDate: endDate ? new Date(endDate).toISOString() : "",
    });
  };

  const total = response?.data?.totalRevenue?.amount.toLocaleString();

  const tabName = [
    {
      name: "Gia Công",
      key: OrderTypeForTableOrderList.Custom,
    },
    {
      name: "Hoàn Tiền",
      key: OrderTypeForTableOrderList.Refund,
    },
    {
      name: "Mua Lại",
      key: OrderTypeForTableOrderList.Resell,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid
              container
              className={styles.topBox}
              justifyContent={"space-between"}
            >
              <Grid lg={3.8} item>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div className={styles.numberContainer}>
                      <p>{total}</p>₫
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

              <Grid lg={3.8} item>
                <div className={styles.revenueBankingContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={transactionIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Tổng chuyển khoản</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
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

              <Grid lg={3.8} item>
                <div className={styles.revenueCashContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={cashIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Tổng tiền mặt</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
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
            </Grid>

            <Grid container>
              <Grid lg={12} item className={styles.section}>
                <div>
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
                        onChange={(e) =>
                          handleChangeDate(e.target.value, endDate)
                        }
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
                </div>

                <div className={styles.table}>
                  <div>
                    <div className={styles.tableHeader}>
                      <div className={styles.tabBar}>
                        {tabName?.map((item) => (
                          <p
                            key={item.key}
                            className={
                              selectedItem === item.key
                                ? styles.itemSelected
                                : styles.item
                            }
                            onClick={() => setSelectedItem(item.key)}
                          >
                            {item.name}
                          </p>
                        ))}
                      </div>

                      <RevenueTypeMenu setFilterPaymentMethod={setFilterPaymentMethod} />
                    </div>

                    <div className={styles.transactionContainer}>
                      <TableOrderList
                        selectedOrderType={selectedItem}
                        startDateData={filterObj.startDate}
                        endDateData={filterObj.endDate}
                        selectedFilterPaymentType={filterPaymentMethod}
                      />
                    </div>
                  </div>
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
