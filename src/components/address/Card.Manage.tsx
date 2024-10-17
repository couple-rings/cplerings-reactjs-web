import { Button, Divider, Grid } from "@mui/material";
import styles from "./Card.Manage.module.scss";

const AddressCard = (props: IAddressCardProps) => {
  const { address, receiverName, receiverPhone, setOpenDelete, setOpenUpdate } =
    props;

  return (
    <Grid item md={5.5} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.name}>{receiverName}</div>
        <div className={styles.address}>{address}</div>
        <div className={styles.phone}>Tel {receiverPhone}</div>
        <div className={styles.btnGroup}>
          <Button variant="text" onClick={() => setOpenDelete(true)}>
            Xóa
          </Button>
          <Button variant="text" onClick={() => setOpenUpdate(true)}>
            Sửa
          </Button>
        </div>
      </div>
      <Divider sx={{ backgroundColor: "gray" }} />
    </Grid>
  );
};

export default AddressCard;
