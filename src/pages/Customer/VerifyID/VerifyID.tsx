import { Button, FormHelperText, Grid } from "@mui/material";
import styles from "./VerifyID.module.scss";
import iso1 from "src/assets/27001.png";
import iso2 from "src/assets/isoblack.png";
import photoIcon1 from "src/assets/icon-photo1.png";
import photoIcon2 from "src/assets/icon-photo2.png";
import cameraIcon from "src/assets/icon-carmera.png";
import { primaryBtn, textBtn } from "src/utils/styles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PersonFace } from "src/utils/enums";
import _ from "lodash";

const initError = {
  empty: {
    value: false,
    msg: "* Vui lòng upload đầy đủ ảnh",
  },
};

function VerifyID() {
  const [ownerIdImg, setOwnerIdImg] = useState<File | null>(null);
  const [ownerFaceImg, setOwnerFaceImg] = useState<File | null>(null);
  const [selfError, setSelfError] = useState(initError);

  const [partnerIdImg, setPartnerIdImg] = useState<File | null>(null);
  const [partnerFaceImg, setPartnerFaceImg] = useState<File | null>(null);
  const [partnerError, setPartnerError] = useState(initError);

  const handleSelectFaceImg = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    personFace: PersonFace
  ) => {
    if (!ownerIdImg && personFace === PersonFace.Self) {
      e.preventDefault();
      toast.info("Vui lòng upload ảnh CCCD của bạn trước");
    }

    if (!partnerIdImg && personFace === PersonFace.Partner) {
      e.preventDefault();
      toast.info("Vui lòng upload ảnh CCCD của bạn đời trước");
    }
  };

  const onChangeOwnIdImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setOwnerIdImg(e.target.files[0]);
      if (ownerFaceImg) {
        const cloneState = _.cloneDeep(selfError);
        cloneState.empty.value = false;
        setSelfError(cloneState);
      }
    }
  };

  const onChangeOwnFaceImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setOwnerFaceImg(e.target.files[0]);
      if (ownerIdImg) {
        const cloneState = _.cloneDeep(selfError);
        cloneState.empty.value = false;
        setSelfError(cloneState);
      }
    }
  };

  const onChangePartnerIdImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPartnerIdImg(e.target.files[0]);
      if (partnerFaceImg) {
        const cloneState = _.cloneDeep(selfError);
        cloneState.empty.value = false;
        setPartnerError(cloneState);
      }
    }
  };

  const onChangePartnerFaceImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPartnerFaceImg(e.target.files[0]);
      if (partnerIdImg) {
        const cloneState = _.cloneDeep(selfError);
        cloneState.empty.value = false;
        setPartnerError(cloneState);
      }
    }
  };

  const handleVerify = () => {
    if (!ownerIdImg || !ownerFaceImg) {
      const cloneState = _.cloneDeep(selfError);
      cloneState.empty.value = true;
      setSelfError(cloneState);
    }

    if (!partnerIdImg || !partnerFaceImg) {
      const cloneState = _.cloneDeep(partnerError);
      cloneState.empty.value = true;
      setPartnerError(cloneState);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Grid container className={styles.container}>
      <Grid item xs={10} lg={8} xl={5} className={styles.content}>
        <div className={styles.title}>Xác Minh Tình Yêu</div>
        <div className={styles.text}>
          Tại Couple Rings, chúng tôi cam kết sẽ tạo ra chiếc nhẫn cưới hoàn
          hảo, độc nhất vô nhị cho tình yêu đích thực của bạn. Vui lòng tải lên
          CCCD và một bức ảnh cá nhân để xác nhận thông tin của bạn. Couple
          Rings sẽ không chia sẻ thông tin của bạn cho bên thứ ba.
        </div>
        <div className={styles.note}>
          Nếu bạn muốn biết thêm thông tin, vui lòng đọc{" "}
          <span>chính sách bảo mật</span> của chúng tôi.
        </div>

        <div className={styles.imgContainer}>
          <img src={iso1} />
          <img src={iso2} />
        </div>

        <div className={styles.steps}>
          <div>Bước 1: Upload Ảnh CCCD</div>
          <div>Bước 2: Upload Ảnh Cá Nhân</div>
        </div>

        <div className={styles.uploadSection}>
          <div className={styles.photoSection}>
            <div className={styles.title}>* Upload Ảnh Của Bạn</div>
            <Grid container className={styles.photoContainer}>
              <Grid item sm={5.5} className={styles.photoBox}>
                <label>
                  <img
                    src={
                      ownerIdImg ? URL.createObjectURL(ownerIdImg) : photoIcon1
                    }
                    className={styles.photoImg}
                  />
                  <img src={cameraIcon} className={styles.cameraImg} />
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={onChangeOwnIdImg}
                  />
                </label>
                <div className={styles.imgNote}>Ảnh CCCD</div>
              </Grid>

              <Grid item sm={5.5} className={styles.photoBox}>
                <label onClick={(e) => handleSelectFaceImg(e, PersonFace.Self)}>
                  <img
                    src={
                      ownerFaceImg
                        ? URL.createObjectURL(ownerFaceImg)
                        : photoIcon2
                    }
                    className={styles.photoImg}
                  />
                  <img src={cameraIcon} className={styles.cameraImg} />
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={onChangeOwnFaceImg}
                  />
                </label>
                <div className={styles.imgNote}>Ảnh Cá Nhân</div>
              </Grid>
            </Grid>
            {selfError.empty.value && (
              <FormHelperText error>{selfError.empty.msg}</FormHelperText>
            )}
          </div>

          <div className={styles.photoSection}>
            <div className={styles.title}>* Upload Ảnh Của Bạn Đời</div>
            <Grid container className={styles.photoContainer}>
              <Grid item sm={5.5} className={styles.photoBox}>
                <label>
                  <img
                    src={
                      partnerIdImg
                        ? URL.createObjectURL(partnerIdImg)
                        : photoIcon1
                    }
                    className={styles.photoImg}
                  />
                  <img src={cameraIcon} className={styles.cameraImg} />
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={onChangePartnerIdImg}
                  />
                </label>
                <div className={styles.imgNote}>Ảnh CCCD</div>
              </Grid>

              <Grid item sm={5.5} className={styles.photoBox}>
                <label
                  onClick={(e) => handleSelectFaceImg(e, PersonFace.Partner)}
                >
                  <img
                    src={
                      partnerFaceImg
                        ? URL.createObjectURL(partnerFaceImg)
                        : photoIcon2
                    }
                    className={styles.photoImg}
                  />
                  <img src={cameraIcon} className={styles.cameraImg} />
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={onChangePartnerFaceImg}
                  />
                </label>
                <div className={styles.imgNote}>Ảnh Cá Nhân</div>
              </Grid>
            </Grid>
            {partnerError.empty.value && (
              <FormHelperText error>{partnerError.empty.msg}</FormHelperText>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.note}>
            * Chúng tôi không bán nhẫn cưới cho người dưới 18 tuổi.
          </div>
          <div className={styles.note}>
            * Xin lưu ý rằng chúng tôi chỉ chấp nhận các file dưới 5MB với định
            dạng: jpg, jpeg và png.
          </div>
        </div>
        <Button
          variant="contained"
          sx={primaryBtn}
          fullWidth
          onClick={handleVerify}
        >
          Tiếp Tục
        </Button>

        <Button variant="contained" sx={{ ...primaryBtn, mt: 2 }} fullWidth>
          Yêu Cầu Duyệt
        </Button>
        <Button variant="text" fullWidth sx={{ ...textBtn, mt: 2 }}>
          Liên Hệ
        </Button>
      </Grid>
    </Grid>
  );
}

export default VerifyID;
