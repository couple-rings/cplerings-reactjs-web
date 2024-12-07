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
import { TransportOrderStatus } from "src/utils/enums";

function CustomerTransportOrderTimeline(
  props: ICustomerTransportOrderTimelineProps
) {
  const { order } = props;

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {/* Order assigned */}
      {order.transportOrderHistories.find(
        (item) => item.status === TransportOrderStatus.Waiting
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.transportOrderHistories.find(
                (item) => item.status === TransportOrderStatus.Waiting
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="warning" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Đơn được giao cho bên vận chuyển</TimelineContent>
        </TimelineItem>
      )}

      {/* Praparing order */}
      {order.transportOrderHistories.find(
        (item) => item.status === TransportOrderStatus.OnGoing
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.transportOrderHistories.find(
                (item) => item.status === TransportOrderStatus.OnGoing
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Đơn hàng đã được đưa lên xe</TimelineContent>
        </TimelineItem>
      )}

      {/* Delivery started*/}
      {order.transportOrderHistories.find(
        (item) => item.status === TransportOrderStatus.Delivering
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.transportOrderHistories.find(
                (item) => item.status === TransportOrderStatus.Delivering
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Bắt đầu giao</TimelineContent>
        </TimelineItem>
      )}

      {/* Waiting to deliver again */}
      {order.transportOrderHistories.find(
        (item) => item.status === TransportOrderStatus.Redelivering
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.transportOrderHistories.find(
                (item) => item.status === TransportOrderStatus.Redelivering
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="warning" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Đang chờ giao lại</TimelineContent>
        </TimelineItem>
      )}

      {/* Delivery completed */}
      {order.transportOrderHistories.find(
        (item) => item.status === TransportOrderStatus.Completed
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.transportOrderHistories.find(
                (item) => item.status === TransportOrderStatus.Completed
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent>Đơn hàng đã giao thành công</TimelineContent>
        </TimelineItem>
      )}

      {/* Delivery rejected */}
      {order.transportOrderHistories.find(
        (item) => item.status === TransportOrderStatus.Rejected
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              order.transportOrderHistories.find(
                (item) => item.status === TransportOrderStatus.Rejected
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" />
          </TimelineSeparator>
          <TimelineContent>Giao hàng thất bại</TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}

export default CustomerTransportOrderTimeline;
