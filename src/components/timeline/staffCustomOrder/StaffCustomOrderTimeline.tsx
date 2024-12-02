import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCraftingStages } from "src/services/craftingStage.service";
import {
  CraftingStageStatus,
  CustomOrderStatus,
  StagePercentage,
} from "src/utils/enums";
import { fetchCraftingStages } from "src/utils/querykey";

function StaffCustomOrderTimeline(props: IStaffCustomOrderTimelineProps) {
  const { order } = props;

  const [firstStage, setFirstStage] = useState<ICraftingStage | null>(null);
  const [secondStage, setSecondStage] = useState<ICraftingStage | null>(null);
  const [thirdStage, setThirdStage] = useState<ICraftingStage | null>(null);

  const [stageFilterObj, setStageFilterObj] =
    useState<ICraftingStageFilter | null>(null);

  const navigate = useNavigate();

  const { data: stageResponse } = useQuery({
    queryKey: [fetchCraftingStages, stageFilterObj],

    queryFn: () => {
      if (stageFilterObj) return getCraftingStages(stageFilterObj);
    },
    enabled: !!stageFilterObj,
  });

  useEffect(() => {
    if (stageResponse?.data) {
      const firstStage = stageResponse.data.items.find(
        (item) => item.progress === StagePercentage.First
      );

      const secondStage = stageResponse.data.items.find(
        (item) => item.progress === StagePercentage.Second
      );

      const thirdStage = stageResponse.data.items.find(
        (item) => item.progress === StagePercentage.Third
      );

      if (firstStage && secondStage && thirdStage) {
        setFirstStage(firstStage);
        setSecondStage(secondStage);
        setThirdStage(thirdStage);
      }
    }

    if (stageResponse?.errors) {
      navigate("/staff/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResponse]);

  useEffect(() => {
    if (order)
      setStageFilterObj({
        page: 0,
        pageSize: 100,
        customOrderId: order.id,
      });
  }, [order]);

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {/* Create custom order */}
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="warning" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Duyệt yêu cầu gia công</TimelineContent>
      </TimelineItem>

      {/* Sign contract */}
      {order.contract.signedDate && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(order.contract.signedDate).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Khách hàng ký hợp đồng</TimelineContent>
        </TimelineItem>
      )}

      {/* First deposit paid */}
      {order.customOrderHistories.find(
        (item) => item.status === CustomOrderStatus.Waiting
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.customOrderHistories.find(
                (item) => item.status === CustomOrderStatus.Waiting
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Đặt cọc giai đoạn 1</TimelineContent>
        </TimelineItem>
      )}

      {/* Custom order assigned to jeweler */}
      {order.customOrderHistories.find(
        (item) => item.status === CustomOrderStatus.InProgress
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.customOrderHistories.find(
                (item) => item.status === CustomOrderStatus.InProgress
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Giao đơn cho thợ gia công</TimelineContent>
        </TimelineItem>
      )}

      {/* First stage complete */}
      {firstStage?.completionDate && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(firstStage.completionDate).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Hoàn tất gia công giai đoạn 1</TimelineContent>
        </TimelineItem>
      )}

      {/* Second deposit paid */}
      {secondStage?.craftingStageHistories.find(
        (item) => item.status === CraftingStageStatus.Paid
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              secondStage?.craftingStageHistories.find(
                (item) => item.status === CraftingStageStatus.Paid
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Hoàn tất đặt cọc giai đoạn 2</TimelineContent>
        </TimelineItem>
      )}

      {/* Second stage complete */}
      {secondStage?.completionDate && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(secondStage.completionDate).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Hoàn tất gia công giai đoạn 2</TimelineContent>
        </TimelineItem>
      )}

      {/* Third deposit paid */}
      {thirdStage?.craftingStageHistories.find(
        (item) => item.status === CraftingStageStatus.Paid
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              secondStage?.craftingStageHistories.find(
                (item) => item.status === CraftingStageStatus.Paid
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Hoàn tất đặt cọc giai đoạn 3</TimelineContent>
        </TimelineItem>
      )}

      {/* Third stage complete */}
      {thirdStage?.completionDate && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(thirdStage.completionDate).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Hoàn tất quá trình gia công</TimelineContent>
        </TimelineItem>
      )}

      {/* Assigned for delivery */}
      {order.customOrderHistories.find(
        (item) => item.status === CustomOrderStatus.Delivering
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.customOrderHistories.find(
                (item) => item.status === CustomOrderStatus.Delivering
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Giao đơn cho nhân viên vận chuyển</TimelineContent>
        </TimelineItem>
      )}

      {/* Cancel custom order */}
      {order.customOrderHistories.find(
        (item) => item.status === CustomOrderStatus.Canceled
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.customOrderHistories.find(
                (item) => item.status === CustomOrderStatus.Canceled
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Hủy đơn gia công</TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}

export default StaffCustomOrderTimeline;