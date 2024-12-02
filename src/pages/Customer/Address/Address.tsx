import { Grid, Pagination, Skeleton } from "@mui/material";
import styles from "./Address.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import AddModal from "src/components/modal/address/Add.modal";
import { getDistricts } from "src/services/province.service";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { saveList } from "src/redux/slice/district.slice";
import DeleteModal from "src/components/modal/address/Delete.modal";
import UpdateModal from "src/components/modal/address/Update.modal";
import { useNavigate } from "react-router-dom";
import AddressCard from "src/components/address/Card.Manage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransportAddresses } from "src/services/transportAddress.service";
import { fetchDistricts, fetchTransportAddresses } from "src/utils/querykey";
import { UserRole } from "src/utils/enums";

const initMetaData = {
  page: 0,
  pageSize: 6,
  totalPages: 0,
  count: 0,
};

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

const Address = () => {
  const [filterObj, setFilterObj] =
    useState<ITransportationAddressFilter | null>(null);
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);

  const [selected, setSelected] = useState<ITransportAddress>(initSelected);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { districts } = useAppSelector((state) => state.district);
  const { id } = useAppSelector((state) => state.auth.userInfo);

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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (filterObj)
      setFilterObj({
        ...filterObj,
        page: value - 1,
      });
  };

  const resetSelected = () => {
    setSelected(initSelected);
  };

  useEffect(() => {
    if (districtsResponse?.districts) {
      dispatch(saveList(districtsResponse.districts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtsResponse]);

  useEffect(() => {
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [response]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchTransportAddresses, filterObj],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 6,
      customerId: id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className={styles.container}>
      <Grid container item xs={10} className={styles.head}>
        <div className={styles.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </div>
      </Grid>
      <Grid container className={styles.body}>
        <Grid item xs={10} lg={8}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Địa Chỉ</div>
            <div className={styles.addBtn} onClick={() => setOpenAdd(true)}>
              <AddCircleIcon className={styles.icon} />
              <span>Thêm Mới</span>
            </div>
          </div>

          <Grid container className={styles.addressList}>
            {response?.data?.items.map((item) => {
              return (
                <AddressCard
                  key={item.id}
                  data={item}
                  setOpenDelete={setOpenDelete}
                  setOpenUpdate={setOpenUpdate}
                  setSelected={setSelected}
                />
              );
            })}

            {response?.data?.items.length === 0 && (
              <div>Chưa có địa chỉ nào</div>
            )}
          </Grid>
        </Grid>
      </Grid>

      {response && response.data && response.data.items.length > 0 && (
        <Pagination
          sx={{ marginTop: 10 }}
          count={metaData.totalPages}
          page={metaData.page + 1}
          onChange={handleChange}
        />
      )}

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
};

export default Address;
