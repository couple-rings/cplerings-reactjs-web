import { FormLabel, Grid } from "@mui/material";
import styles from "./StandardOrderItem.module.scss";
import placeholder from "src/assets/default.jpg";
import { DesignCharacteristic } from "src/utils/enums";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { currencyFormatter } from "src/utils/functions";

function StandardOrderItem(props: IStandardOrderItemProps) {
  const { item } = props;

  const img = item.design.designMetalSpecifications.find(
    (i) => i.metalSpecification.id === item.metalSpecification.id
  )?.image.url;

  return (
    <Grid container className={styles.jewelry}>
      <Grid item sm={4} lg={2.5}>
        <img src={img ? img : placeholder} className={styles.image} />
      </Grid>

      <Grid container item sm={7.5} lg={9}>
        <Grid item className={styles.name}>
          {item.design.name}
        </Grid>

        <Grid item xs={12}>
          {item.design.characteristic === DesignCharacteristic.Male && (
            <div>
              <img src={male} className={styles.genderIcon} /> {"Nam Tính"}
            </div>
          )}

          {item.design.characteristic === DesignCharacteristic.Female && (
            <div>
              <img src={female} className={styles.genderIcon} /> {"Nữ Tính"}
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          <FormLabel>Bộ Sưu Tập {item.design.designCollection.name}</FormLabel>
        </Grid>

        <Grid container justifyContent={"space-between"}>
          <Grid container item md={6} gap={2}>
            <Grid item>Chất liệu:</Grid>

            <Grid item>{item.metalSpecification.name}</Grid>
          </Grid>

          <Grid container item md={6} gap={2}>
            <Grid item>Kích thước:</Grid>

            <Grid item>{item.design.size} cm</Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"space-between"}>
          <Grid container item md={6} gap={2}>
            <Grid item>Kim cương phụ:</Grid>

            <Grid item>{item.design.sideDiamondsCount} viên</Grid>
          </Grid>

          <Grid container item md={6} gap={2}>
            <Grid item>Khối lượng:</Grid>

            <Grid item>{item.design.metalWeight} chỉ</Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          Giá Tiền:{" "}
          <span className={styles.price}>
            {currencyFormatter(item.price.amount)}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StandardOrderItem;
