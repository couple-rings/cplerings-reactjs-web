import { Button, FormLabel, Grid, IconButton, Popover } from "@mui/material";
import styles from "./ResellOrders.module.scss";
import { primaryBtn } from "src/utils/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { pageSize } from "src/utils/constants";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import moment from "moment";
import {
  currencyFormatter,
  formatRefundMethodTitle,
} from "src/utils/functions";
import { useQuery } from "@tanstack/react-query";
import { fetchResellOrders } from "src/utils/querykey";
import { getResellOrders } from "src/services/resell.service";

interface Row extends IResellOrder {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function ResellOrders() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IResellFilter>({
    page: 0,
    pageSize,
  });

  const [customerAnchorEl, setCustomerAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [staffAnchorEl, setStaffAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );

  const customerOpenPopover = Boolean(customerAnchorEl);
  const customerPopoverId = customerOpenPopover
    ? "customer-popover"
    : undefined;

  const staffOpenPopover = Boolean(staffAnchorEl);
  const staffPopoverId = staffOpenPopover ? "customer-popover" : undefined;

  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchResellOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getResellOrders(filterObj);
    },
  });

  const handleClickCustomer = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCustomerAnchorEl(event.currentTarget);
  };

  const handleCloseCustomer = () => {
    setCustomerAnchorEl(null);
  };

  const handleClickStaff = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStaffAnchorEl(event.currentTarget);
  };

  const handleCloseStaff = () => {
    setStaffAnchorEl(null);
  };

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "customer",
        headerName: "Khách Hàng",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.customer.username}
              <IconButton onClick={handleClickCustomer}>
                <RemoveRedEyeSharpIcon fontSize="small" />
              </IconButton>{" "}
              <Popover
                id={customerPopoverId}
                open={customerOpenPopover}
                anchorEl={customerAnchorEl}
                onClose={handleCloseCustomer}
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
                    <Grid item>Tên tài khoản:</Grid>

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
        headerName: "Ngày Tạo",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          return (
            <div>{moment(row.proofImage.createdAt).format("DD/MM/YYYY")}</div>
          );
        },
      },
      {
        field: "amount",
        headerName: "Số Tiền",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          return <div>{currencyFormatter(row.amount.amount)}</div>;
        },
      },
      {
        field: "method",
        headerName: "Phương Thức",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return <div>{formatRefundMethodTitle(row.paymentMethod)}</div>;
        },
      },
      {
        field: "staff",
        headerName: "Nhân Viên Tạo",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.staff.username}
              <IconButton onClick={handleClickStaff}>
                <RemoveRedEyeSharpIcon fontSize="small" />
              </IconButton>{" "}
              <Popover
                id={staffPopoverId}
                open={staffOpenPopover}
                anchorEl={staffAnchorEl}
                onClose={handleCloseStaff}
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
                    <Grid item>Tên tài khoản:</Grid>

                    <Grid item>{row.staff.username}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Email:</Grid>

                    <Grid item>
                      <FormLabel>{row.staff.email}</FormLabel>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Số điện thoại:</Grid>

                    <Grid item>{row.staff.phone ? row.staff.phone : "--"}</Grid>
                  </Grid>
                </Grid>
              </Popover>
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
            onClick={() => navigate(`/staff/resell-order/detail/${row.id}`)}
          >
            Chi Tiết
          </Button>
        ),
      },
    ],
    [
      customerAnchorEl,
      customerOpenPopover,
      customerPopoverId,
      staffAnchorEl,
      staffOpenPopover,
      staffPopoverId,
      navigate,
    ]
  );

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
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
      >
        <div className={styles.title}>Đơn Mua Nhẫn</div>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1 }}
          onClick={() => navigate("/staff/resell-order/create")}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Tạo Mới
        </Button>
      </Grid>

      <DataGrid
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1f auto",
        }}
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
          page: filterObj.page,
          pageSize: filterObj.pageSize,
        }}
        onPaginationModelChange={handleChangePage}
        rowCount={metaData.count}
      />
    </div>
  );
}

export default ResellOrders;
