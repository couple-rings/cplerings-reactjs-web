import { Grid } from "@mui/material";
import styles from "./CraftingProcess.module.scss";
import CraftingStage from "src/components/craftingStage/CraftingStage";
import sample from "src/assets/sampledata/ringdesign.png";

const stages = [
  {
    id: 1,
    name: "Hoàn Thành 50% - Đúc Khuôn Nhẫn",
    image: sample,
    isPaid: true,
    steps: [
      "Nguyên liệu thô được lựa chọn và kiểm tra kỹ lưỡng để đảm bảo chất lượng",
      "Phần khung của nhẫn được đúc hoặc tạo hình từ kim loại đã chọn.",
    ],
  },
  {
    id: 2,
    name: "Hoàn Thành 75% - Gắn Kim Cương",
    image: "",
    isPaid: false,
    steps: [
      "Từng viên kim cương được đặt cẩn thận lên khuôn nhẫn, đảm bảo vị trí và góc độ tối ưu để viên đá tỏa sáng rực rỡ nhất khi đeo.",
      "Kim cương được gắn chắc chắn lên nhẫn, giúp bảo vệ đá khỏi rơi rớt và giữ cho nhẫn luôn đẹp hoàn hảo theo thời gian.",
    ],
  },
  {
    id: 3,
    name: "Hoàn Thành 100% - Hoàn Thiện Và Đóng Gói",
    image: "",
    isPaid: false,
    steps: [
      "Khắc lên nhẫn theo yêu cầu để tạo dấu ấn cá nhân riêng biệt (Nếu khách hàng có yêu cầu).",
      "Chuẩn bị giấy tờ chứng nhận chất lượng kim cương và đóng gói cẩn thận trong hộp sang trọng, sẵn sàng để trao đến tay bạn.",
    ],
  },
];

function CraftingProcess() {
  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid container item xs={10}>
        <div className={styles.title}>Quá Trình Gia Công</div>

        {stages.map((item) => {
          return <CraftingStage key={item.id} {...item} />;
        })}
      </Grid>
    </Grid>
  );
}

export default CraftingProcess;
