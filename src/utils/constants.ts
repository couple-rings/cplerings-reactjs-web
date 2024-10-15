import store from "src/assets/store.png";
import story from "src/assets/story.jpg";
import loveCheck from "src/assets/header_love_check.jpg";
import loveAgreement from "src/assets/header_love_agreement.jpg";

export const certificateTabData = [
  {
    title: "Minh Chứng Tình Yêu",
    subTitle: "Bắt Đầu Ngay >",
    img: loveCheck,
  },
  {
    title: "Khám Phá Thỏa Thuận Tình Yêu",
    subTitle: "Khám Phá Thêm >",
    img: loveAgreement,
  },
];

export const aboutTabData = [
  {
    title: "Sứ Mệnh CR",
    subTitle: "Khám Phá Thêm >",
    img: story,
  },
  {
    title: "Tìm Cửa Hàng",
    subTitle: "Tìm Hiểu Thêm >",
    img: store,
  },
];

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordPattern =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const phonePattern = /^(0)\d{9}$/;

export const validAttachments = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/msword",
];

export const messageCardBg = "#e5efff";
