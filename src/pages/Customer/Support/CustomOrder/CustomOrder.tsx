import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Pagination,
  Skeleton,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material";
import styles from "./CustomOrder.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "src/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCustomOrders } from "src/services/customOrder.service";
import { fetchCustomOrders } from "src/utils/querykey";
import { CustomOrderStatus, DesignCharacteristic } from "src/utils/enums";
import {
  currencyFormatter,
  formatCustomOrderStatus,
  getDiamondSpec,
} from "src/utils/functions";
import moment from "moment";
import HoverCard from "src/components/product/HoverCard";

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

function CustomOrder() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICustomOrderFilter | null>(null);

  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  const { id } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getCustomOrders(filterObj);
    },
    enabled: !!filterObj,
  });

  const handleFilter = (status: CustomOrderStatus) => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: 0,
        pageSize: 3,
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
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);

      window.scrollTo({
        top: ref.current?.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [response]);

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 3,
      customerId: id,
      status: CustomOrderStatus.Pending,
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
    <Grid
      container
      className={styles.container}
      justifyContent={"center"}
      ref={ref}
    >
      <Grid container item xs={11}>
        <div className={styles.title}>Đơn Hàng Gia Công</div>

        {filterObj && (
          <Box sx={boxStyle}>
            <Tabs
              classes={{
                indicator: "myIndicator",
              }}
              value={filterObj.status}
              onChange={(e, value: CustomOrderStatus) => handleFilter(value)}
            >
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Chưa thanh toán"
                value={CustomOrderStatus.Pending}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Đang chuẩn bị"
                value={CustomOrderStatus.Waiting}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Đang Gia Công"
                value={CustomOrderStatus.InProgress}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Hoàn Tất Gia Công"
                value={CustomOrderStatus.Done}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Đang Giao"
                value={CustomOrderStatus.Delivering}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Hoàn Thành"
                value={CustomOrderStatus.Completed}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Đã Hoàn Tiền"
                value={CustomOrderStatus.Refunded}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Đã Bán Lại"
                value={CustomOrderStatus.Resold}
              />
              <Tab
                classes={{
                  selected: "selectedCustomRequestTab",
                }}
                className={styles.tabLabel}
                label="Đã Hủy"
                value={CustomOrderStatus.Canceled}
              />
            </Tabs>
          </Box>
        )}

        {response?.data?.items.map((item) => {
          const maleRing =
            item.firstRing.customDesign.designVersion.design.characteristic ===
            DesignCharacteristic.Male
              ? item.firstRing
              : item.secondRing;

          const maleDiamondSpec =
            maleRing.diamonds.length > 0
              ? maleRing.diamonds[0].diamondSpecification
              : null;

          const femaleRing =
            item.firstRing.customDesign.designVersion.design.characteristic ===
            DesignCharacteristic.Female
              ? item.firstRing
              : item.secondRing;

          const femaleDiamondSpec =
            femaleRing.diamonds.length > 0
              ? femaleRing.diamonds[0].diamondSpecification
              : null;

          return (
            <Card
              key={item.id}
              className={styles.order}
              sx={{ px: { md: 5, lg: 2 }, py: { md: 3, lg: 1 }, mb: 3 }}
            >
              <Grid
                container
                p={2}
                pb={1}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid container item xs={6}>
                  <Grid item xs={6} md={3}>
                    Mã Đơn:
                  </Grid>
                  <span className={styles.text}>{item.orderNo}</span>
                </Grid>
                <Grid item>
                  <Chip
                    label={formatCustomOrderStatus(item.status).text}
                    color={formatCustomOrderStatus(item.status).color}
                  />
                </Grid>
              </Grid>

              <Grid container px={2} pb={1}>
                <Grid item xs={3} md={1.5}>
                  Ngày tạo:
                </Grid>
                <div className={styles.text}>
                  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                </div>
              </Grid>

              <Grid container px={2} my={1}>
                <Grid item xs={3} md={1.5}>
                  Tổng tiền:
                </Grid>
                <div className={styles.text}>
                  {currencyFormatter(item.totalPrice.amount)}
                </div>
              </Grid>

              <Grid container justifyContent={"space-between"}>
                <Grid container item sm={5.9} className={styles.section} p={2}>
                  <Grid item lg={4} mb={{ xs: 3, lg: 0 }}>
                    <HoverCard
                      shadow={true}
                      file={maleRing.customDesign.blueprint.url}
                      image={maleRing.customDesign.designVersion.image.url}
                    />

                    <Box sx={{ textAlign: "center", mt: 2 }}>
                      <img src={male} width={15} style={{ marginRight: 6 }} />
                      Nam Tính
                    </Box>
                  </Grid>

                  <Grid container item lg={7} gap={2.5}>
                    <Grid container>
                      {maleRing.spouse.customerId
                        ? "Nhẫn của bạn"
                        : "Nhẫn của bạn đời"}
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
                        {maleDiamondSpec && maleDiamondSpec.shape}{" "}
                        {maleDiamondSpec && getDiamondSpec(maleDiamondSpec)}
                      </div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Kích Thước:
                      </Grid>
                      <div>{maleRing.fingerSize}</div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Khắc Chữ:
                      </Grid>
                      <div>{maleRing.engraving}</div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container item sm={5.9} className={styles.section} p={2}>
                  <Grid item lg={4} mb={{ xs: 3, lg: 0 }}>
                    <HoverCard
                      shadow={true}
                      file={femaleRing.customDesign.blueprint.url}
                      image={femaleRing.customDesign.designVersion.image.url}
                    />

                    <Box sx={{ textAlign: "center", mt: 2 }}>
                      <img src={female} width={15} style={{ marginRight: 6 }} />
                      Nữ Tính
                    </Box>
                  </Grid>

                  <Grid container item lg={7} gap={2.5}>
                    <Grid container>
                      {femaleRing.spouse.customerId
                        ? "Nhẫn của bạn"
                        : "Nhẫn của bạn đời"}
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
                        {femaleDiamondSpec && femaleDiamondSpec.shape}{" "}
                        {femaleDiamondSpec && getDiamondSpec(femaleDiamondSpec)}
                      </div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Kích Thước:
                      </Grid>
                      <div>{femaleRing.fingerSize}</div>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        Khắc Chữ:
                      </Grid>
                      <div>{femaleRing.engraving}</div>
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
            Không tìm thấy đơn hàng nào
          </Grid>
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

export default CustomOrder;
