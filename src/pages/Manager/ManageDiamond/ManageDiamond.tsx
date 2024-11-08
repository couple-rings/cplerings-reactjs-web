import styles from "./ManageDiamond.module.scss";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Button, Grid, Link } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import samplePdf from "src/assets/sampledata/blueprint.pdf";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import UpdateModal from "src/components/modal/diamond/Update.modal";
import AddModal from "src/components/modal/diamond/Add.modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteModal from "src/components/modal/diamond/Delete.modal";

interface Row {
  id: number;
  giaReportNumber: string;
  giaDocument: string;
  diamondSpecId: number;
  weight: number;
  color: string;
  clarity: string;
  shape: string;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains", "equals" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    giaReportNumber: "2326328623",
    giaDocument: samplePdf,
    diamondSpecId: 1,
    weight: 0.05,
    color: "D",
    clarity: "VS2",
    shape: "HEART",
  },
  {
    id: 2,
    giaReportNumber: "2326328624",
    giaDocument: samplePdf,
    diamondSpecId: 2,
    weight: 0.05,
    color: "G",
    clarity: "SI1",
    shape: "OVAL",
  },
  {
    id: 3,
    giaReportNumber: "2326328625",
    giaDocument: samplePdf,
    diamondSpecId: 3,
    weight: 0.15,
    color: "G",
    clarity: "VS2",
    shape: "HEART",
  },
];

const initSelected = {
  id: 0,
  giaReportNumber: "",
  giaDocument: "",
  diamondSpecId: 0,
  weight: 0.15,
  color: "",
  clarity: "",
  shape: "",
};

function ManageDiamond() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(initSelected);

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "giaReportNumber",
        headerName: "GIA Report No",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "shape",
        headerName: "Shape",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "weight",
        headerName: "Carat Weight",
        width: 120,
        headerAlign: "center",
        align: "center",
        filterable: false,
      },
      {
        field: "color",
        headerName: "Color",
        width: 120,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "clarity",
        headerName: "Clarity",
        width: 120,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "giaDocument",
        headerName: "GIA Document",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        renderCell: ({ row }) => (
          <Link
            href={row.giaDocument}
            py={3}
            alignItems={"center"}
            display={"flex"}
            gap={1}
            sx={{ textDecoration: "none" }}
          >
            <FileDownloadSharpIcon fontSize="small" /> <span>Download</span>
          </Link>
        ),
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<DeleteRoundedIcon color="action" />}
            label="Delete"
            onClick={() => {
              setOpenDelete(true);
              setSelected(row);
            }}
          />,
          <GridActionsCellItem
            icon={<BorderColorSharpIcon color="action" />}
            label="Update"
            onClick={() => {
              setOpenUpdate(true);
              setSelected(row);
            }}
          />,
        ],
      },
    ],
    []
  );

  const resetSelected = () => {
    setSelected(initSelected);
  };

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Diamonds</div>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1, mb: 3 }}
          onClick={() => setOpenAdd(true)}
        >
          Add New
        </Button>
      </Grid>

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

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        {...selected}
        resetSelected={resetSelected}
      />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
    </div>
  );
}

export default ManageDiamond;
