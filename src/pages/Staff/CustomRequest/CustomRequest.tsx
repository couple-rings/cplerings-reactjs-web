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
import { Button } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import { CustomRequestStatus } from "src/utils/enums";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomRequests } from "src/utils/querykey";
import { getCustomRequests } from "src/services/customRequest.service";
import { pageSize } from "src/utils/constants";
import moment from "moment";

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

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomRequests(filterObj);
    },
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
          let status = "";

          if (row.status === CustomRequestStatus.Completed) {
            classname = styles.completed;
            status = "Completed";
          }

          if (row.status === CustomRequestStatus.Canceled) {
            classname = styles.canceled;
            status = "Canceled";
          }

          if (row.status === CustomRequestStatus.OnGoing) {
            classname = styles.ongoing;
            status = "On Going";
          }

          if (row.status === CustomRequestStatus.Waiting) {
            classname = styles.ongoing;
            status = "Waiting";
          }
          return <div className={classname}>{status}</div>;
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
    [navigate]
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

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchCustomRequests, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Yêu Cầu Thiết Kế</div>

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
