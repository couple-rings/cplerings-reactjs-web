import styles from "./ManageJewelryCategory.module.scss";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import ViewModal from "src/components/modal/jewelryCategory/View.modal";
import UpdateModal from "src/components/modal/jewelryCategory/Update.modal";
import { Button, Grid, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import AddModal from "src/components/modal/jewelryCategory/Add.modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteModal from "src/components/modal/jewelryCategory/Delete.modal";
import { pageSize } from "src/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getJewelryCategories } from "src/services/jewelryCategory.service";
import { fetchJewelryCategories } from "src/utils/querykey";

interface Row extends IJewelryCategory {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initSelected: Row = {
  id: 0,
  name: "",
  description: "",
};

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function ManageJewelryCategory() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IJewelryCategoriesFilter>({
    page: 0,
    pageSize,
  });

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchJewelryCategories],
    queryFn: () => {
      return getJewelryCategories(filterObj);
    },
  });

  const onChangeStatus = (id: number) => {
    console.log(id);
  };

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "index",
        headerName: "No",
        width: 150,
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
        field: "description",
        headerName: "Description",
        width: 500,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => (
          <div className={styles.description}>{row.description}</div>
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
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);
    }
  }, [response]);

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
        loading={isLoading}
        getRowHeight={() => "auto"}
        rows={response?.data?.items ? response.data.items : []}
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

export default ManageJewelryCategory;
