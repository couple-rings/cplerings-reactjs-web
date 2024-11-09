import styles from "./CraftingProcess.module.scss";
import Carousel from "react-material-ui-carousel";
import { Button, Grid, Paper } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProcessStage_25 from "./ProcessStage_25";
import ProcessStage_50 from "./ProcessStage_50";
import ProcessStage_75 from "./ProcessStage_75";
import ProcessStage_100 from "./ProcessStage_100";
import { useState } from "react";
import AddProcessImage from "./AddProcessImage";

function CraftingProcess() {
  const [imageSrcs25, setImageSrcs25] = useState<string[]>([]);
  const [imageSrcs50, setImageSrcs50] = useState<string[]>([]);
  const [imageSrcs75, setImageSrcs75] = useState<string[]>([]);
  const [imageSrcs100, setImageSrcs100] = useState<string[]>([]);

  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <Carousel autoPlay={false}>
          <Paper elevation={0} className={styles.processItem}>
            <Grid container className={styles.header}>
              <Grid item className={styles.title}>
                Qui trình chế tác
              </Grid>
              <Grid item className={styles.deposit}>
                Đã đặt cọc
              </Grid>
            </Grid>

            <Grid className={styles.jewelerName}>Jeweler_BeanNguyen</Grid>

            <div className={styles.stepper}>
              <ProcessStage_25 />
            </div>

            <Grid container>
              <Grid item className={styles.headerProcess}>
                25% Quy Trình - Chuẩn Bị Nguyên Liệu
              </Grid>

              <Grid container xs={12} className="infoProcess">
                <Grid
                  item
                  container
                  xs={12}
                  md={6}
                  pb={5}
                  className={styles.infoDetail}
                >
                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Nguyên liệu thô (kim loại và đá) được lựa chọn và kiểm tra
                      chất lượng.
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Cấu trúc đế của chiếc nhẫn được đúc hoặc tạo hình từ kim
                      loại đã chọn.
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container md={4} justifyContent="center">
                  <AddProcessImage
                    imageSrcs={imageSrcs25}
                    setImageSrcs={setImageSrcs25}
                  />
                </Grid>

              </Grid>
            </Grid>

            <Grid container justifyContent={"center"}>
              <Button className={styles.completeButton}>
                Hoàn Thành Qui Trình
              </Button>
            </Grid>
          </Paper>

          <Paper elevation={0} className={styles.processItem}>
            <Grid container className={styles.header}>
              <Grid item className={styles.title}>
                Qui trình chế tác
              </Grid>
              <Grid item className={styles.waitingToDeposit}>
                Đang chờ khách hàng đặt cọc
              </Grid>
            </Grid>

            <Grid className={styles.jewelerName}>Jeweler_BeanNguyen</Grid>

            <div className={styles.stepper}>
              <ProcessStage_50 />
            </div>

            <Grid container>
              <Grid item className={styles.headerProcess}>
                50% Quy Trình - Chuẩn Bị Nguyên Liệu
              </Grid>

              <Grid container xs={12} className="infoProcess">
                <Grid
                  item
                  container
                  xs={12}
                  md={6}
                  pb={5}
                  className={styles.infoDetail}
                >
                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Nhẫn được tinh chỉnh và định hình để đảm bảo kích thước
                      phù hợp.
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Các thành phần như ngạnh hoặc khung viền cho các viên đá
                      được gắn vào.
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Công việc hoàn thiện trước được thực hiện để làm phẳng mọi
                      cạnh thô.
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container md={4} justifyContent="center">
                  <AddProcessImage
                    imageSrcs={imageSrcs50}
                    setImageSrcs={setImageSrcs50}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent={"center"}>
              <Button className={styles.completeButton}>
                Hoàn Thành Qui Trình
              </Button>
            </Grid>
          </Paper>

          <Paper elevation={0} className={styles.processItem}>
            <Grid container className={styles.header}>
              <Grid item className={styles.title}>
                Qui trình chế tác
              </Grid>
              <Grid item className={styles.waitingToDeposit}>
                Đang chờ khách hàng đặt cọc
              </Grid>
            </Grid>

            <Grid className={styles.jewelerName}>Jeweler_BeanNguyen</Grid>

            <div className={styles.stepper}>
              <ProcessStage_75 />
            </div>

            <Grid container>
              <Grid item className={styles.headerProcess}>
                75% Quy Trình - Chuẩn Bị Nguyên Liệu
              </Grid>

              <Grid container xs={12} className="infoProcess">
                <Grid
                  item
                  container
                  xs={12}
                  md={6}
                  pb={5}
                  className={styles.infoDetail}
                >
                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Những viên đá được đặt vào vòng một cách an toàn.
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Các bản khắc, mẫu hoặc các yếu tố thiết kế chi tiết khác
                      được thêm vào.
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Các nét trang trí bổ sung được áp dụng để đáp ứng các yêu
                      cầu tùy chỉnh.
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container md={4} justifyContent="center">
                  <AddProcessImage
                    imageSrcs={imageSrcs75}
                    setImageSrcs={setImageSrcs75}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent={"center"}>
              <Button className={styles.completeButton}>
                Hoàn Thành Qui Trình
              </Button>
            </Grid>
          </Paper>

          <Paper elevation={0} className={styles.processItem}>
            <Grid container className={styles.header}>
              <Grid item className={styles.title}>
                Qui trình chế tác
              </Grid>
              <Grid item className={styles.waitingToDeposit}>
                Đang chờ khách hàng đặt cọc
              </Grid>
            </Grid>

            <Grid className={styles.jewelerName}>Jeweler_BeanNguyen</Grid>

            <div className={styles.stepper}>
              <ProcessStage_100 />
            </div>

            <Grid container>
              <Grid item className={styles.headerProcess}>
                100% Quy Trình - Chuẩn Bị Nguyên Liệu
              </Grid>

              <Grid container xs={12} className="infoProcess">
                <Grid
                  item
                  container
                  xs={12}
                  md={6}
                  pb={5}
                  className={styles.infoDetail}
                >
                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Chiếc nhẫn trải qua quá trình đánh bóng cuối cùng để đạt
                      được bề mặt sáng bóng hoàn hảo.
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Việc kiểm tra chất lượng kỹ lưỡng đảm bảo chiếc nhẫn đáp
                      ứng các tiêu chuẩn về thiết kế và tay nghề.
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.infoItem}>
                    <Grid item xs={1} md={1}>
                      <VerifiedIcon />
                    </Grid>
                    <Grid item xs={11} md={8} className={styles.content}>
                      Chiếc nhẫn hiện đã sẵn sàng để đóng gói và giao hàng.
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container md={4} justifyContent="center">
                  <AddProcessImage
                    imageSrcs={imageSrcs100}
                    setImageSrcs={setImageSrcs100}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container justifyContent={"center"}>
              <Button className={styles.completeButton}>
                Hoàn Thành Qui Trình
              </Button>
            </Grid>
          </Paper>
        </Carousel>
      </div>
    </div>
  );
}

export default CraftingProcess;
