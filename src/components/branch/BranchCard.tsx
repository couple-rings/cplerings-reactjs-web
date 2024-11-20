import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button } from "@mui/material";
import styles from "./BranchCard.module.scss";

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
          <p className={styles.contact}>
            <LocalPhoneIcon sx={{ fontSize: 20, color: "gray" }} /> {phone}
          </p>
          <Button>Liên hệ với chúng tôi</Button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
