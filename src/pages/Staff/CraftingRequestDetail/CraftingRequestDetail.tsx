import { Button, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./CraftingRequestDetail.module.scss";
import menring from "src/assets/sampledata/menring.png";
import womenring from "src/assets/sampledata/womenring.png";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import HoverCard from "src/components/product/HoverCard";
import blueprint from "src/assets/sampledata/blueprint.pdf";
import { roundedPrimaryBtn } from "src/utils/styles";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCraftingRequests } from "src/services/craftingRequest.service";
import { useEffect, useState } from "react";
import { fetchCraftingRequests } from "src/utils/querykey";
import { CraftingRequestStatus } from "src/utils/enums";
import RejectModal from "src/components/modal/craftingRequest/Reject.modal";

function CraftingRequestDetail() {
  const [openReject, setOpenReject] = useState(false);
  const [filterObj, setFilterObj] = useState<ICraftingRequestFilter | null>(
    null
  );

  const { customerId } = useParams<{ customerId: string }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useQuery({
    queryKey: [fetchCraftingRequests, filterObj],

    queryFn: () => {
      if (filterObj) return getCraftingRequests(filterObj);
    },
    enabled: !!filterObj,
  });

  useEffect(() => {
    if (customerId)
      setFilterObj({
        page: 0,
        pageSize: 100,
        status: CraftingRequestStatus.Pending,
        customerId: +customerId,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <Grid container justifyContent={"center"} my={10}>
        <Grid container item xs={8} justifyContent={"space-between"}>
          <Grid container item xs={5.8} gap={1}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>

          <Grid container item xs={5.8} gap={1}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Yêu Cầu Gia Công</div>

      <Grid container justifyContent={"center"}>
        <Grid container item lg={10} justifyContent={"space-between"}>
          <Grid item md={5}>
            <HoverCard image={menring} file={blueprint} shadow={true} />
            <div className={styles.label}>
              <img src={male} />
              <span>Nhẫn Nam</span>
            </div>

            <div className={styles.info}>
              <div className={styles.row}>
                <div className={styles.field}>Chất liệu</div>
                <div className={styles.value}>Vàng trắng 18K</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kim cương</div>
                <div className={styles.value}>Round 12PT, D, VS1</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kích thước</div>
                <div className={styles.value}>14 mm</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Trọng lượng</div>
                <div className={styles.value}>3 chỉ</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Khắc chữ</div>
                <div className={styles.value}>Bean Nguyen</div>
              </div>
            </div>
          </Grid>

          <Grid item md={5}>
            <HoverCard image={womenring} file={blueprint} shadow={true} />
            <div className={styles.label}>
              <img src={female} />
              <span>Nhẫn Nữ</span>
            </div>

            <div className={styles.info}>
              <div className={styles.row}>
                <div className={styles.field}>Chất liệu</div>
                <div className={styles.value}>Vàng trắng 18K</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kim cương</div>
                <div className={styles.value}>Round 12PT, D, VS1</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kích thước</div>
                <div className={styles.value}>14 mm</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Trọng lượng</div>
                <div className={styles.value}>3 chỉ</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Khắc chữ</div>
                <div className={styles.value}>Bean Nguyen</div>
              </div>
            </div>
          </Grid>

          <Grid container item xs={12} justifyContent={"center"} mt={3} gap={3}>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" fullWidth sx={roundedPrimaryBtn}>
                Chấp Nhận
              </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                sx={roundedPrimaryBtn}
                onClick={() => setOpenReject(true)}
              >
                Từ Chối
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <RejectModal open={openReject} setOpen={setOpenReject} />
    </div>
  );
}

export default CraftingRequestDetail;
