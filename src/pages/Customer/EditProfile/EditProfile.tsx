import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    Input,
    OutlinedInput,
    Grid,
    FormHelperText,
    Checkbox,
    Select,
    MenuItem,
    Collapse,
    Typography,
    IconButton,
} from "@mui/material";
import styles from "./EditProfile.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import { emailPattern, fullName } from "src/utils/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface IFormInput {
    fullName: string;
    email: string;
    gender: string;
    maritalStatus: string;
    description: string;
    birthday: string;
    weddingAnniversary: string;
    loveAnniversary: string;
}

const EditProfile = () => {
    const [isAnniversaryExpanded, setIsAnniversaryExpanded] = useState(false);
    const handleAnniversaryClick = () => {
        setIsAnniversaryExpanded(!isAnniversaryExpanded);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Grid container className={styles.head} onClick={() => navigate("../../")}>
                <Grid item xs={10} className={styles.homeLink}>
                    <ArrowBackIosIcon />
                    <span>Trang Chủ</span>
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid item sm={8} md={5} lg={3}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.title}>Chỉnh sửa thông tin tài khoản</div>

                        <FormControl variant="outlined">
                            <InputLabel htmlFor='display-name'>Họ và Tên</InputLabel>
                            <OutlinedInput
                                sx={{ borderRadius: 0 }}
                                placeholder="Họ và Tên"
                                label="Họ và Tên"
                                error={!!errors.fullName}
                                {...register("fullName", {
                                    required: "Vui lòng nhập đầy đủ Họ và Tên",
                                    pattern: {
                                        value: fullName,
                                        message: "Họ Tên không hợp lệ",
                                    },
                                })}
                            />
                            {errors.fullName && (
                                <FormHelperText error>{errors.fullName.message}</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl variant="outlined">
                            <InputLabel htmlFor='display-name'>Email</InputLabel>
                            <OutlinedInput
                                sx={{ borderRadius: 0 }}
                                placeholder="Email"
                                label="Email"
                                error={!!errors.email}
                                {...register("email", {
                                    required: "Vui lòng nhập email",
                                    pattern: {
                                        value: emailPattern,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                            />
                            {errors.email && (
                                <FormHelperText error>{errors.email.message}</FormHelperText>
                            )}
                        </FormControl>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        displayEmpty
                                        defaultValue=""
                                        {...register("gender")}
                                        error={!!errors.gender}
                                    >
                                        <MenuItem value="" disabled>Giới Tính</MenuItem> {/* Placeholder */}
                                        <MenuItem value="male">Nam</MenuItem>
                                        <MenuItem value="female">Nữ</MenuItem>
                                        <MenuItem value="secret">Bí Mật</MenuItem>
                                    </Select>
                                    {errors.gender && (
                                        <FormHelperText error>{errors.gender.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        displayEmpty
                                        defaultValue=""
                                        {...register("maritalStatus")}
                                        error={!!errors.maritalStatus}
                                    >
                                        <MenuItem value="" disabled>Tình trạng hôn nhân</MenuItem> {/* Placeholder */}
                                        <MenuItem value="yes">Có</MenuItem>
                                        <MenuItem value="no">Không</MenuItem>
                                        <MenuItem value="secret">Bí Mật</MenuItem>
                                    </Select>
                                    {errors.maritalStatus && (
                                        <FormHelperText error>{errors.maritalStatus.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>


                        <FormControl variant="outlined">
                            <InputLabel htmlFor='display-name'>Miêu tả</InputLabel>
                            <OutlinedInput
                                sx={{ borderRadius: 0 }}
                                multiline
                                rows={4}
                                label="Miêu tả"
                                placeholder="Miêu tả"
                                error={!!errors.description}
                                {...register("description")}
                            />
                            {errors.description && (
                                <FormHelperText error>{errors.description.message}</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl className={styles.newsLetter}>
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Email tôi về tin tức, cập nhật và ưu đãi của Couple Rings."
                            />
                        </FormControl>

                        <div>
                            <Typography variant="h6" onClick={handleAnniversaryClick}>
                                Edit your Anniversary
                                <IconButton onClick={handleAnniversaryClick}>
                                    {isAnniversaryExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                                </IconButton>
                            </Typography>
                            <Collapse in={isAnniversaryExpanded}>
                                <Grid container spacing={2} sx={{ padding: '2rem' }}>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel shrink htmlFor="birthday">Sinh Nhật</InputLabel>
                                            <Input
                                                type="date"
                                                id="birthday"
                                                placeholder=""
                                                {...register("birthday")}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel shrink htmlFor="weddingAnniversary">Ngày cưới</InputLabel>
                                            <Input
                                                type="date"
                                                id="weddingAnniversary"
                                                placeholder=""
                                                {...register("weddingAnniversary")}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel shrink htmlFor="loveAnniversary">Ngày kỷ niệm bên nhau</InputLabel>
                                            <Input
                                                type="date"
                                                id="loveAnniversary"
                                                {...register("loveAnniversary")}
                                                inputProps={{
                                                    placeholder: '',
                                                    'data-placeholder': '',
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Collapse>
                        </div>

                        <Button variant="contained" sx={primaryBtn} fullWidth type="submit">
                            Lưu Thay Đổi
                        </Button>
                    </form>

                    <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" className={styles.navBtn} fullWidth onClick={() => navigate("../change-password")}>
                                Đổi mật khẩu
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className={styles.fwdBtn} onClick={() => navigate("../address")}>
                                <span>Quản lý địa chỉ {">"}</span>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    );
};

export default EditProfile;