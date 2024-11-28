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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomOrders } from "src/services/customOrder.service";
import { fetchCustomOrders } from "src/utils/querykey";
import moment from "moment";
import { CustomOrderStatus } from "src/utils/enums";
import { Button, Link } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import { useNavigate } from "react-router-dom";

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

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomOrders(filterObj);
    },

    enabled: !!filterObj,
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
        width: 250,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        valueGetter: (value: IUser) => {
          return value.username;
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
        valueGetter: (value: IUser) => {
          return value ? value.username : "----";
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

          if (row.status === CustomOrderStatus.Pending) {
            classname = styles.pending;
            status = "Chưa Bắt Đầu";
          }

          if (row.status === CustomOrderStatus.Waiting) {
            classname = styles.waiting;
            status = "Chờ Nhận";
          }

          if (row.status === CustomOrderStatus.InProgress) {
            classname = styles.ongoing;
            status = "Đang Làm";
          }

          if (row.status === CustomOrderStatus.Done) {
            classname = styles.done;
            status = "Chờ Vận Chuyển";
          }

          if (row.status === CustomOrderStatus.Delivering) {
            classname = styles.delivering;
            status = "Đang Giao";
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
      });
  }, [branchId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Đơn Gia Công</div>

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
