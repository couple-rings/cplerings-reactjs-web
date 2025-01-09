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
  ConfigurationKey,
  CraftingStageStatus,
  CustomOrderStatus,
  TransportOrderStatus,
} from "src/utils/enums";
import { useAppSelector } from "src/utils/hooks";
import { fetchCraftingStages } from "src/utils/querykey";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { IconButton } from "@mui/material";
import ViewModal from "src/components/modal/payment/View.modal";

function StaffCustomOrderTimeline(props: IStaffCustomOrderTimelineProps) {
  const { order, transportOrder } = props;

  const [firstStage, setFirstStage] = useState<ICraftingStage | null>(null);
  const [secondStage, setSecondStage] = useState<ICraftingStage | null>(null);
  const [thirdStage, setThirdStage] = useState<ICraftingStage | null>(null);

  const [payment, setPayment] = useState<IPayment | null>(null);
  const [open, setOpen] = useState(false);

  const [stageFilterObj, setStageFilterObj] =
    useState<ICraftingStageFilter | null>(null);

  const navigate = useNavigate();

  const { configs } = useAppSelector((state) => state.config);

  const { data: stageResponse } = useQuery({
    queryKey: [fetchCraftingStages, stageFilterObj],

    queryFn: () => {
      if (stageFilterObj) return getCraftingStages(stageFilterObj);
    },
    enabled: !!stageFilterObj,
  });

  useEffect(() => {
    if (stageResponse?.data) {
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
        const firstStage = stageResponse.data.items.find(
          (item) => item.progress === +firstStageProgress
        );

        const secondStage = stageResponse.data.items.find(
          (item) => item.progress === +secondStageProgress
        );

        const thirdStage = stageResponse.data.items.find(
          (item) => item.progress === +thirdStageProgress
        );

        if (firstStage && secondStage && thirdStage) {
          setFirstStage(firstStage);
          setSecondStage(secondStage);
          setThirdStage(thirdStage);
        }
      }
    }

    if (stageResponse?.errors) {
      navigate("/staff/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResponse, configs]);

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
          <TimelineContent>
            Đặt cọc giai đoạn 1{" "}
            {firstStage && (
              <IconButton
                onClick={() => {
                  setPayment(firstStage.payment);
                  setOpen(true);
                }}
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            )}
          </TimelineContent>
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
          <TimelineContent>
            Hoàn tất đặt cọc giai đoạn 2
            {secondStage && (
              <IconButton
                onClick={() => {
                  setPayment(secondStage.payment);
                  setOpen(true);
                }}
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            )}
          </TimelineContent>
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
          <TimelineContent>
            Hoàn tất đặt cọc giai đoạn 3
            {thirdStage && (
              <IconButton
                onClick={() => {
                  setPayment(thirdStage.payment);
                  setOpen(true);
                }}
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            )}
          </TimelineContent>
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
            <TimelineContent>Khách từ chối nhận hàng</TimelineContent>
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
            <TimelineContent>Khách đã nhận hàng</TimelineContent>
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

      {payment && (
        <ViewModal
          open={open}
          setOpen={setOpen}
          amount={payment.vnPayTransaction?.amount.amount ?? 0}
          status={payment.status}
          date={payment.vnPayTransaction?.payDate ?? ""}
          description={payment.description}
          type={payment.type}
        />
      )}
    </Timeline>
  );
}

export default StaffCustomOrderTimeline;
