import CustomRequestCard from "src/components/customRequest/CustomRequestCard";
import styles from "./CustomRequest.module.scss";
import { Box, CircularProgress, Grid, Skeleton } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomRequests } from "src/utils/querykey";
import { getCustomRequests } from "src/services/customRequest.service";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/utils/hooks";

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

  const handleViewMore = () => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: metaData.page + 1,
      });
  };

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 3,
      customerId: id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response && response.data) {
      const { items, ...rest } = response.data;
      if (rest.page === 0) setItems(items);
      else setItems((current) => [...current, ...items]);

      if (items.length === 0) {
        const { count, pageSize, totalPages } = rest;
        setMetaData((current) => ({
          ...current,
          count,
          pageSize,
          totalPages,
        }));
      } else setMetaData(rest);
    }
  }, [response]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchCustomRequests, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  if (isLoading)
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
        <div>
          {items.map((item) => {
            return (
              <CustomRequestCard
                key={item.id}
                id={item.id}
                staffId={item.staff.id}
                status={item.status}
                designs={item.designs}
              />
            );
          })}
          {items.length === 0 && (
            <Box sx={{ mt: 3, textAlign: "center" }}>Chưa tạo yêu cầu nào</Box>
          )}
        </div>

        <Grid container item justifyContent={"center"}>
          {metaData.totalPages > 1 && (
            <Box sx={{ textAlign: "center" }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <div className={styles.viewMore} onClick={handleViewMore}>
                  Xem Thêm
                </div>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomRequest;
