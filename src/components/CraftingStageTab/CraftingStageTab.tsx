import { Grid, Chip } from "@mui/material";
import styles from "./CraftingStageTab.module.scss";
import { CraftingStageStatus } from "src/utils/enums";
import moment from "moment";
import { currencyFormatter } from "src/utils/functions";

interface ICraftingStageTabProps {
  stages: ICraftingStage[];
  order: ICustomOrder;
}

function CraftingStageTab({ stages, order }: ICraftingStageTabProps) {
  return (
    <Grid container spacing={2}>
      {stages.map((stage, index) => (
        <Grid item xs={12} key={stage.id}>
          <div className={styles.stageCard}>
            <div className={styles.stageHeader}>
              <div className={styles.stageTitle}>Giai đoạn {index + 1}</div>
              <div className={styles.stageStatus}>
                {stage.status === CraftingStageStatus.Paid && 
                 !stage.completionDate && (
                  <Chip label="Đang Tiến Hành" color="info" />
                )}
                {stage.status === CraftingStageStatus.Pending && (
                  <Chip label="Chưa Thanh Toán" color="warning" />
                )}
                {stage.completionDate && (
                  <Chip label="Đã Hoàn Thành" color="success" />
                )}
              </div>
            </div>

            <div className={styles.stageDetails}>
              <div className={styles.detailRow}>
                <span>Ngày tạo:</span>
                <span>{moment(order.createdAt).format("DD/MM/YYYY HH:mm")}</span>
              </div>
              {stage.completionDate && (
                <div className={styles.detailRow}>
                  <span>Ngày hoàn thành:</span>
                  <span>
                    {moment(stage.completionDate).format("DD/MM/YYYY HH:mm")}
                  </span>
                </div>
              )}
              <div className={styles.detailRow}>
                <span>Số tiền:</span>
                <span>{currencyFormatter(stage.payment.amount.amount)}</span>
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default CraftingStageTab; 