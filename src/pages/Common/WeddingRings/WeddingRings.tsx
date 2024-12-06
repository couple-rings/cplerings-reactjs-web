import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import styles from "./WeddingRings.module.scss";
import wedding1 from "src/assets/wedding1.png";
import wedding2 from "src/assets/wedding2.png";
import { Location, useLocation, useNavigate } from "react-router-dom";
import HoverMenu from "src/components/menu/HoverMenu";
import { DesignStatus, HoverMenuPurpose, ProductType } from "src/utils/enums";
import ProductCard from "src/components/product/ProductCard";
import { useEffect, useRef, useState } from "react";
import WeddingRingsAccordian from "src/components/accordion/WeddingRings.Accordion";
import { useQuery } from "@tanstack/react-query";
import { getCoupleDesigns } from "src/services/design.service";
import { pageSize, prices } from "src/utils/constants";
import { calculateDefaultPrice } from "src/utils/functions";
import LoadingProduct from "src/components/product/LoadingProduct";
import { fetchCoupleDesigns, fetchMetalSpecs } from "src/utils/querykey";
import { getMetalSpecs } from "src/services/metalSpec.service";
import MetalSpecHoverMenu from "src/components/menu/hover/MetalSpecMenu";
import CollectionHoverMenu from "src/components/menu/hover/CollectionMenu";
import { useAppSelector } from "src/utils/hooks";

const sorts = ["Mới nhất", "Giá - Thấp đến Cao", "Giá - Cao đến Thấp"];

const specFilter = {
  page: 0,
  pageSize: 100,
};

const initFilter: ICoupleDesignFilter = {
  page: 0,
  pageSize: pageSize,
  status: DesignStatus.Available,
};

const initMetaData = {
  ...initFilter,
  totalPages: 0,
  count: 0,
};

function WeddingRings() {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ICoupleDesignFilter>(initFilter);

  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  const { configs } = useAppSelector((state) => state.config);

  const location: Location<{
    collectionId?: number;
    metalSpecificationId?: number;
  }> = useLocation();

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchCoupleDesigns, filterObj],
    queryFn: () => {
      return getCoupleDesigns(filterObj);
    },
  });

  const { data: metalSpecResponse } = useQuery({
    queryKey: [fetchMetalSpecs, specFilter],

    queryFn: () => {
      return getMetalSpecs(specFilter);
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
    if (location.state?.collectionId) {
      setFilterObj((current) => ({
        ...current,
        collectionId: location.state.collectionId,
      }));
    }

    if (location.state?.metalSpecificationId) {
      setFilterObj((current) => ({
        ...current,
        metalSpecificationId: location.state.metalSpecificationId,
      }));
    }
  }, [location]);

  if (!metalSpecResponse?.data)
    return (
      <Grid container justifyContent={"center"} mb={5}>
        <Grid container item xs={10} gap={3}>
          <Skeleton width={"100%"} height={80} variant="rectangular" />

          <Skeleton width={"100%"} height={500} variant="rectangular" />
        </Grid>
      </Grid>
    );

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
          <Typography sx={{ color: "text.primary" }}>Nhẫn Cưới</Typography>
        </Breadcrumbs>
      </Grid>

      {/* Filter - Sort bar Start */}
      <Grid container item xs={10}>
        <Grid container item xs={12} className={styles.filterSortBar}>
          <Grid item lg={7} className={styles.filter}>
            <CollectionHoverMenu
              setCoupleFilterObj={setFilterObj}
              designCollectionId={location.state?.collectionId ?? undefined}
              type={ProductType.Ring}
            />
            <HoverMenu
              purpose={HoverMenuPurpose.Filter}
              title="Mức Giá"
              lists={prices}
            />
            <MetalSpecHoverMenu
              setCoupleFilterObj={setFilterObj}
              metalSpecId={location.state?.metalSpecificationId ?? undefined}
              type={ProductType.Ring}
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
            const price = calculateDefaultPrice(item, configs);

            const product: IProduct = {
              id: item.id,
              coverImg: item.previewImage.url,
              name: item.name,
              price,
              type: ProductType.Ring,
            };
            return (
              <Grid item sm={6} md={4} lg={3} key={item.id}>
                <ProductCard product={product} data={item} />
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
