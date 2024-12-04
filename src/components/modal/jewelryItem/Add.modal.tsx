import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormLabel, Grid, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { pageSize } from "src/utils/constants";
import styles from "./Modal.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchDesigns,
  fetchJewelries,
  fetchJewelryCategories,
} from "src/utils/querykey";
import { getDesigns } from "src/services/design.service";
import { DesignCharacteristic, GoldColor } from "src/utils/enums";
import HoverCard from "src/components/product/HoverCard";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { mapGoldColor } from "src/utils/functions";
import { useAppSelector } from "src/utils/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { postCreateJewelry } from "src/services/jewelry.service";
import { toast } from "react-toastify";
import defaultImg from "src/assets/default.jpg";
import { getJewelryCategories } from "src/services/jewelryCategory.service";

const initMetaData: IListMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

const initSelected = {
  id: 0,
  image: {
    url: "",
  },
  metalSpecification: {
    id: 0,
    color: GoldColor.Yellow,
    name: "",
    pricePerUnit: 0,
  },
};

const generalFilter = {
  page: 0,
  pageSize: 100,
};

function AddModal(props: IAddJewelryModalProps) {
  const { open, setOpen, filterObj } = props;

  const [value, onChange] = useState<IDesign | null>(null);
  const [selected, setSelected] = useState(initSelected);
  const [categoryId, setCategoryId] = useState(0);

  const queryClient = useQueryClient();

  const { branchId } = useAppSelector((state) => state.auth.userInfo);

  const { data: categoryResponse } = useQuery({
    queryKey: [fetchJewelryCategories, generalFilter],

    queryFn: () => {
      return getJewelryCategories(generalFilter);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ICreateJewelryRequest) => {
      return postCreateJewelry(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Thêm trang sức thành công");

        queryClient.invalidateQueries({
          queryKey: [fetchJewelries, filterObj],
        });

        handleClose();
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const loadPageOptions = async (
    name: string,
    prevOptions: unknown,
    additional?: IListMetaData
  ) => {
    if (additional) {
      const filterObj: IDesignFilter = {
        page: additional.page,
        pageSize,
        categoryId: categoryId !== 0 ? categoryId : undefined,
        name: name ? name : undefined,
      };

      const response = await queryClient.fetchQuery({
        queryKey: [fetchDesigns, filterObj],
        queryFn: () => {
          return getDesigns(filterObj);
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

    const options: IDesign[] = [];

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

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    onChange(null);
    setSelected(initSelected);
    setCategoryId(0);
  };

  const handleConfirm = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (value) {
      mutation.mutate({
        branchId,
        designId: value.id,
        metalSpecId: selected.metalSpecification.id,
      });
    }
  };

  useEffect(() => {
    if (value) setSelected(value.designMetalSpecifications[0]);
  }, [value]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2 },
      }}
      fullWidth
      maxWidth={"md"}
      onSubmit={handleConfirm}
    >
      <DialogTitle>Add Jewelry</DialogTitle>
      <DialogContent className={styles.container}>
        <Grid
          container
          mt={3}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <Grid item xs={4}>
            <FormLabel>Category</FormLabel>
            {categoryResponse?.data && (
              <Select
                sx={{ mt: 1 }}
                fullWidth
                size="small"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(+e.target.value);
                  onChange(null);
                }}
              >
                <MenuItem value={0} disabled>
                  <em>Select category</em>
                </MenuItem>
                {categoryResponse.data.items.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </Grid>

          <Grid item xs={7.5}>
            <FormLabel>Choose a design</FormLabel>
            <AsyncPaginate
              cacheUniqs={[categoryId]}
              isClearable
              isSearchable
              getOptionLabel={(option) => option.name}
              menuPosition="fixed"
              className={styles.select}
              additional={initMetaData}
              value={value}
              loadOptions={loadPageOptions}
              onChange={onChange}
            />
          </Grid>
        </Grid>

        {value && (
          <Grid container mt={6} justifyContent={"space-between"}>
            <Grid item xs={5}>
              <HoverCard
                shadow
                file={value.blueprint.url}
                image={selected.image.url ? selected.image.url : defaultImg}
              />
            </Grid>

            <Grid item xs={6.5}>
              <div className={styles.name}>{value.name}</div>
              <div className={styles.collection}>
                {value.designCollection.name} Collection
              </div>
              {value.characteristic === DesignCharacteristic.Male && (
                <div className={styles.gender}>
                  <img src={male} />
                  Nam Tính
                </div>
              )}
              {value.characteristic === DesignCharacteristic.Female && (
                <div className={styles.gender}>
                  <img src={female} />
                  Nữ Tính
                </div>
              )}

              <Grid container justifyContent={"space-between"} mb={1} mt={3}>
                <Grid item xs={6}>
                  Khối lượng: {value.metalWeight} Chỉ
                </Grid>

                <Grid item xs={6}>
                  Kích thước: {value.size} cm
                </Grid>
              </Grid>

              <div>Kim cương phụ: {value.sideDiamondsCount} Viên</div>

              <div className={styles.metal}>
                <div className={styles.title}>
                  Chất liệu: <span>{selected.metalSpecification.name}</span>
                </div>

                <div className={styles.options}>
                  {value.designMetalSpecifications.map((item) => {
                    const selectedStyle =
                      selected.id === item.id ? styles.selected : "";
                    return (
                      <img
                        key={item.id}
                        src={mapGoldColor(item.metalSpecification)}
                        onClick={() => setSelected(item)}
                        className={selectedStyle}
                      />
                    );
                  })}
                </div>
              </div>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          disabled={!value}
          loading={mutation.isPending}
          variant="contained"
          type="submit"
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
