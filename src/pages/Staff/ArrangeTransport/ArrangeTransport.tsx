import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import styles from "./ArrangeTransport.module.scss";
import { pageSize } from "src/utils/constants";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransportOrders } from "src/services/transportOrder.service";
import { fetchTransporters, fetchTransportOrders } from "src/utils/querykey";
import { TransportOrderStatus } from "src/utils/enums";
import { Button } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { useAppSelector } from "src/utils/hooks";
import { getTransporters } from "src/services/account.service";

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
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ITransportOrderFilter | null>(
    null
  );
  const [transporterFilterObj, setTransporterFilterObj] =
    useState<ITransporterFilter | null>(null);

  const queryClient = useQueryClient();

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

  console.log(transporterResponse);

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
        field: "customOrder",
        headerName: "Khách Hàng",
        width: 300,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        valueGetter: (value: ICustomOrder) => {
          return value.customer.username;
        },
      },
      {
        field: "transporter",
        headerName: "Người Giao",
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
        field: "status",
        headerName: "Trạng Thái",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          let classname = "";

          if (row.status === TransportOrderStatus.Pending) {
            classname = styles.pending;
          }

          if (row.status === TransportOrderStatus.Completed) {
            classname = styles.completed;
          }

          if (row.status === TransportOrderStatus.Rejected) {
            classname = styles.rejected;
          }

          if (row.status === TransportOrderStatus.OnGoing) {
            classname = styles.ongoing;
          }

          if (row.status === TransportOrderStatus.Waiting) {
            classname = styles.waiting;
          }

          if (row.status === TransportOrderStatus.Delivering) {
            classname = styles.delivering;
          }

          return <div className={classname}>{row.status}</div>;
        },
      },
      {
        field: "actions",
        headerName: "Thao Tác",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Button
            variant="contained"
            sx={{ ...primaryBtn, py: 1, m: 2, borderRadius: 5 }}
            onClick={() => console.log(row)}
          >
            Chi Tiết
          </Button>
        ),
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
    queryClient.invalidateQueries({
      queryKey: [fetchTransportOrders, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  useEffect(() => {
    if (branchId !== 0) {
      setFilterObj({
        page: 0,
        pageSize,
        branchId,
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

      <DataGrid
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
      />
    </div>
  );
}

export default ArrangeTransport;
