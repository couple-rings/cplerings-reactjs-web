import { Grid } from "@mui/material";
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

const addresses = [
  {
    receiverName: "Nguyễn Tín",
    address:
      "Chung cư NestHome Block1.2 phòng 110, đường Chu Huy Mân,Đà Nẵng,Quận Sơn Trà",
    receiverPhone: "0987446873",
  },
  {
    receiverName: "Nguyễn Tín",
    address:
      "Chung cư NestHome Block1.2 phòng 110, đường Chu Huy Mân,Đà Nẵng,Quận Sơn Trà",
    receiverPhone: "0987446873",
  },
];

const Address = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { districts } = useAppSelector((state) => state.district);

  useEffect(() => {
    (async () => {
      if (districts.length === 0) {
        const data = await getDistricts();
        if (data && data.districts) {
          dispatch(saveList(data.districts));
        }
      }
    })();
  }, [dispatch, districts.length]);

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
            {addresses.map((item, index) => {
              return (
                <AddressCard
                  key={index}
                  {...item}
                  setOpenDelete={setOpenDelete}
                  setOpenUpdate={setOpenUpdate}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
      <UpdateModal open={openUpdate} setOpen={setOpenUpdate} />
    </div>
  );
};

export default Address;
