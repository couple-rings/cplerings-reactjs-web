import { Grid, Skeleton } from "@mui/material";
import styles from "./CraftingProcess.module.scss";
import CraftingStage from "src/components/craftingStage/CraftingStage";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCraftingStages,
  fetchCustomOrderDetail,
  fetchTransportOrdersWithCustomOrder,
} from "src/utils/querykey";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import { getCraftingStages } from "src/services/craftingStage.service";
import {
  firstStageName,
  firstStageSteps,
  secondStageName,
  secondStageSteps,
  thirdStageName,
  thirdStageSteps,
} from "src/utils/constants";
import CustomerCustomOrderTimeline from "src/components/timeline/customerCustomOrder/CustomerCustomOrderTimeline";
import LabelImportantSharpIcon from "@mui/icons-material/LabelImportantSharp";
import { ConfigurationKey } from "src/utils/enums";
import { getTransportOrderWithCustomOrder } from "src/services/transportOrder.service";

function CraftingProcess() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [filterObj, setFilterObj] = useState<ICraftingStageFilter | null>(null);

  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { configs } = useAppSelector((state) => state.config);

  const firstStageProgress = configs.find(
    (item) => item.key === ConfigurationKey.FirstStageProgress
  )?.value;
  const secondStageProgress = configs.find(
    (item) => item.key === ConfigurationKey.SecondStageProgress
  )?.value;
  const thirdStageProgress = configs.find(
    (item) => item.key === ConfigurationKey.ThirdStageProgress
  )?.value;

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

  const { data: transportResponse } = useQuery({
    queryKey: [fetchTransportOrdersWithCustomOrder, orderId],

    queryFn: () => {
      if (orderId) return getTransportOrderWithCustomOrder(+orderId);
    },
    enabled: !!orderId,
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

  useScrollTop();

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
      <Grid container item xs={11}>
        <div className={styles.title}>Quá Trình Gia Công</div>

        <Grid container>
          <Grid item md={4} mb={{ xs: 5, md: 0 }}>
            {stageResponse.data && stageResponse.data.items.length > 0 && (
              <CustomerCustomOrderTimeline
                order={order}
                stages={stageResponse.data.items}
                transportOrder={transportResponse?.data ?? undefined}
              />
            )}
          </Grid>

          <Grid item md={8}>
            {stageResponse.data?.items.map((item, index, list) => {
              let steps: string[] = [];
              let name = "";

              if (firstStageProgress && item.progress === +firstStageProgress) {
                steps = firstStageSteps;
                name = firstStageName;
              }

              if (
                secondStageProgress &&
                item.progress === +secondStageProgress
              ) {
                steps = secondStageSteps;
                name = secondStageName;
              }

              if (thirdStageProgress && item.progress === +thirdStageProgress) {
                steps = thirdStageSteps;
                name = thirdStageName;
              }

              return (
                <div key={item.id}>
                  <Grid container className={styles.label} gap={1} mb={2}>
                    <LabelImportantSharpIcon />
                    Giai đoạn {index + 1}
                  </Grid>
                  <CraftingStage
                    data={item}
                    steps={steps}
                    name={name ? name : item.name}
                    orderId={order.id}
                    previousStage={index !== 0 ? list[index - 1] : undefined}
                  />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CraftingProcess;
