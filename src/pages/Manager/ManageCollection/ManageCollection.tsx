import styles from "./ManageCollection.module.scss";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Button, Grid, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ViewModal from "src/components/modal/collection/View.modal";
import UpdateModal from "src/components/modal/collection/Update.modal";
import AddModal from "src/components/modal/collection/Add.modal";
import DeleteModal from "src/components/modal/collection/Delete.modal";
import { pageSize } from "src/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "src/services/collection.service";
import { fetchCollections } from "src/utils/querykey";

interface Row extends ICollection {}

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
  name: "",
  description: "",
};

function ManageCollection() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICollectionFilter>({
    page: 0,
    pageSize,
  });

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCollections, filterObj],

    queryFn: () => {
      return getCollections(filterObj);
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
        width: 300,
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
        width: 150,
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

export default ManageCollection;
