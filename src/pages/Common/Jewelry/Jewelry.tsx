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
import { Location, useLocation, useNavigate } from "react-router-dom";
import HoverMenu from "src/components/menu/HoverMenu";
import {
  DesignCharacteristic,
  DesignStatus,
  HoverMenuPurpose,
  ProductType,
} from "src/utils/enums";
import ProductCard from "src/components/product/ProductCard";
import { useEffect, useRef, useState } from "react";
import { pageSize } from "src/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchDesigns } from "src/utils/querykey";
import { getDesigns } from "src/services/design.service";
import LoadingProduct from "src/components/product/LoadingProduct";
import CollectionHoverMenu from "src/components/menu/hover/CollectionMenu";
import JewelryCategoryHoverMenu from "src/components/menu/hover/JewelryCategoryMenu";
import MetalSpecHoverMenu from "src/components/menu/hover/MetalSpecMenu";
import GenderHoverMenu from "src/components/menu/hover/GenderMenu";
import { calculateDefaultJewelryPrice } from "src/utils/functions";
import { useAppSelector } from "src/utils/hooks";

const prices = [
  "Dưới 20 Triệu",
  "20 - 40 Triệu",
  "40 - 50 Triệu",
  "Trên 50 Triệu",
];

const sorts = ["Mới nhất", "Giá - Thấp đến Cao", "Giá - Cao đến Thấp"];

const initFilter: IDesignFilter = {
  page: 0,
  pageSize: pageSize,
  status: DesignStatus.Available,
};

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function Jewelry() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IDesignFilter>(initFilter);

  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const { configs } = useAppSelector((state) => state.config);

  const location: Location<{
    categoryId?: number;
    designCollectionId?: number;
    characteristic?: DesignCharacteristic;
    metalSpecId?: number;
  }> = useLocation();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchDesigns, filterObj],
    queryFn: () => {
      return getDesigns(filterObj);
    },
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilterObj({
      ...filterObj,
      page: value - 1,
    });
  };

  useEffect(() => {
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);

      window.scrollTo({
        top: ref.current?.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [response]);

  useEffect(() => {
    if (location.state?.categoryId) {
      setFilterObj((current) => ({
        ...current,
        categoryId: location.state.categoryId,
      }));
    }

    if (location.state?.designCollectionId) {
      setFilterObj((current) => ({
        ...current,
        designCollectionId: location.state.designCollectionId,
      }));
    }

    if (location.state?.characteristic) {
      setFilterObj((current) => ({
        ...current,
        characteristic: location.state.characteristic,
      }));
    }

    if (location.state?.metalSpecId) {
      setFilterObj((current) => ({
        ...current,
        metalSpecId: location.state.metalSpecId,
      }));
    }
  }, [location]);

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

      <Grid container item xs={10} ref={ref}>
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
          <Grid container item lg={9} className={styles.filter}>
            <CollectionHoverMenu
              setFilterObj={setFilterObj}
              designCollectionId={
                location.state?.designCollectionId ?? undefined
              }
              type={ProductType.Jewelry}
            />
            <JewelryCategoryHoverMenu
              setFilterObj={setFilterObj}
              categoryId={location.state?.categoryId ?? undefined}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Mức Giá"
              lists={prices}
            />
            <GenderHoverMenu
              setFilterObj={setFilterObj}
              characteristic={location.state?.characteristic ?? undefined}
            />
            <MetalSpecHoverMenu
              setFilterObj={setFilterObj}
              metalSpecId={location.state?.metalSpecId ?? undefined}
              type={ProductType.Jewelry}
            />
          </Grid>

          <Grid item mt={{ xs: 3, lg: 0 }}>
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
        {isLoading &&
          new Array(8).fill(0).map((item, index) => (
            <Grid item sm={6} md={4} lg={3} key={index}>
              <LoadingProduct />
            </Grid>
          ))}

        {response &&
          response.data &&
          response.data.items.length > 0 &&
          response.data.items.map((item) => {
            const product: IProduct = {
              id: item.id,
              coverImg: item.designMetalSpecifications[0].image.url,
              name: item.name,
              price: calculateDefaultJewelryPrice(item, configs),
              type: ProductType.Jewelry,
            };
            return (
              <Grid item sm={6} md={4} lg={3} key={item.id}>
                <ProductCard product={product} />
              </Grid>
            );
          })}
      </Grid>

      {response && response.data && response.data.items.length > 0 && (
        <Pagination
          count={metaData.totalPages}
          page={metaData.page + 1}
          onChange={handleChange}
        />
      )}

      {response && response.data && response.data.items.length === 0 && (
        <div className={styles.empty}>Không tìm thấy sản phẩm nào...</div>
      )}
    </div>
  );
}

export default Jewelry;
