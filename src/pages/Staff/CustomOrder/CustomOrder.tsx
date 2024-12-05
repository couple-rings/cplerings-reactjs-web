import { useEffect, useMemo, useState } from "react";
import styles from "./CustomOrder.module.scss";
import { useAppSelector } from "src/utils/hooks";
import { pageSize } from "src/utils/constants";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getCustomOrders } from "src/services/customOrder.service";
import { fetchCustomOrders } from "src/utils/querykey";
import moment from "moment";
import { CustomOrderStatus } from "src/utils/enums";
import {
  Box,
  Button,
  Chip,
  FormLabel,
  Grid,
  IconButton,
  Link,
  Popover,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import { useNavigate } from "react-router-dom";
import { formatCustomOrderStatus } from "src/utils/functions";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
  mb: 6,
};

interface Row extends ICustomOrder {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function CustomOrder() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICustomOrderFilter | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomOrders(filterObj);
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
        field: "jeweler",
        headerName: "Thợ Làm",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          if (row.jeweler)
            return (
              <div>
                {row.jeweler.username}{" "}
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

                      <Grid item>{row.jeweler.username}</Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid item>Email:</Grid>

                      <Grid item>
                        <FormLabel>{row.jeweler.email}</FormLabel>
                      </Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                      <Grid item>Số điện thoại:</Grid>

                      <Grid item>
                        {row.jeweler.phone ? row.jeweler.phone : "--"}
                      </Grid>
                    </Grid>
                  </Grid>
                </Popover>
              </div>
            );
          else return <div>--</div>;
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
              label={formatCustomOrderStatus(row.status).text}
              color={formatCustomOrderStatus(row.status).color}
            />
          );
        },
      },
      {
        field: "contract",
        headerName: "Hợp Đồng",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => {
          if (row.contract.document)
            return (
              <Link
                href={row.contract.document.url}
                py={3}
                alignItems={"center"}
                display={"flex"}
                gap={1}
                sx={{ textDecoration: "none" }}
              >
                <FileDownloadSharpIcon fontSize="small" /> <span>Tải Về</span>
              </Link>
            );
          else return <div>----</div>;
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
              navigate(`/staff/custom-order/detail/${row.id}`);
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

  const handleFilterStatus = (status: CustomOrderStatus) => {
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
    if (branchId !== 0)
      setFilterObj({
        page: 0,
        pageSize,
        branchId,
        status: CustomOrderStatus.Pending,
      });
  }, [branchId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Đơn Gia Công</div>

      {filterObj && (
        <Box sx={boxStyle}>
          <Tabs
            classes={{
              indicator: "myIndicator",
            }}
            value={filterObj.status}
            onChange={(e, value: CustomOrderStatus) =>
              handleFilterStatus(value)
            }
          >
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Chưa thanh toán"
              value={CustomOrderStatus.Pending}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đang chuẩn bị"
              value={CustomOrderStatus.Waiting}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đang Gia Công"
              value={CustomOrderStatus.InProgress}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Hoàn Tất Gia Công"
              value={CustomOrderStatus.Done}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đang Giao"
              value={CustomOrderStatus.Delivering}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Hoàn Thành"
              value={CustomOrderStatus.Completed}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đã Hủy"
              value={CustomOrderStatus.Canceled}
            />
          </Tabs>
        </Box>
      )}

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
    </div>
  );
}

export default CustomOrder;
