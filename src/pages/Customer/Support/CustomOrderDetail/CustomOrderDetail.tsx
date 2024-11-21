import { Button, Chip, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./CustomOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { currencyFormatter } from "src/utils/functions";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { secondaryBtn } from "src/utils/styles";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import { useQuery } from "@tanstack/react-query";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import { fetchCustomOrderDetail } from "src/utils/querykey";
import { useEffect, useState } from "react";
import { CustomOrderStatus, DesignCharacteristic } from "src/utils/enums";
import { useAppSelector } from "src/utils/hooks";
import { ChipColor } from "src/utils/constants";

function CustomOrderDetail() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, id],

    queryFn: () => {
      if (id) return getCustomOrderDetail(+id);
    },
    enabled: !!id,
  });

  const formatStatus = (
    status: CustomOrderStatus
  ): { text: string; color: ChipColor } => {
    if (status === CustomOrderStatus.Pending)
      return {
        text: "Chưa Thanh Toán",
        color: "warning",
      };

    if (status === CustomOrderStatus.Waiting)
      return {
        text: "Đang Chuẩn Bị",
        color: "warning",
      };

    if (status === CustomOrderStatus.InProgress)
      return {
        text: "Đang Gia Công",
        color: "secondary",
      };

    if (status === CustomOrderStatus.Done)
      return {
        text: "Chuẩn Bị Giao",
        color: "primary",
      };

    if (status === CustomOrderStatus.Delivering)
      return {
        text: "Đang Giao",
        color: "primary",
      };

    if (status === CustomOrderStatus.Completed)
      return {
        text: "Hoàn Thành",
        color: "success",
      };

    return {
      text: "Đã Hủy",
      color: "error",
    };
  };

  useEffect(() => {
    if (response && response.data) {
      const { firstRing, secondRing, customer } = response.data.customOrder;

      if (customer.id !== userId) navigate("/customer/support/custom-order");

      if (
        firstRing.customDesign.designVersion.design.characteristic ===
        DesignCharacteristic.Male
      )
        setMaleRing(firstRing);
      else setFemaleRing(firstRing);

      if (
        secondRing.customDesign.designVersion.design.characteristic ===
        DesignCharacteristic.Female
      )
        setFemaleRing(secondRing);
      else setMaleRing(secondRing);

      setOrder(response.data.customOrder);
    }

    if (response && response.errors) {
      navigate("/customer/support/custom-order");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (!maleRing || !femaleRing || !order)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid container item xs={8} mb={3} justifyContent={"space-between"}>
          <Grid container item xs={5.8} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>
          <Grid container item xs={5.8} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={10}>
        <div className={styles.title}>Chi Tiết Đơn Gia Công</div>
        <Grid container>
          <Grid container item xs={6}>
            <Grid container item fontSize={"1.2rem"} mt={1} mb={3}>
              <Grid item xs={3}>
                Mã Đơn:
              </Grid>
              <Grid item className={styles.info}>
                1234567
              </Grid>
            </Grid>

            <Grid container item fontSize={"1.2rem"} mb={3}>
              <Grid item xs={3}>
                Ngày Tạo:
              </Grid>
              <Grid item className={styles.info}>
                {moment(order.createdAt).format("DD/MM/YYYY")}
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={6}>
            <Grid
              container
              item
              fontSize={"1.2rem"}
              mb={3}
              alignItems={"center"}
            >
              <Grid item xs={3}>
                Trạng Thái:
              </Grid>
              <Grid item>
                <Chip
                  label={formatStatus(order.status).text}
                  color={formatStatus(order.status).color}
                />
              </Grid>
            </Grid>

            <Grid container item fontSize={"1.2rem"} mb={2}>
              <Grid item xs={3}>
                Thợ Gia Công:
              </Grid>
              <Grid item className={styles.info}>
                {order.jeweler ? order.jeweler.username : "N/A"}
              </Grid>
            </Grid>
          </Grid>

          <Grid container item fontSize={"1.2rem"} mb={2} alignItems={"center"}>
            <Grid item xs={1.5}>
              Tổng Tiền:
            </Grid>
            <Grid item className={styles.total}>
              {currencyFormatter(order.totalPrice.amount)}
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"} mt={5}>
          <Grid container item xs={8} className={styles.card} py={5}>
            <Grid container item xs={6} justifyContent={"center"}>
              <Grid item xs={9} mb={3}>
                <img
                  src={maleRing.customDesign.designVersion.image.url}
                  className={styles.ringImage}
                />
              </Grid>

              <Grid item xs={12} textAlign={"center"} mb={5}>
                <img src={male} width={15} style={{ marginRight: 8 }} />
                Nhẫn Nam
              </Grid>

              <Grid item xs={9}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Chất Liệu
                  </Grid>
                  <Grid item>Vàng Trắng 18K</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kim Cương
                  </Grid>
                  <Grid item>15PT ,G ,VS1</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kích Thước
                  </Grid>
                  <Grid item>{maleRing.fingerSize}</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khắc Chữ
                  </Grid>
                  <Grid item>
                    {maleRing.engraving ? maleRing.engraving : "--"}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khối Lượng
                  </Grid>
                  <Grid item>{maleRing.customDesign.metalWeight} Chỉ</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={6} justifyContent={"center"}>
              <Grid item xs={9} mb={3}>
                <img
                  src={femaleRing.customDesign.designVersion.image.url}
                  className={styles.ringImage}
                />
              </Grid>

              <Grid item xs={12} textAlign={"center"} mb={5}>
                <img src={female} width={15} style={{ marginRight: 8 }} />
                Nhẫn Nữ
              </Grid>

              <Grid item xs={9}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Chất Liệu
                  </Grid>
                  <Grid item>Vàng Trắng 18K</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kim Cương
                  </Grid>
                  <Grid item>15PT ,G ,VS1</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kích Thước
                  </Grid>
                  <Grid item>{femaleRing.fingerSize}</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khắc Chữ
                  </Grid>
                  <Grid item>
                    {femaleRing.engraving ? femaleRing.engraving : "--"}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khối Lượng
                  </Grid>
                  <Grid item>{femaleRing.customDesign.metalWeight} Chỉ</Grid>
                </Grid>
              </Grid>
            </Grid>

            {order.contract.document && (
              <Grid container mt={10} justifyContent={"center"}>
                <a
                  download={""}
                  href={order.contract.document.url}
                  className={styles.download}
                >
                  <DownloadForOfflineRoundedIcon />
                  <span>Tải File PDF</span>
                </a>
              </Grid>
            )}

            <Grid container justifyContent={"center"} mt={5}>
              {order.contract.signature ? (
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() =>
                    navigate(
                      `/customer/support/custom-order/${order.id}/crafting-process`
                    )
                  }
                >
                  Quá Trình Gia Công
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={secondaryBtn}
                  onClick={() => navigate(`/customer/contract/${order.id}`)}
                >
                  Ký Hợp Đồng
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomOrderDetail;
