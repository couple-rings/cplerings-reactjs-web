import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  OutlinedInput,
  Rating,
  SxProps,
} from "@mui/material";
import styles from "./WeddingRingsDetail.module.scss";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { menuPaperStyle, primaryBtn, sizeMenuStyle } from "src/utils/styles";
import {
  currencyFormatter,
  getDiamondSpec,
  mapGoldColor,
} from "src/utils/functions";
import { useEffect, useState } from "react";
import CustomExpandIcon from "src/components/icon/CustomExpandIcon";
import { DesignCharacteristic, GoldColor } from "src/utils/enums";
import SizeMenu from "src/components/menu/SizeMenu";
import GuideDialog from "src/components/dialog/GuideDialog";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import ProductDetailAccordion from "src/components/accordion/ProductDetail.Accordion";
import Advertisement from "src/components/advertisement/Advertisement";
import brandIntro from "src/assets/brand-intro.png";
import FeedbackSection from "src/components/feedback/FeedbackSection";
import { metalWeightUnit, profitRatio } from "src/utils/constants";
import { useAppDispatch, useAppSelector, useScrollTop } from "src/utils/hooks";
import { saveRequestedDesigns } from "src/redux/slice/design.slice";
import { useMutation } from "@tanstack/react-query";
import { postCreateSession } from "src/services/designSession.service";
import { toast } from "react-toastify";

const sizeMenuPaperStyle: SxProps = {
  ...menuPaperStyle,
  boxShadow: "none",
  border: "1px solid",
  borderTop: "none",
};

const initMetal = {
  id: 0,
  metalSpecification: {
    id: 0,
    name: "",
    pricePerUnit: 0,
    color: GoldColor.Yellow,
  },
  image: {
    url: "",
  },
};

const initDiamond = {
  id: 0,
  name: "",
  weight: 0,
  color: "",
  clarity: "",
  shape: "",
  price: 0,
};

function WeddingRingsDetail() {
  const [firstMetal, setFirstMetal] = useState(initMetal);
  const [firstDiamond, setFirstDiamond] = useState(initDiamond);

  const [secondMetal, setSecondMetal] = useState(initMetal);
  const [secondDiamond, setSecondDiamond] = useState(initDiamond);

  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const location: Location<{
    data: ICoupleDesign;
  }> = useLocation();

  const { data } = location.state || {};
  const {
    designs,
    name: coupleName,
    description: coupleDescription,
  } = data || {};
  const collectionName = designs ? designs[0]?.designCollection?.name : "";

  const mutation = useMutation({
    mutationFn: () => {
      return postCreateSession();
    },
    onSuccess: (response) => {
      if (response.data) {
        const { paymentLink } = response.data;
        window.open(paymentLink, "_self");
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handlePayDesignFee = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const requestedDesigns = designs.map((design) => design.id);

    dispatch(saveRequestedDesigns(requestedDesigns));
    mutation.mutate();
  };

  useEffect(() => {
    if (!data) navigate("/wedding-rings");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Choose default gold and diamond option
  useEffect(() => {
    if (designs) {
      const firstMetal = designs[0].designMetalSpecifications.reduce(function (
        prev,
        curr
      ) {
        return prev.metalSpecification.pricePerUnit <
          curr.metalSpecification.pricePerUnit
          ? prev
          : curr;
      });
      const firstDiamond = designs[0].designDiamondSpecifications.reduce(
        function (prev, curr) {
          return prev.diamondSpecification.price <
            curr.diamondSpecification.price
            ? prev
            : curr;
        }
      );

      const secondMetal = designs[1].designMetalSpecifications.reduce(function (
        prev,
        curr
      ) {
        return prev.metalSpecification.pricePerUnit <
          curr.metalSpecification.pricePerUnit
          ? prev
          : curr;
      });
      const secondDiamond = designs[1].designDiamondSpecifications.reduce(
        function (prev, curr) {
          return prev.diamondSpecification.price <
            curr.diamondSpecification.price
            ? prev
            : curr;
        }
      );

      setFirstMetal(firstMetal);
      setFirstDiamond(firstDiamond.diamondSpecification);
      setSecondMetal(secondMetal);
      setSecondDiamond(secondDiamond.diamondSpecification);
    }
  }, [designs]);

  // calculate price
  useEffect(() => {
    if (designs) {
      const firstDesignPrice =
        (designs[0].metalWeight *
          metalWeightUnit *
          firstMetal.metalSpecification.pricePerUnit +
          firstDiamond.price) *
        profitRatio;
      const secondDesignPrice =
        (designs[1].metalWeight *
          metalWeightUnit *
          secondMetal.metalSpecification.pricePerUnit +
          secondDiamond.price) *
        profitRatio;

      const price =
        Math.round((firstDesignPrice + secondDesignPrice) / 100000) * 100000;

      setPrice(price);
    }
  }, [designs, firstDiamond, firstMetal, secondMetal, secondDiamond]);

  useScrollTop();

  return (
    <div className={styles.container}>
      <Grid container className={styles.productInfo}>
        <Grid container item xs={11} className={styles.content}>
          <Grid item lg={5} sx={{ mb: 2 }}>
            <img src={firstMetal.image.url} />
            <Divider sx={{ my: 5 }} />
            <img src={secondMetal.image.url} />
          </Grid>

          <Grid item lg={6}>
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
                Bộ Sưu Tập {collectionName}
              </Link>
            </Breadcrumbs>

            <div className={styles.name}>
              CR {collectionName.toUpperCase()} {coupleName}
            </div>

            <div className={styles.rate}>
              <Rating value={5} readOnly sx={{ color: "#b43620" }} />
              <div className={styles.number}>(50)</div>
            </div>

            <div className={styles.description}>{coupleDescription}</div>

            <Divider sx={{ backgroundColor: "#555", mb: 3 }} />

            <div className={styles.price}>{currencyFormatter(price)}</div>

            {/* First design start */}
            <Box>
              <Button variant="contained" sx={{ ...primaryBtn, px: 5, py: 1 }}>
                {designs &&
                designs[0].characteristic === DesignCharacteristic.Male
                  ? "Nhẫn Nam"
                  : "Nhẫn Nữ"}
              </Button>

              <div className={styles.options}>
                <Accordion sx={{ boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<CustomExpandIcon />}>
                    <div className={styles.title}>
                      Chất Liệu: {firstMetal.metalSpecification.name}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.metal}>
                      {designs &&
                        designs[0].designMetalSpecifications.map((item) => {
                          const selected =
                            firstMetal.id === item.id ? styles.selected : "";
                          return (
                            <img
                              key={item.id}
                              src={mapGoldColor(item.metalSpecification)}
                              onClick={() => setFirstMetal(item)}
                              className={selected}
                            />
                          );
                        })}
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={{ boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<CustomExpandIcon />}>
                    <div className={styles.title}>
                      Kim Cương: {getDiamondSpec(firstDiamond)}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container className={styles.diamond}>
                      {designs &&
                        designs[0].designDiamondSpecifications.map((item) => {
                          const selected =
                            firstDiamond.id === item.diamondSpecification.id
                              ? styles.selected
                              : "";
                          return (
                            <Grid
                              key={item.id}
                              item
                              xl={2.8}
                              sm={5}
                              xs={12}
                              onClick={() =>
                                setFirstDiamond(item.diamondSpecification)
                              }
                              className={`${styles.spec} ${selected}`}
                            >
                              {getDiamondSpec(item.diamondSpecification)}
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
                        <SizeMenu
                          size={size}
                          setSize={setSize}
                          label={true}
                          sx={sizeMenuStyle}
                          paperStyle={sizeMenuPaperStyle}
                        />
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
            </Box>
            {/* First design end */}

            <Divider sx={{ backgroundColor: "#ccc", mt: 1, mb: 5 }} />

            {/* Female design start */}
            <Box>
              <Button variant="contained" sx={{ ...primaryBtn, px: 5, py: 1 }}>
                {designs &&
                designs[1].characteristic === DesignCharacteristic.Male
                  ? "Nhẫn Nam"
                  : "Nhẫn Nữ"}
              </Button>

              <div className={styles.options}>
                <Accordion sx={{ boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<CustomExpandIcon />}>
                    <div className={styles.title}>
                      Chất Liệu: {secondMetal.metalSpecification.name}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.metal}>
                      {designs &&
                        designs[1].designMetalSpecifications.map((item) => {
                          const selected =
                            secondMetal.id === item.id ? styles.selected : "";
                          return (
                            <img
                              key={item.id}
                              src={mapGoldColor(item.metalSpecification)}
                              onClick={() => setSecondMetal(item)}
                              className={selected}
                            />
                          );
                        })}
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={{ boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<CustomExpandIcon />}>
                    <div className={styles.title}>
                      Kim Cương: {getDiamondSpec(secondDiamond)}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container className={styles.diamond}>
                      {designs &&
                        designs[1].designDiamondSpecifications.map(
                          (item, index) => {
                            const selected =
                              secondDiamond.id === item.diamondSpecification.id
                                ? styles.selected
                                : "";
                            return (
                              <Grid
                                key={index}
                                item
                                xl={2.8}
                                sm={5}
                                xs={12}
                                onClick={() =>
                                  setSecondDiamond(item.diamondSpecification)
                                }
                                className={`${styles.spec} ${selected}`}
                              >
                                {getDiamondSpec(item.diamondSpecification)}
                              </Grid>
                            );
                          }
                        )}
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
                        <SizeMenu
                          size={size}
                          setSize={setSize}
                          label={true}
                          sx={sizeMenuStyle}
                          paperStyle={sizeMenuPaperStyle}
                        />
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
            </Box>
            {/* Female design end */}

            <Divider sx={{ backgroundColor: "#ccc", mt: 1, mb: 5 }} />

            <div className={styles.btnGroup}>
              <Button variant="contained" sx={primaryBtn} fullWidth>
                Bắt Đầu Gia Công
              </Button>
              <div className={styles.text}>Hoặc</div>
              <Button
                variant="contained"
                sx={primaryBtn}
                fullWidth
                onClick={handlePayDesignFee}
              >
                Yêu Cầu Thiết Kế
              </Button>
            </div>

            {/* Note start */}
            <div className={styles.note}>
              Xin lưu ý: Xác minh danh tính là bắt buộc để sở hữu nhẫn cưới CR.
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

            <ProductDetailAccordion
              collectionName={designs && designs[0].designCollection.name}
              maleDetail={
                designs &&
                designs[0].characteristic === DesignCharacteristic.Male
                  ? {
                      metalSpec: firstMetal.metalSpecification,
                      diamondSpec: firstDiamond,
                      sideDiamondsCount: designs
                        ? designs[0].sideDiamondsCount
                        : 0,
                    }
                  : {
                      metalSpec: secondMetal.metalSpecification,
                      diamondSpec: secondDiamond,
                      sideDiamondsCount: designs
                        ? designs[1].sideDiamondsCount
                        : 0,
                    }
              }
              femaleDetail={
                designs &&
                designs[0].characteristic === DesignCharacteristic.Female
                  ? {
                      metalSpec: firstMetal.metalSpecification,
                      diamondSpec: firstDiamond,
                      sideDiamondsCount: designs
                        ? designs[0].sideDiamondsCount
                        : 0,
                    }
                  : {
                      metalSpec: secondMetal.metalSpecification,
                      diamondSpec: secondDiamond,
                      sideDiamondsCount: designs
                        ? designs[1].sideDiamondsCount
                        : 0,
                    }
              }
            />
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

export default WeddingRingsDetail;
