import { Button, FormLabel, Grid, IconButton, Popover } from "@mui/material";
import styles from "./RefundOrder.module.scss";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { pageSize } from "src/utils/constants";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRefunds } from "src/utils/querykey";
import { getRefunds } from "src/services/refund.service";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import moment from "moment";
import {
  currencyFormatter,
  formatRefundMethodTitle,
} from "src/utils/functions";
import { primaryBtn } from "src/utils/styles";
import ViewModal from "src/components/modal/refund/View.modal";

interface Row extends IRefund {}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function RefundOrder() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IRefundFilter>({
    page: 0,
    pageSize,
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<IRefund | null>(null);
  const [open, setOpen] = useState(false);

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchRefunds, filterObj],

    queryFn: () => {
      if (filterObj) return getRefunds(filterObj);
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
              {row.standardOrder && row.standardOrder.customer.username}
              {row.customOrder && row.customOrder.customer.username}
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

                    <Grid item>
                      {row.standardOrder && row.standardOrder.customer.username}
                      {row.customOrder && row.customOrder.customer.username}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Email:</Grid>

                    <Grid item>
                      <FormLabel>
                        {row.standardOrder && row.standardOrder.customer.email}
                        {row.customOrder && row.customOrder.customer.email}
                      </FormLabel>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Số điện thoại:</Grid>

                    <Grid item>
                      {row.standardOrder && row.standardOrder.customer.phone}
                      {row.customOrder && row.customOrder.customer.phone}
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
          return <div>{formatRefundMethodTitle(row.method)}</div>;
        },
      },
      {
        field: "order",
        headerName: "Loại Hàng",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.standardOrder && "Trang Sức"}
              {row.customOrder && "Nhẫn Cưới"}
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
            onClick={() => {
              setSelected(row);
              setOpen(true);
            }}
          >
            Chi Tiết
          </Button>
        ),
      },
    ],
    [anchorEl, id, openPopover]
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
      <div className={styles.header}>
        <div className={styles.title}>Danh Sách Hoàn Tiền</div>
        <Button
          className={styles.buttonCreate}
          onClick={() => navigate("/staff/refund-create-form")}
        >
          <AddCircleOutlineIcon /> <div>Tạo Đơn</div>
        </Button>
      </div>

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

      {selected && <ViewModal data={selected} open={open} setOpen={setOpen} />}
    </div>
  );
}

export default RefundOrder;
