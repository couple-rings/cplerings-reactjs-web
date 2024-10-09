import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Index.module.scss";
import banner1 from "src/assets/banner1.png";
import banner2 from "src/assets/banner2.png";
import rightArrow from "src/assets/right.png";
import step1 from "src/assets/process1.png";
import step2 from "src/assets/process2.png";
import step3 from "src/assets/process3.png";
import step4 from "src/assets/process4.png";
import step5 from "src/assets/process5.png";
import storyCover1 from "src/assets/sampledata/sampleStory.png";
import sampleName1 from "src/assets/sampledata/sampleName.png";
import storyCover2 from "src/assets/sampledata/sampleStory2.png";
import sampleName2 from "src/assets/sampledata/sampleName2.png";
import storyCover3 from "src/assets/sampledata/sampleStory3.png";
import sampleName3 from "src/assets/sampledata/sampleName3.png";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import Slider, { Settings } from "react-slick";
import { outlinedBtn, secondaryBtn } from "src/utils/styles";
import CustomNextArrow from "src/components/arrow/CustomNextArrow";
import CustomPrevArrow from "src/components/arrow/CustomPrevArrow";
import media1 from "src/assets/sampledata/1.png";
import media2 from "src/assets/sampledata/2.png";
import media3 from "src/assets/sampledata/3.png";
import media4 from "src/assets/sampledata/4.png";
import media5 from "src/assets/sampledata/5.png";
import media6 from "src/assets/sampledata/6.png";
import media7 from "src/assets/sampledata/7.png";
import media8 from "src/assets/sampledata/8.png";
import media9 from "src/assets/sampledata/9.png";
import media10 from "src/assets/sampledata/10.png";
import media11 from "src/assets/sampledata/11.png";
import media12 from "src/assets/sampledata/12.png";
import { showSlides } from "src/utils/functions";
import firstAgreement from "src/assets/first-agreement.png";
import guide from "src/assets/video/step.mp4";
import brand from "src/assets/brand.png";
import store from "src/assets/storeHD.png";
import Advertisement from "src/components/advertisement/Advertisement";
import { useNavigate } from "react-router-dom";

const processSteps = [
  {
    text: "Đăng Ký Tài Khoản Couple Rings",
    icon: step1,
  },
  {
    text: "Chọn Mẫu Nhẫn Và Kim Cương",
    icon: step2,
  },
  {
    text: "Điền Thông Tin Và Thanh Toán",
    icon: step3,
  },
  {
    text: "Xác Minh Bằng CCCD Và Khuôn Mặt",
    icon: step4,
  },
  {
    text: "Ký Kết Thỏa Thuận Tình Yêu",
    icon: step5,
  },
];

const stories = [
  {
    coverImg: storyCover1,
    nameImg: sampleName1,
    intro:
      "Khi bạn tìm thấy một nửa của mình, bạn nên dồn hết tâm huyết vào mối quan hệ của hai người. Đó cũng chính là điều mà cả hai đều mong muốn từ nhau.",
    author: "Karolina",
  },
  {
    coverImg: storyCover2,
    nameImg: sampleName2,
    intro:
      "Chúng tôi cùng nhau trên hành trình này, và dù con đường có gập ghềnh, chúng tôi luôn có nhau. Đó chính là ý nghĩa của tình yêu đích thực và tình yêu duy nhất.",
    author: "Suzy",
  },
  {
    coverImg: storyCover3,
    nameImg: sampleName3,
    intro:
      "Tôi luôn biết rằng mình chỉ muốn kết hôn một lần và chung sống với tình yêu duy nhất suốt đời. Anh ấy là mối tình đầu của tôi và tất nhiên, anh ấy cũng sẽ là mối tình cuối cùng.",
    author: "Brenda",
  },
];

const mediaImgs = [
  media1,
  media2,
  media3,
  media4,
  media5,
  media6,
  media7,
  media8,
  media9,
  media10,
  media11,
  media12,
];

const processSettings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  autoplay: false,
};

const storySettings: Settings = {
  dots: false,
  infinite: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const mediaSettings: Settings = {
  dots: false,
  infinite: false,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  speed: 500,
  swipeToSlide: true,
};

const HomeDefault = () => {
  const theme = useTheme();
  const minSM = useMediaQuery(theme.breakpoints.up("sm"));
  const minMD = useMediaQuery(theme.breakpoints.up("md"));
  const minLG = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Banner Start */}
      <img src={banner1} className={styles.banner} />
      <img src={banner2} className={styles.banner} />
      {/* Banner End */}

      {/* Process Start */}
      <div className={styles.process}>
        <div className={styles.title}>Quy Trình Của Chúng Tôi</div>
        <Slider {...processSettings}>
          <div>
            <Grid container className={styles.stepContainer}>
              {processSteps.map((step, index) => {
                return (
                  <Grid
                    item
                    sm={6}
                    md={3}
                    lg={2.3}
                    className={styles.step}
                    key={index}
                  >
                    <img src={step.icon} className={styles.icon} />
                    <div className={styles.text}>{step.text}</div>
                    {index !== processSteps.length - 1 && minSM && (
                      <img src={rightArrow} className={styles.arrow} />
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Slider>
      </div>
      {/* Process End */}

      {/* Stories Start */}
      <div className={styles.customerStories}>
        <Slider {...storySettings}>
          {stories.map((story, index) => {
            return <Story key={index} {...story} />;
          })}
        </Slider>
      </div>
      {/* Stories End */}

      {/* Media Start */}
      <div className={styles.socialMedia}>
        <div className={styles.title}>Những Câu Chuyện Tình Yêu Hằng Ngày</div>
        <div className={styles.subtitle}>
          Tag <b>@tinhyeuduynhat</b> trên Facebook
        </div>
        <Grid container className={styles.sliderContainer}>
          <Grid item xs={10}>
            <Slider
              {...mediaSettings}
              slidesToShow={showSlides(minSM, minMD, minLG)}
            >
              {mediaImgs.map((img, index) => {
                return <img src={img} key={index} />;
              })}
            </Slider>
          </Grid>
        </Grid>
        <div className={styles.bottomText}>Tìm Hiểu Thêm &gt;</div>
      </div>
      {/* Media End */}

      {/* First Agreement Start */}
      <Grid container className={styles.firstAgreement}>
        <Grid item xs={12} lg={5}>
          <img src={firstAgreement} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <div className={styles.title}>
            Thỏa Thuận Tình Yêu Đầu Tiên Tại Việt Nam
          </div>
          <div className={styles.text}>
            "Thỏa thuận ban đầu này được viết tay bởi những người sáng lập CR.
            Cặp đôi này đã tạo ra thỏa thuận đầu tiên khi CR vừa mới được thành
            lập, hứa sẽ mãi mãi là người yêu và đối tác của nhau, cam kết cùng
            nhau làm việc và tạo ra một thế giới tốt đẹp hơn cho nhiều cặp đôi
            yêu nhau đích thực."
          </div>
          <div className={styles.author}>&mdash;&mdash; Từ CoupleRings</div>
        </Grid>
      </Grid>
      {/* First Agreement End */}

      {/* Guide Start */}
      <div className={styles.guide}>
        <div className={styles.title}>
          Sẵn Sàng Đưa Ra Lời Hứa Trọn Đời Của Bạn Chưa?
        </div>
        <div className={styles.subtitle}>
          Một vé đi đến tình yêu đích thực, với sự cân nhắc kỹ lưỡng, quyết định
          vững vàng và lòng dũng cảm phi thường.
        </div>

        <Grid container className={styles.body}>
          <Grid item lg={5}>
            <video width={"100%"} autoPlay loop muted>
              <source src={guide} type="video/mp4" />
            </video>
          </Grid>

          <Grid item lg={6} className={styles.right}>
            <div className={styles.title}>Xác Minh Tình Yêu</div>
            <div className={styles.text}>
              Couple Rings, thương hiệu duy nhất tại Việt Nam yêu cầu xác minh
              danh tính trước khi mua nhẫn cưới. Tên của người bạn đời sẽ không
              thể thay đổi hay xóa bỏ. Hãy chắc chắn rằng bạn đã sẵn sàng!
            </div>
            <Button
              variant="outlined"
              sx={outlinedBtn}
              onClick={() => navigate("/customer/love-verification")}
            >
              Xác Nhận
            </Button>
            <div className={styles.note}>
              *Khi sử dụng dịch vụ Xác Minh Tình Yêu Đích Thực của Couple Rings,
              bạn xác nhận và đồng ý với <b>chính sách bảo mật</b> của CR.
            </div>
          </Grid>
        </Grid>
        <img src={brand} className={styles.brand} />
      </div>
      {/* Guide End */}

      {/* Store Start */}
      <Grid container className={styles.store}>
        <Grid item sx={{ display: { xs: "block", md: "none" } }}>
          <img src={store} />
        </Grid>

        <Grid item md={6} className={styles.left}>
          <div className={styles.title}>Đến Cửa Hàng</div>
          <div className={styles.text}>
            Tìm chiếc nhẫn tượng trưng cho khởi đầu của lời cam kết tình yêu của
            bạn tại showroom của chúng tôi ở Hồ Chí Minh.
          </div>
          <div className={styles.bottomText}>
            <span className={styles.storeNumber}>03</span> Cửa Hàng Tại:
          </div>
          <div className={styles.bottomText}>Quận 1, Quận 7, Quận 12</div>
          <Button
            variant="outlined"
            sx={outlinedBtn}
            className={styles.findBtn}
            onClick={() => navigate("/stores")}
          >
            Tìm Cửa Hàng
          </Button>
        </Grid>

        <Grid item md={6} lg={5} sx={{ display: { xs: "none", md: "block" } }}>
          <img src={store} />
        </Grid>
      </Grid>
      {/* Store End */}

      {/* Advertisement Start */}
      <Advertisement />
      {/* Advertisement End */}
    </div>
  );
};

const Story = (props: IStoryProps) => {
  const { author, coverImg, intro, nameImg } = props;

  const theme = useTheme();
  const minLG = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid container className={styles.story}>
      <Grid lg={6} item>
        <img src={coverImg} className={styles.coverImg} />
      </Grid>

      {minLG && (
        <Grid lg={5} item className={styles.intro}>
          <div className={styles.text}>Câu Chuyện Của Chúng Tôi</div>
          <img src={nameImg} className={styles.nameImg} />
          <div className={styles.text}>{intro}</div>
          <div className={styles.author}>&mdash; {author}</div>
          <Button variant="contained" sx={secondaryBtn}>
            Tìm Hiểu Thêm
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default HomeDefault;
