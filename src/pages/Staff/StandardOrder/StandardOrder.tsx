import { pageSize } from "src/utils/constants";
import styles from "./StandardOrder.module.scss";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  FormLabel,
  Grid,
  IconButton,
  Popover,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStandardOrders } from "src/utils/querykey";
import { getStandardOrders } from "src/services/standardOrder.service";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import moment from "moment";
import {
  currencyFormatter,
  formatStandardOrderStatus,
} from "src/utils/functions";
import { primaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import { StandardOrderStatus } from "src/utils/enums";

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
  mb: 6,
};

interface Row extends IStandardOrder {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function StandardOrder() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IStandardOrderFilter | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchStandardOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getStandardOrders(filterObj);
    },

    enabled: !!filterObj,
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
        field: "orderNo",
        headerName: "Mã Đơn",
        width: 150,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterOperators,
      },
      {
        field: "customer",
        headerName: "Khách Hàng",
        width: 250,
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
        headerName: "Ngày Tạo",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          return <div>{moment(row.createdAt).format("DD/MM/YYYY")}</div>;
        },
      },
      {
        field: "totalPrice",
        headerName: "Tổng Tiền",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          return <div>{currencyFormatter(row.totalPrice.amount)}</div>;
        },
      },
      {
        field: "status",
        headerName: "Trạng Thái",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <Chip
              label={formatStandardOrderStatus(row.status).text}
              color={formatStandardOrderStatus(row.status).color}
            />
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
            onClick={() => {
              navigate(`/staff/standard-order/detail/${row.id}`);
            }}
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

  const handleFilterStatus = (status: StandardOrderStatus) => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: 0,
        pageSize,
        status,
      });
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
    setFilterObj({
      page: 0,
      pageSize,
      status: StandardOrderStatus.Pending,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Đơn Bán Trang Sức</div>

      {filterObj && (
        <Box sx={boxStyle}>
          <Tabs
            classes={{
              indicator: "myIndicator",
            }}
            value={filterObj?.status}
            onChange={(e, value: StandardOrderStatus) =>
              handleFilterStatus(value)
            }
          >
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Chưa Thanh Toán"
              value={StandardOrderStatus.Pending}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đã Thanh Toán"
              value={StandardOrderStatus.Paid}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đang Giao"
              value={StandardOrderStatus.Delivering}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đã Hoàn Thành"
              value={StandardOrderStatus.Completed}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đã Hoàn Tiền"
              value={StandardOrderStatus.Refunded}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đã Hủy"
              value={StandardOrderStatus.Canceled}
            />
          </Tabs>
        </Box>
      )}

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
          page: filterObj?.page ? filterObj.page : 0,
          pageSize: filterObj?.pageSize ? filterObj.pageSize : pageSize,
        }}
        onPaginationModelChange={handleChangePage}
        rowCount={metaData.count}
      />
    </div>
  );
}

export default StandardOrder;
