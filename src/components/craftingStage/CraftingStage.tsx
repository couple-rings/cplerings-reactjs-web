import { Button, Card, Chip, Grid } from "@mui/material";
import styles from "./CraftingStage.module.scss";
import { secondaryBtn } from "src/utils/styles";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import placeholder from "src/assets/stageplaceholder.png";
import { CraftingStageStatus } from "src/utils/enums";
import { useNavigate } from "react-router-dom";

function CraftingStage(props: ICraftingStageProps) {
  const { steps, data, name, previousStage, orderId } = props;
  const { image, status, completionDate } = data;

  const navigate = useNavigate();

  return (
    <Card className={styles.container}>
      <Grid container p={5} justifyContent={"space-between"}>
        <Grid item lg={3} mb={{ xs: 5, lg: 0 }}>
          <img
            src={image ? image.url : placeholder}
            className={styles.previewImg}
          />
        </Grid>

        <Grid container item lg={8.5} justifyContent={"space-between"}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={2}
          >
            <Grid item className={styles.title} mb={{ xs: 3, lg: 0 }}>
              {name}
            </Grid>
            <Grid item mb={{ xs: 3, lg: 0 }}>
              {status === CraftingStageStatus.Paid && (
                <Chip label={"Đang Tiến Hành"} color="info" />
              )}
              {status === CraftingStageStatus.Pending && (
                <Chip label={"Chưa Thanh Toán"} color="warning" />
              )}
              {completionDate && (
                <Chip label={"Đã Hoàn Thành"} color="success" />
              )}
            </Grid>
          </Grid>

          <Grid container mb={{ xs: 5, lg: 0 }}>
            <Grid container item md={8}>
              {steps.map((item, index) => {
                return (
                  <Grid
                    container
                    alignItems={"flex-start"}
                    gap={2}
                    mb={3}
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
            (!previousStage || previousStage.completionDate) && (
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
                        `/customer/support/custom-order/${orderId}/deposit/${data.id}`
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
