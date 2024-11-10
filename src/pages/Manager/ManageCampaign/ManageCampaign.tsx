import styles from "./ManageCampaign.module.scss";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Button, Grid, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ViewModal from "src/components/modal/discountCampaign/View.modal";
import DeleteModal from "src/components/modal/discountCampaign/Delete.modal";
import AddModal from "src/components/modal/discountCampaign/Add.modal";
import UpdateModal from "src/components/modal/discountCampaign/Update.modal";

interface Row {
  id: number;
  name: string;
  description: string;
  discountPercentage: number;
  isActive: boolean;
  collections: ICollection[];
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows: Row[] = [
  {
    id: 1,
    name: "Anniversary Sale",
    description:
      "Mark our store’s anniversary with special savings on all items.",
    discountPercentage: 5,
    isActive: true,
    collections: [
      {
        id: 1,
        name: "Eternal Bond",
        description: "",
      },

      {
        id: 2,
        name: "Timeless Elegance",
        description: "",
      },
    ],
  },
  {
    id: 2,
    name: "Summer Sparkle Event",
    description: "Get your perfect summer jewelry at discounted prices.",
    discountPercentage: 5,
    isActive: true,
    collections: [],
  },
  {
    id: 3,
    name: "Black Friday Extravaganza",
    description:
      "Don’t miss out on our biggest sale of the year during Black Friday.",
    discountPercentage: 10,
    isActive: true,
    collections: [],
  },
  {
    id: 4,
    name: "New Year Celebration",
    description:
      "Ring in the new year with special offers on select collections.",
    discountPercentage: 10,
    isActive: false,
    collections: [],
  },
];

const initSelected = {
  id: 0,
  name: "",
  description: "",
  discountPercentage: 0,
  isActive: true,
  collections: [],
};

function ManageCampaign() {
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
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "discountPercentage",
        headerName: "Discount Percentage",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
      },
      {
        field: "isActive",
        headerName: "Status",
        width: 200,
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
        width: 250,
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

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Discount Campaign</div>

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

export default ManageCampaign;
