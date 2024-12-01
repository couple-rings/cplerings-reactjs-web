import {
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import styles from "./Deposit.module.scss";
import vnpay from "src/assets/vnpay.png";
import momo from "src/assets/momo.png";
import paypal from "src/assets/paypal.png";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { currencyFormatter, getDiamondSpec } from "src/utils/functions";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCraftingStages,
  fetchCustomOrderDetail,
  fetchDistricts,
  fetchTransportAddresses,
} from "src/utils/querykey";
import { getCustomOrderDetail } from "src/services/customOrder.service";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import {
  CraftingStageStatus,
  DeliveryMethod,
  DesignCharacteristic,
  StagePercentage,
  UserRole,
} from "src/utils/enums";
import {
  getCraftingStages,
  postDepositCraftingStage,
} from "src/services/craftingStage.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddressCard from "src/components/address/Card.Checkout";
import { getTransportAddresses } from "src/services/transportAddress.service";
import { saveList } from "src/redux/slice/district.slice";
import { getDistricts } from "src/services/province.service";
import AddModal from "src/components/modal/address/Add.modal";
import DeleteModal from "src/components/modal/address/Delete.modal";
import UpdateModal from "src/components/modal/address/Update.modal";
import _ from "lodash";
import moment from "moment";

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
  },
};

function Deposit() {
  const [order, setOrder] = useState<ICustomOrder | null>(null);
  const [filterObj, setFilterObj] = useState<ICraftingStageFilter | null>(null);

  const [depositStage, setDepositStage] = useState<ICraftingStage | null>(null);
  const [depositValue, setDepositValue] = useState(0);

  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const [addressFilterObj, setAddressFilterObj] =
    useState<ITransportationAddressFilter | null>(null);
  const [selected, setSelected] = useState<ITransportAddress>(initSelected);
  const [deliveryMethod, setDeliveryMethod] = useState(DeliveryMethod.Shipping);
  const [arrayCheck, setArrayCheck] = useState<
    { id: number; checked: boolean }[]
  >([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { districts } = useAppSelector((state) => state.district);

  const { orderId, stageId } = useParams<{
    orderId: string;
    stageId: string;
  }>();

  const { data: addressResponse, isLoading: addressLoading } = useQuery({
    queryKey: [fetchTransportAddresses, addressFilterObj],

    queryFn: () => {
      if (addressFilterObj) return getTransportAddresses(addressFilterObj);
    },
    enabled:
      addressFilterObj !== null &&
      depositStage?.progress === StagePercentage.Third,
  });

  const { data: districtsResponse, isLoading: districtsLoading } = useQuery({
    queryKey: [fetchDistricts, filterObj],

    queryFn: () => {
      return getDistricts();
    },
    enabled:
      districts.length === 0 &&
      depositStage?.progress === StagePercentage.Third,
  });

  const { data: response } = useQuery({
    queryKey: [fetchCustomOrderDetail, orderId],

    queryFn: () => {
      if (orderId) return getCustomOrderDetail(+orderId);
    },
    enabled: !!orderId,
  });

  const { data: stageResponse } = useQuery({
    queryKey: [fetchCraftingStages, filterObj],

    queryFn: () => {
      if (filterObj) return getCraftingStages(filterObj);
    },
    enabled: !!filterObj,
  });

  const mutation = useMutation({
    mutationFn: (data: IDepositCraftingStageRequest) => {
      return postDepositCraftingStage(data);
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

  const getStageFormat = () => {
    if (stageResponse?.data && stageId) {
      const stage = stageResponse.data.items.find(
        (item) => item.id === +stageId
      );

      if (stage) {
        if (stage.progress === StagePercentage.First)
          return {
            stageNo: 1,
            stageName: "Hoàn Thành 50% - Đúc khuôn nhẫn",
          };
        if (stage.progress === StagePercentage.Second)
          return {
            stageNo: 2,
            stageName: "Hoàn Thành 75% - Gắn kim cương và Đánh bóng",
          };
        if (stage.progress === StagePercentage.Third)
          return {
            stageNo: 3,
            stageName: "Hoàn Thành 100% - Đóng gói và Hoàn tất",
          };
      }
    }

    return {
      stageNo: 0,
      stageName: "",
    };
  };

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
    if (depositStage) {
      if (depositStage.progress === StagePercentage.Third) {
        if (deliveryMethod === DeliveryMethod.Pickup)
          mutation.mutate({ craftingStageId: depositStage.id });
        else {
          const checkedItem = arrayCheck.find((item) => item.checked);

          mutation.mutate({
            craftingStageId: depositStage.id,
            transportationAddressId: checkedItem?.id,
          });
        }
      } else mutation.mutate({ craftingStageId: depositStage.id });
    }
  };

  useEffect(() => {
    if (districtsResponse?.districts) {
      dispatch(saveList(districtsResponse.districts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtsResponse]);

  useEffect(() => {
    if (response && response.data) {
      const { firstRing, secondRing, customer } = response.data.customOrder;

      if (customer.id !== userId) navigate("/customer/support/custom-order");

      if (
        firstRing.customDesign.designVersion.design.characteristic ===
        DesignCharacteristic.Male
      )
        setMaleRing(firstRing);
      else setFemaleRing(firstRing);

      if (
        secondRing.customDesign.designVersion.design.characteristic ===
        DesignCharacteristic.Female
      )
        setFemaleRing(secondRing);
      else setMaleRing(secondRing);

      setOrder(response.data.customOrder);
    }

    if (response && response.errors) {
      navigate("/customer/support/custom-order");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (!stageId) {
      navigate("/customer/support/custom-order");
      return;
    }

    if (stageResponse?.data) {
      const { items: stages } = stageResponse.data;

      const stageIndex = stages.findIndex((item) => item.id === +stageId);

      if (stageIndex === -1) navigate("/customer/support/custom-order");
      if (stageIndex !== -1) {
        if (stages[stageIndex].status === CraftingStageStatus.Paid)
          navigate("/customer/support/custom-order");

        if (stageIndex !== 0 && !stages[stageIndex - 1].completionDate)
          navigate("/customer/support/custom-order");

        setDepositStage(stages[stageIndex]);

        if (stageIndex === 0) setDepositValue(stages[stageIndex].progress);
        else
          setDepositValue(
            stages[stageIndex].progress - stages[stageIndex - 1].progress
          );
      }
    }

    if (stageResponse?.errors) {
      navigate("/customer/support/custom-order");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResponse, stageId]);

  useEffect(() => {
    if (orderId)
      setFilterObj({
        page: 0,
        pageSize: 100,
        customOrderId: +orderId,
      });
  }, [orderId]);

  useEffect(() => {
    if (addressResponse?.data) {
      const arrayCheck = addressResponse.data.items.map((item) => {
        return {
          id: item.id,
          checked: false,
        };
      });

      if (arrayCheck.length > 0) arrayCheck[0].checked = true;
      setArrayCheck(arrayCheck);
    }
  }, [addressResponse]);

  useEffect(() => {
    setAddressFilterObj({
      page: 0,
      pageSize: 100,
      customerId: userId,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !order ||
    !maleRing ||
    !femaleRing ||
    !depositStage ||
    addressLoading ||
    districtsLoading
  )
    return (
      <Grid container justifyContent={"center"} my={5}>
        <Grid container item xs={8} mb={3} justifyContent={"space-between"}>
          <Grid container item xs={4.5} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>
          <Grid container item xs={7} gap={3}>
            <Skeleton variant="rectangular" width={"100%"} height={600} />
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <Grid container item xs={11} justifyContent={"space-between"}>
        <Grid item xs={12} className={styles.title}>
          Thanh Toán Tiền Đặt Cọc
        </Grid>

        <Grid container item xs={4} mt={3}>
          <fieldset style={{ width: "100%" }}>
            <legend>Đơn Hàng</legend>
            <Grid container mb={1} mt={2} justifyContent={"space-between"}>
              <Grid item>Mã đơn:</Grid>

              <Grid item>{order.orderNo}</Grid>
            </Grid>
            <Grid container mb={1} justifyContent={"space-between"}>
              <Grid item>Ngày tạo:</Grid>

              <Grid item>
                {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Divider sx={{ backgroundColor: "#ccc", width: "100%", my: 4 }} />

        <Grid item md={4} className={styles.paymentMethod}>
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

          {depositStage.progress === StagePercentage.Third && (
            <Grid item xs={12} className={styles.left} mt={7}>
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
                    {addressResponse?.data?.items.map((item) => {
                      const checkItem = arrayCheck.find(
                        (i) => i.id === item.id
                      );

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

              {deliveryMethod === DeliveryMethod.Pickup && (
                <div className={styles.pickup}>
                  <div className={styles.title}>Địa chỉ cửa hàng</div>
                  <div className={styles.address}>
                    {maleRing.branch.address}
                  </div>
                  <div className={styles.phone}>
                    Tel:{maleRing.branch.phone}
                  </div>
                  <Divider sx={{ backgroundColor: "#555" }} />
                </div>
              )}
            </Grid>
          )}

          <LoadingButton
            loading={mutation.isPending}
            variant="contained"
            sx={{ ...secondaryBtn, my: 3 }}
            fullWidth
            onClick={handlePayment}
          >
            Thanh Toán
          </LoadingButton>
        </Grid>
        <Grid item md={7} className={styles.summary} p={{ xs: 2, sm: 6 }}>
          <div className={styles.title}>Thông Tin Thanh Toán</div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <div className={styles.body}>
            <div className={styles.title}>Thông Tin Nhẫn</div>
            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img src={maleRing.customDesign.designVersion.image.url} />
                <FormHelperText className={styles.gender}>
                  <img src={male} />
                  Nam Tính
                </FormHelperText>
              </Grid>
              <Grid container item sm={8} gap={2}>
                <div>
                  {maleRing.spouse.customerId
                    ? "Nhẫn của bạn"
                    : "Nhẫn của bạn đời"}
                </div>
                <Grid container justifyContent={"space-between"}>
                  <Grid item>Chất liệu:</Grid>
                  <Grid item>{maleRing.metalSpecification.name}</Grid>
                </Grid>
                <Grid container justifyContent={"space-between"}>
                  <Grid item>Kim cương:</Grid>
                  <Grid item>
                    {maleRing.diamonds[0].diamondSpecification.shape}{" "}
                    {getDiamondSpec(maleRing.diamonds[0].diamondSpecification)}
                  </Grid>
                </Grid>
                <Grid container justifyContent={"space-between"}>
                  <Grid item>Kích thước:</Grid>
                  <Grid item>{maleRing.fingerSize}</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container className={styles.design} gap={3}>
              <Grid item sm={3} className={styles.left}>
                <img src={femaleRing.customDesign.designVersion.image.url} />
                <FormHelperText className={styles.gender}>
                  <img src={female} />
                  Nữ Tính
                </FormHelperText>
              </Grid>
              <Grid container item sm={8} gap={2}>
                <div>
                  {femaleRing.spouse.customerId
                    ? "Nhẫn của bạn"
                    : "Nhẫn của bạn đời"}
                </div>
                <Grid container justifyContent={"space-between"}>
                  <Grid item>Chất liệu:</Grid>
                  <Grid item>{femaleRing.metalSpecification.name}</Grid>
                </Grid>
                <Grid container justifyContent={"space-between"}>
                  <Grid item>Kim cương:</Grid>
                  <Grid item>
                    {femaleRing.diamonds[0].diamondSpecification.shape}{" "}
                    {getDiamondSpec(
                      femaleRing.diamonds[0].diamondSpecification
                    )}
                  </Grid>
                </Grid>
                <Grid container justifyContent={"space-between"}>
                  <Grid item>Kích thước:</Grid>
                  <Grid item>{femaleRing.fingerSize}</Grid>
                </Grid>
              </Grid>
            </Grid>

            <div className={styles.noteTitle}>
              Thanh Toán Cho Giai Đoạn {getStageFormat().stageNo}
            </div>
            <div className={styles.note}>{getStageFormat().stageName}</div>
          </div>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Tổng Tiền Đơn Hàng</Grid>

            <Grid item fontSize={"1.2rem"}>
              {currencyFormatter(order.totalPrice.amount)}
            </Grid>
          </Grid>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Tỷ Lệ Cọc</Grid>

            <Grid item fontSize={"1.2rem"}>
              {depositValue}% Giá Trị
            </Grid>
          </Grid>

          <Divider sx={{ backgroundColor: "#ccc", my: 3 }} />

          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>Thành Tiền</Grid>

            <Grid item fontWeight={600} fontSize={"1.3rem"}>
              {currencyFormatter(
                order.totalPrice.amount * (depositValue / 100)
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AddModal
        open={openAdd}
        setOpen={setOpenAdd}
        filterObj={addressFilterObj as ITransportationAddressFilter}
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

export default Deposit;
