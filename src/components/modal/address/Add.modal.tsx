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
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateTransportAddress } from "src/services/transportAddress.service";
import { toast } from "react-toastify";
import { fetchTransportAddresses } from "src/utils/querykey";
import LoadingButton from "@mui/lab/LoadingButton";

interface IFormInput {
  receiverName: string;
  receiverPhone: string;
  address: string;
  district: number;
  ward: number;
}

function AddModal(props: IAddAddressModalProps) {
  const { open, setOpen, filterObj } = props;

  const [wards, setWards] = useState<IWard[]>([]);

  const { id } = useAppSelector((state) => state.auth.userInfo);
  const { districts } = useAppSelector((state) => state.district);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ICreateTransportAddressRequest) => {
      return postCreateTransportAddress(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Tạo địa chỉ thành công");
        queryClient.invalidateQueries({
          queryKey: [fetchTransportAddresses, filterObj],
        });
        handleClose();
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const district = districts.find((item) => item.code === data.district);
    const ward = wards.find((item) => item.code === data.ward);
    if (district && ward) {
      const address = `${data.address}, ${ward.name}, ${district.name}, TP Hồ Chí Minh`;

      mutation.mutate({
        customerId: id,
        address,
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,
        ward: ward.name,
        wardCode: ward.code,
        district: district.name,
        districtCode: district.code,
      });
    }
  };

  const handleSelectDistrict = async (districtCode: number | string) => {
    if (!districtCode) {
      reset({
        ward: 0,
      });
      setWards([]);
      return;
    }
    const data = await getWards(+districtCode);
    if (data && data.wards) setWards(data.wards);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    setWards([]);
    reset();
  };

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
      <DialogTitle>Thêm Địa Chỉ</DialogTitle>
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
                rules={{
                  required: "Vui lòng chọn quận, huyện",
                  min: { value: 1, message: "Vui lòng chọn quận, huyện" },
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSelectDistrict(e.target.value);
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
                rules={{
                  required: "Vui lòng chọn xã, phường",
                  min: { value: 1, message: "Vui lòng chọn quận, huyện" },
                }}
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
        <LoadingButton
          variant="contained"
          type="submit"
          loading={mutation.isPending}
        >
          Xác Nhận
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
