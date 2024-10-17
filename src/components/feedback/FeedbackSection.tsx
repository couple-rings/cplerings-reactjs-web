import { Button, Grid, Rating, SxProps } from "@mui/material";
import styles from "./FeedbackSection.module.scss";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { outlinedBtn, primaryBtn } from "src/utils/styles";
import { HoverMenuPurpose } from "src/utils/enums";
import HoverMenu from "src/components/menu/HoverMenu";
import Feedback from "./Feedback";
import { useRef, useState } from "react";
import AddModal from "src/components/modal/feedback/Add.Modal";
import DeleteModal from "src/components/modal/feedback/Delete.Modal";
import UpdateModal from "src/components/modal/feedback/Update.Modal";

const sorts = ["Mới nhất", "Đánh giá cao nhất", "Đánh giá thấp nhất"];

const feedbacks = [
  {
    username: "Tara U.",
    rating: 5,
    title: "Đẹp tuyệt vời",
    comment:
      "Tôi đã cầu hôn bạn gái 5 năm của mình với chiếc nhẫn này. Cô ấy hoàn toàn yêu thích nó. Ban đầu, tôi định mua cho cô ấy một chiếc nhẫn đính hôn, nhưng quyết định rằng nên tiết kiệm để mua một chiếc nhẫn đính hôn thật đẹp, vì vậy chúng tôi đã chọn một chiếc nhẫn cưới, và cô ấy không thể hạnh phúc hơn.",
    date: "02-03-2023",
  },
  {
    username: "Tara U.",
    rating: 5,
    title: "Đẹp tuyệt vời",
    comment:
      "Tôi đã cầu hôn bạn gái 5 năm của mình với chiếc nhẫn này. Cô ấy hoàn toàn yêu thích nó. Ban đầu, tôi định mua cho cô ấy một chiếc nhẫn đính hôn, nhưng quyết định rằng nên tiết kiệm để mua một chiếc nhẫn đính hôn thật đẹp, vì vậy chúng tôi đã chọn một chiếc nhẫn cưới, và cô ấy không thể hạnh phúc hơn.",
    date: "02-03-2023",
  },
  {
    username: "Tara U.",
    rating: 5,
    title: "Đẹp tuyệt vời",
    comment:
      "Tôi đã cầu hôn bạn gái 5 năm của mình với chiếc nhẫn này. Cô ấy hoàn toàn yêu thích nó. Ban đầu, tôi định mua cho cô ấy một chiếc nhẫn đính hôn, nhưng quyết định rằng nên tiết kiệm để mua một chiếc nhẫn đính hôn thật đẹp, vì vậy chúng tôi đã chọn một chiếc nhẫn cưới, và cô ấy không thể hạnh phúc hơn.",
    date: "02-03-2023",
  },
];

const boxStyle: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
  display: "flex",
  justifyContent: "space-between",
  mb: 2,
};

function FeedbackSection() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const backToTop = () => {
    if (ref.current)
      window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
  };

  const handleClickAdd = () => {
    setOpenAdd(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Phản Hồi Từ Khách Hàng Của Chúng Tôi</div>

      <Grid container className={styles.content}>
        <Grid item xs={10}>
          <div className={styles.ratingNumber}>{(5).toFixed(1)}</div>
          <Rating value={5} readOnly sx={{ color: "#b43620" }} />
          <div className={styles.totalReviews}>11 Reviews</div>

          <TabContext value={"1"}>
            <Box sx={boxStyle} ref={ref}>
              <TabList classes={{ indicator: "feedbackTabIndicator" }}>
                <Tab label="Đánh giá" value={"1"} className={styles.tabTitle} />
              </TabList>
              <Button
                variant="contained"
                sx={{ ...primaryBtn, px: 3, py: 1, m: 1 }}
                onClick={handleClickAdd}
              >
                Tạo đánh giá
              </Button>
            </Box>

            <HoverMenu
              purpose={HoverMenuPurpose.Sort}
              title="Sắp Xếp"
              lists={sorts}
            />

            <TabPanel value={"1"}>
              {feedbacks.map((item, index) => {
                return (
                  <Feedback
                    key={index}
                    {...item}
                    setOpenDelete={setOpenDelete}
                    setOpenUpdate={setOpenUpdate}
                  />
                );
              })}
            </TabPanel>
          </TabContext>

          <div className={styles.groupBtn}>
            <Button variant="outlined" sx={{ ...outlinedBtn, py: 2 }}>
              Xem Thêm
            </Button>
            <Button
              variant="outlined"
              sx={{ ...outlinedBtn, py: 2 }}
              onClick={backToTop}
            >
              Về Lại Đầu
            </Button>
          </div>
        </Grid>
      </Grid>

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
      <UpdateModal open={openUpdate} setOpen={setOpenUpdate} />
    </div>
  );
}

export default FeedbackSection;
