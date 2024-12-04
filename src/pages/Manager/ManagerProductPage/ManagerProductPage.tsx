import { Grid } from "@mui/material";
import productIcon from "src/assets/ProductIcon.png";
import chartArrowRise from "src/assets/ChartArrowRise.png";
import styles from "./ManagerProductPage.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ManagerPieChartCategory from "src/components/chart/ManagerPieChartCategory/ManagerPieChartCategory";

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

function ManagerProductPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <Grid container>
            <Grid lg={12} item>
              <div className={styles.revenueContainer}>
                <div className={styles.boxTitle}>
                  <div className={styles.boxIcon}>
                    <img src={productIcon} alt="" />
                  </div>
                  <div className={styles.title}>
                    <p>Tổng sản phẩm</p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
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
              </div>
            </Grid>

            <Grid container>
              <Grid lg={12} item className={styles.section}>
                <ManagerPieChartCategory />

                <div className="container" style={{marginTop:"50px"}}>
                  

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
