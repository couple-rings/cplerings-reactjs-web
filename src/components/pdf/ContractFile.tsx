import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Svg,
  Line,
} from "@react-pdf/renderer";
import normal from "src/assets/font/BeVietnamPro-Regular.ttf";
import light from "src/assets/font/BeVietnamPro-Light.ttf";
import medium from "src/assets/font/BeVietnamPro-Medium.ttf";
import semiBold from "src/assets/font/BeVietnamPro-SemiBold.ttf";
import ring from "src/assets/One Ring.png";
import email from "src/assets/email.png";
import phone from "src/assets/phone.png";
import ringBlack from "src/assets/One Ring Black.png";
import { currencyFormatter } from "src/utils/functions";
import moment from "moment";

Font.register({
  family: "Be Vietnam Pro",
  fonts: [
    {
      src: light,
      fontWeight: 300,
    },
    {
      src: normal,
      fontWeight: 400,
    },
    {
      src: medium,
      fontWeight: 500,
    },
    {
      src: semiBold,
      fontWeight: 600,
    },
  ],
});

function ContractFile(props: IContractFileProps) {
  const { signature } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Image src={ring} style={styles.ringWhite} />
            <Text style={styles.brand}>Couple Rings</Text>
            <Text style={styles.name}>Hợp Đồng Gia Công Nhẫn</Text>
          </View>

          <View style={styles.contactContainer}>
            <View style={styles.contact}>
              <Image src={email} style={styles.icon} />
              <Text>couplerings@gmail.com</Text>
            </View>

            <View style={styles.contact}>
              <Image src={phone} style={styles.icon} />
              <Text>0123-456-789</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={{ marginBottom: "15px" }}>
              Hợp đồng này được ký kết vào{" "}
              <Text style={{ fontWeight: 600 }}>
                ngày 21 tháng 12 năm 2024{" "}
              </Text>
              giữa:
            </Text>

            <View style={styles.sides}>
              <View style={{ width: "45%" }}>
                <Text style={{ fontWeight: 500 }}>Khách Hàng:</Text>
                <Svg
                  height={10}
                  style={{ marginTop: "5px", marginBottom: "10px" }}
                >
                  <Line
                    x1="0"
                    y1="5"
                    x2="250"
                    y2="5"
                    strokeWidth={0.5}
                    stroke="#555"
                  />
                </Svg>
                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Họ Tên : </Text>Nguyễn Văn A
                </Text>

                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Số Điện Thoại : </Text>
                  (+84)234567891
                </Text>

                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Email : </Text>nva@gmail.com
                </Text>

                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Địa Chỉ : </Text>123 Âu
                  Dương Lân, Quận 8, HCM
                </Text>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={{ fontWeight: 500 }}>Bên Cung Cấp Dịch Vụ:</Text>
                <Svg
                  height={10}
                  style={{ marginTop: "5px", marginBottom: "10px" }}
                >
                  <Line
                    x1="0"
                    y1="5"
                    x2="250"
                    y2="5"
                    strokeWidth={0.5}
                    stroke="#555"
                  />
                </Svg>
                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Tên Công Ty : </Text>Couple
                  Rings
                </Text>

                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Người Đại Diện : </Text>
                  Nguyễn Văn B
                </Text>

                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Số Điện Thoại : </Text>
                  (+84)928226767
                </Text>

                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Email : </Text>nvb@gmail.com
                </Text>

                <Text style={styles.info}>
                  <Text style={{ fontWeight: 600 }}>Địa Chỉ : </Text>Lô E2a-7,
                  Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, HCM
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ ...styles.content, borderRadius: 10 }}>
            <View style={styles.website}>
              <Image src={ringBlack} style={styles.icon} />
              <Text>couplering.netlify.app</Text>
            </View>
            <Text style={styles.title}>Phạm vi Công việc</Text>

            <View style={styles.listItem}>
              <Text>•</Text>
              <Text>
                Khách hàng đồng ý đặt gia công nhẫn theo thiết kế, chất liệu và
                thông số kỹ thuật đã thỏa thuận.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text>•</Text>
              <Text>
                Doanh nghiệp đồng ý chế tác nhẫn theo yêu cầu của khách hàng như
                đã thảo luận và nêu chi tiết trong đơn đặt gia công nhẫn.
              </Text>
            </View>

            <Text style={styles.title}>Quy Định Tiền Đặt Cọc</Text>
            <Text>Khách hàng đồng ý thực hiện các khoản đặt cọc như sau:</Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ ...styles.content, borderRadius: 10 }}>
            <View style={styles.table}>
              <View style={[styles.row, styles.head]}>
                <Text style={styles.col1}>Giai Đoạn Gia Công</Text>
                <Text style={styles.col2}>Số Tiền Cọc</Text>
                <Text style={styles.col3}>Ngày Đáo Hạn</Text>
              </View>

              <View style={styles.row} wrap={false}>
                <Text style={styles.col1}>Hoàn Thành 50% (Đúc khuôn nhẫn)</Text>
                <Text style={styles.col2}>{currencyFormatter(10000000)}</Text>
                <Text style={styles.col3}>3 ngày sau khi có hợp đồng</Text>
              </View>

              <View style={styles.row} wrap={false}>
                <Text style={styles.col1}>
                  Hoàn Thành 75% (Gắn kim cương và Đánh bóng)
                </Text>
                <Text style={styles.col2}>{currencyFormatter(10000000)}</Text>
                <Text style={styles.col3}>
                  1 tuần sau khi hoàn thành 50% tiến độ
                </Text>
              </View>

              <View style={styles.row} wrap={false}>
                <Text style={styles.col1}>
                  Hoàn Thành 100% (Đóng gói và Hoàn tất)
                </Text>
                <Text style={styles.col2}>{currencyFormatter(10000000)}</Text>
                <Text style={styles.col3}>
                  1 tuần sau khi hoàn thành 75% tiến độ
                </Text>
              </View>
            </View>

            <View style={styles.listItem}>
              <Text>•</Text>
              <Text>
                Doanh nghiệp sẽ thông báo cho Khách hàng và cung cấp bằng chứng
                về hoàn thành tiến độ trước khi mỗi khoản thanh toán được thực
                hiện.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ ...styles.content, borderRadius: 10 }}>
            <View style={styles.website}>
              <Image src={ringBlack} style={styles.icon} />
              <Text>couplering.netlify.app</Text>
            </View>
            <Text style={styles.title}>Cập Nhật Tiến Độ</Text>
            <Text style={{ marginBottom: "16px" }}>
              Doanh nghiệp cam kết cập nhật thông tin mới nhất cho Khách hàng
              trong suốt quá trình gia công nhẫn:
            </Text>

            <View style={styles.listItem}>
              <Text>•</Text>
              <Text>
                <Text style={{ fontWeight: 600 }}>Hoàn Thành 50%:</Text> Khách
                hàng sẽ được xem hình dáng ban đầu sau khi đã đúc phần đế của
                nhẫn.
              </Text>
            </View>

            <View style={styles.listItem}>
              <Text>•</Text>
              <Text>
                <Text style={{ fontWeight: 600 }}>Hoàn Thành 75%:</Text> Khách
                hàng sẽ được xem kết quả sau khi hoàn tất gắn kim cương và hoàn
                thiện các chi tiết cuối cùng của nhẫn.
              </Text>
            </View>

            <View style={styles.listItem}>
              <Text>•</Text>
              <Text>
                <Text style={{ fontWeight: 600 }}>Hoàn Thành 100%:</Text> Khách
                hàng sẽ được thông báo sau khi đã hoàn tất chuẩn bị giấy tờ và
                đóng gói hàng.
              </Text>
            </View>

            <Text style={{ marginBottom: "16px" }}>
              Tất cả các cập nhật sẽ được gửi qua định dạng hình ảnh hoặc video
              nếu phù hợp.
            </Text>

            <Text style={styles.title}>Chính Sách Kinh Doanh</Text>
            <Text style={{ marginBottom: "12px" }}>
              Các chính sách sau áp dụng cho hợp đồng này:
            </Text>
            <Text style={{ fontWeight: 600, marginBottom: "12px" }}>
              1. Chính Sách Hoàn Tiền:
            </Text>
            <View style={{ ...styles.listItem, paddingLeft: "12px" }}>
              <Text>•</Text>
              <Text>
                Tất cả các khoản đặt cọc đều không được hoàn trả sau khi giai
                đoạn tương ứng hoàn thành và thanh toán được thực hiện. Nếu
                Khách hàng quyết định hủy sau khi đã đặt cọc, các giai đoạn còn
                lại sẽ không bị tính phí, nhưng khoản đặt cọc ban đầu sẽ bị mất.
              </Text>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ ...styles.content, borderRadius: 10 }}>
            <Text style={{ fontWeight: 600, marginBottom: "12px" }}>
              2. Thay Đổi Thiết Kế:
            </Text>
            <View style={{ ...styles.listItem, paddingLeft: "12px" }}>
              <Text>•</Text>
              <Text>
                Sau khi ký kết hợp đồng và đặt cọc lần thứ nhất, bản thiết kế
                thỏa thuận sẽ không thể sửa đổi. Trường hợp muốn sửa đổi sẽ phải
                quay về giai đoạn thiết kế và đơn gia công hiện tại sẽ bị hủy.
              </Text>
            </View>

            <Text style={{ fontWeight: 600, marginBottom: "12px" }}>
              3. Thời Gian Hoàn Thành:
            </Text>
            <View style={{ ...styles.listItem, paddingLeft: "12px" }}>
              <Text>•</Text>
              <Text>
                Nhẫn dự kiến sẽ được hoàn thành trong vòng 6 tuần kể từ khi ký
                hợp đồng này, trừ các trường hợp bất khả kháng.
              </Text>
            </View>
            <View style={{ ...styles.listItem, paddingLeft: "12px" }}>
              <Text>•</Text>
              <Text>
                Bất kỳ sự chậm trễ nào sẽ được thông báo kịp thời cho Khách
                hàng.
              </Text>
            </View>

            <Text style={{ fontWeight: 600, marginBottom: "12px" }}>
              4. Đảm Bảo Chất Lượng:
            </Text>
            <View style={{ ...styles.listItem, paddingLeft: "12px" }}>
              <Text>•</Text>
              <Text>
                Doanh nghiệp cam kết sản phẩm cuối cùng sẽ đáp ứng các tiêu
                chuẩn và thông số kỹ thuật đã thỏa thuận. Trong trường hợp có
                lỗi hoặc sai sót, nhẫn sẽ được sửa chữa miễn phí.
              </Text>
            </View>

            <Text style={styles.title}>Giải Quyết Tranh Chấp</Text>
            <Text>
              Mọi tranh chấp phát sinh từ hợp đồng này sẽ được giải quyết thông
              qua thương lượng. Nếu không đạt được thỏa thuận, cả hai bên đồng ý
              nhờ bên thứ ba tại Trường FPT làm trung gian giả quyết vấn đề.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ ...styles.content, borderRadius: 10 }}>
            <Text style={styles.title}>Chữ Ký và Cam Kết</Text>
            <Text>
              <Text style={{ fontWeight: 600, marginBottom: "30px" }}>
                TRƯỚC SỰ CHỨNG KIẾN CỦA HAI BÊN
              </Text>
              , bằng cách ký tên dưới đây, cả hai bên xác nhận rằng đã đọc, hiểu
              và đồng ý với các điều khoản và điều kiện được nêu trong Hợp đồng
              Gia Công Nhẫn này.
            </Text>

            <View style={styles.signature}>
              <View style={{ width: "35%", textAlign: "center" }}>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}
                >
                  Khách Hàng
                </Text>
                <Image src={signature} />
                <Svg height={5} style={{ marginTop: "5px" }}>
                  <Line
                    x1="0"
                    y1="5"
                    x2="250"
                    y2="5"
                    strokeWidth={0.5}
                    stroke="#555"
                  />
                </Svg>
                <Text style={{ fontWeight: 600, marginVertical: "8px" }}>
                  Nguyễn Văn A
                </Text>
                <Text>Ngày {moment().format("DD-MM-YYYY")}</Text>
              </View>

              <View style={{ width: "35%", textAlign: "center" }}>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}
                >
                  Bên Cung Cấp Dịch Vụ:
                </Text>
                <Svg height={10} style={{ marginTop: "90px" }}>
                  <Line
                    x1="0"
                    y1="5"
                    x2="250"
                    y2="5"
                    strokeWidth={0.5}
                    stroke="#555"
                  />
                </Svg>
                <Text style={{ fontWeight: 600, marginVertical: "8px" }}>
                  Nguyễn Văn B
                </Text>
                <Text style={{ fontWeight: 600, marginBottom: "8px" }}>
                  Công Ty TNHH Couple Ring
                </Text>
                <Text>Ngày {moment().format("DD-MM-YYYY")}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    fontFamily: "Be Vietnam Pro",
    color: "#3a3a3a",
    fontSize: "10px",
  },
  section: {
    margin: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  header: {
    backgroundColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ringWhite: {
    width: 28,
  },
  brand: {
    fontSize: 15,
    fontWeight: 600,
    color: "white",
  },
  name: {
    color: "#FBE6A8",
    fontSize: 14,
    marginTop: 5,
    fontWeight: 500,
  },
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "30px",
    paddingVertical: "15px",
  },
  contact: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: "5px",
    color: "#888",
    fontWeight: 300,
    fontSize: "10px",
  },
  icon: {
    width: "10px",
  },
  content: {
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: "30px",
  },
  sides: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    fontWeight: 300,
    marginBottom: "12px",
  },
  website: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    marginBottom: "20px",
  },
  title: {
    backgroundColor: "black",
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    paddingVertical: "12px",
    marginBottom: "26px",
    fontWeight: 500,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: "12px",
    lineHeight: "2px",
    gap: "8px",
  },
  table: {
    width: "100%",
    border: "1px solid #8f8f8f",
    borderRadius: "10px",
    marginBottom: "16px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
    paddingLeft: 8,
    fontWeight: 300,
  },
  head: {
    backgroundColor: "#D9D9D9",
    fontWeight: 600,
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
  },
  col1: {
    width: "45%",
  },
  col2: {
    width: "15%",
  },
  col3: {
    width: "40%",
  },
  signature: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "35px",
  },
});

export default ContractFile;
