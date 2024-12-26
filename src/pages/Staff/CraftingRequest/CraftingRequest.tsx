import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import styles from "./CraftingRequest.module.scss";
import { pageSize } from "src/utils/constants";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { CraftingRequestStatus } from "src/utils/enums";
import { Button, FormLabel, Grid, IconButton, Popover } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCraftingRequestGroups } from "src/services/craftingRequest.service";
import { fetchCraftingRequestGroups } from "src/utils/querykey";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import { useAppSelector } from "src/utils/hooks";

interface Row extends ICraftingRequestGroup {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function CraftingRequest() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] =
    useState<ICraftingRequestGroupFilter | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCraftingRequestGroups, filterObj],

    queryFn: () => {
      if (filterObj) return getCraftingRequestGroups(filterObj);
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "index",
        headerName: "No",
        width: 110,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (index) =>
          index.api.getRowIndexRelativeToVisibleRows(index.id) + 1,
      },
      {
        field: "customer",
        headerName: "Khách Hàng",
        width: 300,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.customer.username}{" "}
              <IconButton onClick={handleClick}>
                <RemoveRedEyeSharpIcon fontSize="small" />
              </IconButton>
              <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Grid container width={300} p={3} gap={1}>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Username:</Grid>

                    <Grid item>{row.customer.username}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Email:</Grid>

                    <Grid item>
                      <FormLabel>{row.customer.email}</FormLabel>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Số điện thoại:</Grid>

                    <Grid item>
                      {row.customer.phone ? row.customer.phone : "--"}
                    </Grid>
                  </Grid>
                </Grid>
              </Popover>
            </div>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Gần Đây Nhất",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          const mostRecent = row.craftingRequests.reduce((a, b) =>
            a.createdAt > b.createdAt ? a : b
          );
          return <div>{moment(mostRecent.createdAt).format("DD/MM/YYYY")}</div>;
        },
      },
      {
        field: "status",
        headerName: "Cần Duyệt",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          const needApproval = row.craftingRequests.find(
            (item) =>
              item.craftingRequestStatus === CraftingRequestStatus.Pending
          );

          return (
            <div>
              {needApproval ? (
                <ReportProblemRoundedIcon color="warning" />
              ) : (
                <CheckCircleRoundedIcon color="success" />
              )}
            </div>
          );
        },
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Button
            variant="contained"
            sx={{ ...primaryBtn, py: 1, m: 2, borderRadius: 5 }}
            onClick={() =>
              navigate(`/staff/crafting-request/detail/${row.customer.id}`)
            }
          >
            Chi Tiết
          </Button>
        ),
      },
    ],
    [anchorEl, id, navigate, openPopover]
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
    if (branchId !== 0)
      setFilterObj({
        page: 0,
        pageSize,
        branchId: undefined,
      });
  }, [branchId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Yêu Cầu Gia Công</div>

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
        getRowId={(row) => row.customer.id}
      />
    </div>
  );
}

export default CraftingRequest;
