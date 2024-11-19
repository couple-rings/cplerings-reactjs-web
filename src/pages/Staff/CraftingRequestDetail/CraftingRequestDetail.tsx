import { Button, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./CraftingRequestDetail.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import HoverCard from "src/components/product/HoverCard";
import { roundedPrimaryBtn } from "src/utils/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCraftingRequests } from "src/services/craftingRequest.service";
import { useEffect, useState } from "react";
import { fetchCraftingRequests } from "src/utils/querykey";
import { CraftingRequestStatus, DesignCharacteristic } from "src/utils/enums";
import RejectModal from "src/components/modal/craftingRequest/Reject.modal";
import { getDiamondSpec } from "src/utils/functions";

function CraftingRequestDetail() {
  const [openReject, setOpenReject] = useState(false);
  const [filterObj, setFilterObj] = useState<ICraftingRequestFilter | null>(
    null
  );

  const [maleRequest, setMaleRequest] = useState<ICraftingRequest | null>(null);
  const [femaleRequest, setFemaleRequest] = useState<ICraftingRequest | null>(
    null
  );

  const navigate = useNavigate();

  const { customerId } = useParams<{ customerId: string }>();

  const { data: response } = useQuery({
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

  useEffect(() => {
    if (response?.data) {
      if (response.data.items.length === 0) navigate("/staff/crafting-request");

      const maleRequest = response.data.items.find(
        (item) =>
          item.customDesign.designVersion.design.characteristic ===
          DesignCharacteristic.Male
      );

      const femaleRequest = response.data.items.find(
        (item) =>
          item.customDesign.designVersion.design.characteristic ===
          DesignCharacteristic.Female
      );

      if (maleRequest && femaleRequest) {
        setMaleRequest(maleRequest);
        setFemaleRequest(femaleRequest);
      }
    }

    if (response?.errors) {
      navigate("/staff/crafting-request");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (!maleRequest || !femaleRequest)
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
            <HoverCard
              image={maleRequest.customDesign.designVersion.image.url}
              file={maleRequest.customDesign.blueprint.url}
              shadow={true}
            />
            <div className={styles.label}>
              <img src={male} />
              <span>Nhẫn Nam</span>
            </div>

            <div className={styles.info}>
              <div className={styles.row}>
                <div className={styles.field}>Chất liệu</div>
                <div className={styles.value}>
                  {maleRequest.metalSpecification.name}
                </div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kim cương</div>
                <div className={styles.value}>
                  {maleRequest.diamondSpecification.shape}{" "}
                  {getDiamondSpec(maleRequest.diamondSpecification)}
                </div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kích thước</div>
                <div className={styles.value}>{maleRequest.fingerSize}</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Trọng lượng</div>
                <div className={styles.value}>
                  {maleRequest.customDesign.metalWeight} chỉ
                </div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Khắc chữ</div>
                <div className={styles.value}>{maleRequest.engraving}</div>
              </div>
            </div>
          </Grid>

          <Grid item md={5}>
            <HoverCard
              image={femaleRequest.customDesign.designVersion.image.url}
              file={femaleRequest.customDesign.blueprint.url}
              shadow={true}
            />
            <div className={styles.label}>
              <img src={female} />
              <span>Nhẫn Nữ</span>
            </div>

            <div className={styles.info}>
              <div className={styles.row}>
                <div className={styles.field}>Chất liệu</div>
                <div className={styles.value}>
                  {femaleRequest.metalSpecification.name}
                </div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kim cương</div>
                <div className={styles.value}>
                  {femaleRequest.diamondSpecification.shape}{" "}
                  {getDiamondSpec(femaleRequest.diamondSpecification)}
                </div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kích thước</div>
                <div className={styles.value}>{femaleRequest.fingerSize}</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Trọng lượng</div>
                <div className={styles.value}>
                  {femaleRequest.customDesign.metalWeight} chỉ
                </div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Khắc chữ</div>
                <div className={styles.value}>{femaleRequest.engraving}</div>
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
