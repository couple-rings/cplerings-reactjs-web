import { Button, Checkbox, Divider, Grid } from "@mui/material";
import styles from "./Card.Checkout.module.scss";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const AddressCard = (props: IAddressCardProps) => {
  const {
    data,
    setOpenDelete,
    setOpenUpdate,
    setSelected,
    checked,
    handleCheck,
  } = props;
  const { receiverName, receiverPhone, address } = data;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item gap={3} display={"flex"} flexDirection={"row"}>
            <div className={styles.name}>{receiverName}</div>
            <div className={styles.phone}>{receiverPhone}</div>
          </Grid>

          <Grid item>
            <Checkbox
              checked={checked ?? false}
              onChange={(event) => {
                handleCheck && handleCheck(data.id, event.target.checked);
              }}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
          </Grid>
        </Grid>

        <div className={styles.address}>{address}</div>
        <div className={styles.btnGroup}>
          <Button variant="text" onClick={() => setOpenDelete(true)}>
            Xóa
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setOpenUpdate(true);
              setSelected(data);
            }}
          >
            Sửa
          </Button>
        </div>
      </div>
      <Divider sx={{ backgroundColor: "gray" }} />
    </div>
  );
};

export default AddressCard;
