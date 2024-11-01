import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import styles from "./Checkout.module.scss";
import { DeliveryMethod } from "src/utils/enums";
import { useEffect, useState } from "react";
import { primaryBtn } from "src/utils/styles";
import vnpay from "src/assets/vnpay.png";
import momo from "src/assets/momo.png";
import paypal from "src/assets/paypal.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddressCard from "src/components/address/Card.Checkout";
import DeleteModal from "src/components/modal/address/Delete.modal";
import UpdateModal from "src/components/modal/address/Update.modal";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { getDistricts } from "src/services/province.service";
import { saveList } from "src/redux/slice/district.slice";
import AddModal from "src/components/modal/address/Add.modal";
import Card from "src/components/checkout/Card";
import { currencyFormatter } from "src/utils/functions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const addresses = [
  {
    receiverName: "Nguyễn Tín",
    address:
      "Chung cư NestHome Block1.2 phòng 110, đường Chu Huy Mân,Đà Nẵng,Quận Sơn Trà",
    receiverPhone: "0987446873",
  },
  {
    receiverName: "Nguyễn Tín",
    address:
      "Chung cư NestHome Block1.2 phòng 110, đường Chu Huy Mân,Đà Nẵng,Quận Sơn Trà",
    receiverPhone: "0987446873",
  },
];

function Checkout() {
  const [deliveryMethod, setDeliveryMethod] = useState(DeliveryMethod.Shipping);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const minLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const { districts } = useAppSelector((state) => state.district);

  useEffect(() => {
    (async () => {
      if (districts.length === 0) {
        const data = await getDistricts();
        if (data && data.districts) {
          dispatch(saveList(data.districts));
        }
      }
    })();
  }, [dispatch, districts.length]);

  return (
    <div className={styles.container}>
      <Grid
        container
        item
        xs={10}
        lg={11}
        xl={10}
        justifyContent={"space-between"}
      >
        {!minLarge && (
          <Grid item xs={12} lg={5} className={styles.right}>
            <div className={styles.title}>Chi Tiết Đơn (2)</div>
            <Card />
            <Card />
            <Card />

            <div className={styles.summary}>
              <Grid container justifyContent={"space-between"} marginBottom={3}>
                <div>Phí Vận Chuyển</div>
                <div>{currencyFormatter(0)}</div>
              </Grid>
              <Divider sx={{ backgroundColor: "#555" }} />

              <Grid container justifyContent={"space-between"} marginY={3}>
                <div>Tổng Cộng</div>
                <div>{currencyFormatter(36000000)}</div>
              </Grid>
              <Divider sx={{ backgroundColor: "#555" }} />
            </div>
          </Grid>
        )}

        <Grid item xs={12} lg={5} className={styles.left}>
          <div className={styles.title}>Phương Thức Giao Hàng</div>

          <FormControl>
            <RadioGroup
              row
              sx={{ gap: 3 }}
              value={deliveryMethod}
              onChange={(e) =>
                setDeliveryMethod(e.target.value as DeliveryMethod)
              }
            >
              <FormControlLabel
                value={DeliveryMethod.Shipping}
                control={<Radio />}
                label="Giao đến nhà"
              />
              <FormControlLabel
                value={DeliveryMethod.Pickup}
                control={<Radio />}
                label="Đến cửa hàng"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ backgroundColor: "#555", mt: 1 }} />

          {deliveryMethod === DeliveryMethod.Shipping && (
            <div className={styles.shipping}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>Địa Chỉ Giao Hàng</div>
                <div className={styles.addBtn} onClick={() => setOpenAdd(true)}>
                  <AddCircleIcon className={styles.icon} />
                  <span>Thêm Mới</span>
                </div>
              </div>
              <Divider sx={{ backgroundColor: "#555" }} />

              <div>
                {addresses.map((item, index) => {
                  return (
                    <AddressCard
                      key={index}
                      {...item}
                      setOpenDelete={setOpenDelete}
                      setOpenUpdate={setOpenUpdate}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {deliveryMethod === DeliveryMethod.Pickup && (
            <div className={styles.pickup}>
              <div className={styles.title}>Địa chỉ cửa hàng</div>
              <div className={styles.address}>
                No.6B Store, i SQUARE International Plaza, No.63 Nathan Road,
                Tsim Sha Tsui, Kowloon, Hong Kong (H exit, Tsim Sha Tsui metro
                station)
              </div>
              <div className={styles.phone}>Tel:00852-23677389</div>
              <Divider sx={{ backgroundColor: "#555" }} />
            </div>
          )}

          <div className={styles.paymentMethod}>
            <div className={styles.title}>Phương thức thanh toán</div>
            <div className={styles.radio}>
              <Radio checked />
              <img src={vnpay} />
              <div>VNPAY</div>
            </div>

            <div className={styles.radio}>
              <Radio disabled />
              <img src={momo} />
              <div className={styles.notAvailable}>MoMo (Sắp ra mắt)</div>
            </div>

            <div className={styles.radio}>
              <Radio disabled />
              <img src={paypal} />
              <div className={styles.notAvailable}>Paypal (Sắp ra mắt)</div>
            </div>
          </div>

          <Button
            variant="contained"
            sx={{ ...primaryBtn, marginBottom: 3 }}
            fullWidth
          >
            Thanh Toán
          </Button>
        </Grid>

        {minLarge && (
          <Grid item xs={12} lg={5} className={styles.right}>
            <div className={styles.title}>Chi Tiết Đơn (2)</div>
            <Card />
            <Card />
            <Card />

            <div className={styles.summary}>
              <Grid container justifyContent={"space-between"} marginBottom={3}>
                <div>Phí Vận Chuyển</div>
                <div>{currencyFormatter(0)}</div>
              </Grid>
              <Divider sx={{ backgroundColor: "#555" }} />

              <Grid container justifyContent={"space-between"} marginY={3}>
                <div>Tổng Cộng</div>
                <div>{currencyFormatter(36000000)}</div>
              </Grid>
              <Divider sx={{ backgroundColor: "#555" }} />
            </div>
          </Grid>
        )}
      </Grid>

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
      <UpdateModal open={openUpdate} setOpen={setOpenUpdate} />
    </div>
  );
}

export default Checkout;
