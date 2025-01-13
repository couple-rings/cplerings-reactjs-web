import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
// import { pageSize } from "src/utils/constants";
import { useQuery } from "@tanstack/react-query";
import {
  //   fetchPaymentOrderStatistic,
  fetchRefundOrderStatistic,
  // fetchRefundOrderStatistic,
  // fetchResellOrderStatistic,
} from "src/utils/querykey";
import {
  //   getPaymentOrderStatistic,
  getRefundOrderStatistic,
  // getRefundOrderStatistic,
  // getResellOrderStatistic,
} from "src/services/dashboard.service";
import styles from "./TableProductPage.module.scss";
import { useNavigate } from "react-router-dom";

const initMetaData = {
  page: 0,
  pageSize: 5,
  totalPages: 0,
  count: 0,
};

type OrderStatistic =
  // | IResellOrderStatistic
  IRefund;
// | ICustomOrderStatistic
//   | IPaymentOrderStatistic;

type OrderStatisticResponse =
  // | IResponse<IListResponse<IResellOrderStatistic>>
  IResponse<IListResponse<IRefund>>;
// | IResponse<IListResponse<ICustomOrderStatistic>>
//   | IResponse<IListResponse<IPaymentOrderStatistic>>;

const defaultStartDate = new Date(
  new Date().setDate(new Date().getDate() - 7)
).toISOString();
const defaultEndDate = new Date().toISOString();

function TableRefundOrderList(props: ITableOrderListProps) {
  const {
    selectedOrderType,
    endDateData,
    startDateData,
    selectedFilterPaymentType,
  } = props;
  console.log(">>>Start Date Data", startDateData);
  console.log(">>>End Date Data", endDateData);
  console.log(">>>Selected Order Type", selectedFilterPaymentType);

  const [rowData, setRowData] = useState<OrderStatistic[]>([]);
  const [waitingData, setWaitingData] = useState<OrderStatistic[]>([]);
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [paymentNumber, setPaymentNumber] = useState("0");

  const orderQuery = {
    // RESELL: {
    //   queryKey: fetchPaymentOrderStatistic,
    //   queryFn: getPaymentOrderStatistic,
    // },
    REFUND: {
      queryKey: fetchRefundOrderStatistic,
      queryFn: getRefundOrderStatistic,
    },
    // CUSTOM: {
    //   queryKey: fetchPaymentOrderStatistic,
    //   queryFn: getPaymentOrderStatistic,
    // },
  };

  const [filterOrderStatisticObj, setFilterOrderStatisticObj] =
    useState<IOrderStatisticFilter>({
      page: metaData.page,
      pageSize: 5,
      startDate: startDateData || defaultStartDate,
      endDate: endDateData || defaultEndDate,
      //   orderType: selectedOrderType,
    });

  const navigate = useNavigate();

  console.log(">>>Filter Order Statistic Obj", filterOrderStatisticObj);

  type OrderTypeKeys = keyof typeof orderQuery;

  const orderType = selectedOrderType?.toUpperCase() as OrderTypeKeys;

  useEffect(() => {
    setFilterOrderStatisticObj((prev) => ({
      ...prev,
      startDate: startDateData || defaultStartDate,
      endDate: endDateData || defaultEndDate,
    }));
  }, [startDateData, endDateData]);

  const { data, isLoading } = useQuery<OrderStatisticResponse>({
    queryKey: [orderQuery[orderType]?.queryKey, filterOrderStatisticObj],
    queryFn: () => orderQuery[orderType]?.queryFn(filterOrderStatisticObj),
    enabled: Boolean(selectedOrderType),
  });

  useEffect(() => {
    if (data && data.data) {
      const { items, ...rest } = data.data;

      // console.log(
      //   ">>>Items",
      //   items.map((item) => item.paymentMethod)
      // );

      console.log(">>>>>DATA RESPONSE", data.data.items);
      console.log(">>>>>>>>>>ITEM", items);

      setWaitingData(items);
      setPaymentNumber(rest.count.toLocaleString());
      setMetaData(rest);
      // setRowData(data.data.items);
    }
  }, [data]);

  useEffect(() => {
    const filteredItems =
      selectedFilterPaymentType === "All"
        ? waitingData
        : waitingData.filter(
            (item) => item.payment?.type === selectedFilterPaymentType
          );
    setRowData(filteredItems);
  }, [selectedFilterPaymentType, waitingData]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilterOrderStatisticObj({
      ...filterOrderStatisticObj,
      page: value - 1,
    });
  };

  return (
    <div>
      <div
        className="totalInfo"
        style={{
          padding: "1px 20px",
          height: "fit-content",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: "500",
          marginLeft: "30px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          width: "fit-content",
        }}
      >
        <p>Tổng: {paymentNumber} đơn</p>
      </div>

      <div className={styles.transactionContainer}>
        <div style={{ fontSize: "30px", marginBottom: "20px" }}></div>

        {isLoading && <div>Loading...</div>}

        {rowData.length === 0 ? (
          <div className={styles.empty}>Không tìm thấy đơn hàng nào...</div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#A8A7A7" }}>STT</TableCell>
                  <TableCell align="left" style={{ color: "#A8A7A7" }}>
                    Mã Đơn
                  </TableCell>
                  <TableCell align="left" style={{ color: "#A8A7A7" }}>
                    Ngày Tạo
                  </TableCell>
                  <TableCell align="center" style={{ color: "#A8A7A7" }}>
                    Trạng Thái Đơn
                  </TableCell>
                  <TableCell align="center" style={{ color: "#A8A7A7" }}>
                    Phương Thức
                  </TableCell>
                  <TableCell align="center" style={{ color: "#A8A7A7" }}>
                    Giá Trị Ban Đầu
                  </TableCell>
                  <TableCell align="center" style={{ color: "#A8A7A7" }}>
                    Giá Trị Thu Mua
                  </TableCell>
                  <TableCell align="center" style={{ color: "#A8A7A7" }}>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontWeight: "500" }}
                    >
                      {metaData.page * metaData.pageSize + index + 1}
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "500" }}>
                      {/* <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "left",
                      }}
                    >
                      <p
                        className={
                          row.orderType === "CUSTOM"
                            ? styles.tableCustomType
                            : row.orderType === "REFUND"
                            ? styles.tableRefundType
                            : row.orderType === "RESELL"
                            ? styles.tableResellType
                            : ""
                        }
                      >
                        {row.orderType === "CUSTOM"
                          ? "Gia Công"
                          : row.orderType === "REFUND"
                          ? "Hoàn Tiền"
                          : row.orderType === "RESELL"
                          ? "Mua Lại"
                          : ""}
                      </p>
                    </div> */}
                      {row.orderNo}
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "500" }}>
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "500" }}>
                      {/* {row.refund?.customOrder?.createdAt} */}
                      <p className={styles.tableStatusCompleted}>
                        Đã Hoàn Tiền
                      </p>
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "500" }}>
                      {/* {row.customOrder?.status} */}

                      <p
                        className={
                          row.payment?.type === "CASH"
                            ? styles.tableCashPayment
                            : styles.tableTransferPayment
                        }
                      >
                        {row.payment?.type === "CASH"
                          ? "Tiền Mặt"
                          : row.payment?.type === "TRANSFER"
                          ? "Chuyển Khoản"
                          : ""}
                      </p>
                      {/* <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        className={
                          row.paymentMethod === "CASH"
                            ? styles.tableCashPayment
                            : row.paymentMethod === "TRANSFER"
                            ? styles.tableTransferPayment
                            : ""
                        }
                      >
                        {row.paymentMethod === "CASH"
                          ? "Tiền Mặt"
                          : row.paymentMethod === "TRANSFER"
                          ? "Chuyển Khoản"
                          : ""}
                      </p>
                    </div> */}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "500" }}>
                      {/* <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        className={
                          row.orderType === "CUSTOM"
                            ? styles.tableMoneyIn
                            : styles.tableMoneyOut
                        }
                      >
                        {row.amount.amount.toLocaleString()} ₫
                      </p>
                    </div> */}
                      <p className={styles.tableMoneyIn}>
                        {row.customOrder?.totalPrice.amount.toLocaleString()} ₫
                      </p>
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "500" }}>
                      <p className={styles.tableMoneyOut}>
                        {row.payment?.amount.toLocaleString()} ₫
                      </p>
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "500" }}>
                      <button className={styles.button}
                        onClick={() =>
                          navigate(`/manager/refund/detail/${row.id}`)
                        }
                      >
                        Chi Tiết
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div
          className="pagination"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {rowData.length > 0 && (
            <Pagination
              count={metaData.totalPages}
              page={metaData.page + 1}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TableRefundOrderList;
