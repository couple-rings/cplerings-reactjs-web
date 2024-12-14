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
import { StandardOrderStatus, TransportOrderStatus } from "src/utils/enums";

function StaffStandardOrderTimeline(props: IStaffStandardOrderTimelineProps) {
  const { order } = props;

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {/* Create standard order */}
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="warning" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Đơn được tạo</TimelineContent>
      </TimelineItem>

      {/* Order paid */}
      {order.standardOrderHistories.find(
        (item) => item.status === StandardOrderStatus.Paid
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.standardOrderHistories.find(
                (item) => item.status === StandardOrderStatus.Paid
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Khách hàng hoàn tất thanh toán</TimelineContent>
        </TimelineItem>
      )}

      {/* Order assigned for delivery */}
      {order.standardOrderHistories.find(
        (item) => item.status === StandardOrderStatus.Delivering
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.standardOrderHistories.find(
                (item) => item.status === StandardOrderStatus.Delivering
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Giao đơn cho bên vận chuyển</TimelineContent>
        </TimelineItem>
      )}

      {/* Order being rejected */}
      {order.standardOrderHistories.find(
        (item) => item.status === StandardOrderStatus.Completed
      ) &&
        order.transportationOrders.length !== 0 &&
        order.transportationOrders[0].transportOrderHistories.find(
          (item) => item.status === TransportOrderStatus.Rejected
        ) && (
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              {moment(
                order.transportationOrders[0].transportOrderHistories.find(
                  (item) => item.status === TransportOrderStatus.Rejected
                )?.createdAt
              ).format("DD/MM/YYYY HH:mm")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Khách từ chối nhận hàng</TimelineContent>
          </TimelineItem>
        )}

      {/* Complete order */}
      {order.standardOrderHistories.find(
        (item) => item.status === StandardOrderStatus.Completed
      ) &&
        (order.transportationOrders.length === 0 ||
          order.transportationOrders[0].transportOrderHistories.find(
            (item) => item.status === TransportOrderStatus.Completed
          )) && (
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              {order.transportationOrders.length > 0 &&
                moment(
                  order.transportationOrders[0].transportOrderHistories.find(
                    (item) => item.status === TransportOrderStatus.Completed
                  )?.createdAt
                ).format("DD/MM/YYYY HH:mm")}

              {order.transportationOrders.length === 0 &&
                moment(
                  order.standardOrderHistories.find(
                    (item) => item.status === StandardOrderStatus.Completed
                  )?.createdAt
                ).format("DD/MM/YYYY HH:mm")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" />
              {order.standardOrderHistories.find(
                (item) => item.status === StandardOrderStatus.Refunded
              ) && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>Khách đã nhận hàng</TimelineContent>
          </TimelineItem>
        )}

      {/* Refund order */}
      {order.standardOrderHistories.find(
        (item) => item.status === StandardOrderStatus.Refunded
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.standardOrderHistories.find(
                (item) => item.status === StandardOrderStatus.Refunded
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" />
          </TimelineSeparator>
          <TimelineContent>Đơn đã được hoàn tiền</TimelineContent>
        </TimelineItem>
      )}

      {/* Cancel order */}
      {order.standardOrderHistories.find(
        (item) => item.status === StandardOrderStatus.Canceled
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.standardOrderHistories.find(
                (item) => item.status === StandardOrderStatus.Canceled
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" />
          </TimelineSeparator>
          <TimelineContent>Xác nhận hủy đơn</TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}

export default StaffStandardOrderTimeline;
