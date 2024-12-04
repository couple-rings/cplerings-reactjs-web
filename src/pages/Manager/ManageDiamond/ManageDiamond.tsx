import styles from "./ManageDiamond.module.scss";
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
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Button, Grid, Link } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import UpdateModal from "src/components/modal/diamond/Update.modal";
import AddModal from "src/components/modal/diamond/Add.modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteModal from "src/components/modal/diamond/Delete.modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { pageSize } from "src/utils/constants";
import { useAppSelector } from "src/utils/hooks";
import { fetchDiamonds } from "src/utils/querykey";
import { getDiamonds } from "src/services/diamond.service";

interface Row extends IDiamond {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains", "equals" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

const initSelected: IDiamond = {
  id: 0,
  giaReportNumber: "",
  giaDocument: {
    id: 0,
    url: "",
  },
  branch: {
    id: 0,
    address: "",
    phone: "",
    storeName: "",
    coverImage: {
      id: 0,
      url: "",
    },
  },
  diamondSpecification: {
    id: 0,
    clarity: "",
    color: "",
    name: "",
    price: 0,
    shape: "",
    weight: 0,
    createdAt: "",
  },
  createdAt: "",
};

function ManageDiamond() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(initSelected);

  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IDiamondFilter | null>(null);

  const queryClient = useQueryClient();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchDiamonds, filterObj],

    queryFn: () => {
      if (filterObj) return getDiamonds(filterObj);
    },
    enabled: !!filterObj,
  });

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "giaReportNumber",
        headerName: "GIA Report No",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "shape",
        headerName: "Shape",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => <div>{row.diamondSpecification.shape}</div>,
      },
      {
        field: "weight",
        headerName: "Carat Weight",
        width: 120,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => <div>{row.diamondSpecification.weight}</div>,
      },
      {
        field: "color",
        headerName: "Color",
        width: 120,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => <div>{row.diamondSpecification.color}</div>,
      },
      {
        field: "clarity",
        headerName: "Clarity",
        width: 120,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => <div>{row.diamondSpecification.clarity}</div>,
      },
      {
        field: "giaDocument",
        headerName: "GIA Document",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => (
          <Link
            href={row.giaDocument.url}
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
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<DeleteRoundedIcon color="action" />}
            label="Delete"
            onClick={() => {
              setOpenDelete(true);
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

  const handleChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: model.page,
      });
  };

  const handleFilter = (model: GridFilterModel) => {
    if (model.items.length > 0) {
      const field = model.items[0].field;
      const value = model.items[0].value;

      if (filterObj)
        setFilterObj({
          ...filterObj,
          [`${field}`]: value,
        });
    }
  };

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchDiamonds, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  useEffect(() => {
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);
    }
  }, [response]);

  useEffect(() => {
    if (branchId !== 0) {
      setFilterObj({
        page: 0,
        pageSize,
        branchId,
      });
    }
  }, [branchId]);

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Diamonds</div>

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

      <AddModal
        open={openAdd}
        setOpen={setOpenAdd}
        filterObj={filterObj as IDiamondFilter}
      />

      {filterObj && (
        <UpdateModal
          open={openUpdate}
          setOpen={setOpenUpdate}
          selected={selected}
          filterObj={filterObj}
          resetSelected={resetSelected}
        />
      )}
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
    </div>
  );
}

export default ManageDiamond;
