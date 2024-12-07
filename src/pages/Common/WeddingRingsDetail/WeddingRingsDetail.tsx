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
  Skeleton,
  SxProps,
} from "@mui/material";
import styles from "./WeddingRingsDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { menuPaperStyle, primaryBtn, sizeMenuStyle } from "src/utils/styles";
import {
  currencyFormatter,
  getDiamondSpec,
  mapGoldColor,
} from "src/utils/functions";
import { useEffect, useState } from "react";
import CustomExpandIcon from "src/components/icon/CustomExpandIcon";
import {
  ConfigurationKey,
  CustomOrderStatus,
  CustomRequestStatus,
  GoldColor,
} from "src/utils/enums";
import SizeMenu from "src/components/menu/SizeMenu";
import GuideDialog from "src/components/dialog/GuideDialog";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import ProductDetailAccordion from "src/components/accordion/ProductDetail.Accordion";
import Advertisement from "src/components/advertisement/Advertisement";
import brandIntro from "src/assets/brand-intro.png";
import FeedbackSection from "src/components/feedback/FeedbackSection";
import { metalWeightUnit } from "src/utils/constants";
import { useAppSelector, useScrollTop } from "src/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCustomOrders,
  fetchCustomRequests,
  fetchDesignDetail,
} from "src/utils/querykey";
import { getCustomRequests } from "src/services/customRequest.service";
import { getCustomOrders } from "src/services/customOrder.service";
import { getDesignDetail } from "src/services/design.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import SpouseModal from "src/components/modal/redirect/Spouse.modal";

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
    createdAt: "",
  },
  image: {
    url: "",
  },
};

const initDiamond: IDiamondSpec = {
  id: 0,
  name: "",
  weight: 0,
  color: "",
  clarity: "",
  shape: "",
  price: 0,
  createdAt: "",
};

function WeddingRingsDetail() {
  const [allow, setAllow] = useState(true);
  const [customRequestFilterObj, setCustomRequestFilterObj] =
    useState<ICustomRequestFilter | null>(null);
  const [customOrderFilterObj, setCustomOrderFilterObj] =
    useState<ICustomOrderFilter | null>(null);

  const [firstMetal, setFirstMetal] = useState(initMetal);
  const [firstDiamond, setFirstDiamond] = useState(initDiamond);

  const [secondMetal, setSecondMetal] = useState(initMetal);
  const [secondDiamond, setSecondDiamond] = useState(initDiamond);

  const [maleSize, setMaleSize] = useState(0);
  const [femaleSize, setFemaleSize] = useState(0);

  const [maleEngraving, setMaleEngraving] = useState("");
  const [femaleEngraving, setFemaleEngraving] = useState("");

  const [malePrice, setMalePrice] = useState(0);
  const [femalePrice, setFemalePrice] = useState(0);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { id: userId, hasSpouse } = useAppSelector(
    (state) => state.auth.userInfo
  );
  const { configs } = useAppSelector((state) => state.config);

  const designFee = configs.find(
    (item) => item.key === ConfigurationKey.DesignFee
  )?.value;
  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;
  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;
  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;
  const craftingFee = configs.find(
    (item) => item.key === ConfigurationKey.CraftingFee
  )?.value;

  const { maleId, femaleId } = useParams<{
    maleId: string;
    femaleId: string;
  }>();

  const { data: maleResponse } = useQuery({
    queryKey: [fetchDesignDetail, maleId],

    queryFn: () => {
      if (maleId) return getDesignDetail(+maleId);
    },
    enabled: !!maleId,
  });

  const { data: femaleResponse } = useQuery({
    queryKey: [fetchDesignDetail, femaleId],

    queryFn: () => {
      if (femaleId) return getDesignDetail(+femaleId);
    },
    enabled: !!femaleId,
  });

  const { data: customRequestResponse } = useQuery({
    queryKey: [fetchCustomRequests, customRequestFilterObj],

    queryFn: () => {
      if (customRequestFilterObj)
        return getCustomRequests(customRequestFilterObj);
    },
    enabled: !!customRequestFilterObj,
  });

  const { data: customOrderResponse } = useQuery({
    queryKey: [fetchCustomOrders, customOrderFilterObj],

    queryFn: () => {
      if (customOrderFilterObj) return getCustomOrders(customOrderFilterObj);
    },
    enabled: !!customOrderFilterObj,
  });

  const handlePayDesignFee = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/customer/design-fee/${maleId}/${femaleId}`);
  };

  const handleRequestCrafting = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (maleSize === 0 || femaleSize === 0) {
      toast.error("Vui lòng chọn kích thước ngón tay");
      return;
    }

    if (!hasSpouse) {
      setOpen(true);
      return;
    }

    const maleRequest = {
      designId: maleId,
      size: maleSize,
      engraving: maleEngraving,
      metalSpec: firstMetal,
      diamondSpec: firstDiamond,
    };

    const femaleRequest = {
      designId: femaleId,
      size: femaleSize,
      engraving: femaleEngraving,
      metalSpec: secondMetal,
      diamondSpec: secondDiamond,
    };

    navigate(`/customer/request-crafting`, {
      state: { maleRequest, femaleRequest },
    });
  };

  // Choose default gold and diamond option
  useEffect(() => {
    if (maleResponse?.data && femaleResponse?.data) {
      const firstMetal = maleResponse.data.designMetalSpecifications.reduce(
        function (prev, curr) {
          return prev.metalSpecification.pricePerUnit <
            curr.metalSpecification.pricePerUnit
            ? prev
            : curr;
        }
      );
      const firstDiamond = maleResponse.data.designDiamondSpecifications.reduce(
        function (prev, curr) {
          return prev.diamondSpecification.price <
            curr.diamondSpecification.price
            ? prev
            : curr;
        }
      );

      const secondMetal = femaleResponse.data.designMetalSpecifications.reduce(
        function (prev, curr) {
          return prev.metalSpecification.pricePerUnit <
            curr.metalSpecification.pricePerUnit
            ? prev
            : curr;
        }
      );
      const secondDiamond =
        femaleResponse.data.designDiamondSpecifications.reduce(function (
          prev,
          curr
        ) {
          return prev.diamondSpecification.price <
            curr.diamondSpecification.price
            ? prev
            : curr;
        });

      setFirstMetal(firstMetal);
      setFirstDiamond(firstDiamond.diamondSpecification);
      setSecondMetal(secondMetal);
      setSecondDiamond(secondDiamond.diamondSpecification);
    }

    if (maleResponse?.errors || femaleResponse?.errors) {
      navigate("/wedding-rings");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maleResponse, femaleResponse]);

  // calculate price
  useEffect(() => {
    if (
      maleResponse?.data &&
      femaleResponse?.data &&
      profitRatio &&
      sideDiamondPrice &&
      shippingFee &&
      craftingFee
    ) {
      const maleDesign = maleResponse.data;
      const femaleDesign = femaleResponse.data;

      const firstDesignPrice =
        (maleDesign.metalWeight *
          metalWeightUnit *
          firstMetal.metalSpecification.pricePerUnit +
          firstDiamond.price +
          maleDesign.sideDiamondsCount * +sideDiamondPrice +
          +shippingFee +
          +craftingFee) *
        +profitRatio;
      const secondDesignPrice =
        (femaleResponse.data.metalWeight *
          metalWeightUnit *
          secondMetal.metalSpecification.pricePerUnit +
          secondDiamond.price +
          femaleDesign.sideDiamondsCount * +sideDiamondPrice +
          +shippingFee +
          +craftingFee) *
        +profitRatio;

      const malePrice = Math.round(firstDesignPrice / 1000) * 1000;
      const femalePrice = Math.round(secondDesignPrice / 1000) * 1000;

      setMalePrice(malePrice);
      setFemalePrice(femalePrice);
    }
  }, [
    firstDiamond,
    firstMetal,
    secondMetal,
    secondDiamond,
    maleResponse,
    femaleResponse,
    profitRatio,
    sideDiamondPrice,
    shippingFee,
    craftingFee,
  ]);

  useEffect(() => {
    if (customRequestResponse?.data && customOrderResponse?.data) {
      const { items: requests } = customRequestResponse.data;
      const { items: orders } = customOrderResponse.data;

      if (requests.length !== 0) {
        const inProgress = requests.find(
          (item) =>
            item.status === CustomRequestStatus.Waiting ||
            item.status === CustomRequestStatus.OnGoing
        );

        if (inProgress) {
          setAllow(false);
          return;
        }
      }

      const allOrdersCanceled = orders.every(
        (item) => item.status === CustomOrderStatus.Canceled
      );

      if (!allOrdersCanceled) {
        setAllow(false);
      }
    }
  }, [customRequestResponse, customOrderResponse]);

  useEffect(() => {
    setCustomRequestFilterObj({
      page: 0,
      pageSize: 100,
      customerId: userId,
    });

    setCustomOrderFilterObj({
      page: 0,
      pageSize: 100,
      customerId: userId,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!maleId || !femaleId) navigate("/wedding-rings");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [femaleId, maleId]);

  useScrollTop();

  if (!maleResponse?.data || !femaleResponse?.data) {
    return (
      <Grid container justifyContent={"center"}>
        <Grid container item xs={10} justifyContent={"space-between"}>
          <Grid item xs={5}>
            <Skeleton width={"100%"} height={400} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton width={"100%"} height={600} />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={styles.container}>
      <Grid container className={styles.productInfo}>
        {/* Male Design  */}
        <Grid container item xs={11} className={styles.content}>
          <Grid item lg={5} sx={{ mb: 2 }}>
            <img src={firstMetal.image.url} />
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
                Bộ Sưu Tập {maleResponse.data?.designCollection.name}
              </Link>
            </Breadcrumbs>

            <div className={styles.name}>
              CR {maleResponse.data?.designCollection.name.toUpperCase()}{" "}
              {maleResponse.data?.name}
            </div>

            {/* <div className={styles.rate}>
              <Rating value={5} readOnly sx={{ color: "#b43620" }} />
              <div className={styles.number}>(50)</div>
            </div> */}

            <div className={styles.description}>
              {maleResponse.data?.description}
            </div>

            <Divider sx={{ backgroundColor: "#555", mb: 3 }} />

            <div className={styles.price}>
              {currencyFormatter(malePrice)}
              <FormHelperText>* Giá chỉ mang tính tham khảo</FormHelperText>
            </div>

            <Box>
              <Button variant="contained" sx={{ ...primaryBtn, px: 5, py: 1 }}>
                Nam Tính
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
                      {maleResponse.data?.designMetalSpecifications.map(
                        (item) => {
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
                        }
                      )}
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
                      {maleResponse.data?.designDiamondSpecifications.map(
                        (item) => {
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
                          size={maleSize}
                          setSize={setMaleSize}
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
                        value={maleEngraving}
                        onChange={(e) => {
                          if (e.target.value.length <= 10)
                            setMaleEngraving(e.target.value);
                        }}
                      />
                      <FormHelperText>
                        {maleEngraving.length}/10 ký tự
                      </FormHelperText>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>
            <Divider sx={{ backgroundColor: "#ccc", mt: 1, mb: 5 }} />
          </Grid>
        </Grid>
        {/* Male Design  */}

        {/* Female Design  */}
        <Grid container item xs={11} className={styles.content}>
          <Grid item lg={5} sx={{ mb: 2 }}>
            <img src={secondMetal.image.url} />
          </Grid>

          <Grid item lg={6}>
            <div className={styles.name}>
              CR {femaleResponse.data?.designCollection.name.toUpperCase()}{" "}
              {femaleResponse.data?.name}
            </div>

            <div className={styles.description}>
              {femaleResponse.data?.description}
            </div>

            <Divider sx={{ backgroundColor: "#555", mb: 3 }} />

            <div className={styles.price}>
              {currencyFormatter(femalePrice)}
              <FormHelperText>* Giá chỉ mang tính tham khảo</FormHelperText>
            </div>

            <Box>
              <Button variant="contained" sx={{ ...primaryBtn, px: 5, py: 1 }}>
                Nữ Tính
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
                      {femaleResponse.data.designMetalSpecifications.map(
                        (item) => {
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
                        }
                      )}
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
                      {femaleResponse.data.designDiamondSpecifications.map(
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
                          size={femaleSize}
                          setSize={setFemaleSize}
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
                        value={femaleEngraving}
                        onChange={(e) => {
                          if (e.target.value.length <= 10)
                            setFemaleEngraving(e.target.value);
                        }}
                      />
                      <FormHelperText>
                        {femaleEngraving.length}/10 ký tự
                      </FormHelperText>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>

            <Divider sx={{ backgroundColor: "#ccc", mt: 1, mb: 5 }} />

            {allow && (
              <div className={styles.btnGroup}>
                <LoadingButton
                  variant="contained"
                  sx={primaryBtn}
                  fullWidth
                  onClick={handleRequestCrafting}
                >
                  Bắt Đầu Gia Công
                </LoadingButton>
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
            )}

            {/* Note start */}
            <div className={styles.designfee}>
              Chi phí thu thêm cho mỗi lần thiết kế là{" "}
              <b>{currencyFormatter(designFee ? +designFee : 0)}</b>.
            </div>
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
              collectionName={maleResponse.data.designCollection.name}
              maleDetail={{
                metalSpec: firstMetal.metalSpecification,
                diamondSpec: firstDiamond,
                sideDiamondsCount: maleResponse.data.sideDiamondsCount,
                metalWeight: maleResponse.data.metalWeight,
              }}
              femaleDetail={{
                metalSpec: secondMetal.metalSpecification,
                diamondSpec: secondDiamond,
                sideDiamondsCount: femaleResponse.data.sideDiamondsCount,
                metalWeight: femaleResponse.data.metalWeight,
              }}
            />
          </Grid>
        </Grid>
        {/* Female Design  */}
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

      <SpouseModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default WeddingRingsDetail;
