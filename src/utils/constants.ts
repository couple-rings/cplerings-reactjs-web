import store from "src/assets/store.png";
import story from "src/assets/story.jpg";
import loveCheck from "src/assets/header_love_check.jpg";
import loveAgreement from "src/assets/header_love_agreement.jpg";

export const pageSize = 8;

export const certificateTabData = [
  {
    title: "Minh Chứng Tình Yêu",
    subTitle: "Bắt Đầu Ngay >",
    path: "/",
    img: loveCheck,
  },
  {
    title: "Bảng Vinh Danh Tình Yêu",
    subTitle: "Xem Thêm >",
    path: "/love-agreement",
    img: loveAgreement,
  },
];
export const aboutTabData = [
  {
    title: "Sứ Mệnh CR",
    subTitle: "Khám Phá Thêm >",
    img: story,
    path: "/",
  },
  {
    title: "Tìm Cửa Hàng",
    subTitle: "Tìm Hiểu Thêm >",
    img: store,
    path: "/stores",
  },
];

export const diamondColors = [
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export const diamondClarity = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "I1",
  "I2",
  "I3",
];
export const diamondShapes = [
  "Round",
  "Princess",
  "Oval",
  "Marquise",
  "Pear",
  "Cushion",
  "Emerald",
  "Asscher",
  "Radiant",
  "Heart",
  "Trillion",
];
export const goldK = ["14K", "18K"];
export const prices = [
  "Dưới 20 Triệu",
  "20 - 40 Triệu",
  "40 - 50 Triệu",
  "Trên 50 Triệu",
];
// export const stages = [
//   {
//     name: "Hoàn Thành 50% - Đúc khuôn nhẫn",
//     steps: [
//       "Nguyên liệu thô được lựa chọn và kiểm tra kỹ lưỡng để đảm bảo chất lượng",
//       "Phần khung của nhẫn được đúc hoặc tạo hình từ kim loại đã chọn.",
//     ],
//     progress: StagePercentage.First,
//   },
//   {
//     name: "Hoàn Thành 75% - Gắn kim cương và Đánh bóng",
//     steps: [
//       "Từng viên kim cương được đặt cẩn thận lên khuôn nhẫn, đảm bảo vị trí và góc độ tối ưu để viên đá tỏa sáng rực rỡ nhất khi đeo.",
//       "Các nét trang trí bổ sung được áp dụng để đáp ứng các yêu cầu tùy chỉnh.",
//     ],
//     progress: StagePercentage.Second,
//   },
//   {
//     name: "Hoàn Thành 100% - Đóng gói và Hoàn tất",
//     steps: [
//       "Khắc lên nhẫn theo yêu cầu để tạo dấu ấn cá nhân riêng biệt (Nếu khách hàng có yêu cầu).",
//       "Chuẩn bị giấy tờ chứng nhận chất lượng kim cương và đóng gói cẩn thận trong hộp sang trọng, sẵn sàng để giao hàng.",
//     ],
//     progress: StagePercentage.Third,
//   },
// ];

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const phonePattern = /^(0)\d{9}$/;
export const validAttachments = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/msword",
];

export const companyEmail = "couplerings.sep@gmail.com";
export const companyName = "Công Ty TNHH Couple Ring";
export const companyAddress =
  "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh";
export const companyPhone = "0928226767";

export const messageCardBg = "#e5efff";
export const drawerWidth = 260;
export type ChipColor =
  | "info"
  | "error"
  | "success"
  | "default"
  | "primary"
  | "secondary"
  | "warning";

export type TimelineDotColor =
  | "info"
  | "error"
  | "success"
  | "primary"
  | "secondary"
  | "warning"
  | "inherit"
  | "grey";

export const metalWeightUnit = 3.75; // 1 chỉ vàng = 3.75 gram
export const meleeDiamondCarat = 0.008;

export const standardOrderPayment = "Đặt mua trang sức";
export const designFeePayment = "Thanh toán phí thiết kế";
export const depositPayment = "Thanh toán tiền đặt cọc";

export const firstStageName = "Hoàn Thành 50% - Đúc khuôn nhẫn";
export const secondStageName = "Hoàn Thành 75% - Gắn kim cương và Đánh bóng";
export const thirdStageName = "Hoàn Thành 100% - Đóng gói và Hoàn tất";

export const firstStageSteps = [
  "Nguyên liệu thô được lựa chọn và kiểm tra kỹ lưỡng để đảm bảo chất lượng",
  "Phần khung của nhẫn được đúc hoặc tạo hình từ kim loại đã chọn.",
];
export const secondStageSteps = [
  "Từng viên kim cương được đặt cẩn thận lên khuôn nhẫn, đảm bảo vị trí và góc độ tối ưu để viên đá tỏa sáng rực rỡ nhất khi đeo.",
  "Các nét trang trí bổ sung được áp dụng để đáp ứng các yêu cầu tùy chỉnh.",
];
export const thirdStageSteps = [
  "Khắc lên nhẫn theo yêu cầu để tạo dấu ấn cá nhân riêng biệt (Nếu khách hàng có yêu cầu).",
  "Chuẩn bị giấy tờ chứng nhận chất lượng kim cương và đóng gói cẩn thận trong hộp sang trọng, sẵn sàng để giao hàng.",
];
