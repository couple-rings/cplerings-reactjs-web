import styles from "./Index.module.scss";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Button, Grid, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ViewModal from "src/components/modal/topic/View.modal";
import UpdateModal from "src/components/modal/topic/Update.modal";
import AddModal from "src/components/modal/topic/Add.modal";
import DeleteModal from "src/components/modal/topic/Delete.modal";

interface Row {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    name: "Proposal Ideas",
    description: "Creative and memorable ways to propose to your loved one.",
    isActive: true,
  },
  {
    id: 2,
    name: "Engagement Ring Guide",
    description: "Tips and insights on choosing the perfect engagement ring.",
    isActive: false,
  },
  {
    id: 3,
    name: "Love Stories",
    description: "Heartwarming stories from real couples about their journeys.",
    isActive: false,
  },
  {
    id: 4,
    name: "Diamond Education",
    description:
      "A comprehensive guide on diamond characteristics and how to choose the right one.",
    isActive: true,
  },
  {
    id: 5,
    name: "Wedding Planning Tips",
    description: "Helpful advice for organizing a stress-free wedding.",
    isActive: true,
  },
];

const initSelected = {
  id: 0,
  name: "",
  description: "",
  isActive: true,
};

function ManageTopic() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const onChangeStatus = (id: number) => {
    console.log(id);
  };

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "index",
        headerName: "No",
        width: 200,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (index) =>
          index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
      },
      {
        field: "name",
        headerName: "Name",
        width: 300,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "isActive",
        headerName: "Status",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        renderCell: ({ row }) => (
          <Switch
            defaultChecked={row.isActive}
            onChange={() => onChangeStatus(row.id)}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 300,
        headerAlign: "center",
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            sx={{ py: 2 }}
            icon={<VisibilityIcon color="action" />}
            label="Detail"
            onClick={() => {
              setOpenDetail(true);
              setSelected(row);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteRoundedIcon color="action" />}
            label="Delete"
            onClick={() => {
              setOpenDelete(true);
              setSelected(row);
            }}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<BorderColorSharpIcon color="action" />}
            label="Update"
            onClick={() => {
              setOpenUpdate(true);
              setSelected(row);
            }}
            showInMenu
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

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Topic</div>

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
        pageSizeOptions={[100]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
      />

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <ViewModal open={openDetail} setOpen={setOpenDetail} {...selected} />
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

export default ManageTopic;
