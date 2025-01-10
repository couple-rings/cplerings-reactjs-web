import { Grid, Chip, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import styles from "./OrderDetail.module.scss";
import { getCustomOrderDetail } from "src/services/customOrder.service"
import { fetchCustomOrderDetail } from "src/utils/querykey";
import { currencyFormatter } from "src/utils/functions";
import { DesignCharacteristic } from "src/utils/enums";
import { formatCustomOrderStatus, getDiamondSpec } from "src/utils/functions";
import HoverCard from "src/components/product/HoverCard";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

function OrderDetail() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const { id } = useParams<{ id: string }>();

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, id],
    queryFn: () => {
      if (id) return getCustomOrderDetail(+id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (response && response.data) {
      const { firstRing, secondRing } = response.data.customOrder;

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
  }, [response]);

  if (!order || !maleRing || !femaleRing) return null;

  return (
    <Grid container className={styles.container}>
      <Grid container className={styles.header} mb={4}>
        <Grid container item xs={12} mb={2}>
          <Grid item xs={12} md={6} className={styles.orderInfo}>
            <div className={styles.title}>Chi Tiết Đơn Hàng</div>
            <Chip
              label={formatCustomOrderStatus(order.status).text}
              color={formatCustomOrderStatus(order.status).color}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className={styles.infoRow}>
              <span>Mã đơn:</span>
              <span>{order.orderNo}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Ngày tạo:</span>
              <span>{moment(order.createdAt).format("DD/MM/YYYY HH:mm")}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Tổng tiền:</span>
              <span className={styles.amount}>
                {currencyFormatter(order.totalPrice.amount)}
              </span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className={styles.section}>
              <h3>Thông tin khách hàng</h3>
              <div className={styles.infoRow}>
                <span>Tên:</span>
                <span>{order.customer.username}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Email:</span>
                <span>{order.customer.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Số điện thoại:</span>
                <span>{order.customer.phone || "Không có"}</span>
              </div>
            </div>

            <div className={styles.section}>
              <h3>Thông tin thợ kim hoàn</h3>
              <div className={styles.infoRow}>
                <span>Tên:</span>
                <span>{order.jeweler?.username || "--"}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Email:</span>
                <span>{order.jeweler?.email || "--"}</span>
              </div>
              <div className={styles.infoRow}>
                <span>Số điện thoại:</span>
                <span>{order.jeweler?.phone || "Không có"}</span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className={styles.section}>
            <h3>Lịch sử đơn hàng</h3>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Trạng thái</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {order.customOrderHistories.map((history, index) => (
                  <tr key={index}>
                    <td>{moment(history.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      <Chip
                        label={formatCustomOrderStatus(history.status).text}
                        color={formatCustomOrderStatus(history.status).color}
                        size="small"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.ringCard}>
            <div className={styles.ringHeader}>
              <MaleIcon sx={{ color: "#4994ec" }} />
              <span>Nhẫn Nam</span>
            </div>
            <HoverCard
              shadow={true}
              file={maleRing.customDesign.blueprint.url}
              image={maleRing.customDesign.designVersion.image.url}
            />
            <div className={styles.ringDetails}>
              <RingDetails ring={maleRing} />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.ringCard}>
            <div className={styles.ringHeader}>
              <FemaleIcon sx={{ color: "#ea394b" }} />
              <span>Nhẫn Nữ</span>
            </div>
            <HoverCard
              shadow={true}
              file={femaleRing.customDesign.blueprint.url}
              image={femaleRing.customDesign.designVersion.image.url}
            />
            <div className={styles.ringDetails}>
              <RingDetails ring={femaleRing} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

function RingDetails({ ring }: { ring: IRing }) {
  return (
    <>
      <div className={styles.infoRow}>
        <span>Người sở hữu:</span>
        <span>{ring.customDesign.spouse.fullName}</span>
      </div>
      <Divider sx={{ my: 1 }} />
      
      <div className={styles.infoRow}>
        <span>Chất liệu:</span>
        <span>{ring.metalSpecification.name}</span>
      </div>
      <Divider sx={{ my: 1 }} />

      <div className={styles.infoRow}>
        <span>Kim cương chính:</span>
        <span>
          {ring.diamonds.length > 0 &&
            `${ring.diamonds[0].diamondSpecification.shape} ${getDiamondSpec(
              ring.diamonds[0].diamondSpecification
            )}`}
        </span>
      </div>
      <Divider sx={{ my: 1 }} />

      <div className={styles.infoRow}>
        <span>Kim cương phụ:</span>
        <span>{ring.customDesign.sideDiamondsCount} viên</span>
      </div>
      <Divider sx={{ my: 1 }} />

      <div className={styles.infoRow}>
        <span>Kích thước:</span>
        <span>{ring.fingerSize}</span>
      </div>
      <Divider sx={{ my: 1 }} />

      <div className={styles.infoRow}>
        <span>Khắc chữ:</span>
        <span>{ring.engraving || "--"}</span>
      </div>
      <Divider sx={{ my: 1 }} />

      <div className={styles.infoRow}>
        <span>Khối lượng:</span>
        <span>{ring.customDesign.metalWeight} chỉ</span>
      </div>
      <Divider sx={{ my: 1 }} />

      <div className={styles.infoRow}>
        <span>Giá:</span>
        <span>{currencyFormatter(ring.price.amount)}</span>
      </div>
    </>
  );
}

export default OrderDetail;
