import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import styles from "./Jewelry.module.scss";
import jewelry from "src/assets/jewelryheader.png";
import { useNavigate } from "react-router-dom";
import HoverMenu from "src/components/menu/HoverMenu";
import { HoverMenuPurpose, ProductType } from "src/utils/enums";
import jewelryDesign from "src/assets/sampledata/sampleJewelry.png";
import ProductCard from "src/components/product/ProductCard";
import { useState } from "react";

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

const characteristics = ["Trang Sức Nam", "Trang Sức Nữ"];

const categories = ["Dây Chuyền", "Vòng Tay"];

const sorts = ["Mới nhất", "Giá - Thấp đến Cao", "Giá - Cao đến Thấp"];

const designs = [
  {
    coverImg: jewelryDesign,
    name: "CR HEART Pulsating Two-tone Halo Pavé Bypass Necklace",
    price: 120000000,
  },
  {
    coverImg: jewelryDesign,
    name: "CR HEART Pulsating Two-tone Halo Pavé Bypass Necklace",
    price: 120000000,
  },
  {
    coverImg: jewelryDesign,
    name: "CR HEART Pulsating Two-tone Halo Pavé Bypass Necklace",
    price: 120000000,
  },
  {
    coverImg: jewelryDesign,
    name: "CR HEART Pulsating Two-tone Halo Pavé Bypass Necklace",
    price: 120000000,
  },
];

function Jewelry() {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Grid xs={12} container item className={styles.header}>
          <Grid container item lg={5.5}>
            <img src={jewelry} />
          </Grid>
          <Grid item lg={5} className={styles.intro}>
            <div className={styles.title}>Trang Sức Cao Cấp</div>
            <div className={styles.text}>
              Couple Rings thiết kế trang sức với tay nghề chuyên nghiệp, như
              một minh chứng cho tình yêu bền vững của mỗi cặp đôi tin vào tình
              yêu đích thực. Hãy khám phá những sản phẩm tinh xảo trong Bộ Sưu
              Tập Trang Sức Cao Cấp CR của chúng tôi — bao gồm dây chuyền và
              vòng tay.
            </div>
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
          <Typography sx={{ color: "text.primary" }}>Trang Sức</Typography>
        </Breadcrumbs>
      </Grid>

      {/* Filter - Sort bar Start */}
      <Grid container item xs={11} md={10}>
        <Grid container item xs={12} className={styles.filterSortBar}>
          <Grid item lg={9} className={styles.filter}>
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Bộ Sưu Tập"
              lists={collections}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Loại Trang Sức"
              lists={categories}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Mức Giá"
              lists={prices}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Giới Tính"
              lists={characteristics}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Loại Vàng"
              lists={metals}
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
              <ProductCard
                product={{ ...item, type: ProductType.Jewelry, id: 1 }}
              />
            </Grid>
          );
        })}
      </Grid>

      <div>
        <Pagination count={10} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}

export default Jewelry;
