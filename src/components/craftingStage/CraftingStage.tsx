import { Button, Card, Chip, Grid } from "@mui/material";
import styles from "./CraftingStage.module.scss";
import { secondaryBtn } from "src/utils/styles";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import placeholder from "src/assets/stageplaceholder.png";

function CraftingStage(props: ICraftingStageProps) {
  const { image, isPaid, name, steps } = props;

  return (
    <Card className={styles.container}>
      <Grid container p={5} justifyContent={"space-between"}>
        <Grid item lg={3} mb={{ xs: 5, lg: 0 }}>
          <img
            src={image ? image : placeholder}
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
              {isPaid && <Chip label={"Đang Tiến Hành"} color="info" />}
              {!isPaid && <Chip label={"Chưa Thanh Toán"} color="warning" />}
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

          {!isPaid && (
            <Grid container alignItems={"flex-end"} justifyContent={"flex-end"}>
              <Grid item>
                <Button variant="contained" sx={secondaryBtn}>
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
