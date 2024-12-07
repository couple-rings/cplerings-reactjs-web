import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import styles from "./Checkout.module.scss";
import {
  ConfigurationKey,
  DeliveryMethod,
  StandardOrderStatus,
  UserRole,
} from "src/utils/enums";
import { useEffect, useState } from "react";
import { primaryBtn } from "src/utils/styles";
import vnpay from "src/assets/vnpay.png";
import momo from "src/assets/momo.png";
import paypal from "src/assets/paypal.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddressCard from "src/components/address/Card.Checkout";
import DeleteModal from "src/components/modal/address/Delete.modal";
import UpdateModal from "src/components/modal/address/Update.modal";
import { useAppDispatch, useAppSelector, useScrollTop } from "src/utils/hooks";
import { getDistricts } from "src/services/province.service";
import { saveList } from "src/redux/slice/district.slice";
import AddModal from "src/components/modal/address/Add.modal";
import Card from "src/components/checkout/Card";
import { currencyFormatter } from "src/utils/functions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchDistricts,
  fetchStandardOrderDetail,
  fetchTransportAddresses,
} from "src/utils/querykey";
import { getTransportAddresses } from "src/services/transportAddress.service";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  getStandardOrderDetail,
  postPayStandardOrder,
} from "src/services/standardOrder.service";
import moment from "moment";
import { toast } from "react-toastify";

const initSelected: ITransportAddress = {
  id: 0,
  address: "",
  district: "",
  districtCode: 0,
  ward: "",
  wardCode: 0,
  receiverName: "",
  receiverPhone: "",
  customer: {
    id: 0,
    avatar: "",
    email: "",
    phone: "",
    username: "",
    role: UserRole.Default,
    branch: {
      id: 0,
      address: "",
      phone: "",
      storeName: "",
      coverImage: {
        id: 0,
        url: "",
      },
    },
    staffPosition: null,
  },
};

function Checkout() {
  const [order, setOrder] = useState<IStandardOrder | null>(null);
  const [filterObj, setFilterObj] =
    useState<ITransportationAddressFilter | null>(null);

  const [deliveryMethod, setDeliveryMethod] = useState(DeliveryMethod.Shipping);
  const [arrayCheck, setArrayCheck] = useState<
    { id: number; checked: boolean }[]
  >([]);

  const [selected, setSelected] = useState<ITransportAddress>(initSelected);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { id: orderId } = useParams<{ id: string }>();

  const minLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const { districts } = useAppSelector((state) => state.district);
  const { id } = useAppSelector((state) => state.auth.userInfo);
  const { configs } = useAppSelector((state) => state.config);

  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchTransportAddresses, filterObj],

    queryFn: () => {
      if (filterObj) return getTransportAddresses(filterObj);
    },
    enabled: !!filterObj,
  });

  const { data: districtsResponse, isLoading: loadingDistricts } = useQuery({
    queryKey: [fetchDistricts, filterObj],

    queryFn: () => {
      return getDistricts();
    },
    enabled: districts.length === 0,
  });

  const { data: orderResponse } = useQuery({
    queryKey: [fetchStandardOrderDetail, orderId],

    queryFn: () => {
      if (orderId) return getStandardOrderDetail(+orderId);
    },
    enabled: !!orderId,
  });

  const payMutation = useMutation({
    mutationFn: (data: IPayStandardOrderRequest) => {
      return postPayStandardOrder(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        const { paymentLink } = response.data;
        window.open(paymentLink, "_self");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const resetSelected = () => {
    setSelected(initSelected);
  };

  const handleCheck = (id: number, value: boolean) => {
    if (value === true) {
      const clone = _.cloneDeep(arrayCheck);
      clone.forEach((item) => {
        if (item.id === id) {
          item.checked = true;
        } else item.checked = false;
      });

      setArrayCheck(clone);
    }
  };

  const handlePayment = () => {
    if (orderId) {
      if (deliveryMethod === DeliveryMethod.Pickup) {
        payMutation.mutate({
          standardOrderId: +orderId,
        });
      } else {
        const checkedItem = arrayCheck.find((item) => item.checked);
        if (checkedItem) {
          payMutation.mutate({
            standardOrderId: +orderId,
            transportationAddressId: checkedItem.id,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (districtsResponse?.districts) {
      dispatch(saveList(districtsResponse.districts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtsResponse]);

  useEffect(() => {
    if (response?.data) {
      const arrayCheck = response.data.items.map((item) => {
        return {
          id: item.id,
          checked: false,
        };
      });

      if (arrayCheck.length > 0) arrayCheck[0].checked = true;
      setArrayCheck(arrayCheck);
    }
  }, [response]);

  useEffect(() => {
    if (orderResponse?.data) {
      const { customer, status } = orderResponse.data.standardOrder;
      if (customer.id !== id || status !== StandardOrderStatus.Pending)
        navigate("/customer/bag");

      setOrder(orderResponse.data.standardOrder);
    }

    if (orderResponse?.errors) {
      navigate("/customer/bag");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderResponse]);

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 100,
      customerId: id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScrollTop();

  if (isLoading || loadingDistricts)
    return (
      <Grid container justifyContent={"center"} mb={5}>
        <Grid container item xs={10} gap={3} justifyContent={"space-between"}>
          <Grid item xs={5.7}>
            <Skeleton width={"100%"} height={300} variant="rectangular" />
          </Grid>

          <Grid item xs={5.7}>
            <Skeleton width={"100%"} height={300} variant="rectangular" />
          </Grid>
        </Grid>
      </Grid>
    );

  if (order)
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
            <Grid item xs={12} lg={6} className={styles.right}>
              <div className={styles.title}>
                Chi Tiết Đơn ({order.standardOrderItems.length})
              </div>

              {order.standardOrderItems.map((item) => {
                return <Card key={item.id} data={item} />;
              })}

              <div className={styles.summary}>
                <Grid
                  container
                  justifyContent={"space-between"}
                  marginBottom={3}
                >
                  <div>Phí Vận Chuyển</div>
                  <div>{currencyFormatter(shippingFee ? +shippingFee : 0)}</div>
                </Grid>
                <Divider sx={{ backgroundColor: "#555" }} />

                <Grid container justifyContent={"space-between"} marginY={3}>
                  <div>Tổng Cộng</div>
                  <div>{currencyFormatter(order.totalPrice.amount)}</div>
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
                  <div
                    className={styles.addBtn}
                    onClick={() => setOpenAdd(true)}
                  >
                    <AddCircleIcon className={styles.icon} />
                    <span>Thêm Mới</span>
                  </div>
                </div>
                <Divider sx={{ backgroundColor: "#555" }} />

                <div>
                  {response?.data?.items.map((item) => {
                    const checkItem = arrayCheck.find((i) => i.id === item.id);

                    return (
                      <AddressCard
                        key={item.id}
                        data={item}
                        setOpenDelete={setOpenDelete}
                        setOpenUpdate={setOpenUpdate}
                        setSelected={setSelected}
                        handleCheck={handleCheck}
                        checked={checkItem?.checked}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {deliveryMethod === DeliveryMethod.Pickup &&
              order.standardOrderItems.length > 0 && (
                <div className={styles.pickup}>
                  <div className={styles.title}>Địa chỉ cửa hàng</div>
                  <div className={styles.address}>
                    {order.standardOrderItems[0].branch.storeName}
                  </div>
                  <div className={styles.address}>
                    {order.standardOrderItems[0].branch.address}
                  </div>
                  <div className={styles.phone}>
                    Tel:{order.standardOrderItems[0].branch.phone}
                  </div>
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

            <LoadingButton
              loading={payMutation.isPending}
              disabled={
                deliveryMethod === DeliveryMethod.Shipping &&
                response?.data?.items.length === 0
              }
              variant="contained"
              sx={{ ...primaryBtn, marginBottom: 3 }}
              fullWidth
              onClick={handlePayment}
            >
              Thanh Toán
            </LoadingButton>
          </Grid>

          {minLarge && (
            <Grid item xs={12} lg={6} className={styles.right}>
              <div className={styles.title}>
                Chi Tiết Đơn ({order.standardOrderItems.length})
              </div>
              <Grid container justifyContent={"space-between"}>
                <FormLabel>Mã Đơn: {order.orderNo}</FormLabel>
                <FormLabel>
                  {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                </FormLabel>
              </Grid>

              {order.standardOrderItems.map((item) => {
                return <Card key={item.id} data={item} />;
              })}

              <div className={styles.summary}>
                <Grid
                  container
                  justifyContent={"space-between"}
                  marginBottom={3}
                >
                  <div>Phí Vận Chuyển</div>
                  <div>{currencyFormatter(shippingFee ? +shippingFee : 0)}</div>
                </Grid>
                <Divider sx={{ backgroundColor: "#555" }} />

                <Grid container justifyContent={"space-between"} marginY={3}>
                  <div>Tổng Cộng</div>
                  <div>{currencyFormatter(order.totalPrice.amount)}</div>
                </Grid>
                <Divider sx={{ backgroundColor: "#555" }} />
              </div>
            </Grid>
          )}
        </Grid>

        <AddModal
          open={openAdd}
          setOpen={setOpenAdd}
          filterObj={filterObj as ITransportationAddressFilter}
        />
        <DeleteModal open={openDelete} setOpen={setOpenDelete} />
        <UpdateModal
          open={openUpdate}
          setOpen={setOpenUpdate}
          selected={selected}
          resetSelected={resetSelected}
        />
      </div>
    );
}

export default Checkout;
