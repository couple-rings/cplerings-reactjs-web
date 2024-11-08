import styles from "./ManageCollection.module.scss";
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
import ViewModal from "src/components/modal/collection/View.modal";
import UpdateModal from "src/components/modal/collection/Update.modal";
import AddModal from "src/components/modal/collection/Add.modal";
import DeleteModal from "src/components/modal/collection/Delete.modal";

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
    name: "Eternal Bond",
    description:
      "'Eternal Bond' symbolizes the lasting connection between two souls. With designs that reflect harmony and unity, these rings are crafted to honor the beauty of commitment. Each couple is carefully paired to complement each other, representing the perfect balance of love and partnership, making these rings a timeless choice for couples who value tradition and elegance.",
    isActive: true,
  },

  {
    id: 2,
    name: "Timeless Elegance",
    description:
      "'Timeless Elegance' is inspired by the stars and celestial beauty, offering designs that capture the infinite nature of love. These rings feature graceful, refined details, perfect for couples who want a touch of sophistication. Each design pair is a unique representation of the bond that stands the test of time, bringing both style and meaning to your special day.",
    isActive: false,
  },
  {
    id: 3,
    name: "Infinity Love",
    description:
      "'Infinity Love' celebrates the boundless nature of love. With each design couple symbolizing the everlasting devotion between two partners, these rings are crafted to convey both grace and strength. Perfect for modern couples, the collection combines contemporary aesthetics with timeless sentiments, making it a beautiful testament to love that knows no limits.",
    isActive: false,
  },
];

const initSelected = {
  id: 0,
  name: "",
  description: "",
  isActive: true,
};

function ManageCollection() {
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
        <div className={styles.title}>Collection</div>

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

export default ManageCollection;
