import { Grid, Skeleton } from "@mui/material";
import styles from "./CraftingProcess.module.scss";
import CraftingStage from "src/components/craftingStage/CraftingStage";
import sample from "src/assets/sampledata/ringdesign.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "src/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCraftingStages,
  fetchCustomOrderDetail,
} from "src/utils/querykey";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import { getCraftingStages } from "src/services/craftingStage.service";

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
    progress: 50,
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
    progress: 75,
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
    progress: 100,
  },
];

function CraftingProcess() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [filterObj, setFilterObj] = useState<ICraftingStageFilter | null>(null);

  const { orderId } = useParams<{ orderId: string }>();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, orderId],

    queryFn: () => {
      if (orderId) return getCustomOrderDetail(+orderId);
    },
    enabled: !!orderId,
  });

  const { data: stageResponse } = useQuery({
    queryKey: [fetchCraftingStages, filterObj],

    queryFn: () => {
      if (filterObj) return getCraftingStages(filterObj);
    },
    enabled: !!filterObj,
  });

  useEffect(() => {
    if (response && response.data) {
      const { customer } = response.data.customOrder;

      if (customer.id !== userId) navigate("/customer/support/custom-order");

      setOrder(response.data.customOrder);
    }

    if (response && response.errors) {
      navigate("/customer/support/custom-order");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (stageResponse && stageResponse.errors) {
      navigate("/customer/support/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResponse]);

  useEffect(() => {
    if (orderId)
      setFilterObj({
        page: 0,
        pageSize: 100,
        customOrderId: +orderId,
      });
  }, [orderId]);

  if (!order || !stageResponse)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid container item xs={9} mb={3} gap={3}>
          <Skeleton variant="rectangular" width={"100%"} height={200} />
          <Skeleton variant="rectangular" width={"100%"} height={200} />
          <Skeleton variant="rectangular" width={"100%"} height={200} />
        </Grid>
      </Grid>
    );

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
