import { Button, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./LoveAgreement.module.scss";
import BoxLoveAgreement from "./BoxLoveAgreement";
import { useEffect, useState } from "react";
import { getAgreements } from "src/services/agreement.service";
import { pageSize } from "src/utils/constants";
import { fetchAgreements } from "src/utils/querykey";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import { useScrollTop } from "src/utils/hooks";

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function LoveAgreement() {
  const [agreementList, setAgreementList] = useState<IAgreement[]>([]);
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IAgreementFilter>({
    page: 0,
    pageSize,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchAgreements, filterObj],

    queryFn: () => {
      return getAgreements(filterObj);
    },
  });

  const handleLoadMore = () => {
    setFilterObj({
      ...filterObj,
      page: metaData.page + 1,
    });
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchAgreements, filterObj],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  useEffect(() => {
    if (response && response.data) {
      const { items, ...rest } = response.data;

      if (items.length !== 0) {
        if (rest.page === 0) setAgreementList(items);
        else setAgreementList((current) => [...current, ...items]);

        setMetaData(rest);
      }
    }
  }, [response]);

  useScrollTop();

  if (isLoading)
    return (
      <Grid container justifyContent={"center"} my={5}>
        <Grid container item xs={10} justifyContent={"space-between"}>
          <Grid item xs={2.5} mb={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>

          <Grid item xs={2.5} mb={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>

          <Grid item xs={2.5} mb={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>

          <Grid item xs={2.5} mb={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <Grid container alignItems={"center"} className={styles.header}>
        <Grid item container className={styles.box}>
          <Grid item md={4} lg={12} className={styles.headerTitle}>
            Bản Cam Kết Tình Yêu Đích Thực
          </Grid>
          <Grid item md={9} lg={4} className={styles.headerDescription}>
            Ký Thỏa thuận Tình yêu Đích thực là khoảnh khắc quan trọng, thể hiện
            triết lý “Một tình yêu, Một cuộc đời”. Darry Ring tích hợp Xác minh
            tình yêu và Thỏa thuận này, đảm bảo mỗi khách hàng chỉ mua một nhẫn
            đính hôn cho Người duy nhất của mình.
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} className={styles.honorBoard}>
        <Grid item lg={12} container className={styles.honorTitleBoard}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            justifyContent={"center"}
            className={styles.title}
          >
            Những Cặp Đôi Lâu Năm
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={styles.description}>
            Vinh danh những cặp đôi lâu năm
          </Grid>
        </Grid>

        <Grid
          item
          container
          lg={12}
          p={10}
          justifyContent={"center"}
          alignItems={"center"}
          className={styles.agreementBox}
        >
          <Grid item xs={12} md={3.75} lg={3.75} className={styles.second}>
            <div className={styles.abc}>
              <BoxLoveAgreement
                spouseName="Bean & Bean"
                date="28 tháng 1, 2003"
              />
            </div>

            <div className={styles.boxContainer}>
              <div className={styles.box}>8 năm</div>
            </div>
          </Grid>
          <Grid item xs={12} md={5.25} lg={5.25} className={styles.second}>
            <div className={styles.abc}>
              <BoxLoveAgreement
                spouseName="Bean & Bean"
                date="28 tháng 1, 2003"
              />
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.box}>10 năm</div>
            </div>
          </Grid>
          <Grid item xs={12} md={3} lg={3} className="third">
            <div className={styles.abc}>
              <BoxLoveAgreement
                spouseName="Bean & Bean"
                date="28 tháng 1, 2003"
              />
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.box}>5 năm</div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Divider />
      </Grid>

      <Grid container justifyContent={"center"} className={styles.list}>
        <Grid item container className={styles.listTitle}>
          Các Bản Cam Kết
        </Grid>
        <Grid item container>
          {agreementList.map((item) => (
            <Grid
              item
              md={3}
              lg={3}
              onClick={() => navigate(`/love-agreement/${item.customer.id}`)}
            >
              <div className={styles.abc} key={item.id}>
                <BoxLoveAgreement
                  spouseName={item.mainName}
                  date={`${moment(item.signedDate).format("DD")} tháng ${moment(
                    item.signedDate
                  ).format("MM")}, ${moment(item.signedDate).format("YYYY")}`}
                />
              </div>
            </Grid>
          ))}
        </Grid>

        {metaData.totalPages > 1 && (
          <Grid container justifyContent={"center"} mt={10}>
            <Button
              variant="contained"
              sx={secondaryBtn}
              onClick={handleLoadMore}
            >
              Xem Thêm
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default LoveAgreement;
