import { Box, Button, SxProps, Tab, Tabs } from "@mui/material";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomOrderStatus } from "src/utils/enums";
import { primaryBtn } from "src/utils/styles";
import styles from "./CustomOrder.module.scss";
import { pageSize } from "src/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getCustomOrders } from "src/services/customOrder.service";
import { fetchCustomOrders } from "src/utils/querykey";
import { useAppSelector } from "src/utils/hooks";
import moment from "moment";

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
  const [ownMetaData, setOwnMetaData] = useState<IListMetaData>(initMetaData);
  const [ownFilterObj, setOwnFilterObj] = useState<ICustomOrderFilter | null>(
    null
  );

  const navigate = useNavigate();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const { data: ownResponse, isLoading: ownLoading } = useQuery({
    queryKey: [fetchCustomOrders, ownFilterObj],

    queryFn: () => {
      if (ownFilterObj) return getCustomOrders(ownFilterObj);
    },

    enabled: !!ownFilterObj,
  });

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
        width: 300,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        valueGetter: (value: Omit<IUser, "hasSpouse">) => {
          return value.username;
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
        field: "status",
        headerName: "Trạng Thái",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          let classname = "";
          let status = "";

          if (row.status === CustomOrderStatus.Waiting) {
            classname = styles.waiting;
            status = "Chờ Nhận";
          }

          if (row.status === CustomOrderStatus.InProgress) {
            classname = styles.ongoing;
            status = "Đang Làm";
          }

          if (row.status === CustomOrderStatus.Done) {
            classname = styles.completed;
            status = "Hoàn Thành";
          }

          if (row.status === CustomOrderStatus.Delivering) {
            classname = styles.completed;
            status = "Hoàn Thành";
          }

          if (row.status === CustomOrderStatus.Completed) {
            classname = styles.completed;
            status = "Hoàn Thành";
          }

          if (row.status === CustomOrderStatus.Canceled) {
            classname = styles.canceled;
            status = "Đã Hủy";
          }

          return <div className={classname}>{status.toLocaleLowerCase()}</div>;
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
              navigate(`/jeweler/custom-order/detail/${row.id}`);
            }}
          >
            Chi Tiết
          </Button>
        ),
      },
    ],
    [navigate]
  );

  const handleOwnChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    if (ownFilterObj)
      setOwnFilterObj({
        ...ownFilterObj,
        page: model.page,
      });
  };

  const handleFilterStatus = (status: CustomOrderStatus) => {
    if (ownFilterObj)
      setOwnFilterObj({
        ...ownFilterObj,
        page: 0,
        pageSize,
        status,
      });
  };

  const handleOwnFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  const handleOwnSort = (model: GridSortModel) => {
    console.log(model);
  };

  useEffect(() => {
    if (ownResponse && ownResponse.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = ownResponse.data;
      setOwnMetaData(rest);
    }
  }, [ownResponse]);

  useEffect(() => {
    setOwnFilterObj({
      page: 0,
      pageSize,
      jewelerId: userId,
      status: CustomOrderStatus.InProgress,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Đơn Gia Công</div>

      <Box sx={boxStyle}>
        <Tabs
          classes={{
            indicator: "myIndicator",
          }}
          value={ownFilterObj?.status}
          onChange={(e, value: CustomOrderStatus) => handleFilterStatus(value)}
        >
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
            label="Đã Hủy"
            value={CustomOrderStatus.Canceled}
          />
        </Tabs>
      </Box>

      <DataGrid
        loading={ownLoading}
        getRowHeight={() => "auto"}
        rows={ownResponse?.data?.items ? ownResponse.data.items : []}
        columns={columns}
        onFilterModelChange={handleOwnFilter}
        onSortModelChange={handleOwnSort}
        pageSizeOptions={[pageSize]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        paginationMode="server"
        paginationModel={{
          page: ownFilterObj?.page ? ownFilterObj.page : 0,
          pageSize: ownFilterObj?.pageSize ? ownFilterObj.pageSize : pageSize,
        }}
        onPaginationModelChange={handleOwnChangePage}
        rowCount={ownMetaData.count}
      />
    </div>
  );
}

export default CustomOrder;
