import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./TableAccountList.module.scss";

// function createData(
//   id: string,
//   name: string,
//   email: string,
//   phoneNumber: string,
//   role: string,
//   status: string
// ) {
//   return { id, name, email, phoneNumber, role, status };
// }

// const rows = [
//   createData(
//     "#281",
//     "Bean Nguyen",
//     "ndthung281@gmail.com",
//     "0903448630",
//     "Customer",
//     "Active"
//   ),
//   createData(
//     "#281",
//     "Bean Nguyen",
//     "ndthung281@gmail.com",
//     "0903448630",
//     "Customer",
//     "Active"
//   ),
//   createData(
//     "#281",
//     "Bean Nguyen",
//     "ndthung281@gmail.com",
//     "0903448630",
//     "Customer",
//     "Active"
//   ),
//   createData(
//     "#281",
//     "Bean Nguyen",
//     "ndthung281@gmail.com",
//     "0903448630",
//     "Design Staff",
//     "Active"
//   ),
//   createData(
//     "#281",
//     "Bean Nguyen",
//     "ndthung281@gmail.com",
//     "0903448630",
//     "Customer",
//     "Active"
//   ),
//   createData(
//     "#281",
//     "Bean Nguyen",
//     "ndthung281@gmail.com",
//     "0903448630",
//     "Customer",
//     "Inactive"
//   ),
// ];

interface RowData {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    status: string;
  }
  
  interface TableAccountListProps {
    rows: RowData[];
    selectedRole: string;
  }

function TableAccountList({ rows, selectedRole }: TableAccountListProps) {

    const filteredRows = rows.filter((row) => {
        if (selectedRole === "All") return true; // Show all rows
        return row.role === selectedRole; // Match rows with the selected role
      });

  return (
    <div className="container">
      <div style={{ fontSize: "30px", marginBottom: "20px" }}></div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#A8A7A7" }}>ID</TableCell>
              <TableCell align="left" style={{ color: "#A8A7A7" }}>
                Name
              </TableCell>
              <TableCell align="left" style={{ color: "#A8A7A7" }}>
                Email
              </TableCell>
              <TableCell align="center" style={{ color: "#A8A7A7" }}>
                Phone Number
              </TableCell>
              <TableCell align="center" style={{ color: "#A8A7A7" }}>
                Role
              </TableCell>
              <TableCell align="center" style={{ color: "#A8A7A7" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: "500" }}
                >
                  {row.id}
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "500" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "500" }}>
                  {row.email}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "500" }}>
                  {row.phoneNumber}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "500" }}>
                  {row.role}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "500" }}>
                  <p
                    className={
                      row.status === "Active"
                        ? styles.statusActive
                        : styles.statusInactive
                    }
                  >
                    {row.status}{" "}
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

export default TableAccountList;
