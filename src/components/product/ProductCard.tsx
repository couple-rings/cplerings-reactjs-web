import { currencyFormatter } from "src/utils/functions";
import styles from "./ProductCard.module.scss";
import { Button, IconButton } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import { DesignCharacteristic, ProductType } from "src/utils/enums";

const ProductCard = (props: IProductCardProps) => {
  const { product, data } = props;
  const { coverImg, name, price, type, id } = product;

  const navigate = useNavigate();

  const handleAddFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleNavigate = () => {
    if (type === ProductType.Jewelry)
      navigate(`/jewelry/detail`, { state: { id } });
    if (type === ProductType.Ring) {
      const maleDesign = data?.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Male
      );
      const femaleDesign = data?.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Female
      );

      navigate(`/wedding-rings/detail/${maleDesign?.id}/${femaleDesign?.id}`, {
        state: { data },
      });
    }
  };

  return (
    <div className={styles.container} onClick={handleNavigate}>
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
