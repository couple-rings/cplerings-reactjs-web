import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Link, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { DesignCharacteristic, Status } from "src/utils/enums";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import AddModal from "src/components/modal/jewelry/Add.modal";
import UpdateModal from "src/components/modal/jewelry/Update.modal";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "src/services/collection.service";
import {
  fetchCollections,
  fetchDesigns,
  fetchJewelryCategories,
  fetchMetalSpecs,
} from "src/utils/querykey";
import { getMetalSpecs } from "src/services/metalSpec.service";
import { pageSize } from "src/utils/constants";
import { getDesigns } from "src/services/design.service";
import moment from "moment";
import { getJewelryCategories } from "src/services/jewelryCategory.service";

interface Row extends IDesign {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

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
  createdAt: "",
  state: Status.Active,
  jewelryCategory: {
    id: 0,
    name: "",
    description: "",
  },
};

const generalFilter = {
  page: 0,
  pageSize: 100,
};

function Jewelry() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IDesignFilter>({
    page: 0,
    pageSize,
  });

  const { data: designResponse, isLoading } = useQuery({
    queryKey: [fetchDesigns, filterObj],

    queryFn: () => {
      return getDesigns(filterObj);
    },
  });

  const { data: response } = useQuery({
    queryKey: [fetchCollections, generalFilter],

    queryFn: () => {
      return getCollections(generalFilter);
    },
  });

  const { data: metalSpecResponse } = useQuery({
    queryKey: [fetchMetalSpecs, generalFilter],

    queryFn: () => {
      return getMetalSpecs(generalFilter);
    },
  });

  const { data: categoryResponse } = useQuery({
    queryKey: [fetchJewelryCategories, generalFilter],

    queryFn: () => {
      return getJewelryCategories(generalFilter);
    },
  });

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
        field: "jewelryCategory",
        headerName: "Category",
        width: 170,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => <div>{row.jewelryCategory.name}</div>,
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
        width: 150,
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
        field: "state",
        headerName: "Status",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => (
          <Switch
            defaultChecked={row.state === Status.Active ? true : false}
            onChange={() => onChangeStatus(row.id)}
          />
        ),
      },
      {
        field: "createdAt",
        headerName: "Ngày Tạo",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          return <div>{moment(row.createdAt).format("DD/MM/YYYY")}</div>;
        },
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

  const handleChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    setFilterObj({
      ...filterObj,
      page: model.page,
    });
  };

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  useEffect(() => {
    if (designResponse && designResponse.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = designResponse.data;
      setMetaData(rest);
    }
  }, [designResponse]);

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
        loading={isLoading}
        getRowHeight={() => "auto"}
        rows={designResponse?.data?.items ? designResponse.data.items : []}
        columns={columns}
        onFilterModelChange={handleFilter}
        onSortModelChange={handleSort}
        pageSizeOptions={[pageSize]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        paginationMode="server"
        paginationModel={{
          page: filterObj?.page ? filterObj.page : 0,
          pageSize: filterObj?.pageSize ? filterObj.pageSize : pageSize,
        }}
        onPaginationModelChange={handleChangePage}
        rowCount={metaData.count}
      />

      {response?.data && metalSpecResponse?.data && categoryResponse?.data && (
        <AddModal
          open={openAdd}
          setOpen={setOpenAdd}
          collections={response.data.items}
          metalSpecs={metalSpecResponse.data.items}
          categories={categoryResponse.data.items}
          filterObj={filterObj}
        />
      )}

      {response?.data && metalSpecResponse?.data && (
        <UpdateModal
          open={openUpdate}
          setOpen={setOpenUpdate}
          {...selected}
          resetSelected={resetSelected}
          design={selected}
          collections={response.data.items}
          metalSpecs={metalSpecResponse.data.items}
        />
      )}
    </Box>
  );
}

export default Jewelry;
