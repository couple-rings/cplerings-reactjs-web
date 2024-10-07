import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button } from "@mui/material";
import styles from "./BranchCard.module.scss";

const BranchCard = (props: IBranchCardProps) => {
    const {store} =props;
    const {name, adr, contact} = store;
  return (
    <div className={styles.container}>
      <div className="item-container">
        <img
          src="https://fastdfscdn.darryring.com/group1/M00/1C/55/wKgclmI9kHqABJjiAAGKxM5l95g526.jpg"
          alt=""
        />
        <div className={styles.content}>
          <p className={styles.branchName}>{name}</p>
          <p className={styles.adr}>
            {adr}
          </p>
          <p className={styles.contact}>
            <LocalPhoneIcon sx={{fontSize: 20, color:"gray"}} /> {contact}
          </p>
          <Button>Liên hệ với chúng tôi</Button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
