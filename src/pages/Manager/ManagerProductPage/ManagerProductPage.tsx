import { Grid } from "@mui/material";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import customOrderIcon from "src/assets/New Product.png";
import resellOrderIcon from "src/assets/Buy.png";
import refundOrderIcon from "src/assets/Currency Exchange.png";
import styles from "./ManagerProductPage.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ManagerPieChartCategory from "src/components/chart/ManagerPieChartCategory/ManagerPieChartCategory";
import { useEffect, useState } from "react";
import {
  // fetchCustomOrderStatistic,
  // fetchPaymentOrderStatistic,
  // fetchRefundOrderStatistic,
  // fetchResellOrderStatistic,
  fetchRevenueFollowingBranch,
  fetchTotalOrderFollowingBranch,
} from "src/utils/querykey";
import {
  // getCustomOrderStatistic,
  // getPaymentOrderStatistic,
  // getRefundOrderStatistic,
  // getResellOrderStatistic,
  getTotalOrderFollowingBranch,
  getTotalRevenueFollowingBranch,
} from "src/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
// import { pageSize } from "src/utils/constants";

function createData(
  id: string,
  name: string,
  quantity: number,
  price: number,
  revenue: number
) {
  return { id, name, quantity, price, revenue };
}

const rows = [
  createData("#281", "My name is Ring", 356, 11000000, 100000000),
  createData("#281", "My name is Ring", 305, 11000000, 100000000),
  createData("#281", "My name is Ring", 262, 11000000, 100000000),
  createData("#281", "My name is Ring", 237, 11000000, 100000000),
  createData("#281", "My name is Ring", 159, 11000000, 100000000),
];

// const initFilter: IOrderStatisticFilter = {
//   page: 0,
//   pageSize: pageSize,
// };

function ManagerProductPage() {
  const [filterObj, setFilterObj] = useState<IRevenueFilter>({
    startDate: "",
    endDate: "",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  // const [filterOrderStatisticObj,setFilterOrderStatisticObj] = useState<IOrderStatisticFilter>(initFilter);

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

  // const { data: resellOrderStatisticResponse } = useQuery({
  //   queryKey: [fetchResellOrderStatistic, filterOrderStatisticObj],
  //   queryFn: () => getResellOrderStatistic(filterOrderStatisticObj),
  // });

  // const { data: refundOrderStatisticResponse } = useQuery({
  //   queryKey: [fetchRefundOrderStatistic, filterOrderStatisticObj],
  //   queryFn: () => getRefundOrderStatistic(filterOrderStatisticObj),
  // });

  // const { data: customOrderStatisticResponse } = useQuery({
  //   queryKey: [fetchCustomOrderStatistic, filterOrderStatisticObj],
  //   queryFn: () => getCustomOrderStatistic(filterOrderStatisticObj),
  // });

  // const { data: paymentOrderStatisticResponse } = useQuery({
  //   queryKey: [fetchPaymentOrderStatistic, filterOrderStatisticObj],
  //   queryFn: () => getPaymentOrderStatistic(filterOrderStatisticObj),
  // });




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
          totalRevenue: totalRevenue.toLocaleString(),
        };

        setPieChartData(updateChartData);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

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

                <div className="container" style={{ marginTop: "50px" }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="left">Sản phẩm</TableCell>
                          <TableCell align="center">Số lượng</TableCell>
                          <TableCell align="center">Giá</TableCell>
                          <TableCell align="right">Doanh thu</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.price} ₫</TableCell>
                            <TableCell align="right">{row.revenue} ₫</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
