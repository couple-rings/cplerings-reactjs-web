import styles from "./ManageJewelryCategory.module.scss";
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
import ViewModal from "src/components/modal/jewelryCategory/View.modal";
import UpdateModal from "src/components/modal/jewelryCategory/Update.modal";
import { Button, Grid } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import AddModal from "src/components/modal/jewelryCategory/Add.modal";

interface Row {
  id: number;
  name: string;
  description: string;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    name: "Necklace",
    description:
      "Necklaces are versatile jewelry pieces worn around the neck, ranging from simple chains to statement designs with gemstones or pendants. Crafted in materials like gold, silver, and beads, they suit various styles and occasions. From elegant chokers to long chains, necklaces can add sophistication, sentiment, or bold flair, making them essential in any jewelry collection.",
  },
  {
    id: 2,
    name: "Bracelet",
    description:
      "Bracelets are versatile jewelry worn around the wrist, available in styles from simple bands to intricate, embellished pieces. Made from materials like gold, silver, leather, or beads, they suit both casual and formal wear. Whether as delicate chains, bangles, or charm bracelets, they add elegance, personality, or a touch of flair, making them a staple in any jewelry collection.",
  },
];

const initSelected = {
  id: 0,
  name: "",
  description: "",
};

function ManageJewelryCategory() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

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
        <div className={styles.title}>Jewelry Category</div>

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
    </div>
  );
}

export default ManageJewelryCategory;
