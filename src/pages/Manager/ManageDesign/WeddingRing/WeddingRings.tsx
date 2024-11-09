import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Box, Button, Grid, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import UpdateModal from "src/components/modal/weddingRing/Update.modal";
import AddModal from "src/components/modal/weddingRing/Add.modal";

interface Row {
  id: number;
  name: string;
  description: string;
  previewImage: {
    url: string;
  };
  designs: IDesign[];
  isActive: boolean;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    name: "Unity",
    description:
      "'Unity' represents the harmonious balance between two souls, perfectly complementing each other. Their intricate design embodies the strength and unity found in lasting partnerships, making them the ideal symbol for a love that stands the test of time.",
    previewImage: {
      url: "  https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-couple-unity_1729022054942.jpg",
    },
    designs: [],
    isActive: true,
  },
  {
    id: 2,
    name: "Luminous",
    description:
      "'Luminous' captures the dazzling glow of love with its sparkling details and timeless elegance. This design couple is for those who seek to celebrate the light and brilliance that love brings into their lives, reflecting the clarity and beauty of a deep connection.",
    previewImage: {
      url: "  https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-couple-unity_1729022054942.jpg",
    },
    designs: [],
    isActive: true,
  },
  {
    id: 3,
    name: "Tranquility",
    description:
      "'Tranquility' reflects the peaceful bond between two partners who bring each other comfort. Simple yet elegant, these rings are designed for couples who value serenity and stability, creating a calming presence in each other's lives.",
    previewImage: {
      url: "  https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-couple-unity_1729022054942.jpg",
    },
    designs: [],
    isActive: true,
  },
];

const initSelected = {
  id: 0,
  name: "",
  description: "",
  previewImage: {
    url: "",
  },
  designs: [],
  isActive: true,
};

function WeddingRings() {
  const [openAdd, setOpenAdd] = useState(false);
  // const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const onChangeStatus = (id: number) => {
    console.log(id);
  };

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "previewImage",
        headerName: "Preview Image",
        width: 200,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => (
          <img
            src={row.previewImage.url}
            alt=""
            style={{ height: "5rem", margin: "1rem 0" }}
          />
        ),
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
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            sx={{ py: 2 }}
            icon={<VisibilityIcon color="action" />}
            label="Detail"
            onClick={() => {
              //   setOpenDetail(true);
              //   setSelected(row);
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

  useEffect(() => {
    const root = document.documentElement;
    if (root) {
      if (openAdd) {
        root.style.overflowY = "hidden";
      } else root.style.overflowY = "scroll";
    }

    return () => {};
  }, [openAdd]);

  return (
    <Box sx={{ py: 3 }}>
      <Grid container justifyContent={"flex-end"} alignItems={"center"}>
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
      {/* <ViewModal open={openDetail} setOpen={setOpenDetail} {...selected} /> */}
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        {...selected}
        resetSelected={resetSelected}
      />
    </Box>
  );
}

export default WeddingRings;
