import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  OutlinedInput,
  Rating,
} from "@mui/material";
import styles from "./DesignDetail.module.scss";
import ringDesign from "src/assets/sampledata/ringdesign.png";
import { useNavigate, useParams } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import { currencyFormatter } from "src/utils/functions";
import { useState } from "react";
import CustomExpandIcon from "src/components/icon/CustomExpandIcon";
import white from "src/assets/whitegold.png";
import rose from "src/assets/rosegold.png";
import yellow from "src/assets/yellowgold.png";
import { GoldColor } from "src/utils/enums";
import SizeMenu from "src/components/menu/SizeMenu";
import GuideDialog from "src/components/dialog/GuideDialog";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

const metals = [
  {
    img: white,
    name: "Vàng Trắng 18K",
    color: GoldColor.White,
  },
  {
    img: rose,
    name: "Vàng Hồng 18K",
    color: GoldColor.Rose,
  },
  {
    img: yellow,
    name: "Vàng Thường 18K",
    color: GoldColor.Yellow,
  },
];

const diamondSpecs = [
  "5PT ,F ,SI1",
  "5PT ,H ,VS1",
  "10PT ,F ,VS2",
  "15PT ,G ,SI1",
];

function DesignDetail() {
  const [metal, setMetal] = useState({
    img: white,
    name: "Vàng Trắng 18K",
    color: GoldColor.White,
  });
  const [diamond, setDiamond] = useState("5PT ,F ,SI1");
  const [size, setSize] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  console.log(id);

  //   useEffect(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }, []);

  return (
    <Grid container className={styles.container}>
      <Grid container item xs={11} className={styles.content}>
        <Grid item lg={5.5} sx={{ mb: 2 }}>
          <img src={ringDesign} />
        </Grid>

        <Grid item lg={5.5}>
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/")}
            >
              Trang Chủ
            </Link>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/wedding-rings")}
            >
              Nhẫn Cưới
            </Link>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/wedding-rings")}
            >
              Bộ Sưu Tập FOREVER
            </Link>
          </Breadcrumbs>

          <div className={styles.name}>
            DR FOREVER Simple Wedding Ring For Man
          </div>

          <div className={styles.rate}>
            <Rating value={5} readOnly sx={{ color: "#b43620" }} />
            <div className={styles.number}>(50)</div>
          </div>

          <div className={styles.description}>
            Khám phá bộ sưu tập CR Forever, tượng trưng cho tình yêu bền bỉ như
            những viên kim cương, với thiết kế cổ điển và tối giản. Nhẫn nam với
            kiểu dáng thoải mái mang đến sự thanh lịch vượt thời gian cùng lớp
            hoàn thiện sáng bóng, ẩn giấu một viên kim cương tròn lấp lánh bên
            trong bằng kỹ thuật đặt chìm. Couple Rings kết hợp hoàn hảo giữa
            thiết kế cổ điển và tay nghề chuyên nghiệp để tạo nên những biểu
            tượng hoàn hảo của sự thanh lịch và tận tâm.
          </div>

          <Divider sx={{ backgroundColor: "#555", mb: 3 }} />

          <div className={styles.price}>{currencyFormatter(12000000)}</div>

          <Button variant="contained" sx={{ ...primaryBtn, px: 5 }}>
            Nam Giới
          </Button>

          <div className={styles.options}>
            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<CustomExpandIcon />}>
                <div className={styles.title}>Chất Liệu: {metal.name}</div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.metal}>
                  {metals.map((item, index) => {
                    return (
                      <img
                        key={index}
                        src={item.img}
                        onClick={() => setMetal(item)}
                        className={
                          metal.color === item.color ? styles.selected : ""
                        }
                      />
                    );
                  })}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<CustomExpandIcon />}>
                <div className={styles.title}>Kim Cương: {diamond}</div>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container className={styles.diamond}>
                  {diamondSpecs.map((item, index) => {
                    const selected = diamond === item ? styles.selected : "";
                    return (
                      <Grid
                        key={index}
                        item
                        xl={2.8}
                        sm={5}
                        xs={12}
                        onClick={() => setDiamond(item)}
                        className={`${styles.spec} ${selected}`}
                      >
                        {item}
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<CustomExpandIcon />}>
                <div className={styles.title}>Kích Thước</div>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container className={styles.size}>
                  <Grid item sm={7} sx={{ mb: 2 }}>
                    <SizeMenu size={size} setSize={setSize} />
                  </Grid>

                  <Grid item sm={3} sx={{ mb: 2 }}>
                    <GuideDialog />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<CustomExpandIcon />}>
                <div className={styles.title}>Khắc Chữ</div>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl size="small" variant="outlined" fullWidth>
                  <OutlinedInput
                    sx={{ borderRadius: 0 }}
                    placeholder="Tối đa 10 ký tự"
                  />
                  <FormHelperText>0/10 ký tự</FormHelperText>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </div>

          <Divider sx={{ backgroundColor: "#ccc", mt: 1, mb: 5 }} />

          <div className={styles.btnGroup}>
            <Button variant="contained" sx={primaryBtn} fullWidth>
              Thêm vào giỏ
            </Button>

            <Button variant="contained" sx={primaryBtn}>
              <FavoriteBorderOutlinedIcon />
            </Button>
          </div>

          {/* Note start */}
          <div className={styles.note}>
            Xin lưu ý: Xác minh danh tính là bắt buộc để sở hữu trang sức CR.
          </div>
          <div className={styles.policy}>
            <AssignmentReturnOutlinedIcon />
            <div>Đổi trả trong vòng 15 ngày.</div>
          </div>
          <div className={styles.policy}>
            <GppGoodOutlinedIcon />
            <div>Vận chuyển được bảo hiểm toàn diện.</div>
          </div>
          <div className={styles.moreLink}>Tìm Hiểu Thêm &gt;</div>
          {/* Note End */}

          <Divider sx={{ backgroundColor: "#ccc", mt: 3 }} />

          <div className={styles.detail}>
            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<CustomExpandIcon />}>
                <div className={styles.title}>Chi Tiết</div>
              </AccordionSummary>
              <AccordionDetails></AccordionDetails>
            </Accordion>
          </div>

          <Divider sx={{ backgroundColor: "#ccc" }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DesignDetail;
