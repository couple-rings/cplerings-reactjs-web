import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  ConfigurationKey,
  CraftingStageStatus,
  CustomOrderStatus,
  TransportOrderStatus,
} from "src/utils/enums";
import { useAppSelector } from "src/utils/hooks";

function CustomerCustomOrderTimeline(props: ICustomerCustomOrderTimelineProps) {
  const { order, stages, transportOrder } = props;

  const [firstStage, setFirstStage] = useState<ICraftingStage | null>(null);
  const [secondStage, setSecondStage] = useState<ICraftingStage | null>(null);
  const [thirdStage, setThirdStage] = useState<ICraftingStage | null>(null);

  const { configs } = useAppSelector((state) => state.config);

  useEffect(() => {
    if (stages && stages.length > 0) {
      const firstStageProgress = configs.find(
        (item) => item.key === ConfigurationKey.FirstStageProgress
      )?.value;
      const secondStageProgress = configs.find(
        (item) => item.key === ConfigurationKey.SecondStageProgress
      )?.value;
      const thirdStageProgress = configs.find(
        (item) => item.key === ConfigurationKey.ThirdStageProgress
      )?.value;

      if (firstStageProgress && secondStageProgress && thirdStageProgress) {
        const firstStage = stages.find(
          (item) => item.progress === +firstStageProgress
        );

        const secondStage = stages.find(
          (item) => item.progress === +secondStageProgress
        );

        const thirdStage = stages.find(
          (item) => item.progress === +thirdStageProgress
        );

        if (firstStage && secondStage && thirdStage) {
          setFirstStage(firstStage);
          setSecondStage(secondStage);
          setThirdStage(thirdStage);
        }
      }
    }
  }, [configs, stages]);

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
        <TimelineContent>Yêu cầu gia công được duyệt</TimelineContent>
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
          <TimelineContent>Hoàn tất ký hợp đồng</TimelineContent>
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
          <TimelineContent>Hoàn tất đặt cọc giai đoạn 1</TimelineContent>
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
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Đơn được giao cho thợ gia công</TimelineContent>
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
              thirdStage?.craftingStageHistories.find(
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

      {/* Order being rejected */}
      {order.customOrderHistories.find(
        (item) => item.status === CustomOrderStatus.Completed
      ) &&
        transportOrder &&
        transportOrder.transportOrderHistories.find(
          (item) => item.status === TransportOrderStatus.Rejected
        ) && (
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              {moment(
                transportOrder.transportOrderHistories.find(
                  (item) => item.status === TransportOrderStatus.Rejected
                )?.createdAt
              ).format("DD/MM/YYYY HH:mm")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Từ chối nhận hàng</TimelineContent>
          </TimelineItem>
        )}

      {/* Complete custom order */}
      {order.customOrderHistories.find(
        (item) => item.status === CustomOrderStatus.Completed
      ) &&
        (!transportOrder ||
          transportOrder.transportOrderHistories.find(
            (item) => item.status === TransportOrderStatus.Completed
          )) && (
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              {transportOrder
                ? moment(
                    transportOrder.transportOrderHistories.find(
                      (item) => item.status === TransportOrderStatus.Completed
                    )?.createdAt
                  ).format("DD/MM/YYYY HH:mm")
                : moment(
                    order.customOrderHistories.find(
                      (item) => item.status === CustomOrderStatus.Completed
                    )?.createdAt
                  ).format("DD/MM/YYYY HH:mm")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" />
              {order.customOrderHistories.find(
                (item) => item.status === CustomOrderStatus.Refunded
              ) && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>Đã nhận hàng</TimelineContent>
          </TimelineItem>
        )}

      {/* Refund custom order */}
      {order.customOrderHistories.find(
        (item) => item.status === CustomOrderStatus.Refunded
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.customOrderHistories.find(
                (item) => item.status === CustomOrderStatus.Refunded
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" />
          </TimelineSeparator>
          <TimelineContent>Đơn đã được hoàn tiền</TimelineContent>
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
          </TimelineSeparator>
          <TimelineContent>Hủy đơn gia công</TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}

export default CustomerCustomOrderTimeline;
