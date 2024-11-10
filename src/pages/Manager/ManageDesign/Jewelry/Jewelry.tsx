import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { Box, Button, Grid, Link, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { DesignCharacteristic, GoldColor } from "src/utils/enums";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import AddModal from "src/components/modal/jewelry/Add.modal";
import UpdateModal from "src/components/modal/jewelry/Update.modal";

interface Row extends IDesign {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains", "equals" /* add more over time */].includes(value)
);

const rows: Row[] = [
  {
    id: 1,
    name: "Harmonia",
    description:
      "Harmonia is a symbol of balance and grace, designed for brides who embody harmony in their relationship. Its elegant and refined details represent the peace and unity a loving partner brings to their union, making it a timeless choice for brides seeking beauty and poise.",
    characteristic: DesignCharacteristic.Female,
    size: 16,
    sideDiamondsCount: 0,
    metalWeight: 2,
    designCollection: {
      id: 1,
      name: "Eternal Bond",
      description: "",
    },
    blueprint: {
      url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-blueprint-harmonia_1729022431708.pdf",
    },
    designDiamondSpecifications: [
      {
        id: 1,
        diamondSpecification: {
          id: 1,
          name: "Pure Heart",
          weight: 0.05,
          color: "D",
          clarity: "VS2",
          shape: "HEART",
          price: 3600000,
        },
      },
    ],
    designMetalSpecifications: [
      {
        id: 1,
        image: {
          url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-metal-spec-harmonia-1_1729022431708.jpg",
        },
        metalSpecification: {
          id: 1,
          name: "Gold 14K - Yellow",
          color: GoldColor.Yellow,
          pricePerUnit: 860000,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Harmonia",
    description:
      "Harmonia is a symbol of balance and grace, designed for brides who embody harmony in their relationship. Its elegant and refined details represent the peace and unity a loving partner brings to their union, making it a timeless choice for brides seeking beauty and poise.",
    characteristic: DesignCharacteristic.Female,
    size: 16,
    sideDiamondsCount: 0,
    metalWeight: 2,
    designCollection: {
      id: 1,
      name: "Eternal Bond",
      description: "",
    },
    blueprint: {
      url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-blueprint-harmonia_1729022431708.pdf",
    },
    designDiamondSpecifications: [
      {
        id: 2,
        diamondSpecification: {
          id: 1,
          name: "Pure Heart",
          weight: 0.05,
          color: "D",
          clarity: "VS2",
          shape: "HEART",
          price: 3600000,
        },
      },
    ],
    designMetalSpecifications: [
      {
        id: 2,
        image: {
          url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-metal-spec-harmonia-1_1729022431708.jpg",
        },
        metalSpecification: {
          id: 1,
          name: "Gold 14K - Yellow",
          color: GoldColor.Yellow,
          pricePerUnit: 860000,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Harmonia",
    description:
      "Harmonia is a symbol of balance and grace, designed for brides who embody harmony in their relationship. Its elegant and refined details represent the peace and unity a loving partner brings to their union, making it a timeless choice for brides seeking beauty and poise.",
    characteristic: DesignCharacteristic.Female,
    size: 16,
    sideDiamondsCount: 0,
    metalWeight: 2,
    designCollection: {
      id: 1,
      name: "Eternal Bond",
      description: "",
    },
    blueprint: {
      url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-blueprint-harmonia_1729022431708.pdf",
    },
    designDiamondSpecifications: [
      {
        id: 3,
        diamondSpecification: {
          id: 1,
          name: "Pure Heart",
          weight: 0.05,
          color: "D",
          clarity: "VS2",
          shape: "HEART",
          price: 3600000,
        },
      },
    ],
    designMetalSpecifications: [
      {
        id: 3,
        image: {
          url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-metal-spec-harmonia-1_1729022431708.jpg",
        },
        metalSpecification: {
          id: 1,
          name: "Gold 14K - Yellow",
          color: GoldColor.Yellow,
          pricePerUnit: 860000,
        },
      },
    ],
  },
  {
    id: 4,
    name: "Harmonia",
    description:
      "Harmonia is a symbol of balance and grace, designed for brides who embody harmony in their relationship. Its elegant and refined details represent the peace and unity a loving partner brings to their union, making it a timeless choice for brides seeking beauty and poise.",
    characteristic: DesignCharacteristic.Female,
    size: 16,
    sideDiamondsCount: 0,
    metalWeight: 2,
    designCollection: {
      id: 1,
      name: "Eternal Bond",
      description: "",
    },
    blueprint: {
      url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-blueprint-harmonia_1729022431708.pdf",
    },
    designDiamondSpecifications: [
      {
        id: 4,
        diamondSpecification: {
          id: 1,
          name: "Pure Heart",
          weight: 0.05,
          color: "D",
          clarity: "VS2",
          shape: "HEART",
          price: 3600000,
        },
      },
    ],
    designMetalSpecifications: [
      {
        id: 4,
        image: {
          url: "https://cplerings-bucket.s3.ap-southeast-1.amazonaws.com/static/static_design-metal-spec-harmonia-1_1729022431708.jpg",
        },
        metalSpecification: {
          id: 1,
          name: "Gold 14K - Yellow",
          color: GoldColor.Yellow,
          pricePerUnit: 860000,
        },
      },
    ],
  },
];

const initSelected: Row = {
  id: 0,
  metalWeight: 0,
  name: "0",
  description: "0",
  blueprint: {
    url: "",
  },
  characteristic: DesignCharacteristic.Male,
  size: 0,
  sideDiamondsCount: 0,
  designMetalSpecifications: [],
  designDiamondSpecifications: [],
  designCollection: { id: 0, description: "", name: "" },
};

function Jewelry() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const onChangeStatus = (id: number) => {
    console.log(id);
  };

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "designCollection",
        headerName: "Collection",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        valueGetter: (value: ICollection) => {
          return value.name;
        },
      },
      {
        field: "characteristic",
        headerName: "Characteristic",
        width: 200,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterOperators,
      },
      {
        field: "metalWeight",
        headerName: "Metal Weight",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
      },
      {
        field: "blueprint",
        headerName: "Blueprint",
        width: 200,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => (
          <Link
            href={row.blueprint.url}
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
        field: "isActive",
        headerName: "Status",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => (
          <Switch
            defaultChecked={true}
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

  return (
    <Box>
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
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        {...selected}
        resetSelected={resetSelected}
        design={selected}
      />
    </Box>
  );
}

export default Jewelry;
