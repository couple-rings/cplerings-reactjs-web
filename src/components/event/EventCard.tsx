import { IProductCardProps } from "src/types/props";

const ProductCard = (props: IProductCardProps) => {
  const { title } = props;

  return <div>{title}</div>;
};

export default ProductCard;
