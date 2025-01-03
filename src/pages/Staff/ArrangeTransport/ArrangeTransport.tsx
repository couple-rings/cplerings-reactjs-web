import {
  DataGrid,
  getGridStringOperators,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridFilterModel,
  GridPaginationModel,
  GridRowEditStopParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridSortModel,
} from "@mui/x-data-grid";
import styles from "./ArrangeTransport.module.scss";
import { pageSize } from "src/utils/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTransportOrders,
  postAssignTransportOrder,
} from "src/services/transportOrder.service";
import { fetchTransporters, fetchTransportOrders } from "src/utils/querykey";
import {
  Box,
  Button,
  Chip,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Select,
  SxProps,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { useAppSelector } from "src/utils/hooks";
import { getTransporters } from "src/services/account.service";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { toast } from "react-toastify";
import ViewModal from "src/components/modal/transportOrder/Detail.modal";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import {
  currencyFormatter,
  formatTransportOrderStatus,
} from "src/utils/functions";
import { TransportOrderStatus } from "src/utils/enums";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
  mb: 6,
};

interface Row extends ITransportOrder {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function ArrangeTransport() {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ITransportOrder | null>(
    null
  );

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ITransportOrderFilter | null>(
    null
  );
  const [transporterFilterObj, setTransporterFilterObj] =
    useState<ITransporterFilter | null>(null);
  const [selected, setSelected] = useState(0);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [orderAnchorEl, setOrderAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "customerPopover" : undefined;

  const openOrderPopover = Boolean(orderAnchorEl);
  const orderPopover = openOrderPopover ? "orderPopover" : undefined;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchTransportOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getTransportOrders(filterObj);
    },
    enabled: !!filterObj,
  });

  const { data: transporterResponse, isLoading: transporterLoading } = useQuery(
    {
      queryKey: [fetchTransporters, transporterFilterObj],

      queryFn: () => {
        if (transporterFilterObj) return getTransporters(transporterFilterObj);
      },
      enabled: !!transporterFilterObj,
    }
  );

  const assignMutation = useMutation({
    mutationFn: (data: { orderId: number; transporterId: number }) => {
      return postAssignTransportOrder(data.orderId, data.transporterId);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đơn đã được giao cho nhân viên vận chuyển");
        queryClient.invalidateQueries({
          queryKey: [fetchTransportOrders, filterObj],
        });
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  const handleSaveClick = useCallback(
    (id: GridRowId, row: Row) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

      assignMutation.mutate({ orderId: row.id, transporterId: selected });
    },
    [assignMutation, rowModesModel, selected]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    },
    [rowModesModel]
  );

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
        headerName: "Đơn Vận Chuyển",
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
              {row.customOrder?.customer.username ?? ""}
              {row.standardOrder?.customer.username ?? ""}
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

                    <Grid item>
                      {row.customOrder?.customer.username ?? ""}
                      {row.standardOrder?.customer.username ?? ""}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Email:</Grid>

                    <Grid item>
                      <FormLabel>
                        {row.customOrder?.customer.email ?? ""}
                        {row.standardOrder?.customer.email ?? ""}
                      </FormLabel>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Số điện thoại:</Grid>

                    <Grid item>
                      {row.customOrder?.customer.phone ?? ""}
                      {row.standardOrder?.customer.phone ?? ""}
                    </Grid>
                  </Grid>
                </Grid>
              </Popover>
            </div>
          );
        },
      },
      {
        field: "product",
        headerName: "Hàng Giao",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.customOrder && "Nhẫn cưới"}
              {row.standardOrder && "Trang sức"}
            </div>
          );
        },
      },
      {
        field: "attachOrder",
        headerName: "Đơn Hàng",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.customOrder?.orderNo}
              {row.standardOrder?.orderNo}
              <IconButton onClick={(e) => setOrderAnchorEl(e.currentTarget)}>
                <RemoveRedEyeSharpIcon fontSize="small" />
              </IconButton>
              <Popover
                id={orderPopover}
                open={openOrderPopover}
                anchorEl={orderAnchorEl}
                onClose={() => setOrderAnchorEl(null)}
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
                    <Grid item>Mã đơn:</Grid>

                    <Grid item>
                      {row.customOrder?.orderNo}
                      {row.standardOrder?.orderNo}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Ngày tạo:</Grid>

                    <Grid item>
                      {row.customOrder &&
                        moment(row.customOrder.createdAt).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      {row.standardOrder &&
                        moment(row.standardOrder.createdAt).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Số tiền:</Grid>

                    <Grid item>
                      {row.customOrder &&
                        currencyFormatter(row.customOrder.totalPrice.amount)}
                      {row.standardOrder &&
                        currencyFormatter(row.standardOrder.totalPrice.amount)}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"flex-end"} mt={3}>
                    <Button
                      variant="contained"
                      sx={{ ...primaryBtn, py: 1 }}
                      onClick={() => {
                        if (row.customOrder)
                          navigate(
                            `/staff/custom-order/detail/${row.customOrder.id}`
                          );
                        if (row.standardOrder)
                          navigate(
                            `/staff/standard-order/detail/${row.standardOrder.id}`
                          );
                      }}
                    >
                      Xem Thêm
                    </Button>
                  </Grid>
                </Grid>
              </Popover>
            </div>
          );
        },
      },
      {
        field: "transporter",
        headerName: "Người Giao",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        editable: true,
        type: "singleSelect",
        renderEditCell: ({ row }) => {
          if (!row.transporter) {
            return (
              <Select
                sx={{ mx: 3 }}
                fullWidth
                value={selected}
                onChange={(e) => setSelected(+e.target.value)}
              >
                <MenuItem value={0} disabled>
                  <em>Chọn người giao</em>
                </MenuItem>
                {transporterResponse?.data?.items.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.username} - Đang nhận{" "}
                      {item.numberOfHandleTransportOrder} đơn
                    </MenuItem>
                  );
                })}
              </Select>
            );
          } else return <div>{row.transporter.username}</div>;
        },
        renderCell: ({ row }) => {
          if (row.transporter) return <div>{row.transporter.username}</div>;
          return (
            <TextField
              inputProps={{ readOnly: true, style: { textAlign: "center" } }}
              value={"Chọn người giao"}
            />
          );
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
              label={formatTransportOrderStatus(row.status).text}
              color={formatTransportOrderStatus(row.status).color}
            />
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Cập Nhật",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          const status = row.transportOrderHistories.find(
            (item) => item.status === row.status
          );
          return <div>{moment(status?.createdAt).format("DD/MM/YYYY")}</div>;
        },
      },
      {
        field: "actions",
        headerName: "Thao Tác",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ row, id }) => {
          if (row.transporter)
            return [
              <Button
                variant="contained"
                sx={{ ...primaryBtn, py: 1, m: 2, borderRadius: 5 }}
                onClick={() => {
                  setSelectedOrder(row);
                  setOpen(true);
                }}
              >
                Chi Tiết
              </Button>,
            ];
          else {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<SaveIcon color="primary" />}
                  label="Save"
                  onClick={handleSaveClick(id, row)}
                  sx={{ py: 3 }}
                />,
                <GridActionsCellItem
                  icon={<CancelIcon color="action" />}
                  label="Cancel"
                  onClick={handleCancelClick(id)}
                />,
              ];
            }

            return [
              <GridActionsCellItem
                sx={{ py: 3 }}
                icon={<BorderColorRoundedIcon color="action" />}
                label="Update"
                onClick={handleEditClick(id)}
              />,
            ];
          }
        },
      },
    ],
    [
      anchorEl,
      handleCancelClick,
      handleEditClick,
      handleSaveClick,
      id,
      navigate,
      openOrderPopover,
      openPopover,
      orderAnchorEl,
      orderPopover,
      rowModesModel,
      selected,
      transporterResponse?.data?.items,
    ]
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params: GridRowEditStopParams<Row>,
    event
  ) => {
    const { id, row } = params;
    const reasons = [
      GridRowEditStopReasons.rowFocusOut,
      GridRowEditStopReasons.escapeKeyDown,
    ];

    if (params.reason && reasons.includes(params.reason)) {
      event.defaultMuiPrevented = true;
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }

    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      assignMutation.mutateAsync({ orderId: row.id, transporterId: selected });
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: model.page,
      });
  };

  const handleChangeStatus = (status: TransportOrderStatus) => {
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
    if (branchId !== 0) {
      setFilterObj({
        page: 0,
        pageSize,
        branchId,
        status: TransportOrderStatus.Pending,
      });

      setTransporterFilterObj({
        page: 0,
        pageSize: 100,
        branchId,
      });
    }
  }, [branchId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sắp Xếp Vận Chuyển</div>

      {filterObj && (
        <Box sx={boxStyle}>
          <Tabs
            classes={{
              indicator: "myIndicator",
            }}
            value={filterObj?.status}
            onChange={(e, value: TransportOrderStatus) =>
              handleChangeStatus(value)
            }
          >
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Chờ Giao"
              value={TransportOrderStatus.Pending}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Chuẩn Bị Giao"
              value={TransportOrderStatus.Waiting}
            />

            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Bắt Đầu Giao"
              value={TransportOrderStatus.OnGoing}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đang Giao"
              value={TransportOrderStatus.Delivering}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Chờ Giao Lại"
              value={TransportOrderStatus.Redelivering}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Hoàn Thành"
              value={TransportOrderStatus.Completed}
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Thất Bại"
              value={TransportOrderStatus.Rejected}
            />
          </Tabs>
        </Box>
      )}

      <DataGrid
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1f auto",
        }}
        editMode="row"
        loading={isLoading || transporterLoading}
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
        onRowEditStop={handleRowEditStop}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
      />

      {selectedOrder && filterObj && (
        <ViewModal
          open={open}
          setOpen={setOpen}
          order={selectedOrder}
          filterObj={filterObj}
        />
      )}
    </div>
  );
}

export default ArrangeTransport;
