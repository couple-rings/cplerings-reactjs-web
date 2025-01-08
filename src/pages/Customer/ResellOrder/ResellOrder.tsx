import {
  FormLabel,
  Grid,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./ResellOrder.module.scss";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import { pageSize } from "src/utils/constants";
import { useEffect, useState } from "react";
import { fetchResellOrders } from "src/utils/querykey";
import { getResellOrders } from "src/services/resell.service";
import { useQuery } from "@tanstack/react-query";
import Row from "src/components/table/resellOrder/Row";
import WeddingRing from "src/components/product/WeddingRing";
import moment from "moment";
import { CustomOrderStatus } from "src/utils/enums";
import { currencyFormatter } from "src/utils/functions";

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function ResellOrder() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IResellFilter | null>(null);

  const navigate = useNavigate();

  const { id } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchResellOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getResellOrders(filterObj);
    },
    enabled: !!filterObj,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: value - 1,
      });
  };

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize,
      customerId: id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);
    }
  }, [response]);

  useScrollTop();

  if (isLoading || !filterObj)
    return (
      <Grid container justifyContent={"center"}>
        <Grid item xs={9}>
          <Skeleton height={700} width={"100%"} />
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container}>
      <Grid container item xs={10} className={styles.head}>
        <div className={styles.homeLink} onClick={() => navigate("/customer")}>
          <ArrowBackIosIcon />
          <span>Quay Lại</span>
        </div>
      </Grid>
      <Grid container item xs={9}>
        <div className={styles.title}>Nhẫn Cưới Bán Lại</div>

        {response?.data && response.data.items.length !== 0 && (
          <Table className={styles.customTable}>
            <TableHead className={styles.headerRow}>
              <TableRow>
                <TableCell />
                <TableCell className={styles.cell} align="center">
                  Mã Đơn
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Ngày Bán
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Số Tiền
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Phương Thức
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Nhân Viên Duyệt
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response.data.items.map((item) => {
                return (
                  <Row
                    key={item.id}
                    data={item}
                    expandComponent={
                      <Grid container>
                        <Grid container justifyContent={"space-between"}>
                          <Grid item xs={4.7}>
                            <FormLabel>Hình ảnh giao dịch:</FormLabel>
                            <img
                              src={item.proofImage.url}
                              className={styles.proofImage}
                            />
                          </Grid>

                          <Grid item xs={7}>
                            <Grid
                              container
                              justifyContent={"space-between"}
                              mb={1}
                            >
                              <Grid item>
                                <FormLabel>Mã giao dịch:</FormLabel>
                              </Grid>

                              <Grid item>{item.payment.paymentNo}</Grid>
                            </Grid>

                            <fieldset style={{ margin: 0, marginBottom: 20 }}>
                              <legend>Nội dung:</legend>
                              <Grid container p={3}>
                                {item.payment.description}
                              </Grid>
                            </fieldset>

                            <fieldset style={{ margin: 0 }}>
                              <legend>Ghi chú:</legend>
                              <Grid container p={3}>
                                {item.note}
                              </Grid>
                            </fieldset>
                          </Grid>
                        </Grid>

                        <Grid container item xs={6} my={3}>
                          <fieldset style={{ margin: 0, width: "100%" }}>
                            <legend>Đơn hàng gốc</legend>
                            <Grid container p={2}>
                              <Grid
                                container
                                justifyContent={"space-between"}
                                mb={1}
                              >
                                <Grid item>Mã đơn:</Grid>

                                <Grid item>{item.customOrder.orderNo}</Grid>
                              </Grid>

                              <Grid
                                container
                                justifyContent={"space-between"}
                                mb={1}
                              >
                                <Grid item>Ngày bắt đầu:</Grid>

                                <Grid item>
                                  {moment(item.customOrder.createdAt).format(
                                    "DD/MM/YYYY HH:mm"
                                  )}
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                justifyContent={"space-between"}
                                mb={1}
                              >
                                <Grid item>Ngày kết thúc:</Grid>

                                <Grid item>
                                  {moment(
                                    item.customOrder.customOrderHistories.find(
                                      (item) =>
                                        item.status ===
                                        CustomOrderStatus.Completed
                                    )?.createdAt
                                  ).format("DD/MM/YYYY HH:mm")}
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                justifyContent={"space-between"}
                                mb={1}
                              >
                                <Grid item>Tổng tiền:</Grid>

                                <Grid item fontWeight={600}>
                                  {currencyFormatter(
                                    item.customOrder.totalPrice.amount
                                  )}
                                </Grid>
                              </Grid>

                              <Grid container justifyContent={"flex-end"}>
                                <span
                                  className={styles.viewMore}
                                  onClick={() =>
                                    navigate(
                                      `/customer/support/custom-order/detail/${item.customOrder.id}`
                                    )
                                  }
                                >
                                  Xem thêm &gt;
                                </span>
                              </Grid>
                            </Grid>
                          </fieldset>
                        </Grid>

                        <WeddingRing
                          ring={item.customOrder.firstRing}
                          gender={
                            item.customOrder.firstRing.customDesign
                              .designVersion.design.characteristic
                          }
                        />

                        <WeddingRing
                          ring={item.customOrder.secondRing}
                          gender={
                            item.customOrder.secondRing.customDesign
                              .designVersion.design.characteristic
                          }
                        />
                      </Grid>
                    }
                  />
                );
              })}
            </TableBody>
          </Table>
        )}

        {response?.data?.items.length === 0 && (
          <Grid container>Không tìm thấy yêu cầu nào</Grid>
        )}

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
    </Grid>
  );
}

export default ResellOrder;
