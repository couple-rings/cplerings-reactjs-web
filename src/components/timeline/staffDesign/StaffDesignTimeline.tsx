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
import { getCustomDesigns } from "src/services/customDesign.service";
import { CustomRequestStatus, StaffPosition } from "src/utils/enums";
import { useAppSelector } from "src/utils/hooks";
import { fetchCustomDesigns } from "src/utils/querykey";

function DesignTimeline(props: IStaffDesignTimelineProps) {
  const { customRequest, designVersions } = props;

  const [designFilterObj, setDesignFilterObj] =
    useState<ICustomDesignFilter | null>(null);

  const { staffPosition } = useAppSelector((state) => state.auth.userInfo);

  const { data: designResponse } = useQuery({
    queryKey: [fetchCustomDesigns, designFilterObj],

    queryFn: () => {
      if (designFilterObj) return getCustomDesigns(designFilterObj);
    },
    enabled: !!designFilterObj,
  });

  useEffect(() => {
    setDesignFilterObj({
      page: 0,
      pageSize: 100,
      customerId: customRequest.customer.id,
    });
  }, [customRequest]);

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {/* Create custom request */}
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          {moment(customRequest.createdAt).format("DD/MM/YYYY HH:mm")}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="warning" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Khách hàng thanh toán tiền thiết kế</TimelineContent>
      </TimelineItem>

      {/* Accept custom request */}
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          {moment(
            customRequest.customRequestHistories.find(
              (item) => item.status === CustomRequestStatus.OnGoing
            )?.createdAt
          ).format("DD/MM/YYYY HH:mm")}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="info" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {staffPosition === StaffPosition.Designer &&
            "Tiếp nhận yêu cầu thiết kế"}{" "}
          {staffPosition === StaffPosition.Sales &&
            "Giao yêu cầu cho nhân viên thiết kế"}
        </TimelineContent>
      </TimelineItem>

      {/* Completed versions */}
      {designVersions.map((item) => {
        if (moment(item.createdAt).isAfter(moment(customRequest.createdAt)))
          return (
            <TimelineItem key={item.id}>
              <TimelineOppositeContent color="textSecondary">
                {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="info" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                Hoàn tất bản thiết kế version {item.versionNumber}
              </TimelineContent>
            </TimelineItem>
          );
      })}

      {/* Confirmed version */}
      {designVersions.find((item) => item.isAccepted) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              designVersions.find((item) => item.isAccepted)?.acceptedAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="info" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Khách Hàng chốt bản thiết kế</TimelineContent>
        </TimelineItem>
      )}

      {/* Create custom design */}
      {designResponse?.data &&
        designResponse.data.items.length > 0 &&
        designResponse.data.items.find(
          (item) => item.designVersion.isAccepted
        ) && (
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
              {moment(
                designResponse.data.items.find(
                  (item) => item.designVersion.isAccepted
                )?.createdAt
              ).format("DD/MM/YYYY HH:mm")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="info" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Hoàn chỉnh bản thiết kế</TimelineContent>
          </TimelineItem>
        )}

      {/* Complete custom request */}
      {customRequest.customRequestHistories.find(
        (item) => item.status === CustomRequestStatus.Completed
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              customRequest.customRequestHistories.find(
                (item) => item.status === CustomRequestStatus.Completed
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent>Hoàn thành quá trình thiết kế</TimelineContent>
        </TimelineItem>
      )}

      {/* Cancel custom request */}
      {customRequest.customRequestHistories.find(
        (item) => item.status === CustomRequestStatus.Canceled
      ) && (
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            {moment(
              customRequest.customRequestHistories.find(
                (item) => item.status === CustomRequestStatus.Canceled
              )?.createdAt
            ).format("DD/MM/YYYY HH:mm")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" />
          </TimelineSeparator>
          <TimelineContent>Khách hàng hủy thiết kế</TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}

export default DesignTimeline;
