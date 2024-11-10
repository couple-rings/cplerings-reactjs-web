import CustomRequestCard from "src/components/customRequest/CustomRequestCard";
import styles from "./CustomRequest.module.scss";
import { Grid, Pagination } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomRequests } from "src/utils/querykey";
import { getCustomRequests } from "src/services/customRequest.service";
import { pageSize } from "src/utils/constants";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/utils/hooks";

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function CustomRequest() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICustomRequestFilter | null>(null);

  const queryClient = useQueryClient();
  const { id } = useAppSelector((state) => state.auth.userInfo);

  const { data: response } = useQuery({
    queryKey: [fetchCustomRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomRequests(filterObj);
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

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [response]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchCustomRequests, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  return (
    <Grid container justifyContent={"center"} className={styles.container}>
      <Grid container item xs={11} sm={9}>
        <div className={styles.title}>Yêu Cầu Thiết Kế</div>
        <div>
          {response &&
            response.data &&
            response.data.items.length > 0 &&
            response.data.items.map((item) => {
              return (
                <CustomRequestCard
                  key={item.id}
                  status={item.status}
                  designs={item.designs}
                />
              );
            })}
        </div>

        <Grid container item justifyContent={"center"}>
          {metaData.totalPages > 0 && (
            <Pagination
              count={metaData.totalPages}
              page={metaData.page + 1}
              onChange={handleChange}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomRequest;
