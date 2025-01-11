import { Grid } from "@mui/material";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import customOrderIcon from "src/assets/New Product.png";
import resellOrderIcon from "src/assets/Buy.png";
import refundOrderIcon from "src/assets/Currency Exchange.png";
import styles from "./ManagerProductPage.module.scss";
import ManagerPieChartCategory from "src/components/chart/ManagerPieChartCategory/ManagerPieChartCategory";
import { useEffect, useState } from "react";
import {
  fetchRevenueFollowingBranch,
  fetchTotalOrderFollowingBranch,
} from "src/utils/querykey";
import {
  getTotalOrderFollowingBranch,
  getTotalRevenueFollowingBranch,
} from "src/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import RevenueTypeMenu from "src/components/menu/hover/RevenueTypeMenu";
import { OrderTypeForTableOrderList } from "src/utils/enums";
import TableCustomOrderList from "./TableCustomOrderList";
import TableResellOrderList from "./TableResellOrderList";
import TableRefundOrderList from "./TableRefundOrderList";
// import TableProductPage from "./TableProductPage";

function ManagerProductPage() {
  const [filterObj, setFilterObj] = useState<IRevenueFilter>({
    startDate: "",
    endDate: "",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>("All");
  const [pieChartData, setPieChartData] = useState<ITotalOrderPieChartProps>({
    orderPieChartData: [],
    totalOrder: "0",
    totalRevenue: "0",
  });
  const [totalOrder, setTotalOrder] = useState<{
    totalCustomOrder: string;
    totalResellOrder: string;
    totalRefundOrder: string;
    totalOrder: string;
  }>({
    totalCustomOrder: "",
    totalResellOrder: "",
    totalRefundOrder: "",
    totalOrder: "",
  });
  const [selectedItem, setSelectedItem] = useState<OrderTypeForTableOrderList>(
    OrderTypeForTableOrderList.Custom
  );

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
    queryKey: [fetchTotalOrderFollowingBranch, filterObj],
    queryFn: () => getTotalOrderFollowingBranch(filterObj),
  });

  const { data: totalRevenueResponse } = useQuery({
    queryKey: [fetchRevenueFollowingBranch, filterObj],
    queryFn: () => getTotalRevenueFollowingBranch(filterObj),
  });

  useEffect(() => {
    if (response && response.data) {
      const items = response.data.orders;
      const totalCustom = items.totalCustomOrder;
      const totalRefund = items.totalRefundOrder;
      const totalResell = items.totalResellOrder;
      const total =
        items.totalCustomOrder +
        items.totalRefundOrder +
        items.totalResellOrder;

      setTotalOrder({
        totalCustomOrder: totalCustom.toLocaleString(),
        totalResellOrder: totalResell.toLocaleString(),
        totalRefundOrder: totalRefund.toLocaleString(),
        totalOrder: total.toLocaleString(),
      });

      if (totalRevenueResponse && totalRevenueResponse.data) {
        const totalRevenue = totalRevenueResponse.data.totalRevenue.amount;
        const updateChartData = {
          orderPieChartData: [
            {
              label: "Đơn Gia Công",
              value: Number(((totalCustom / total) * 100).toFixed(2)),
            },
            {
              label: "Đơn Hoàn Tiền",
              value: Number(((totalRefund / total) * 100).toFixed(2)),
            },
            {
              label: "Đơn Bán Lại",
              value: Number(((totalResell / total) * 100).toFixed(2)),
            },
          ],
          totalOrder: total.toLocaleString(),
          totalRevenue: totalRevenue.toLocaleString(),
        };

        setPieChartData(updateChartData);
      }

      // window.scrollTo({ top: 0, behavior: "smooth" });

      console.log(">>>ITEM OF THE DAY", items);
    }
  }, [response, totalRevenueResponse]);

  const handleChangeDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setFilterObj({
      startDate: startDate ? new Date(startDate).toISOString() : "",
      endDate: endDate ? new Date(endDate).toISOString() : "",
    });
  };

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
          <Grid container>
            <Grid
              container
              className={styles.topBox}
              justifyContent={"space-between"}
            >
              <Grid lg={3.8} item>
                <div className={styles.customOrderContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={customOrderIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Đơn Gia Công</p>
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
                      <p>{totalOrder.totalCustomOrder}</p>đơn
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
                <div className={styles.resellOrderContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={resellOrderIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Đơn Mua Lại</p>
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
                      <p>{totalOrder.totalResellOrder}</p>đơn
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
                <div className={styles.refundOrderContainer}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={refundOrderIcon} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Đơn Hoàn Tiền</p>
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
                      <p>{totalOrder.totalRefundOrder}</p>đơn
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
                <ManagerPieChartCategory
                  totalOrder={pieChartData.totalOrder}
                  totalRevenue={pieChartData.totalRevenue}
                  orderPieChartData={pieChartData.orderPieChartData}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: "50px",
                    marginBottom: "20px",
                    marginTop: "50px",
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

                <div className={styles.table}>
                  <div>
                    <div className={styles.tableHeader}>
                      <div className={styles.tabBar}>
                        {tabName?.map((item) => {
                          const itemClass =
                            selectedItem === OrderTypeForTableOrderList.Custom
                              ? styles.itemSelectedCustom
                              : selectedItem ===
                                OrderTypeForTableOrderList.Refund
                              ? styles.itemSelectedRefund
                              : selectedItem ===
                                OrderTypeForTableOrderList.Resell
                              ? styles.itemSelectedResell
                              : styles.item;

                          return (
                            <p
                              key={item.key}
                              className={
                                selectedItem === item.key
                                  ? itemClass
                                  : styles.item
                              }
                              onClick={() => setSelectedItem(item.key)}
                            >
                              {item.name}
                            </p>
                          );
                          // <p
                          //   key={item.key}
                          //   className={
                          //     selectedItem === item.key
                          //       ? styles.itemSelected
                          //       : styles.item
                          //   }
                          //   onClick={() => setSelectedItem(item.key)}
                          // >
                          //   {item.name}
                          // </p>
                        })}

                        {/* {tabName?.map((item) => (
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
                        ))} */}

                        {/* <div
                          className="totalInfo"
                          style={{
                            // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                            padding: "1px 10px",
                            height: "fit-content",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "500",
                            marginLeft: "50px",
                          }}
                        >
                          <p>Tổng: 76,123,000 ₫ _ (10 đơn)</p>
                        </div> */}
                      </div>

                      <RevenueTypeMenu
                        setFilterPaymentMethod={setFilterPaymentMethod}
                      />
                    </div>

                    {selectedItem === OrderTypeForTableOrderList.Custom ? (
                      <div className="{styles.transactionContainer}">
                        <TableCustomOrderList
                          selectedOrderType={selectedItem}
                          startDateData={filterObj.startDate}
                          endDateData={filterObj.endDate}
                          selectedFilterPaymentType={filterPaymentMethod}
                        />
                      </div>
                    ) : selectedItem === OrderTypeForTableOrderList.Refund ? (
                      <div className="{styles.transactionContainer}">
                        <TableRefundOrderList
                          selectedOrderType={selectedItem}
                          startDateData={filterObj.startDate}
                          endDateData={filterObj.endDate}
                          selectedFilterPaymentType={filterPaymentMethod}
                        />
                      </div>
                    ) : selectedItem === OrderTypeForTableOrderList.Resell ? (
                      <div className="{styles.transactionContainer}">
                        <TableResellOrderList
                          selectedOrderType={selectedItem}
                          startDateData={filterObj.startDate}
                          endDateData={filterObj.endDate}
                          selectedFilterPaymentType={filterPaymentMethod}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ManagerProductPage;
