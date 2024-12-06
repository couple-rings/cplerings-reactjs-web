import { Button, Chip, Grid, Link } from "@mui/material";
import styles from "./ManageJewelry.module.scss";
import { primaryBtn } from "src/utils/styles";
import {
  DataGrid,
  getGridStringOperators,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddModal from "src/components/modal/jewelryItem/Add.modal";
import { pageSize } from "src/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "src/utils/hooks";
import { fetchJewelries } from "src/utils/querykey";
import { getJewelries } from "src/services/jewelry.service";
import { formatJewelryStatus } from "src/utils/functions";

interface Row extends IJewelry {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function ManageJewelry() {
  const [openAdd, setOpenAdd] = useState(false);

  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IJewelryFilter | null>(null);

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchJewelries, filterObj],

    queryFn: () => {
      if (filterObj) return getJewelries(filterObj);
    },
    enabled: !!filterObj,
  });

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "productNo",
        headerName: "Product No",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "jewelryCategory",
        headerName: "Category",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => <div>{row.design.jewelryCategory.name}</div>,
      },
      {
        field: "design",
        headerName: "Design",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => <div>{row.design.name}</div>,
      },
      {
        field: "metalSpec",
        headerName: "Material",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => <div>{row.metalSpecification.name}</div>,
      },
      {
        field: "maintenanceDocument",
        headerName: "Warranty Document",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => {
          if (row.maintenanceDocument)
            return (
              <Link
                py={3}
                alignItems={"center"}
                display={"flex"}
                gap={1}
                sx={{ textDecoration: "none" }}
              >
                <FileDownloadSharpIcon fontSize="small" /> <span>Download</span>
              </Link>
            );
          else return <div>N/A</div>;
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => (
          <Chip
            sx={{ my: 3 }}
            label={formatJewelryStatus(row.status).text}
            color={formatJewelryStatus(row.status).color}
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
            icon={<DeleteRoundedIcon color="action" />}
            label="Delete"
            onClick={() => {
              // setOpenDelete(true);
              // setSelected(row);
              console.log(row);
            }}
          />,
          <GridActionsCellItem
            icon={<BorderColorSharpIcon color="action" />}
            label="Update"
            onClick={() => {
              // setOpenUpdate(true);
              // setSelected(row);
              console.log(row);
            }}
          />,
        ],
      },
    ],
    []
  );

  const handleChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    if (filterObj)
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
        <div className={styles.title}>Jewelry</div>

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

      {filterObj && (
        <AddModal open={openAdd} setOpen={setOpenAdd} filterObj={filterObj} />
      )}
    </div>
  );
}

export default ManageJewelry;
