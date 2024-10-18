import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import styles from "./CustomRequest.module.scss";
import { Button } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { CustomRequestStatus } from "src/utils/enums";

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
    status: "WAITING",
  },
  {
    id: 2,
    username: "Nguyễn Văn B",
    createdAt: "01/01/2000",
    status: "ON GOING",
  },
  {
    id: 3,
    username: "Nguyễn Văn C",
    createdAt: "01/01/2000",
    status: "CANCELED",
  },
  {
    id: 4,
    username: "Nguyễn Văn D",
    createdAt: "01/01/2000",
    status: "COMPLETED",
  },
];

function CustomRequest() {
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
        field: "status",
        headerName: "Trạng Thái",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          let classname = "";

          if (row.status === CustomRequestStatus.Completed)
            classname = styles.completed;
          if (row.status === CustomRequestStatus.Canceled)
            classname = styles.canceled;
          if (
            row.status === CustomRequestStatus.OnGoing ||
            row.status === CustomRequestStatus.Waiting
          )
            classname = styles.ongoing;

          return <div className={classname}>{row.status.toLowerCase()}</div>;
        },
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Button
            variant="contained"
            sx={{ ...primaryBtn, py: 1, m: 2, borderRadius: 5 }}
            onClick={() => console.log(row)}
          >
            Chi Tiết
          </Button>
        ),
      },
    ],
    []
  );

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Yêu Cầu Thiết Kế</div>

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

export default CustomRequest;
