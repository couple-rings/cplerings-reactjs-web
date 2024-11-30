import { Box, Button, Card, Chip, Grid, Skeleton } from "@mui/material";
import styles from "./CustomOrder.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCustomOrders } from "src/services/customOrder.service";
import { fetchCustomOrders } from "src/utils/querykey";
import { DesignCharacteristic } from "src/utils/enums";
import { formatCustomOrderStatus, getDiamondSpec } from "src/utils/functions";

function CustomOrder() {
  const [filterObj, setFilterObj] = useState<ICustomOrderFilter | null>(null);

  const navigate = useNavigate();

  const { id } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomOrders(filterObj);
    },
    enabled: !!filterObj,
  });

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 100,
      customerId: id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid item xs={9} mb={3}>
          <Skeleton variant="rectangular" width={"100%"} height={200} />
        </Grid>

        <Grid item xs={9} mb={3}>
          <Skeleton variant="rectangular" width={"100%"} height={200} />
        </Grid>

        <Grid item xs={9} mb={3}>
          <Skeleton variant="rectangular" width={"100%"} height={200} />
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid container item xs={11}>
        <div className={styles.title}>Đơn Hàng Gia Công</div>

        {response?.data?.items.map((item) => {
          const maleRing =
            item.firstRing.customDesign.designVersion.design.characteristic ===
            DesignCharacteristic.Male
              ? item.firstRing
              : item.secondRing;

          const maleDiamondSpec = maleRing.diamonds[0].diamondSpecification;

          const femaleRing =
            item.firstRing.customDesign.designVersion.design.characteristic ===
            DesignCharacteristic.Female
              ? item.firstRing
              : item.secondRing;

          const femaleDiamondSpec = femaleRing.diamonds[0].diamondSpecification;

          return (
            <Card
              key={item.id}
              className={styles.order}
              sx={{ px: { md: 5, lg: 2 }, py: { md: 3, lg: 1 } }}
            >
              <Grid
                container
                p={2}
                pb={0}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box sx={{ fontSize: "1.2rem" }}>
                  Mã Đơn: <span className={styles.orderNo}>{item.orderNo}</span>
                </Box>
                <Chip
                  label={formatCustomOrderStatus(item.status).text}
                  color={formatCustomOrderStatus(item.status).color}
                />
              </Grid>

              <Grid container justifyContent={"space-between"}>
                <Grid container item sm={5.9} className={styles.section} p={2}>
                  <Grid item lg={4} mb={{ xs: 3, lg: 0 }}>
                    <img
                      src={maleRing.customDesign.designVersion.image.url}
                      className={styles.ringImg}
                    />
                  </Grid>

                  <Grid container item lg={7} gap={2.5}>
                    <Grid container>
                      <div>
                        <img src={male} width={15} style={{ marginRight: 6 }} />
                        Nhẫn Nam
                      </div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Chất Liệu:
                      </Grid>
                      <div>{maleRing.metalSpecification.name}</div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Kim Cương:
                      </Grid>
                      <div>
                        {maleDiamondSpec.shape}{" "}
                        {getDiamondSpec(maleDiamondSpec)}
                      </div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Kích Thước:
                      </Grid>
                      <div>{maleRing.fingerSize}</div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container item sm={5.9} className={styles.section} p={2}>
                  <Grid item lg={4} mb={{ xs: 3, lg: 0 }}>
                    <img
                      src={femaleRing.customDesign.designVersion.image.url}
                      className={styles.ringImg}
                    />
                  </Grid>

                  <Grid container item lg={7} gap={2.5}>
                    <Grid container>
                      <div>
                        <img
                          src={female}
                          width={15}
                          style={{ marginRight: 6 }}
                        />
                        Nhẫn Nữ
                      </div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Chất Liệu:
                      </Grid>
                      <div>{femaleRing.metalSpecification.name}</div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Kim Cương:
                      </Grid>
                      <div>
                        {femaleDiamondSpec.shape}{" "}
                        {getDiamondSpec(femaleDiamondSpec)}
                      </div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Kích Thước:
                      </Grid>
                      <div>{femaleRing.fingerSize}</div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ textAlign: "right", p: 2 }}>
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() =>
                    navigate(`/customer/support/custom-order/detail/${item.id}`)
                  }
                >
                  Xem Chi Tiết
                </Button>
              </Box>
            </Card>
          );
        })}

        {response?.data?.items.length === 0 && (
          <Grid container mb={10}>
            Chưa có đơn hàng nào
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default CustomOrder;
