import { Button, Divider } from "@mui/material";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomOrders } from "src/services/customOrder.service";
import { fetchCustomOrders } from "src/utils/querykey";
import { useAppSelector } from "src/utils/hooks";
import moment from "moment";

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

  const [ownMetaData, setOwnMetaData] = useState<IListMetaData>(initMetaData);
  const [ownFilterObj, setOwnFilterObj] = useState<ICustomOrderFilter | null>(
    null
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { branchId, id: userId } = useAppSelector(
    (state) => state.auth.userInfo
  );

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomOrders(filterObj);
    },

    enabled: !!filterObj,
  });

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
        field: "index",
        headerName: "No",
        width: 110,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (index) =>
          index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
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
          if (row.status === CustomOrderStatus.Waiting)
            classname = styles.waiting;
          if (row.status === CustomOrderStatus.InProgress)
            classname = styles.ongoing;
          if (row.status === CustomOrderStatus.Done) classname = styles.done;
          if (row.status === CustomOrderStatus.Delivering)
            classname = styles.delivering;
          if (row.status === CustomOrderStatus.Completed)
            classname = styles.completed;
          if (row.status === CustomOrderStatus.Canceled)
            classname = styles.canceled;

          return (
            <div className={classname}>{row.status.toLocaleLowerCase()}</div>
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
              if (row.status === CustomOrderStatus.Waiting)
                navigate(`/jeweler/custom-order/detail/${row.id}`);
              if (row.status === CustomOrderStatus.InProgress)
                navigate(`/jeweler/custom-order/${row.id}/crafting-process`);
            }}
          >
            Chi Tiết
          </Button>
        ),
      },
    ],
    [navigate]
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

  const handleOwnChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    if (ownFilterObj)
      setOwnFilterObj({
        ...ownFilterObj,
        page: model.page,
      });
  };

  const handleOwnFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  const handleOwnSort = (model: GridSortModel) => {
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
    if (filterObj)
      queryClient.invalidateQueries({
        queryKey: [fetchCustomOrders, filterObj],
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  useEffect(() => {
    if (branchId !== 0)
      setFilterObj({
        page: 0,
        pageSize,
        branchId,
        status: CustomOrderStatus.Waiting,
      });
  }, [branchId]);

  useEffect(() => {
    if (ownResponse && ownResponse.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = ownResponse.data;
      setOwnMetaData(rest);
    }
  }, [ownResponse]);

  useEffect(() => {
    if (ownFilterObj)
      queryClient.invalidateQueries({
        queryKey: [fetchCustomOrders, ownFilterObj],
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownFilterObj]);

  useEffect(() => {
    setOwnFilterObj({
      page: 0,
      pageSize,
      jewelerId: userId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Đơn Hiện Tại</div>

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

      <Divider sx={{ my: 10 }} />
      <div className={styles.title}>Đơn Của Tôi</div>

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
