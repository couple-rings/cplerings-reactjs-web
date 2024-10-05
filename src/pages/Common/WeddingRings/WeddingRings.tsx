import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import styles from "./WeddingRings.module.scss";
import wedding1 from "src/assets/wedding1.png";
import wedding2 from "src/assets/wedding2.png";
import { useNavigate } from "react-router-dom";
import HoverMenu from "src/components/menu/HoverMenu";
import { HoverMenuPurpose } from "src/utils/enums";
import ringDesign from "src/assets/sampledata/ringdesign.png";
import ProductCard from "src/components/product/ProductCard";
import { useState } from "react";
import WeddingRingsAccordian from "src/components/accordian/WeddingRings.Accordian";

const collections = [
  "DR Heart",
  "Believe",
  "Love Mark",
  "Eternal Love",
  "Love Line",
  "Love Palace",
];

const metals = [
  "Vàng Trắng 14K",
  "Vàng Trắng 18K",
  "Vàng Thường 18K",
  "Vàng Hồng 18K",
];

const prices = [
  "Dưới 20 Triệu",
  "20 - 40 Triệu",
  "40 - 50 Triệu",
  "Trên 50 Triệu",
];

const characteristics = ["Nhẫn Nam", "Nhẫn Nữ", "Nhẫn Cặp"];

const sorts = ["Mới nhất", "Giá - Thấp đến Cao", "Giá - Cao đến Thấp"];

const designs = [
  {
    coverImg: ringDesign,
    name: "CR FOREVER Simple Wedding Ring For Man",
    price: 12000000,
  },
  {
    coverImg: ringDesign,
    name: "CR FOREVER Simple Wedding Ring For Man",
    price: 12000000,
  },
  {
    coverImg: ringDesign,
    name: "CR FOREVER Simple Wedding Ring For Man",
    price: 12000000,
  },
  {
    coverImg: ringDesign,
    name: "CR FOREVER Simple Wedding Ring For Man",
    price: 12000000,
  },
];

function WeddingRings() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Grid xs={10} container item className={styles.header}>
          <Grid item lg={4} className={styles.intro}>
            <div className={styles.title}>Nhẫn Cưới</div>
            <div className={styles.text}>
              &nbsp;Chào mừng sự tiếp nối của tình yêu với nhẫn cưới từ Couple
              Rings. Được biết đến với nghệ thuật cắt kim cương tinh xảo, chúng
              tôi mang đến bộ sưu tập nhẫn cưới sang trọng từ vàng 18K các màu.
              Mỗi chiếc nhẫn đều được chế tác tỉ mỉ để thêm phần thanh lịch và
              tinh tế cho hành trình yêu thương của bạn.
            </div>
          </Grid>

          <Grid container item lg={8} className={styles.imgContainer}>
            <img src={wedding1} className={styles.img1} />

            <img src={wedding2} className={styles.img2} />
          </Grid>
        </Grid>
      </div>

      <Grid container item xs={10}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            sx={{ cursor: "pointer" }}
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Trang Chủ
          </Link>
          <Typography sx={{ color: "text.primary" }}>Nhẫn Cưới</Typography>
        </Breadcrumbs>
      </Grid>

      {/* Filter - Sort bar Start */}
      <Grid container item xs={10}>
        <Grid container item xs={12} className={styles.filterSortBar}>
          <Grid item lg={7} className={styles.filter}>
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Bộ Sưu Tập"
              lists={collections}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Mức Giá"
              lists={prices}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Loại Vàng"
              lists={metals}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Giới Tính"
              lists={characteristics}
            />
          </Grid>

          <Grid item>
            <HoverMenu
              purpose={HoverMenuPurpose.Sort}
              title="Sắp Xếp"
              lists={sorts}
            />
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: "gray", width: "100%" }} />
      </Grid>
      {/* Filter - Sort bar End */}

      <Grid container item xs={10} spacing={3} className={styles.list}>
        {designs.map((item, index) => {
          return (
            <Grid item sm={6} md={4} lg={3} key={index}>
              <ProductCard product={item} />
            </Grid>
          );
        })}
      </Grid>

      <div>
        <Pagination count={10} page={page} onChange={handleChange} />
      </div>

      <Grid container item xs={10} className={styles.bottom}>
        <Divider sx={{ backgroundColor: "#ccc", width: "100%", mb: 5 }} />

        <Grid item xs={12}>
          <WeddingRingsAccordian />
        </Grid>
      </Grid>
    </div>
  );
}

export default WeddingRings;
