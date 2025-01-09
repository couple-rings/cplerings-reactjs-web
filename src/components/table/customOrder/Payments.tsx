import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { fetchPayments } from "src/utils/querykey";
import { getCustomOrderPayments } from "src/services/payment.service";
import moment from "moment";
import { currencyFormatter, formatPaymentStatus } from "src/utils/functions";
import { Chip, FormLabel } from "@mui/material";

export default function Payments(props: IPaymentsProps) {
  const { orderId } = props;

  const { data: response } = useQuery({
    queryKey: [fetchPayments, orderId],
    queryFn: () => {
      return getCustomOrderPayments(orderId);
    },
  });

  console.log(response);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormLabel>Ngày Thực hiện</FormLabel>
            </TableCell>
            <TableCell>
              <FormLabel>Nội Dung</FormLabel>
            </TableCell>
            <TableCell align="center">
              <FormLabel>Phương Thức</FormLabel>
            </TableCell>
            <TableCell align="center">
              <FormLabel>Trạng Thái</FormLabel>
            </TableCell>
            <TableCell align="right">
              <FormLabel>Số Tiền</FormLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response?.data?.payments.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {moment(row.vnPayTransaction?.payDate).format(
                  "DD/MM/YYYY HH:mm"
                )}
              </TableCell>
              <TableCell width={300}>{row.description}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">
                <Chip
                  label={formatPaymentStatus(row.status).text}
                  color={formatPaymentStatus(row.status).color}
                />
              </TableCell>
              <TableCell align="right">
                {currencyFormatter(row.vnPayTransaction?.amount.amount ?? 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
