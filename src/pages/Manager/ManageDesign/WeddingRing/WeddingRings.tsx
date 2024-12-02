import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import AddModal from "src/components/modal/weddingRing/Add.modal";
import UpdateCoupleModal from "src/components/modal/weddingRing/UpdateCouple.modal";
import UpdateDesignModal from "src/components/modal/weddingRing/UpdateDesign.modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoupleDesigns } from "src/services/design.service";
import { pageSize } from "src/utils/constants";
import { fetchCoupleDesigns } from "src/utils/querykey";
import moment from "moment";
import { Status } from "src/utils/enums";

interface Row extends ICoupleDesign {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initSelected = {
  id: 0,
  name: "",
  description: "",
  previewImage: {
    url: "",
  },
  designs: [],
  createdAt: "",
  state: Status.Active,
};

const initFilter = {
  page: 0,
  pageSize: pageSize,
};

const initMetaData = {
  ...initFilter,
  totalPages: 0,
  count: 0,
};

function WeddingRings() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdateDesign, setOpenUpdateDesign] = useState(false);
  const [openUpdateCouple, setOpenUpdateCouple] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICoupleDesignFilter>(initFilter);

  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCoupleDesigns, filterObj],

    queryFn: () => {
      return getCoupleDesigns(filterObj);
    },
  });

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
        field: "state",
        headerName: "Status",
        width: 200,
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
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            sx={{ py: 2 }}
            label="Update Design Info"
            onClick={() => {
              setOpenUpdateDesign(true);
              setSelected(row);
            }}
            showInMenu
          />,
          <GridActionsCellItem
            label="Update Couple Info"
            onClick={() => {
              setOpenUpdateCouple(true);
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

  const handleChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    setFilterObj({
      ...filterObj,
      page: model.page,
    });
  };

  // hide root scrollbar when open fullscreen modal
  useEffect(() => {
    const root = document.documentElement;
    if (root) {
      if (openAdd) {
        root.style.overflowY = "hidden";
      } else root.style.overflowY = "scroll";
    }

    return () => {};
  }, [openAdd]);

  useEffect(() => {
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);
    }
  }, [response]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchCoupleDesigns, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

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
        loading={isLoading}
        getRowHeight={() => "auto"}
        rows={response?.data?.items ? response.data.items : []}
        columns={columns}
        onFilterModelChange={handleFilter}
        pageSizeOptions={[pageSize]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        paginationMode="server"
        paginationModel={{
          page: filterObj.page,
          pageSize: filterObj.pageSize,
        }}
        onPaginationModelChange={handleChangePage}
        rowCount={metaData.count}
      />

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <UpdateDesignModal
        open={openUpdateDesign}
        setOpen={setOpenUpdateDesign}
        {...selected}
        resetSelected={resetSelected}
      />
      <UpdateCoupleModal
        open={openUpdateCouple}
        setOpen={setOpenUpdateCouple}
        {...selected}
        resetSelected={resetSelected}
      />
    </Box>
  );
}

export default WeddingRings;
