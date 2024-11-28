import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { phonePattern } from "src/utils/constants";
import { useAppSelector } from "src/utils/hooks";
import { getWards } from "src/services/province.service";
import { useEffect, useMemo, useState } from "react";

interface IFormInput {
  receiverName: string;
  receiverPhone: string;
  address: string;
  district: number;
  ward: number;
}

function UpdateModal(props: IUpdateAddressModalProps) {
  const { open, setOpen, selected, resetSelected } = props;

  const [wards, setWards] = useState<IWard[]>([]);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      const { receiverName, receiverPhone, address, districtCode } = selected;
      return {
        receiverName,
        receiverPhone,
        address,
        district: districtCode,
      };
    }, [selected]),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const district = districts.find((item) => item.code === data.district);
    const ward = wards.find((item) => item.code === data.ward);
    if (district && ward) {
      const address = `${data.address}, ${ward.name}, ${district.name}, TP Hồ Chí Minh`;
      console.log(address);
    }
  };
  const { districts } = useAppSelector((state) => state.district);

  const handleSelectDistrict = async (
    districtCode: number | string,
    newDistrict?: boolean
  ) => {
    if (!districtCode) {
      reset({
        ward: 0,
      });
      setWards([]);
      return;
    }
    const data = await getWards(+districtCode);
    if (data && data.wards) {
      setWards(data.wards);
      if (newDistrict)
        reset({
          ward: 0,
          district: +districtCode,
        });
      else
        reset({
          ward: selected.wardCode,
        });
    }
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    resetSelected && resetSelected();
  };

  useEffect(() => {
    const { receiverName, receiverPhone, address, districtCode } = selected;
    handleSelectDistrict(districtCode);

    reset({
      receiverName,
      receiverPhone,
      address,
      district: districtCode,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2 },
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Sửa Địa Chỉ</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              label="Họ & Tên"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.receiverName}
              {...register("receiverName", {
                required: "Vui lòng nhập họ tên",
              })}
            />
            {errors.receiverName && (
              <FormHelperText error>
                {errors.receiverName.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              autoFocus
              label="Số Điện Thoại"
              type="number"
              fullWidth
              variant="standard"
              error={!!errors.receiverPhone}
              {...register("receiverPhone", {
                required: "Vui lòng nhập SĐT",
                pattern: {
                  value: phonePattern,
                  message: "SĐT không hợp lệ",
                },
              })}
            />
            {errors.receiverPhone && (
              <FormHelperText error>
                {errors.receiverPhone.message}
              </FormHelperText>
            )}
          </Grid>
        </Grid>

        <Box sx={{ my: 2 }}>
          <TextField
            autoFocus
            label="Địa chỉ"
            type="text"
            fullWidth
            variant="standard"
            error={!!errors.address}
            {...register("address", {
              required: "Vui lòng nhập địa chỉ",
            })}
          />
          {errors.address && (
            <FormHelperText error>{errors.address.message}</FormHelperText>
          )}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth error={!!errors.district}>
              <InputLabel>Quận, huyện</InputLabel>
              <Controller
                defaultValue={0}
                name="district"
                control={control}
                rules={{ required: "Vui lòng chọn quận, huyện" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSelectDistrict(e.target.value, true);
                    }}
                  >
                    <MenuItem value={0} disabled>
                      <em>None</em>
                    </MenuItem>
                    {districts.map((district) => {
                      return (
                        <MenuItem value={district.code} key={district.code}>
                          {district.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {errors.district && (
                <FormHelperText error>{errors.district.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth error={!!errors.ward}>
              <InputLabel>Xã, phường</InputLabel>
              <Controller
                defaultValue={0}
                name="ward"
                control={control}
                rules={{ required: "Vui lòng chọn xã, phường" }}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={0} disabled>
                      <em>None</em>
                    </MenuItem>
                    {wards.map((ward) => {
                      return (
                        <MenuItem value={ward.code} key={ward.code}>
                          {ward.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {errors.ward && (
                <FormHelperText error>{errors.ward.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" type="submit">
          Xác Nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateModal;
