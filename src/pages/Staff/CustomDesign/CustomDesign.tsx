import {
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import styles from "./CustomDesign.module.scss";
import menring from "src/assets/sampledata/menring.png";
import womenring from "src/assets/sampledata/womenring.png";
import female from "src/assets/female-icon.png";
import male from "src/assets/male-icon.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { primaryBtn } from "src/utils/styles";
import HoverCard from "src/components/product/HoverCard";
import blueprint from "src/assets/sampledata/blueprint.pdf";

const metals = ["Vàng Trắng 18K", "Vàng Thường 18K", "Vàng Hồng 18K"];
const diamonds = ["5PT - F - SI1", "10PT - F - VS2", "15PT - G - SI1"];

function CustomDesign() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Tạo Thiết Kế</div>

      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          lg={11}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item md={4} className={styles.left}>
            <HoverCard file={blueprint} image={menring} shadow={true} />
            <div className={styles.label}>
              <img src={male} />
              <span>Nhẫn Nam</span>
            </div>
          </Grid>

          <Grid item xs={12} md={7} className={styles.right}>
            <div className={styles.label}>Trọng lượng nhẫn:</div>
            <Grid container>
              <Grid item xs={7} md={5}>
                <OutlinedInput
                  fullWidth
                  sx={{ borderRadius: 2 }}
                  size="small"
                  type="number"
                  placeholder="Nhập số chỉ"
                />
              </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            <div className={styles.label}>Chất liệu:</div>
            {[1, 2].map((item) => {
              return (
                <Grid container key={item} mb={3}>
                  <Grid item xs={7} md={5} mr={2}>
                    <Select
                      size="small"
                      sx={{ borderRadius: 2 }}
                      fullWidth
                      defaultValue={0}
                    >
                      <MenuItem hidden value={0}></MenuItem>
                      {metals.map((item, index) => {
                        return (
                          <MenuItem key={index} value={index + 1}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>

                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              );
            })}

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            <div className={styles.label}>Kim cương:</div>
            {[1, 2].map((item) => {
              return (
                <Grid container key={item} mb={3}>
                  <Grid item xs={7} md={5} mr={2}>
                    <Select
                      size="small"
                      sx={{ borderRadius: 2 }}
                      fullWidth
                      defaultValue={0}
                    >
                      <MenuItem hidden value={0}></MenuItem>
                      {diamonds.map((item, index) => {
                        return (
                          <MenuItem key={index} value={index + 1}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>

                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              );
            })}
          </Grid>

          <Divider sx={{ backgroundColor: "#ccc", my: 4, width: "100%" }} />
        </Grid>

        <Grid
          container
          item
          lg={11}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item md={4} className={styles.left}>
            <HoverCard file={blueprint} image={womenring} shadow={true} />
            <div className={styles.label}>
              <img src={female} />
              <span>Nhẫn Nữ</span>
            </div>
          </Grid>

          <Grid item xs={12} md={7} className={styles.right}>
            <div className={styles.label}>Trọng lượng nhẫn:</div>
            <Grid container>
              <Grid item xs={7} md={5}>
                <OutlinedInput
                  fullWidth
                  sx={{ borderRadius: 2 }}
                  size="small"
                  type="number"
                  placeholder="Nhập số chỉ"
                />
              </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            <div className={styles.label}>Chất liệu:</div>
            {[1, 2].map((item) => {
              return (
                <Grid container key={item} mb={3}>
                  <Grid item xs={7} md={5} mr={2}>
                    <Select
                      size="small"
                      sx={{ borderRadius: 2 }}
                      fullWidth
                      defaultValue={0}
                    >
                      <MenuItem hidden value={0}></MenuItem>
                      {metals.map((item, index) => {
                        return (
                          <MenuItem key={index} value={index + 1}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>

                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              );
            })}

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            <div className={styles.label}>Kim cương:</div>
            {[1, 2].map((item) => {
              return (
                <Grid container key={item} mb={3}>
                  <Grid item xs={7} md={5} mr={2}>
                    <Select
                      size="small"
                      sx={{ borderRadius: 2 }}
                      fullWidth
                      defaultValue={0}
                    >
                      <MenuItem hidden value={0}></MenuItem>
                      {diamonds.map((item, index) => {
                        return (
                          <MenuItem key={index} value={index + 1}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>

                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={6} mt={5}>
          <Button
            variant="contained"
            sx={{ ...primaryBtn, borderRadius: 2 }}
            fullWidth
          >
            Tạo Thiết Kế
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomDesign;
