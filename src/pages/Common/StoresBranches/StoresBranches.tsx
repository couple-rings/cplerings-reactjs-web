import { Breadcrumbs, Grid, Typography, Link, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./StoresBranches.module.scss";
import BranchCard from "src/components/branch/BranchCard";
import { useQuery } from "@tanstack/react-query";
import { fetchBranches } from "src/utils/querykey";
import { getBranches } from "src/services/branch.service";
import { useScrollTop } from "src/utils/hooks";

const branchFilter: IBranchFilter = {
  page: 0,
  pageSize: 100,
};

const StoresBranches = () => {
  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchBranches, branchFilter],

    queryFn: () => {
      return getBranches(branchFilter);
    },
  });

  useScrollTop();

  if (isLoading)
    return (
      <Grid container justifyContent={"center"} my={5}>
        <Grid container item xs={8} justifyContent={"space-between"}>
          <Grid container item xs={3.8}>
            <Skeleton variant="rectangular" width={"100%"} height={500} />
          </Grid>

          <Grid container item xs={3.8}>
            <Skeleton variant="rectangular" width={"100%"} height={500} />
          </Grid>

          <Grid container item xs={3.8}>
            <Skeleton variant="rectangular" width={"100%"} height={500} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <Grid container item xs={11} lg={10}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            sx={{ cursor: "pointer" }}
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Trang Chủ
          </Link>
          <Typography sx={{ color: "text.primary" }}>Cửa Hàng</Typography>
        </Breadcrumbs>

        <div className={styles.title}>
          <h1>Tìm kiếm cửa hàng</h1>
          <p>
            Vui lòng liên hệ với nhóm trực tuyến hoặc các cửa hàng bên dưới nếu
            có bất kỳ thắc mắc nào và chúng tôi rất vui lòng được trợ giúp.
          </p>
        </div>
      </Grid>

      <Grid
        container
        item
        xs={11}
        lg={10}
        spacing={3}
        justifyContent={"center"}
        className="list"
      >
        {response?.data?.items.map((item) => {
          return (
            <Grid item sm={6} md={4} key={item.id}>
              <BranchCard data={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default StoresBranches;
