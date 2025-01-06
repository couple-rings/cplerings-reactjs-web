import {
    Button,
    CircularProgress,
    FormHelperText,
    FormLabel,
    Grid,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";
import styles from "./CreateResellOrder.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { primaryBtn } from "src/utils/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    ConfigurationKey,
    CustomOrderStatus,
    PaymentMethod,
} from "src/utils/enums";
import {
    currencyFormatter,
    formatRefundMethodTitle,
    toBase64,
} from "src/utils/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCustomOrderByOrderNo } from "src/utils/querykey";
import { getCustomOrderByOrderNo } from "src/services/customOrder.service";
import { useEffect, useState } from "react";
import placeholder from "src/assets/default.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppSelector } from "src/utils/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postResellCustomOrder } from "src/services/resell.service";
import { postUploadFile } from "src/services/file.service";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import moment from "moment";

interface IFormInput {
    note: string;
    proofImage: File;
    paymentMethod: PaymentMethod;
}

const ResellCustomOrder = () => {
    const [productNo, setProductNo] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const navigate = useNavigate();
    const { configs } = useAppSelector((state) => state.config);

    const resellRatio = configs.find(
        (item: { key: ConfigurationKey; value: string }) => item.key === ConfigurationKey.ResellRatio
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
        queryKey: [fetchCustomOrderByOrderNo, productNo],
        queryFn: () => {
            if (productNo) return getCustomOrderByOrderNo(productNo);
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
        mutationFn: (data: { customOrderId: number, payload: ICustomOrderResellRequest }) => {
            return postResellCustomOrder(data.customOrderId, data.payload);
        },
        onSuccess: (response) => {
            if (response.data) {
                toast.success("Đã xác nhận mua lại đơn hàng");
                navigate("/staff/resell-product");
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
        const base64 = await toBase64(data.proofImage);
        const uploadResponse = await uploadMutation.mutateAsync(base64);
        if (uploadResponse.data && response?.data) {
            const { note, paymentMethod } = data;

            resellMutation.mutate({
                customOrderId: response.data.customOrder.id,
                payload: {
                    customerId: response.data.customOrder.customer.id,
                    note,
                    paymentMethod,
                    proofImageId: uploadResponse.data.id,
                },
            });
        }
    };

    useEffect(() => {
        if (productNoWatch.length === 0) setProductNo("");
    }, [productNoWatch]);

    const isOrderAlreadyRefunded = response?.data?.customOrder.status === CustomOrderStatus.Resold;

    return (
        <Grid container justifyContent="center" my={4}>
            <Grid container item md={8} className={styles.card} sx={{ p: 4, boxShadow: 2, borderRadius: 2 }}>
                <Grid item xs={12}>
                    <div>Nhập Mã Đơn Hàng:</div>
                </Grid>

                <Grid container>
                    <Grid item flex={1}>
                        <OutlinedInput
                            disabled={uploadMutation.isPending || resellMutation.isPending}
                            fullWidth
                            sx={{ bproductRadius: 0 }}
                            {...registerProductNo("productNo", {
                                required: "* Chưa nhập mã đơn",
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
                </Grid>

                {errorsProductNo.productNo && (
                    <Grid item xs={12} mt={1}>
                        <FormHelperText error>
                            {errorsProductNo.productNo.message}
                        </FormHelperText>
                    </Grid>
                )}

                {isLoading && (
                    <Grid container py={4} justifyContent="center">
                        <CircularProgress size={40} sx={{ color: "#b43620" }} />
                    </Grid>
                )}

                {productNo && !response?.data && !isLoading && (
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        py={6}
                        sx={{
                            backgroundColor: 'grey.50',
                            borderRadius: 1,
                            mt: 3
                        }}
                    >
                        <ErrorOutlineIcon
                            sx={{
                                fontSize: 48,
                                color: 'error.main',
                                mb: 2
                            }}
                        />
                        <Typography variant="h6" color="error.main" gutterBottom>
                            Không tìm thấy đơn hàng
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Vui lòng kiểm tra lại mã đơn hàng và thử lại
                        </Typography>
                    </Grid>
                )}

                {response?.data && isOrderAlreadyRefunded && (
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        py={6}
                        sx={{
                            backgroundColor: '#FFF3E0',
                            borderRadius: 1,
                            mt: 3
                        }}
                    >
                        <AssignmentReturnIcon
                            sx={{
                                fontSize: 48,
                                color: '#E65100',
                                mb: 2
                            }}
                        />
                        <Typography variant="h6" color="#E65100" gutterBottom>
                            Đơn hàng đã được mua lại
                        </Typography>
                        <Typography variant="body1" color="#E65100" textAlign="center">
                            Đơn hàng này đã được xử lý mua lại trước đó.
                            <br />
                            Vui lòng kiểm tra lại hoặc chọn đơn hàng khác.
                        </Typography>
                    </Grid>
                )}

                {response?.data && !isOrderAlreadyRefunded && (
                    <Grid container spacing={3} mt={2}>
                        <Grid item xs={12}>
                            <fieldset style={{ margin: 0 }}>
                                <legend>Thông Tin Đơn Hàng</legend>
                                <Grid container p={2}>
                                    <Grid container justifyContent="space-between" mb={1}>
                                        <Grid item xs={4}>Mã đơn:</Grid>
                                        <Grid item>{response.data.customOrder.orderNo}</Grid>
                                    </Grid>

                                    <Grid container justifyContent="space-between" mb={1}>
                                        <Grid item xs={4}>Ngày hoàn tất:</Grid>
                                        <Grid item>
                                            {moment(
                                                response.data.customOrder.customOrderHistories.find(
                                                    (item) => item.status === CustomOrderStatus.Done
                                                )?.createdAt
                                            ).format("DD/MM/YYYY HH:mm")}
                                        </Grid>
                                    </Grid>

                                    <Grid container justifyContent="space-between" mb={1}>
                                        <Grid item xs={4}>Tổng tiền:</Grid>
                                        <Grid item className={styles.totalPrice}>
                                            {currencyFormatter(response.data.customOrder.totalPrice.amount)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </fieldset>
                        </Grid>

                        <Grid item xs={12} md={5.7}>
                            <fieldset style={{ margin: 0, width: "100%" }}>
                                <legend>Khách Hàng</legend>
                                <Grid container p={2}>
                                    <Grid container justifyContent="space-between" mb={1}>
                                        <Grid item>Tên tài khoản:</Grid>
                                        <Grid item>{response.data.customOrder.customer.username}</Grid>
                                    </Grid>

                                    <Grid container justifyContent="space-between" mb={1}>
                                        <Grid item>Email:</Grid>
                                        <Grid item>{response.data.customOrder.customer.email}</Grid>
                                    </Grid>

                                    <Grid container justifyContent="space-between" mb={1}>
                                        <Grid item>Số điện thoại:</Grid>
                                        <Grid item>
                                            {response.data.customOrder.customer.phone || "--"}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </fieldset>
                        </Grid>

                        <Grid item xs={12}>
                            <fieldset style={{ margin: 0 }}>
                                <legend>Chi Tiết Nhẫn</legend>
                                <Grid container spacing={3} p={2}>
                                    <Grid item xs={12} md={6}>
                                        <div className={styles.ringCard}>
                                            <Typography variant="subtitle1" className={styles.ringTitle}>
                                                Nhẫn Nam
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <img
                                                        src={response.data.customOrder.firstRing.customDesign.designVersion.image.url}
                                                        alt="Male Ring"
                                                        className={styles.ringImage}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className={styles.ringDetails}>
                                                        <div className={styles.detailRow}>
                                                            <span>Size:</span>
                                                            <span>{response.data.customOrder.firstRing.fingerSize}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Kim loại:</span>
                                                            <span>{response.data.customOrder.firstRing.metalSpecification.name}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Khắc tên:</span>
                                                            <span>{response.data.customOrder.firstRing.engraving || "Không có"}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Màu sắc:</span>
                                                            <span>{response.data.customOrder.firstRing.metalSpecification.color}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Khối lượng:</span>
                                                            <span>{response.data.customOrder.firstRing.customDesign.metalWeight}g</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Số kim cương phụ:</span>
                                                            <span>{response.data.customOrder.firstRing.customDesign.sideDiamondsCount}</span>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <div className={styles.ringCard}>
                                            <Typography variant="subtitle1" className={styles.ringTitle}>
                                                Nhẫn Nữ
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <img
                                                        src={response.data.customOrder.secondRing.customDesign.designVersion.image.url}
                                                        alt="Female Ring"
                                                        className={styles.ringImage}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className={styles.ringDetails}>
                                                        <div className={styles.detailRow}>
                                                            <span>Size:</span>
                                                            <span>{response.data.customOrder.secondRing.fingerSize}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Kim loại:</span>
                                                            <span>{response.data.customOrder.secondRing.metalSpecification.name}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Khắc tên:</span>
                                                            <span>{response.data.customOrder.secondRing.engraving || "Không có"}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Màu sắc:</span>
                                                            <span>{response.data.customOrder.secondRing.metalSpecification.color}</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Khối lượng:</span>
                                                            <span>{response.data.customOrder.secondRing.customDesign.metalWeight}g</span>
                                                        </div>
                                                        <div className={styles.detailRow}>
                                                            <span>Số kim cương phụ:</span>
                                                            <span>{response.data.customOrder.secondRing.customDesign.sideDiamondsCount}</span>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </fieldset>
                        </Grid>
                    </Grid>
                )}

                {response?.data &&
                    (response.data.customOrder.status === CustomOrderStatus.Done ||
                        response.data.customOrder.status === CustomOrderStatus.Completed) && (
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
                                            sx={{ bproductRadius: 0, mt: 1 }}
                                            fullWidth
                                            {...field}
                                            error={!!errors.paymentMethod}
                                        >
                                            <MenuItem value={PaymentMethod.Default} disabled>
                                                <em>Chọn phương thức thanh toán</em>
                                            </MenuItem>
                                            {[PaymentMethod.Cash, PaymentMethod.Transfer].map(
                                                (paymentMethod) => (
                                                    <MenuItem value={paymentMethod} key={paymentMethod}>
                                                        {formatRefundMethodTitle(paymentMethod)}
                                                    </MenuItem>
                                                )
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
                                    sx={{ bproductRadius: 0, mt: 1 }}
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
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        if (e.target.files && e.target.files.length > 0) {
                                                            onChange(e.target.files[0]);
                                                            setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
                                <FormHelperText error>{errors.proofImage.message}</FormHelperText>
                            )}

                            <Grid container mt={4} justifyContent={"flex-end"} className={styles.ratio}>
                                <Grid container item md={6} lg={4} justifyContent={"space-between"}>
                                    <span>Tỷ lệ mua lại:</span>
                                    <span>{resellRatio}%</span>
                                </Grid>
                            </Grid>

                            {resellRatio && (
                                <Grid container justifyContent={"flex-end"} className={styles.resellAmount}>
                                    <Grid container item md={6} lg={4} justifyContent={"space-between"}>
                                        <span>Giá mua lại:</span>
                                        <span className={styles.amount}>
                                            {currencyFormatter(
                                                (response.data.customOrder.totalPrice.amount * +resellRatio) / 100
                                            )}
                                        </span>
                                    </Grid>
                                </Grid>
                            )}

                            <Grid item xs={12} textAlign={"right"} mt={3}>
                                <LoadingButton
                                    loading={uploadMutation.isPending || resellMutation.isPending}
                                    variant="contained"
                                    sx={{ ...primaryBtn, px: 3, py: 1 }}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Xác Nhận
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    )}
            </Grid>
        </Grid>
    );
};

export default ResellCustomOrder; 