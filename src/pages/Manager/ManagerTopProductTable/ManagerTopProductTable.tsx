import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { fetchTop5CustomOrder } from "src/utils/querykey";
import { getTop5CustomOrder } from "src/services/dashboard.service";
import styles from "./ManagerTopProduct.module.scss";
// function createData(
//   id: string,
//   name: string,
//   quantity: number,
//   price: number,
//   revenue: number
// ) {
//   return { id, name, quantity, price, revenue };
// }

// const rows = [
//   createData("#281", "My name is Ring", 356, 11000000, 100000000),
//   createData("#281", "My name is Ring", 305, 11000000, 100000000),
//   createData("#281", "My name is Ring", 262, 11000000, 100000000),
//   createData("#281", "My name is Ring", 237, 11000000, 100000000),
//   createData("#281", "My name is Ring", 159, 11000000, 100000000),
// ];

function ManagerTopProductTable() {
  const { data: top5CustomOrder } = useQuery({
    queryKey: [fetchTop5CustomOrder],
    queryFn: getTop5CustomOrder,
  });

  const rows = top5CustomOrder?.data?.top5CustomOrder;

  // useQuery(() => {
  //   if(top5CustomOrder && top5CustomOrder.data) {
  //     console.log(">>>ABC", top5CustomOrder.data.top5CustomOrder);
  //     console.log("???ddddddd", top5CustomOrder.data);

  //   }
  // }, [top5CustomOrder])

  return (
    <div className="container">
      <div style={{ fontSize: "30px", marginBottom: "20px" }}>
        Những đơn hàng mới nhất
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã Đơn</TableCell>
              <TableCell align="left">Thể Loại</TableCell>
              <TableCell align="center">Ngày</TableCell>
              <TableCell align="center">Phương Thức</TableCell>
              <TableCell align="right">Giá Trị</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.orderNo}
                </TableCell>
                <TableCell align="center">
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
                </TableCell>
                <TableCell align="center">
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
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
                </TableCell>
                <TableCell align="center">
                  <p
                    className={
                      row.orderType === "CUSTOM"
                        ? styles.tableMoneyIn
                        : styles.tableMoneyOut
                    }
                  >
                    {row.totalPrice.amount.toLocaleString()} ₫
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManagerTopProductTable;
