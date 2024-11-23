import { Grid, Skeleton } from "@mui/material";
import styles from "./LoveAgreementDetail.module.scss";
import UserLoveAgreeMent from "src/components/loveAgreement/LoveAgreementDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAgreements } from "src/utils/querykey";
import { getAgreements } from "src/services/agreement.service";

function LoveAgreementDetail() {
  const [filterObj, setFilterObj] = useState<IAgreementFilter | null>(null);

  const { customerId } = useParams<{ customerId: string }>();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchAgreements, filterObj],

    queryFn: () => {
      if (filterObj) return getAgreements(filterObj);
    },
    enabled: !!filterObj,
  });

  useEffect(() => {
    if (customerId)
      setFilterObj({
        page: 0,
        pageSize: 100,
        customerId: +customerId,
      });
  }, [customerId]);

  if (isLoading)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid item xs={5} mb={3}>
          <Skeleton variant="rectangular" width={"100%"} height={700} />
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <div className={styles.title}>Chứng Nhận Tình Yêu Đích Thực</div>
      {response?.data && <UserLoveAgreeMent data={response.data.items[0]} />}
    </Grid>
  );
}

export default LoveAgreementDetail;
