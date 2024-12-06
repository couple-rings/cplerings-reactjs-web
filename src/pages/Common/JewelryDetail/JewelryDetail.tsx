import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Button,
  Divider,
  FormHelperText,
  FormLabel,
  Grid,
  Link,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import styles from "./JewelryDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { primaryBtn } from "src/utils/styles";
import { currencyFormatter, mapGoldColor } from "src/utils/functions";
import { useEffect, useState } from "react";
import CustomExpandIcon from "src/components/icon/CustomExpandIcon";
import {
  DesignCharacteristic,
  GoldColor,
  JewelryStatus,
} from "src/utils/enums";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import ProductDetailAccordion from "src/components/accordion/ProductDetail.Accordion";
import Advertisement from "src/components/advertisement/Advertisement";
import brandIntro from "src/assets/brand-intro.png";
import FeedbackSection from "src/components/feedback/FeedbackSection";
import { useQuery } from "@tanstack/react-query";
import { getDesignDetail } from "src/services/design.service";
import {
  fetchBranches,
  fetchDesignDetail,
  fetchJewelries,
} from "src/utils/querykey";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { addToCart } from "src/redux/slice/cart.slice";
import { getBranches } from "src/services/branch.service";
import { getJewelries } from "src/services/jewelry.service";
import { toast } from "react-toastify";
import NecklaceGuide from "src/components/dialog/NecklaceGuide";
import BraceletGuide from "src/components/dialog/BraceletGuide";

const initMetal = {
  id: 0,
  metalSpecification: {
    id: 0,
    name: "",
    pricePerUnit: 0,
    color: GoldColor.Yellow,
    createdAt: "",
  },
  image: {
    url: "",
  },
};

const branchFilter: IBranchFilter = {
  page: 0,
  pageSize: 100,
};

function JewelryDetail() {
  const [metal, setMetal] = useState(initMetal);
  const [amount, setAmount] = useState(0);
  // const [diamond, setDiamond] = useState("5PT ,F ,SI1");

  const [filterObj, setFilterObj] = useState<IJewelryFilter | null>(null);

  const [branchId, setBranchId] = useState(0);
  const [emptyBranch, setEmptyBranch] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const { cartItems } = useAppSelector((state) => state.cart);

  const { data: designResponse } = useQuery({
    queryKey: [fetchDesignDetail, id],

    queryFn: () => {
      if (id) return getDesignDetail(+id);
    },
    enabled: !!id,
  });

  const { data: branchResponse } = useQuery({
    queryKey: [fetchBranches, branchFilter],

    queryFn: () => {
      return getBranches(branchFilter);
    },
  });

  const { data: jewelryResponse } = useQuery({
    queryKey: [fetchJewelries, filterObj],

    queryFn: () => {
      if (filterObj) return getJewelries(filterObj);
    },
    enabled: !!filterObj,
  });

  const handleAddCart = () => {
    if (branchId === 0) {
      setEmptyBranch(true);
      return;
    }

    if (designResponse?.data) {
      const branch = branchResponse?.data?.items.find(
        (item) => item.id === branchId
      );

      if (branch) {
        const cartItem: ICartItem = {
          id: uuid(),
          design: designResponse.data,
          metalSpec: metal,
          branch,
        };

        dispatch(addToCart(cartItem));
        toast.success("Đã thêm vào giỏ hàng");
      }
    }
  };

  useEffect(() => {
    if (designResponse?.data) {
      const metal = designResponse.data.designMetalSpecifications.reduce(
        function (prev, curr) {
          return prev.metalSpecification.pricePerUnit <
            curr.metalSpecification.pricePerUnit
            ? prev
            : curr;
        }
      );

      setMetal(metal);
    }

    if (designResponse?.errors) {
      navigate("/jewelry");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designResponse]);

  useEffect(() => {
    if (jewelryResponse?.data) {
      let amount = jewelryResponse.data.count;

      cartItems.forEach((item) => {
        const found = jewelryResponse.data?.items.find(
          (jewelry) =>
            jewelry.design.id === item.design.id &&
            jewelry.metalSpecification.id ===
              item.metalSpec.metalSpecification.id
        );

        if (found) amount -= 1;
      });

      setAmount(amount);
    }
  }, [cartItems, jewelryResponse]);

  useEffect(() => {
    if (branchId !== 0 && id && metal.metalSpecification.id !== 0) {
      setFilterObj({
        page: 0,
        pageSize: 9999,
        branchId,
        designId: +id,
        metalSpecId: metal.metalSpecification.id,
        status: JewelryStatus.Available,
      });
    }
  }, [branchId, id, metal]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.container}>
      <Grid container className={styles.productInfo}>
        <Grid container item xs={11} className={styles.content}>
          <Grid item lg={5.5} sx={{ mb: 2 }}>
            <img src={metal.image.url} />
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
                onClick={() => navigate("/jewelry")}
              >
                Trang Sức
              </Link>
              <Link
                sx={{ cursor: "pointer" }}
                underline="hover"
                color="inherit"
                onClick={() =>
                  navigate("/jewelry", {
                    state: {
                      categoryId: designResponse?.data?.jewelryCategory.id,
                    },
                  })
                }
              >
                {designResponse?.data?.jewelryCategory.name}
              </Link>
              <Link
                sx={{ cursor: "pointer" }}
                underline="hover"
                color="inherit"
                onClick={() =>
                  navigate("/jewelry", {
                    state: {
                      designCollectionId:
                        designResponse?.data?.designCollection.id,
                    },
                  })
                }
              >
                Bộ Sưu Tập {designResponse?.data?.designCollection.name}
              </Link>
            </Breadcrumbs>

            <div className={styles.name}>{designResponse?.data?.name}</div>

            <div className={styles.rate}>
              <Rating value={5} readOnly sx={{ color: "#b43620" }} />
              <div className={styles.number}>(50)</div>
            </div>

            <div className={styles.description}>
              {designResponse?.data?.description}
            </div>

            <Divider sx={{ backgroundColor: "#555", mb: 3 }} />

            <div className={styles.price}>{currencyFormatter(12000000)}</div>

            <Button variant="contained" sx={{ ...primaryBtn, px: 5 }}>
              {designResponse?.data?.characteristic ===
              DesignCharacteristic.Male
                ? "Nam Tính"
                : "Nữ Tính"}
            </Button>

            {jewelryResponse?.data && (
              <Grid container mt={3} className={styles.amount}>
                {amount > 0 ? <span>Còn hàng</span> : <span>Hết hàng</span>}
              </Grid>
            )}

            <div className={styles.options}>
              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary expandIcon={<CustomExpandIcon />}>
                  <div className={styles.title}>
                    Chất Liệu: {metal.metalSpecification.name}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.metal}>
                    {designResponse?.data?.designMetalSpecifications.map(
                      (item) => {
                        const selected =
                          metal.id === item.id ? styles.selected : "";
                        return (
                          <img
                            key={item.id}
                            src={mapGoldColor(item.metalSpecification)}
                            onClick={() => setMetal(item)}
                            className={selected}
                          />
                        );
                      }
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>

              {/* <Accordion sx={{ boxShadow: "none" }}>
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
              </Accordion> */}

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary expandIcon={<CustomExpandIcon />}>
                  <div className={styles.title}>Kích Thước</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container className={styles.size}>
                    <Grid item sm={6} sx={{ mb: 2 }}>
                      <Button sx={{ ...primaryBtn, p: 1 }} variant="contained">
                        {designResponse?.data?.size}
                      </Button>
                    </Grid>

                    <Grid container item sm={6} mb={2} gap={2}>
                      <BraceletGuide />
                      <NecklaceGuide />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* <Accordion sx={{ boxShadow: "none" }}>
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
              </Accordion> */}
            </div>

            <Divider sx={{ backgroundColor: "#ccc", mt: 1, mb: 5 }} />

            <Grid container my={3}>
              <FormLabel error={emptyBranch} sx={{ mb: 1 }}>
                Cửa Hàng
              </FormLabel>
              <Select
                error={emptyBranch}
                fullWidth
                variant="outlined"
                value={branchId}
                onChange={(e) => {
                  setBranchId(+e.target.value);
                  setEmptyBranch(false);
                }}
              >
                <MenuItem value={0} disabled>
                  <em>Chọn cửa hàng gần bạn</em>
                </MenuItem>
                {branchResponse?.data?.items.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.storeName} - {item.address}
                    </MenuItem>
                  );
                })}
              </Select>
              {emptyBranch && (
                <FormHelperText error sx={{ mt: 1 }}>
                  * Vui lòng chọn cửa hàng
                </FormHelperText>
              )}
            </Grid>

            <div className={styles.btnGroup}>
              <Button
                disabled={amount === 0}
                variant="contained"
                sx={primaryBtn}
                fullWidth
                onClick={handleAddCart}
              >
                Thêm vào giỏ
              </Button>

              <Button variant="contained" sx={primaryBtn}>
                <FavoriteBorderOutlinedIcon />
              </Button>
            </div>

            {/* Note start */}
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

            {designResponse?.data && (
              <ProductDetailAccordion
                collectionName="FOREVER"
                category={designResponse?.data?.jewelryCategory.name}
                jewelryDetail={{
                  metalSpec: metal.metalSpecification,
                  metalWeight: designResponse.data.metalWeight,
                  sideDiamondsCount: designResponse.data.sideDiamondsCount,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      <FeedbackSection />

      <div className={styles.brandInfo}>
        <Grid xs={12} container item className={styles.content}>
          <Grid container item lg={5.5}>
            <img src={brandIntro} />
          </Grid>
          <Grid item lg={5} className={styles.intro}>
            <div className={styles.title}>
              Điều Gì Làm Cho CR Trở Nên Quý Giá Nhất?
            </div>
            <div className={styles.text}>
              Bên cạnh chất lượng vượt trội theo tiêu chí 4C, tay nghề thủ công
              tinh xảo và mức giá phù hợp với mọi ngân sách, triết lý thương
              hiệu độc đáo của Couple Rings mang đến cho bạn cảm giác về tình
              yêu vĩnh cửu, sự an tâm, và sự tận tụy tuyệt đối với người bạn đời
              mà bạn đã chọn.
            </div>
          </Grid>
        </Grid>
      </div>

      <Advertisement />
    </div>
  );
}

export default JewelryDetail;
