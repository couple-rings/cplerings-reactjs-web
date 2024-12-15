import {
  ConfigurationKey,
  CustomOrderStatus,
  DesignCharacteristic,
  PaymentMethod,
} from "src/utils/enums";
import styles from "./RefundCreateForm.module.scss";
import {
  Button,
  Chip,
  CircularProgress,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import {
  currencyFormatter,
  formatCustomOrderStatus,
  formatRefundMethodTitle,
  toBase64,
} from "src/utils/functions";
import WeddingRing from "src/components/product/WeddingRing";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postRefundCustomOrder } from "src/services/refund.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postUploadFile } from "src/services/file.service";
import { getCustomOrderByOrderNo } from "src/services/customOrder.service";
import { fetchCustomOrderByOrderNo } from "src/utils/querykey";
import { useAppSelector } from "src/utils/hooks";
import { useNavigate } from "react-router-dom";
import placeholder from "src/assets/default.jpg";
import SearchIcon from "@mui/icons-material/Search";

interface ICustomOrderFormInput {
  reason: string;
  proofImage: File;
  method: PaymentMethod;
}

const CustomOrderTab = () => {
  const [orderNo, setOrderNo] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [maleRing, setMaleRing] = useState<IRing | null>(null);
  const [femaleRing, setFemaleRing] = useState<IRing | null>(null);

  const navigate = useNavigate();

  const { id: staffId } = useAppSelector((state) => state.auth.userInfo);
  const { configs } = useAppSelector((state) => state.config);

  const refundRatio = configs.find(
    (item) => item.key === ConfigurationKey.RefundRatio
  )?.value;

  const {
    watch: watchOrderNo,
    register: registerOrderNo,
    formState: { errors: errorsOrderNo },
    handleSubmit: handleSubmitOrderNo,
  } = useForm<{ orderNo: string }>({
    defaultValues: {
      orderNo: "",
    },
  });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICustomOrderFormInput>();

  const orderNoWatch = watchOrderNo("orderNo");

  const onSubmitOrderNo: SubmitHandler<{ orderNo: string }> = (data) => {
    setOrderNo(data.orderNo);
  };

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCustomOrderByOrderNo, orderNo],

    queryFn: () => {
      if (orderNo) return getCustomOrderByOrderNo(orderNo);
    },
    enabled: !!orderNo,
  });

  const uploadMutation = useMutation({
    mutationFn: (base64: string) => {
      return postUploadFile(base64);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const refundMutation = useMutation({
    mutationFn: (data: ICustomOrderRefundRequest) => {
      return postRefundCustomOrder(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đơn hàng đã được hoàn tiền");
        navigate("/staff/refund-order");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const onSubmit: SubmitHandler<ICustomOrderFormInput> = async (data) => {
    const base64 = await toBase64(data.proofImage);
    const uploadResponse = await uploadMutation.mutateAsync(base64);
    if (uploadResponse.data && response?.data) {
      const { reason, method } = data;

      refundMutation.mutate({
        customOrderId: response.data.customOrder.id,
        method,
        proofImageId: uploadResponse.data.id,
        reason,
        staffId,
      });
    }
  };

  useEffect(() => {
    if (orderNoWatch.length === 0) setOrderNo("");
  }, [orderNoWatch]);

  useEffect(() => {
    if (response?.data) {
      const { firstRing, secondRing } = response.data.customOrder;

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
    }

    if (response && response.errors) {
      console.log(response.errors);
    }
  }, [response]);

  return (
    <Grid container justifyContent={"center"} my={3}>
      <Grid container item md={8} className={styles.card}>
        <Grid item xs={12}>
          <div>Nhập Mã Đơn Hàng:</div>
        </Grid>

        <Grid container>
          <Grid item flex={1}>
            <OutlinedInput
              disabled={uploadMutation.isPending || refundMutation.isPending}
              fullWidth
              sx={{ borderRadius: 0 }}
              {...registerOrderNo("orderNo", {
                required: "* Chưa nhập mã đơn",
              })}
            />
          </Grid>

          <Button
            disabled={uploadMutation.isPending || refundMutation.isPending}
            variant="contained"
            sx={{ ...primaryBtn, py: 1, ml: 2 }}
            onClick={handleSubmitOrderNo(onSubmitOrderNo)}
          >
            <SearchIcon />
            Tìm Kiếm
          </Button>

          {errorsOrderNo.orderNo && (
            <Grid item xs={12} mt={1}>
              <FormHelperText error>
                {errorsOrderNo.orderNo.message}
              </FormHelperText>
            </Grid>
          )}
        </Grid>

        {isLoading && (
          <Grid container py={3} justifyContent={"center"}>
            <CircularProgress size={30} sx={{ color: "#b43620" }} />
          </Grid>
        )}

        {orderNo && !response?.data && !isLoading && (
          <Grid container>
            <FormLabel>Không tìm thấy đơn hàng</FormLabel>
          </Grid>
        )}

        {response?.data &&
          (response.data.customOrder.status === CustomOrderStatus.Done ||
            response.data.customOrder.status ===
              CustomOrderStatus.Completed) && (
            <Grid container gap={2} mt={1}>
              <Grid item xs={12}>
                <FormLabel error={!!errors.method}>
                  Phương Thức Hoàn Tiền
                </FormLabel>
                <Controller
                  defaultValue={PaymentMethod.Default}
                  name="method"
                  rules={{ required: "* Chưa chọn phương thức hoàn tiền" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      sx={{ borderRadius: 0, mt: 1 }}
                      fullWidth
                      {...field}
                      error={!!errors.method}
                    >
                      <MenuItem value={PaymentMethod.Default} disabled>
                        <em>Chọn phương thức hoàn tiền</em>
                      </MenuItem>
                      {[PaymentMethod.Cash, PaymentMethod.Transfer].map(
                        (method) => {
                          return (
                            <MenuItem value={method} key={method}>
                              {formatRefundMethodTitle(method)}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  )}
                />
                {errors.method && (
                  <FormHelperText error>{errors.method.message}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} mt={1}>
                <FormLabel error={!!errors.reason}>Lý Do Hoàn Tiền</FormLabel>
                <OutlinedInput
                  error={!!errors.reason}
                  sx={{ borderRadius: 0, mt: 1 }}
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Nêu rõ lý do"
                  {...register("reason", {
                    required: "* Chưa có lý do hoàn tiền",
                  })}
                />
                {errors.reason && (
                  <FormHelperText error>{errors.reason.message}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} mt={1}>
                <FormLabel>Hình Ảnh Giao Dịch</FormLabel>
              </Grid>
              <Grid
                container
                justifyContent={"center"}
                border={"1px dashed #ccc"}
              >
                <Grid item xs={8}>
                  <label>
                    <img
                      src={previewImage ? previewImage : placeholder}
                      width={"100%"}
                      style={{
                        cursor: "pointer",
                        objectFit: "contain",
                        maxHeight: 300,
                      }}
                    />
                    <Controller
                      name="proofImage"
                      control={control}
                      rules={{ required: "* Chưa có hình ảnh giao dịch" }}
                      render={({ field: { onChange } }) => (
                        <input
                          type="file"
                          hidden
                          accept=".png,.jpg,.jpeg"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files && e.target.files.length > 0) {
                              onChange(e.target.files && e.target.files[0]);
                              setPreviewImage(
                                URL.createObjectURL(e.target.files[0])
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <input type="file" hidden />
                  </label>
                </Grid>
              </Grid>
              {errors.proofImage && (
                <FormHelperText error>
                  {errors.proofImage.message}
                </FormHelperText>
              )}

              <Grid item xs={12} textAlign={"right"} mt={3}>
                <LoadingButton
                  loading={uploadMutation.isPending || refundMutation.isPending}
                  variant="contained"
                  sx={{ ...primaryBtn, px: 3, py: 1 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Xác Nhận
                </LoadingButton>
              </Grid>
            </Grid>
          )}

        {response?.data &&
          response.data.customOrder.status !== CustomOrderStatus.Done &&
          response.data.customOrder.status !== CustomOrderStatus.Completed && (
            <Grid container mt={1}>
              Đơn hàng này hiện tại không thể hoàn tiền
              <FormHelperText sx={{ mt: 1 }}>
                Lưu ý: Những đơn hàng không thuộc trạng thái{" "}
                <span className={styles.status}>hoàn tất gia công</span> hoặc
                <span className={styles.status}>đã hoàn thành</span> sẽ không
                thể thực hiện thao tác này
              </FormHelperText>
            </Grid>
          )}
      </Grid>

      <Grid container mt={6}>
        {response?.data && (
          <Grid container justifyContent={"space-between"} rowGap={3}>
            <Grid item md={5.7}>
              <fieldset style={{ margin: 0, width: "100%" }}>
                <legend>Đơn Hàng</legend>
                <Grid container py={1} px={2}>
                  <Grid
                    container
                    alignItems={"flex-end"}
                    justifyContent={"space-between"}
                    mb={1}
                  >
                    <Grid item>Trạng thái:</Grid>

                    <Grid item>
                      <Chip
                        label={
                          formatCustomOrderStatus(
                            response.data.customOrder.status
                          ).text
                        }
                        color={
                          formatCustomOrderStatus(
                            response.data.customOrder.status
                          ).color
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Ngày tạo:</Grid>

                    <Grid item>
                      {moment(response.data.customOrder.createdAt).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Ngày hoàn tất:</Grid>

                    <Grid item>
                      {moment(
                        response.data.customOrder.customOrderHistories.find(
                          (item) => item.status === CustomOrderStatus.Done
                        )?.createdAt
                      ).format("DD/MM/YYYY HH:mm")}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Tổng tiền:</Grid>

                    <Grid item className={styles.totalPrice}>
                      {currencyFormatter(
                        response.data.customOrder.totalPrice.amount
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item md={5.7}>
              <fieldset style={{ margin: 0, width: "100%" }}>
                <legend>Khách Hàng</legend>
                <Grid container py={1} px={2}>
                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Tên tài khoản:</Grid>

                    <Grid item>
                      {response.data.customOrder.customer.username}
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Email:</Grid>

                    <Grid item>{response.data.customOrder.customer.email}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"} mb={1}>
                    <Grid item>Số điện thoại:</Grid>

                    <Grid item>
                      {response.data.customOrder.customer.phone
                        ? response.data.customOrder.customer.phone
                        : "--"}
                    </Grid>
                  </Grid>
                </Grid>
              </fieldset>
            </Grid>

            <Grid container mt={4}>
              <Grid item xs={12} mb={3} className={styles.sectionTitle}>
                Chi Tiết Hàng ( 2)
              </Grid>

              {maleRing && (
                <WeddingRing
                  ring={maleRing}
                  gender={DesignCharacteristic.Male}
                />
              )}
              {femaleRing && (
                <WeddingRing
                  ring={femaleRing}
                  gender={DesignCharacteristic.Female}
                />
              )}
            </Grid>

            <Grid
              container
              mt={4}
              justifyContent={"flex-end"}
              className={styles.ratio}
            >
              <Grid
                container
                item
                md={6}
                lg={4}
                justifyContent={"space-between"}
              >
                <span>Tỷ lệ hoàn tiền:</span>
                <span>{refundRatio}%</span>
              </Grid>
            </Grid>

            {refundRatio && (
              <Grid
                container
                justifyContent={"flex-end"}
                className={styles.refundAmount}
              >
                <Grid
                  container
                  item
                  md={6}
                  lg={4}
                  justifyContent={"space-between"}
                >
                  <span>Số tiền hoàn trả:</span>
                  <span className={styles.amount}>
                    {currencyFormatter(
                      (response.data.customOrder.totalPrice.amount *
                        +refundRatio) /
                        100
                    )}
                  </span>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>

      <Grid container justifyContent={"center"} mt={6}>
        <Button
          variant="contained"
          sx={{ ...primaryBtn, px: 5, py: 1 }}
          onClick={() => navigate("/staff/refund-order")}
        >
          Quay về
        </Button>
      </Grid>
    </Grid>
  );
};

export default CustomOrderTab;
