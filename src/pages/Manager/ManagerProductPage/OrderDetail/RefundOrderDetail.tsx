import { Button, Chip, Divider, Grid, Skeleton } from "@mui/material";
import styles from "./ResellOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
// import sample from "src/assets/sampledata/ringdesign.png";
import { fetchRefundOrderDetail } from "src/utils/querykey";
import { getRefundOrderDetail } from "src/services/refund.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  currencyFormatter,
  formatRefundMethodTitle,
  getDiamondSpec,
} from "src/utils/functions";

// const refundOrder = {
//   id: 1,
//   orderId: "824100998377",
//   date: "09/10/2024",
//   customerName: "Nguyễn Văn A",
//   phone: "0987654321",
//   address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
//   collection: "Bộ Sưu Tập FOREVER",
//   price: 24000000,
//   reason: "Kích thước không phù hợp",
//   description: "Nhẫn nam hơi rộng và nhẫn nữ hơi chật, cần điều chỉnh kích thước cả đôi.",
//   rings: {
//     male: {
//       material: "Vàng Trắng 18K",
//       size: "15",
//       diamond: "5PT, F, SI1"
//     },
//     female: {
//       material: "Vàng Trắng 18K",
//       size: "10",
//       diamond: "5PT, F, SI1"
//     }
//   },
//   images: [sample, sample, sample]
// };

function RefundOrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchRefundOrderDetail, id],
    queryFn: () => {
      if (id) return getRefundOrderDetail(+id);
    },
    enabled: !!id,
  });

  if (isLoading || !response?.data)
    return (
      <Grid container justifyContent={"center"}>
        <Grid item xs={9}>
          <Skeleton height={700} width={"100%"} />
        </Grid>
      </Grid>
    );

    const order = response.data.refund;
    console.log(">>>DETAIL", response.data);
    

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={11} md={10}>
        <Grid container className={styles.header} alignItems="center" mb={4}>
          <ReceiptLongIcon className={styles.headerIcon} />
          <div className={styles.title}>Chi Tiết Đơn Hoàn Tiền</div>
        </Grid>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/manager/product")}
          style={{ marginBottom: "1rem" }}
        >
          Quay lại danh sách đơn 
        </Button>

        <div className={styles.section}>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={6}>
              <div className={styles.infoCard}>
                <div className={styles.label}>Mã đơn:</div>
                <div className={styles.value}>{order.orderNo}</div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={styles.infoCard}>
                <div className={styles.label}>Ngày đơn mua lại:</div>
                <div className={styles.value}>
                  {moment(response.data.refund.customOrder?.createdAt).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={styles.infoCard}>
                <div className={styles.label}>Phương thức:</div>
                <div className={styles.value}>
                  <Chip
                    label={formatRefundMethodTitle(order.method)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={styles.infoCard}>
                <div className={styles.label}>Số tiền:</div>
                <div className={styles.amount}>
                  {currencyFormatter(order.amount.amount)}
                </div>
                {/* <div className={styles.priceNote}>
                                    {(order.amount.amount / order.customOrder.totalPrice.amount) > 0.3 && (
                                        <div className={styles.warningNote}>
                                            * Lưu ý: Tỷ lệ giảm 30% so với giá gốc
                                        </div>
                                    )}
                                </div> */}
              </div>
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Khách Hàng</div>
              <div className={styles.cardContent}>
                <div className={styles.infoRow}>
                  <span>Tên tài khoản:</span>
                  <span>{order.customOrder?.customer.username}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Email:</span>
                  <span>{order.customOrder?.customer.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Số điện thoại:</span>
                  <span>{order.customOrder?.customer.phone || "--"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>CCCD:</span>
                  <span>
                    {order.customOrder?.firstRing.spouse.citizenId || "--"}
                  </span>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Nhân Viên Thực Hiện</div>
              <div className={styles.cardContent}>
                <div className={styles.infoRow}>
                  <span>Tên tài khoản:</span>
                  <span>{order.staff.username}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Email:</span>
                  <span>{order.staff.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Số điện thoại:</span>
                  <span>{order.staff.phone || "--"}</span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className={styles.card} style={{ marginBottom: "2rem" }}>
          <div className={styles.cardTitle}>Ghi chú</div>
          <div className={styles.cardContent}>
            <div className={styles.note}>
              {order.reason || "Không có ghi chú"}
            </div>
          </div>
        </div>

        <div className={styles.card} style={{ marginBottom: "3rem" }}>
          <div className={styles.cardTitle}>Hình ảnh giao dịch</div>
          <div className={styles.cardContent}>
            <img
              src={order.proofImage.url}
              className={styles.proofImage}
              alt="Proof of transaction"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Thông Tin Đơn Hàng Gốc</div>
          <div className={styles.orderNoRow}>
            <span>Mã đơn:</span>
            <span>{order.customOrder?.orderNo}</span>
          </div>
          <div className={styles.orderNoRow}>
            <span>Giá gốc:</span>
            <span>
              {order.customOrder?.totalPrice.amount.toLocaleString()}{" "}₫
            </span>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Nhẫn Nam</div>
                <div className={styles.cardContent}>
                  {order.customOrder?.firstRing.customDesign?.designVersion
                    ?.image?.url && (
                    <img
                      src={
                        order.customOrder.firstRing.customDesign.designVersion
                          .image.url
                      }
                      alt="Male Ring Design"
                      className={styles.ringImage}
                    />
                  )}
                  <div className={styles.idSection}>
                    <div className={styles.infoRow}>
                      <span>Người sở hữu:</span>
                      <span>{order.customOrder?.firstRing.spouse.fullName}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span>CCCD:</span>
                      <span>
                        {order.customOrder?.firstRing.spouse.citizenId || "--"}
                      </span>
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Kích thước:</span>
                    <span>{order.customOrder?.firstRing.fingerSize}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Khắc tên:</span>
                    <span>
                      {order.customOrder?.firstRing.engraving || "Không có"}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Kim loại:</span>
                    <span>
                      {order.customOrder?.firstRing.metalSpecification.name}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Khối lượng:</span>
                    <span>
                      {order.customOrder?.firstRing.customDesign.metalWeight} Chỉ
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Số kim cương phụ:</span>
                    <span>
                      {
                        order.customOrder?.firstRing.customDesign
                          .sideDiamondsCount
                      }
                    </span>
                  </div>
                 
                    <div className={styles.diamondSection}>
                      <div className={styles.subTitle}>Kim Cương Chính</div>
                      {order.customOrder?.firstRing.diamonds.map(
                        (diamond, index) => (
                          <>
                            <div key={index} className={styles.infoRow}>
                              <span>Giấy chứng nhận kim cương G.I.A:</span>
                              <span>{diamond.giaReportNumber}</span>
                            </div>
                            <div key={index} className={styles.infoRow}>
                              <span>Kim cương:</span>
                              <span>
                                {diamond && (
                                  <>
                                    {diamond.diamondSpecification.shape}{" "}
                                    {getDiamondSpec(
                                      diamond.diamondSpecification
                                    )}
                                  </>
                                )}
                              </span>
                            </div>
                          </>
                        )
                      )}
                    </div>
               
                  <Divider sx={{ my: 2 }} />
                  <div className={styles.infoRow}>
                    <span>Số tiền:</span>
                    <span>
                      {
                        order.customOrder?.firstRing.price.amount.toLocaleString() 
                      }{" "}₫
                    </span>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Nhẫn Nữ</div>
                <div className={styles.cardContent}>
                  {order.customOrder?.secondRing.customDesign?.designVersion
                    ?.image?.url && (
                    <img
                      src={
                        order.customOrder?.secondRing.customDesign.designVersion
                          .image.url
                      }
                      alt="Female Ring Design"
                      className={styles.ringImage}
                    />
                  )}
                  <div className={styles.idSection}>
                    <div className={styles.infoRow}>
                      <span>Người sở hữu:</span>
                      <span>
                        {order.customOrder?.secondRing.spouse.fullName}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <span>CCCD:</span>
                      <span>
                        {order.customOrder?.secondRing.spouse.citizenId || "--"}
                      </span>
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Kích thước:</span>
                    <span>{order.customOrder?.secondRing.fingerSize}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Khắc tên:</span>
                    <span>
                      {order.customOrder?.secondRing.engraving || "Không có"}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Kim loại:</span>
                    <span>
                      {order.customOrder?.secondRing.metalSpecification.name}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Khối lượng:</span>
                    <span>
                      {order.customOrder?.secondRing.customDesign.metalWeight}{" "}
                      Chỉ
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Số kim cương phụ:</span>
                    <span>
                      {
                        order.customOrder?.secondRing.customDesign
                          .sideDiamondsCount
                      }
                    </span>
                  </div>
                  
                    <div className={styles.diamondSection}>
                      <div className={styles.subTitle}>Kim Cương Chính</div>
                      {order.customOrder?.secondRing.diamonds.map(
                        (diamond, index) => (
                          <>
                            <div key={index} className={styles.infoRow}>
                              <span>Giấy chứng nhận kim cương G.I.A:</span>
                              <span>{diamond.giaReportNumber}</span>
                            </div>
                            <div key={index} className={styles.infoRow}>
                              <span>Kim cương:</span>
                              <span>
                                {diamond && (
                                  <>
                                    {diamond.diamondSpecification.shape}{" "}
                                    {getDiamondSpec(
                                      diamond.diamondSpecification
                                    )}
                                  </>
                                )}
                              </span>
                            </div>
                          </>
                        )
                      )}
                    </div>
                  
                  <Divider sx={{ my: 2 }} />
                  <div className={styles.infoRow}>
                    <span>Số tiền:</span>
                    <span>
                      {
                        order.customOrder?.secondRing.price.amount.toLocaleString()
                      }{" "}₫
                    </span>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default RefundOrderDetail;