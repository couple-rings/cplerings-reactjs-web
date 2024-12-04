import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button, Grid } from "@mui/material";
import styles from "./BranchCard.module.scss";
import { primaryBtn } from "src/utils/styles";

const BranchCard = (props: IBranchCardProps) => {
  const { data } = props;
  const { address, phone, storeName, coverImage } = data;

  return (
    <div className={styles.container}>
      <div className="item-container">
        <img src={coverImage ? coverImage.url : ""} alt="" />
        <div className={styles.content}>
          <p className={styles.branchName}>{storeName}</p>
          <p className={styles.adr}>{address}</p>
          <div className={styles.contact}>
            <LocalPhoneIcon sx={{ fontSize: 20, color: "gray" }} /> {phone}
          </div>
          <Grid container justifyContent={"center"} px={2}>
            <Button variant="contained" sx={primaryBtn} fullWidth>
              Liên hệ với chúng tôi
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
