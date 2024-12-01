import { Grid, Skeleton } from "@mui/material";
import styles from "./CraftingProcess.module.scss";
import CraftingStage from "src/components/craftingStage/CraftingStage";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCraftingStages,
  fetchCustomOrderDetail,
} from "src/utils/querykey";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import { getCraftingStages } from "src/services/craftingStage.service";
import { stages } from "src/utils/constants";
import CustomerCustomOrderTimeline from "src/components/timeline/customerCustomOrder/CustomerCustomOrderTimeline";

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
              />
            )}
          </Grid>

          <Grid item md={8}>
            {stageResponse.data?.items.map((item, index, list) => {
              const steps = stages.find(
                (stage) => stage.progress === item.progress
              )?.steps;

              const name = stages.find(
                (stage) => stage.progress === item.progress
              )?.name;

              return (
                <CraftingStage
                  key={item.id}
                  data={item}
                  steps={steps ? steps : []}
                  name={name ? name : item.name}
                  orderId={order.id}
                  previousStage={index !== 0 ? list[index - 1] : undefined}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CraftingProcess;
