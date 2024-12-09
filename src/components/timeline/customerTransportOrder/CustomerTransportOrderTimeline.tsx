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
import { TimelineDotColor } from "src/utils/constants";
import { TransportOrderStatus } from "src/utils/enums";

function CustomerTransportOrderTimeline(
  props: ICustomerTransportOrderTimelineProps
) {
  const { order } = props;

  const formatTransportTimelineText = (status: TransportOrderStatus) => {
    if (status === TransportOrderStatus.Waiting)
      return "Đơn được giao cho bên vận chuyển";

    if (status === TransportOrderStatus.OnGoing)
      return "Đơn hàng đã được đưa lên xe";

    if (status === TransportOrderStatus.Delivering) return "Bắt đầu giao";

    if (status === TransportOrderStatus.Redelivering)
      return "Đang chờ giao lại";

    if (status === TransportOrderStatus.Completed)
      return "Đơn hàng đã giao thành công";

    if (status === TransportOrderStatus.Rejected) return "Từ chối nhận hàng";
  };

  const formatTransportTimelineColor = (
    status: TransportOrderStatus
  ): TimelineDotColor => {
    if (status === TransportOrderStatus.Waiting) return "warning";

    if (status === TransportOrderStatus.OnGoing) return "info";

    if (status === TransportOrderStatus.Delivering) return "info";

    if (status === TransportOrderStatus.Redelivering) return "warning";

    if (status === TransportOrderStatus.Completed) return "success";

    if (status === TransportOrderStatus.Rejected) return "error";

    return "grey";
  };

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {order.transportOrderHistories
        .sort((a, b) => {
          return a.createdAt.localeCompare(b.createdAt);
        })
        .map((item) => {
          if (item.status !== TransportOrderStatus.Pending)
            return (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent color="textSecondary">
                  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    color={formatTransportTimelineColor(item.status)}
                  />
                  {item.status !== TransportOrderStatus.Completed && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  {formatTransportTimelineText(item.status)}
                </TimelineContent>
              </TimelineItem>
            );
        })}
    </Timeline>
  );
}

export default CustomerTransportOrderTimeline;
