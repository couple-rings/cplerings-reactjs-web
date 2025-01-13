import { Button, Card, Chip, Grid } from "@mui/material";
import styles from "./CraftingStage.module.scss";
import { secondaryBtn } from "src/utils/styles";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import placeholder from "src/assets/stageplaceholder.png";
import { CraftingStageStatus, CustomOrderStatus } from "src/utils/enums";
import { useNavigate } from "react-router-dom";

function CraftingStage(props: ICraftingStageProps) {
  const { steps, data, name, previousStage, order } = props;
  const { image, status, completionDate } = data;

  const navigate = useNavigate();

  return (
    <Card className={styles.container}>
      <Grid
        container
        p={3}
        justifyContent={{ xs: "center", md: "space-between" }}
      >
        <Grid item xs={12} sm={6} md={3} mb={{ xs: 5, md: 0 }}>
          <img
            src={image ? image.url : placeholder}
            className={styles.previewImg}
          />
        </Grid>

        <Grid container item md={8.5} justifyContent={"space-between"}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={2}
          >
            <Grid item sm={8} className={styles.title} mb={{ xs: 3, md: 0 }}>
              {name}
            </Grid>
            <Grid item mb={{ xs: 2, md: 0 }}>
              {status === CraftingStageStatus.Paid &&
                !completionDate &&
                order.status !== CustomOrderStatus.Canceled && (
                  <Chip label={"Đang Tiến Hành"} color="info" />
                )}
              {status === CraftingStageStatus.Paid &&
                !completionDate &&
                order.status === CustomOrderStatus.Canceled && (
                  <Chip label={"Đã Hủy"} color="error" />
                )}
              {status === CraftingStageStatus.Pending && (
                <Chip label={"Chưa Thanh Toán"} color="warning" />
              )}
              {completionDate && (
                <Chip label={"Đã Hoàn Thành"} color="success" />
              )}
            </Grid>
          </Grid>

          <Grid container mb={{ xs: 5, md: 0 }}>
            <Grid container item>
              {steps.map((item, index) => {
                return (
                  <Grid
                    container
                    alignItems={"flex-start"}
                    gap={2}
                    mb={2}
                    key={index}
                  >
                    <Grid item mt={"3px"}>
                      <VerifiedRoundedIcon />
                    </Grid>
                    <Grid item flex={1} className={styles.info}>
                      {item}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          {status === CraftingStageStatus.Pending &&
            (!previousStage || previousStage.completionDate) &&
            order.status !== CustomOrderStatus.Canceled && (
              <Grid
                container
                alignItems={"flex-end"}
                justifyContent={"flex-end"}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    sx={secondaryBtn}
                    onClick={() =>
                      navigate(
                        `/customer/support/custom-order/${order.id}/deposit/${data.id}`
                      )
                    }
                  >
                    Thanh Toán
                  </Button>
                </Grid>
              </Grid>
            )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default CraftingStage;
