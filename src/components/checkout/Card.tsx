import { Grid } from "@mui/material";
import styles from "./Card.module.scss";
import { currencyFormatter } from "src/utils/functions";
import { DesignCharacteristic } from "src/utils/enums";
import placeholder from "src/assets/default.jpg";

function Card(props: ICheckoutCardProps) {
  const { data } = props;
  const { design, metalSpecification, price } = data;

  const img = design.designMetalSpecifications.find(
    (item) => item.metalSpecification.id === metalSpecification.id
  )?.image.url;

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={3.5}>
          <img src={img ? img : placeholder} />
        </Grid>

        <Grid item xs={7.5}>
          <div className={styles.name}>
            {design.name}{" "}
            {design.characteristic === DesignCharacteristic.Male
              ? "(Nam Giới)"
              : "(Nữ Giới)"}
          </div>
          <div className={styles.spec}>
            <Grid container marginBottom={3}>
              <Grid item xs={7}>
                <div className={styles.label}>Chất Liệu</div>
                <div>{metalSpecification.name}</div>
              </Grid>

              <Grid item xs={5}>
                <div className={styles.label}>Kích Thước</div>
                <div>{design.size} cm</div>
              </Grid>
            </Grid>

            <Grid container marginBottom={3}>
              <Grid item xs={7}>
                <div className={styles.label}>Kim cương phụ</div>
                <div>{design.sideDiamondsCount} viên</div>
              </Grid>

              <Grid item xs={5}>
                <div className={styles.label}>Khối lượng</div>
                <div>{design.metalWeight} chỉ</div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <div className={styles.price}>
        <div>Giá Tiền</div>
        <div>{currencyFormatter(price.amount)}</div>
      </div>
    </div>
  );
}

export default Card;
