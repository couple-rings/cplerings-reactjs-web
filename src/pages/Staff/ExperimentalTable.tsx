import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridRowParams,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMemo } from "react";

interface Row {
  id: number;
  username: string;
  createdAt: string;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows = [
  { id: 1, username: "React", createdAt: "01/01/2000" },
  { id: 2, username: "MUI", createdAt: "01/01/2000" },
  { id: 3, username: "AAA", createdAt: "01/01/2000" },
  { id: 4, username: "BBB", createdAt: "01/01/2000" },
];

function ExperimentalTable() {
  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "username",
        headerName: "Username",
        width: 300,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 300,
        headerAlign: "center",
        align: "center",
        filterable: false,
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: (params: GridRowParams<Row>) => [
          <GridActionsCellItem
            icon={<VisibilityIcon color="info" />}
            label="Detail"
            onClick={() => console.log(params.row.username)}
          />,
          <GridActionsCellItem
            icon={<ClearIcon color="error" />}
            label="Reject Request"
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DoneIcon color="success" />}
            label="Approve Request"
            showInMenu
          />,
        ],
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
    <div style={{ height: "400px" }}>
      <DataGrid
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        onFilterModelChange={handleFilter}
        onSortModelChange={handleSort}
        pageSizeOptions={[100]}
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default ExperimentalTable;
