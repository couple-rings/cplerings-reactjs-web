import {
  Box,
  Grid,
  Pagination,
  Skeleton,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material";
import styles from "./Orders.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import CustomerOrder from "src/components/order/CustomerOrder";
import { StandardOrderStatus } from "src/utils/enums";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "src/utils/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStandardOrders } from "src/utils/querykey";
import {
  getStandardOrders,
  putCancelStandardOrder,
} from "src/services/standardOrder.service";
import { toast } from "react-toastify";

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
  mb: 6,
  mt: 3,
};

const initMetaData = {
  page: 0,
  pageSize: 3,
  totalPages: 0,
  count: 0,
};

function Orders() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IStandardOrderFilter | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const ref = useRef<HTMLDivElement>(null);

  const { id: customerId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchStandardOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getStandardOrders(filterObj);
    },
    enabled: !!filterObj,
  });

  const cancelMutation = useMutation({
    mutationFn: (id: number) => {
      return putCancelStandardOrder(id);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đã hủy đơn hàng");

        queryClient.invalidateQueries({
          queryKey: [fetchStandardOrders, filterObj],
        });
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleFilter = (status: StandardOrderStatus) => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: 0,
        pageSize: 3,
        status,
      });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: value - 1,
      });
  };

  const handleCancel = (id: number) => {
    cancelMutation.mutate(id);
  };

  useEffect(() => {
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);

      window.scrollTo({
        top: ref.current?.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [response]);

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 3,
      customerId,
      status: StandardOrderStatus.Pending,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <Grid container justifyContent={"center"} my={6}>
        <Grid container xs={11} item xl={7} gap={3}>
          <Skeleton variant="rectangular" width={"100%"} height={200} />

          <Skeleton variant="rectangular" width={"100%"} height={200} />

          <Skeleton variant="rectangular" width={"100%"} height={200} />
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <Grid container xs={11} item xl={8} className={styles.head}>
        <div className={styles.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </div>
      </Grid>

      <Grid container item xs={11} xl={7} className={styles.body} ref={ref}>
        <div className={styles.title}>Đơn Mua Trang Sức</div>
        <div className={styles.subtitle}>
          Cảm ơn bạn vì đã lựa chọn Couple Rings®
        </div>

        {filterObj && (
          <Box sx={boxStyle}>
            <Tabs
              classes={{
                indicator: "myIndicator",
              }}
              value={filterObj?.status}
              onChange={(e, value: StandardOrderStatus) => handleFilter(value)}
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

        <div className={styles.list}>
          {response?.data?.items.map((item) => {
            return (
              <CustomerOrder
                key={item.id}
                data={item}
                handleCancel={handleCancel}
                loading={cancelMutation.isPending}
              />
            );
          })}

          {response?.data?.items.length === 0 && (
            <div className={styles.empty}>Không tìm thấy đơn nào</div>
          )}
        </div>

        {metaData.totalPages > 1 && (
          <Grid container justifyContent={"center"} mt={5}>
            <Pagination
              count={metaData.totalPages}
              page={metaData.page + 1}
              onChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Orders;
