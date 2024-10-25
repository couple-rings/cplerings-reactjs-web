import { Button, Card, Divider, Grid } from "@mui/material";
import styles from "./DesignVersions.module.scss";
import menring from "src/assets/sampledata/menring.png";
import womenring from "src/assets/sampledata/womenring.png";
import blueprint from "src/assets/sampledata/blueprint.pdf";
import HoverCard from "src/components/product/HoverCard";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { primaryBtn } from "src/utils/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddModal from "src/components/modal/version/Add.modal";
import { useState } from "react";

function DesignVersions() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Thiết Kế</div>
      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          sm={10}
          md={8}
          justifyContent={"center"}
          className={styles.original}
        >
          <Grid item xs={12} className={styles.name}>
            DR FOREVER Two-row Diamond Pavé Wedding Rings
          </Grid>
          <Grid item md={5}>
            <HoverCard image={menring} file={blueprint} />
            <div className={styles.label}>
              <img src={male} />
              <span>Nhẫn Nam</span>
            </div>
          </Grid>
          <Grid item md={5}>
            <HoverCard image={womenring} file={blueprint} />
            <div className={styles.label}>
              <img src={female} />
              <span>Nhẫn Nữ</span>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <div className={styles.title}>Các Phiên Bản</div>

      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          sm={11}
          gap={7}
          justifyContent={"flex-start"}
          className={styles.versionList}
        >
          <Grid item xs={12} className={styles.label}>
            <img src={male} />
            <span>Nhẫn Nam</span>
          </Grid>

          {[1, 2, 3].map((item) => {
            return (
              <Grid item md={3} key={item}>
                <Card className={styles.version}>
                  <HoverCard image={menring} file={blueprint} />
                  <div className={styles.versionNo}>Version {item}</div>
                  {item === 1 && <CheckCircleIcon color="success" />}
                </Card>
              </Grid>
            );
          })}

          <Divider sx={{ backgroundColor: "#ccc", width: "100%", my: 3 }} />
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          sm={11}
          gap={7}
          justifyContent={"flex-start"}
          className={styles.versionList}
        >
          <Grid item xs={12} className={styles.label}>
            <img src={female} />
            <span>Nhẫn Nữ</span>
          </Grid>

          {[1, 2].map((item) => {
            return (
              <Grid item md={3} key={item}>
                <Card className={styles.version}>
                  <HoverCard image={menring} file={blueprint} />
                  <div className={styles.versionNo}>Version {item}</div>
                </Card>
              </Grid>
            );
          })}

          <Grid item xs={12} md={3} onClick={() => setOpen(true)}>
            <Card className={`${styles.version} ${styles.addVersion}`}>
              <AddBoxOutlinedIcon className={styles.addIcon} />
              <div className={styles.addText}>Tạo Thiết Kế</div>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} mt={10}>
        <Grid item xs={11} md={4}>
          <Button
            variant="contained"
            sx={{ ...primaryBtn, borderRadius: 2 }}
            fullWidth
          >
            Xác Nhận Tạo
          </Button>
        </Grid>
      </Grid>

      <AddModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default DesignVersions;
