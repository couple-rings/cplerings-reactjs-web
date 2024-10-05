import { currencyFormatter } from "src/utils/functions";
import styles from "./ProductCard.module.scss";
import { Button, IconButton } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const ProductCard = (props: IProductCardProps) => {
  const { product } = props;
  const { coverImg, name, price } = product;

  const handleAddFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.container} onClick={() => alert("detail")}>
      <div className={styles.imgContainer}>
        <img src={coverImg} />
        <IconButton className={styles.favoriteBtn} onClick={handleAddFavorite}>
          <FavoriteBorderOutlinedIcon fontSize="large" />
        </IconButton>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1.2, display: "none" }}
          className={styles.detailBtn}
        >
          Xem Chi Tiết
        </Button>
      </div>

      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{currencyFormatter(price)}</div>
    </div>
  );
};

export default ProductCard;
