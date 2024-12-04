import CustomRequestCard from "src/components/customRequest/CustomRequestCard";
import styles from "./CustomRequest.module.scss";
import {
  Box,
  Grid,
  Pagination,
  Skeleton,
  SxProps,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomRequests } from "src/utils/querykey";
import { getCustomRequests } from "src/services/customRequest.service";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/utils/hooks";
import { CustomRequestStatus } from "src/utils/enums";
import Row from "src/components/table/customRequest/Row";
import { pageSize } from "src/utils/constants";

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  width: "100%",
  mb: 6,
};

const initMetaData = {
  page: 0,
  pageSize: 3,
  totalPages: 0,
  count: 0,
};

function CustomRequest() {
  const [items, setItems] = useState<ICustomRequest[]>([]);
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICustomRequestFilter | null>(null);

  const queryClient = useQueryClient();
  const { id } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomRequests(filterObj);
    },
    enabled: !!filterObj,
  });

  const handleFilter = (status: CustomRequestStatus) => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: 0,
        pageSize,
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

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize,
      customerId: id,
      status: CustomRequestStatus.Waiting,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response && response.data) {
      const { items, ...rest } = response.data;
      setItems(items);
      setMetaData(rest);
    }
  }, [response]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchCustomRequests, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  if (isLoading || !filterObj)
    return (
      <Grid container justifyContent={"center"}>
        <Grid item xs={9}>
          <Skeleton height={700} width={"100%"} />
        </Grid>
      </Grid>
    );

  return (
    <Grid container justifyContent={"center"} className={styles.container}>
      <Grid container item xs={11} sm={9}>
        <div className={styles.title}>Yêu Cầu Thiết Kế</div>

        <Box sx={boxStyle}>
          <Tabs
            classes={{
              indicator: "myIndicator",
            }}
            value={filterObj?.status}
            onChange={(e, value: CustomRequestStatus) => handleFilter(value)}
          >
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              className={styles.tabLabel}
              label="Đang chờ duyệt"
              value={CustomRequestStatus.Waiting}
            />
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

        {items.length !== 0 && (
          <Table className={styles.customTable}>
            <TableHead className={styles.headerRow}>
              <TableRow>
                <TableCell />
                <TableCell className={styles.cell} align="center">
                  Ngày Tạo
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Số Tiền
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Trạng Thái
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Ngày Cập Nhật
                </TableCell>
                <TableCell className={styles.cell} align="center">
                  Nhân Viên
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                return (
                  <Row
                    key={item.id}
                    data={item}
                    expandComponent={
                      <CustomRequestCard
                        key={item.id}
                        id={item.id}
                        staffId={item.staff?.id ?? undefined}
                        status={item.status}
                        designs={item.designs}
                      />
                    }
                  />
                );
              })}
            </TableBody>
          </Table>
        )}

        {items.length === 0 && (
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

export default CustomRequest;
