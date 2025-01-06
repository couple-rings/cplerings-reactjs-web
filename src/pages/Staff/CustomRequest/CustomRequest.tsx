import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import styles from "./CustomRequest.module.scss";
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
import { primaryBtn } from "src/utils/styles";
import { CustomRequestStatus, StaffPosition } from "src/utils/enums";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomRequests } from "src/utils/querykey";
import { getCustomRequests } from "src/services/customRequest.service";
import { pageSize } from "src/utils/constants";
import moment from "moment";
import {
  currencyFormatter,
  formatCustomRequestStatus,
} from "src/utils/functions";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import { useAppSelector } from "src/utils/hooks";

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
  mb: 6,
};

interface Row extends ICustomRequest {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function CustomRequest() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICustomRequestFilter>({
    page: 0,
    pageSize,
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const { staffPosition, id: staffId } = useAppSelector(
    (state) => state.auth.userInfo
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomRequests(filterObj);
    },
  });

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
              {row.customer.username}{" "}
              <IconButton onClick={handleClick}>
                <RemoveRedEyeSharpIcon fontSize="small" />
              </IconButton>{" "}
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

                    <Grid item>{row.customer.phone ?? "--"}</Grid>
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
          return <div>{moment(row.createdAt).format("DD/MM/YYYY")}</div>;
        },
      },
      {
        field: "designFee",
        headerName: "Tiền Thanh Toán",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          return <div>{currencyFormatter(row.designFee.amount)}</div>;
        },
      },
      {
        field: "customRequestHistories",
        headerName: "Ngày Cập Nhật",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          const current = row.customRequestHistories.find(
            (item) => item.status === row.status
          );

          return <div>{moment(current?.createdAt).format("DD/MM/YYYY")}</div>;
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
              label={formatCustomRequestStatus(row.status).text}
              color={formatCustomRequestStatus(row.status).color}
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
            onClick={() => navigate(`/staff/custom-request/detail/${row.id}`)}
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
    setFilterObj({
      ...filterObj,
      page: model.page,
    });
  };

  const handleChangeStatus = (status: CustomRequestStatus) => {
    setFilterObj({
      ...filterObj,
      page: 0,
      pageSize,
      status,
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
    if (staffPosition === StaffPosition.Sales) {
      setFilterObj((current) => ({
        ...current,
        status: CustomRequestStatus.Waiting,
      }));
    }

    if (staffPosition === StaffPosition.Designer) {
      setFilterObj((current) => ({
        ...current,
        status: CustomRequestStatus.OnGoing,
        staffId,
      }));
    }
  }, [staffId, staffPosition]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Yêu Cầu Thiết Kế</div>

      {filterObj.status && (
        <Box sx={boxStyle}>
          <Tabs
            classes={{
              indicator: "myIndicator",
            }}
            value={filterObj?.status}
            onChange={(e, value: CustomRequestStatus) =>
              handleChangeStatus(value)
            }
          >
            {staffPosition === StaffPosition.Sales && (
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Đang chờ duyệt"
                value={CustomRequestStatus.Waiting}
              />
            )}
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đang thiết kế"
              value={CustomRequestStatus.OnGoing}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đã hoàn thành"
              value={CustomRequestStatus.Completed}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đã hủy"
              value={CustomRequestStatus.Canceled}
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
          page: filterObj.page,
          pageSize: filterObj.pageSize,
        }}
        onPaginationModelChange={handleChangePage}
        rowCount={metaData.count}
      />
    </div>
  );
}

export default CustomRequest;
