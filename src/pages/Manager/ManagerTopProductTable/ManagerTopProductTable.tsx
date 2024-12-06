import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function ManagerTopProductTable() {
  return (
    <div className="container">
      <div style={{ fontSize: "30px", marginBottom: "20px" }}>
        Những sản phẩm nổi bật
      </div>

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
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
  );
}

export default ManagerTopProductTable;
