import {
  Button,
  CircularProgress,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import styles from "./CreateResellOrder.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { primaryBtn } from "src/utils/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ConfigurationKey,
  JewelryStatus,
  PaymentMethod,
} from "src/utils/enums";
import {
  currencyFormatter,
  formatJewelryStatusLabel,
  formatRefundMethodTitle,
  toBase64,
} from "src/utils/functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers, fetchJewelryByProductNo } from "src/utils/querykey";
import { getJewelryByProductNo } from "src/services/jewelry.service";
import { useEffect, useState } from "react";
import placeholder from "src/assets/default.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import { AsyncPaginate } from "react-select-async-paginate";
import { metalWeightUnit, pageSize } from "src/utils/constants";
import { getCustomers } from "src/services/account.service";
import Jewelry from "src/components/product/Jewelry";
import { useAppSelector } from "src/utils/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postResellJewelry } from "src/services/resell.service";
import { postUploadFile } from "src/services/file.service";

const initMetaData: IListMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

interface IFormInput {
  note: string;
  proofImage: File;
  paymentMethod: PaymentMethod;
}

function CreateResellOrder() {
  const [productNo, setProductNo] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [value, onChange] = useState<IUser | null>(null);
  const [emptyValue, setEmptyValue] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { configs } = useAppSelector((state) => state.config);

  const resellRatio = configs.find(
    (item) => item.key === ConfigurationKey.ResellRatio
  )?.value;

  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;

  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;

  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;

  const {
    watch: watchProductNo,
    register: registerProductNo,
    formState: { errors: errorsProductNo },
    handleSubmit: handleSubmitProductNo,
  } = useForm<{ productNo: string }>({
    defaultValues: {
      productNo: "",
    },
  });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const productNoWatch = watchProductNo("productNo");

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchJewelryByProductNo, productNo],

    queryFn: () => {
      if (productNo) return getJewelryByProductNo(productNo);
    },
    enabled: !!productNo,
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

  const resellMutation = useMutation({
    mutationFn: (data: {
      jewelryId: number;
      payload: IJewelryResellRequest;
    }) => {
      return postResellJewelry(data.jewelryId, data.payload);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đã xác nhận mua lại trang sức");
        navigate("/staff/resell-order");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const onSubmitProductNo: SubmitHandler<{ productNo: string }> = (data) => {
    setProductNo(data.productNo);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const hasError = onError();
    if (hasError) return;

    const base64 = await toBase64(data.proofImage);
    const uploadResponse = await uploadMutation.mutateAsync(base64);
    if (uploadResponse.data && response?.data && value) {
      const { note, paymentMethod } = data;

      resellMutation.mutate({
        jewelryId: response.data.id,
        payload: {
          note,
          paymentMethod,
          customerId: value.id,
          jewelryId: response.data.id,
          proofImageId: uploadResponse.data.id,
        },
      });
    }
  };

  const onError = () => {
    if (!value) {
      setEmptyValue(true);
      return true;
    }

    return false;
  };

  const loadPageOptions = async (
    email: string,
    prevOptions: unknown,
    additional?: IListMetaData
  ) => {
    if (additional) {
      const filterObj: ICustomerFilter = {
        page: additional.page,
        pageSize,
        email: email ? email : undefined,
      };

      const response = await queryClient.fetchQuery({
        queryKey: [fetchCustomers, filterObj],
        queryFn: () => {
          return getCustomers(filterObj);
        },
      });

      if (response.data) {
        const { totalPages, count, page, items } = response.data;

        return {
          options: items,
          hasMore: page + 1 < totalPages,
          additional: {
            pageSize,
            totalPages,
            count,
            page: page + 1,
          },
        };
      }
    }

    const options: IUser[] = [];

    return {
      options: options,
      hasMore: true,
      additional: {
        pageSize,
        totalPages: 0,
        count: 0,
        page: (additional?.page as number) + 1,
      },
    };
  };

  const calculatePrice = (item: IJewelry) => {
    if (sideDiamondPrice && shippingFee && profitRatio) {
      const { design, metalSpecification } = item;

      const raw =
        (design.metalWeight *
          metalWeightUnit *
          metalSpecification.pricePerUnit +
          design.sideDiamondsCount * +sideDiamondPrice +
          +shippingFee) *
        +profitRatio;

      return Math.round(raw / 1000) * 1000;
    }

    return 0;
  };

  useEffect(() => {
    if (productNoWatch.length === 0) setProductNo("");
  }, [productNoWatch]);

  return (
    <Grid container className={styles.container}>
      <Grid container item xs={11} rowGap={3} justifyContent={"space-between"}>
        <Grid container className={styles.title}>
          Tạo Đơn Mua Trang Sức
        </Grid>

        <Grid item md={7.5} className={styles.card}>
          <Grid item xs={12} mb={2}>
            <div>Nhập Mã Trang Sức:</div>
          </Grid>

          <Grid container mb={3}>
            <Grid item flex={1}>
              <OutlinedInput
                disabled={uploadMutation.isPending || resellMutation.isPending}
                fullWidth
                sx={{ borderRadius: 0 }}
                {...registerProductNo("productNo", {
                  required: "* Chưa nhập mã trang sức",
                })}
              />
            </Grid>

            <Button
              disabled={uploadMutation.isPending || resellMutation.isPending}
              variant="contained"
              sx={{ ...primaryBtn, py: 1, ml: 2 }}
              onClick={handleSubmitProductNo(onSubmitProductNo)}
            >
              <SearchIcon />
              Tìm Kiếm
            </Button>

            {errorsProductNo.productNo && (
              <Grid item xs={12} mt={1}>
                <FormHelperText error>
                  {errorsProductNo.productNo.message}
                </FormHelperText>
              </Grid>
            )}
          </Grid>

          {isLoading && (
            <Grid container py={3} justifyContent={"center"}>
              <CircularProgress size={30} sx={{ color: "#b43620" }} />
            </Grid>
          )}

          {productNo && !response?.data && !isLoading && (
            <Grid container>
              <FormLabel>Không tìm thấy trang sức</FormLabel>
            </Grid>
          )}

          {response?.data &&
            response.data.status === JewelryStatus.Purchased && (
              <Grid container gap={2} mt={1}>
                <Grid item xs={12}>
                  <FormLabel error={!!errors.paymentMethod}>
                    Phương Thức Thanh Toán
                  </FormLabel>
                  <Controller
                    defaultValue={PaymentMethod.Default}
                    name="paymentMethod"
                    rules={{ required: "* Chưa chọn phương thức thanh toán" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        sx={{ borderRadius: 0, mt: 1 }}
                        fullWidth
                        {...field}
                        error={!!errors.paymentMethod}
                      >
                        <MenuItem value={PaymentMethod.Default} disabled>
                          <em>Chọn phương thức thanh toán</em>
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
                  {errors.paymentMethod && (
                    <FormHelperText error>
                      {errors.paymentMethod.message}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} mt={1}>
                  <FormLabel error={!!errors.note}>Ghi chú</FormLabel>
                  <OutlinedInput
                    error={!!errors.note}
                    sx={{ borderRadius: 0, mt: 1 }}
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Ghi chú thêm"
                    {...register("note", {
                      required: "* Điền thêm ghi chú",
                    })}
                  />
                  {errors.note && (
                    <FormHelperText error>{errors.note.message}</FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} mt={1}>
                  <FormLabel error={!!errors.proofImage}>
                    Hình Ảnh Giao Dịch
                  </FormLabel>
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
                    loading={
                      uploadMutation.isPending || resellMutation.isPending
                    }
                    variant="contained"
                    sx={{ ...primaryBtn, px: 3, py: 1 }}
                    onClick={handleSubmit(onSubmit, onError)}
                  >
                    Xác Nhận
                  </LoadingButton>
                </Grid>
              </Grid>
            )}

          {response?.data &&
            response.data.status !== JewelryStatus.Purchased && (
              <Grid container mt={1}>
                Trang sức này không thể mua lại từ khách hàng
                <FormHelperText sx={{ mt: 1 }}>
                  Lưu ý: Những trang sức chưa được khách hàng mua hoặc đã được
                  mua lại từ khách hàng sẽ không thể thực hiện thao tác này
                </FormHelperText>
              </Grid>
            )}
        </Grid>

        <Grid item md={4}>
          <FormLabel error={emptyValue}>Tìm khách hàng:</FormLabel>
          <AsyncPaginate
            isClearable
            isSearchable
            getOptionLabel={(option) => `${option.username} - ${option.email}`}
            menuPosition="fixed"
            additional={initMetaData}
            value={value}
            loadOptions={loadPageOptions}
            onChange={(value) => {
              if (value) setEmptyValue(false);
              onChange(value);
            }}
          />
          {emptyValue && (
            <FormHelperText error>
              * Chưa có thông tin khách hàng
            </FormHelperText>
          )}

          {value && (
            <Grid item xs={12} mt={3}>
              <fieldset style={{ margin: 0 }}>
                <legend>Khách Hàng</legend>
                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Tên tài khoản:</Grid>

                  <Grid item>{value.username}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1}>
                  <Grid item>Email:</Grid>

                  <Grid item>{value.email}</Grid>
                </Grid>

                <Grid container justifyContent={"space-between"}>
                  <Grid item>Số điện thoại:</Grid>

                  <Grid item>{value.phone ? value.phone : "--"}</Grid>
                </Grid>
              </fieldset>
            </Grid>
          )}
        </Grid>

        {response?.data && (
          <Grid container mt={6}>
            <Grid item xs={12} className={styles.sectionTitle} mb={3}>
              Thông Tin Trang Sức
            </Grid>

            <Grid container item xs={12} sm={8} md={4} gap={1} mb={4}>
              <Grid container justifyContent={"space-between"}>
                <Grid item>Trạng thái:</Grid>

                <Grid
                  item
                  color={formatJewelryStatusLabel(response.data.status).color}
                >
                  {formatJewelryStatusLabel(response.data.status).text}
                </Grid>
              </Grid>

              <Grid container justifyContent={"space-between"}>
                <Grid item>Chi nhánh:</Grid>

                <Grid item>{response.data.branch.storeName}</Grid>
              </Grid>
            </Grid>

            <Jewelry item={response.data} />
          </Grid>
        )}

        <Grid container mt={6}>
          {response?.data && (
            <Grid container justifyContent={"space-between"} rowGap={3}>
              <Grid
                container
                justifyContent={"flex-end"}
                className={styles.resellAmount}
              >
                <Grid
                  container
                  item
                  md={6}
                  lg={4}
                  justifyContent={"space-between"}
                >
                  <span>Giá hiện tại:</span>
                  <span className={styles.amount}>
                    {currencyFormatter(calculatePrice(response.data))}
                  </span>
                </Grid>
              </Grid>

              <Grid
                container
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
                  <span>Tỷ lệ mua lại:</span>
                  <span>{resellRatio}%</span>
                </Grid>
              </Grid>

              {resellRatio && (
                <Grid
                  container
                  justifyContent={"flex-end"}
                  className={styles.resellAmount}
                >
                  <Grid
                    container
                    item
                    md={6}
                    lg={4}
                    justifyContent={"space-between"}
                  >
                    <span>Giá mua lại:</span>
                    <span className={styles.amount}>
                      {currencyFormatter(
                        (calculatePrice(response.data) * +resellRatio) / 100
                      )}
                    </span>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>

        <Grid container justifyContent={"center"} my={6}>
          <Button
            variant="contained"
            sx={{ ...primaryBtn, px: 5, py: 1 }}
            onClick={() => navigate("/staff/resell-order")}
          >
            Quay về
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CreateResellOrder;
