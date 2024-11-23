import { Box } from "@mui/material";
import thumbImg from "../../../assets/agreementPic.png";
import styles from "./BoxLoveAgreement.module.scss";

function BoxLoveAgreement(props: ILoveAgreement) {
  const { spouseName, date } = props;
  return (
    <Box className={styles.container}>
      <img src={thumbImg} alt="" />
      <div className={styles.boxContent}>
        <div className={styles.ownName}>{spouseName}</div>
        <div className={styles.signDate}>{date}</div>
      </div>
    </Box>
  );
}

export default BoxLoveAgreement;
