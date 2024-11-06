import { faGem, faPenNib, faRing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { Grid } from "@mui/material";
import styles from "./ProcessStage.module.scss";

function ProcessStage_100() {

  

  return (
    <div className="container">
      <div>
        <Grid container alignItems={"center"} justifyContent={"center"}>
          <Grid item className={styles.iconBackgroundDone} >
            <PersonOutlineIcon  sx={{fontSize:"30px", color:"white"}}  />
          </Grid>
          <Grid item className={styles.lineDoing}></Grid>

          <Grid item  className={styles.iconBackgroundDone}>
            <FontAwesomeIcon icon={faRing} className={styles.iconDone} />
          </Grid>
          <Grid item className={styles.lineDoing}></Grid>

          <Grid item className={styles.iconBackgroundDone}>
            <FontAwesomeIcon icon={faGem} className={styles.iconDone} />
          </Grid>
          <Grid item className={styles.lineDoing}></Grid>

          <Grid item className={styles.iconBackgroundDone}>
            <FontAwesomeIcon icon={faPenNib} className={styles.iconDone} />
          </Grid>
          <Grid item className={styles.lineDoing}></Grid>

          <Grid item className={styles.iconBackgroundDoing}>
            <CheckCircleOutlineSharpIcon sx={{fontSize:"30px", color:"black"}}/>
          </Grid>
        </Grid>

        
      </div>
    </div>
  );
}

export default ProcessStage_100;
