import { Divider, Grid } from "@mui/material";
import styles from "./Summary.module.scss";
import { currencyFormatter } from "src/utils/functions";
import { primaryBtn } from "src/utils/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { postCreateStandardOrder } from "src/services/standardOrder.service";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { removeFromCart } from "src/redux/slice/cart.slice";
import { useNavigate } from "react-router-dom";
import { ConfigurationKey } from "src/utils/enums";
import { metalWeightUnit } from "src/utils/constants";

function Summary(props: ISummaryProps) {
  const { checkedItem } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id: customerId } = useAppSelector((state) => state.auth.userInfo);
  const { cartItems } = useAppSelector((state) => state.cart);

  const { configs } = useAppSelector((state) => state.config);

  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;
  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;
  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;

  const createMutation = useMutation({
    mutationFn: (data: ICreateStandardOrderRequest) => {
      return postCreateStandardOrder(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        checkedItem.forEach((item) => {
          dispatch(removeFromCart(item));
        });

        navigate(`/customer/checkout/${response.data.standardOrder.id}`);
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const calculatePrice = () => {
    if (sideDiamondPrice && shippingFee && profitRatio) {
      let total = 0;

      cartItems.forEach((item) => {
        if (checkedItem.includes(item.id)) {
          const itemPrice =
            (item.design.metalWeight *
              metalWeightUnit *
              item.metalSpec.metalSpecification.pricePerUnit +
              item.design.sideDiamondsCount * +sideDiamondPrice +
              +shippingFee) *
            +profitRatio;

          total += Math.round(itemPrice / 1000) * 1000;
        }
      });

      return total;
    }

    return 0;
  };

  const calculateTotal = (
    price: number,
    discount: number,
    shipping: number
  ) => {
    return price + shipping - discount;
  };

  const handleCheckout = () => {
    if (cartItems.length > 0 && checkedItem.length > 0) {
      const items = cartItems.map((item) => {
        return {
          metalSpecId: item.metalSpec.metalSpecification.id,
          designId: item.design.id,
        };
      });

      createMutation.mutate({
        customerId,
        branchId: cartItems[0].branch.id,
        metalSpecDesignIds: items,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>Chi Tiết Đơn</div>

      <Divider sx={{ backgroundColor: "#888" }} />

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Phí Vận Chuyển</div>
        <div>{currencyFormatter(shippingFee ? +shippingFee : 0)}</div>
      </Grid>

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Tiền Hàng</div>
        <div>{currencyFormatter(calculatePrice())}</div>
      </Grid>

      <Divider sx={{ backgroundColor: "#888" }} />

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Giảm Giá</div>
        <div>{currencyFormatter(0)}</div>
      </Grid>

      <Divider sx={{ backgroundColor: "#888" }} />

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Tổng Tiền</div>
        <div>
          {currencyFormatter(
            calculateTotal(calculatePrice(), 0, shippingFee ? +shippingFee : 0)
          )}
        </div>
      </Grid>

      <LoadingButton
        disabled={checkedItem.length === 0}
        loading={createMutation.isPending}
        variant="contained"
        sx={{ ...primaryBtn, mt: 3 }}
        fullWidth
        onClick={handleCheckout}
      >
        Thanh Toán
      </LoadingButton>

      <div className={styles.text}>
        Xin lưu ý: Vui lòng kiểm tra kỹ thông tin trước khi thanh toán
      </div>
    </div>
  );
}

export default Summary;
