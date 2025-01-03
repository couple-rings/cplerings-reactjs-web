import { Button } from "@mui/material";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {  MaintenanceOrderStatus } from "src/utils/enums";
import { primaryBtn } from "src/utils/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styles from "./Maintenance.module.scss";

interface Row {
  id: number;
  username: string;
  createdAt: string;
  status: string;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    username: "Nguyễn Văn A",
    createdAt: "01/01/2000",
    jeweler: "Hùng Nguyễn",
    status: "HANDLING",
  },
  {
    id: 2,
    username: "Nguyễn Văn B",
    createdAt: "01/01/2000",
    jeweler: "Hùng Nguyễn",
    status: "DONE",
  },
  {
    id: 3,
    username: "Nguyễn Văn C",
    createdAt: "01/01/2000",
    jeweler: "Hùng Nguyễn",
    status: "DELIVERING",
  },
  {
    id: 4,
    username: "Nguyễn Văn D",
    createdAt: "01/01/2000",
    jeweler: "Hùng Nguyễn",
    status: "COMPLETED",
  },
  {
    id: 5,
    username: "Nguyễn Văn e",
    createdAt: "01/01/2000",
    jeweler: "Hùng Nguyễn",
    status: "PAID",
  },
];

function MaintenanceOrder() {
  const navigate = useNavigate();

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "index",
        headerName: "No",
        width: 110,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (index) =>
          index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
      },
      {
        field: "username",
        headerName: "Khách Hàng",
        width: 300,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "createdAt",
        headerName: "Ngày Tạo",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
      },
      {
        field: "jeweler",
        headerName: "Thợ làm",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
      },
      {
        field: "status",
        headerName: "Trạng Thái",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          let classname = "";
          if (row.status === MaintenanceOrderStatus.Handling)
            classname = styles.ongoing;
          if (row.status === MaintenanceOrderStatus.Paid)
            classname = styles.ongoing;
          if (row.status === MaintenanceOrderStatus.Done)
            classname = styles.done;
          if (row.status === MaintenanceOrderStatus.Delivering)
            classname = styles.delivering;
          if (row.status === MaintenanceOrderStatus.Completed)
            classname = styles.completed;
          return (
            <div className={classname}> {row.status.toLocaleLowerCase()}</div>
          );
        },
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: () => (
          <Button
            variant="contained"
            sx={{ ...primaryBtn, py: 1, m: 2, borderRadius: 5 }}
            onClick={() => navigate(`/staff/maintenance-create-form`)}
          >
            Chi Tiết
          </Button>
        ),
      },
    ],
    [navigate]
  );

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Đơn Bảo Trì và Bảo Dưỡng
        <Button className={styles.buttonCreate} onClick={() => navigate("/staff/maintenance-create-form")}>
          <AddCircleOutlineIcon /> <div>Tạo Đơn</div>
        </Button>
      </div>

      <DataGrid
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        onFilterModelChange={handleFilter}
        onSortModelChange={handleSort}
        pageSizeOptions={[100]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
}

export default MaintenanceOrder;
