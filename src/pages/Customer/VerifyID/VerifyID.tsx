import { FormHelperText, Grid } from "@mui/material";
import styles from "./VerifyID.module.scss";
import iso1 from "src/assets/27001.png";
import iso2 from "src/assets/isoblack.png";
import photoIcon1 from "src/assets/icon-photo1.png";
import photoIcon2 from "src/assets/icon-photo2.png";
import cameraIcon from "src/assets/icon-carmera.png";
import { primaryBtn, textBtn } from "src/utils/styles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaceMatchResponseCode,
  IdReadingResponseCode,
  PersonFace,
  ResponseType,
} from "src/utils/enums";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import { postIdFaceMatching, postIdReading } from "src/services/fpt.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { postCreateSpouse } from "src/services/spouse.service";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import moment from "moment";
import { saveProfile } from "src/redux/slice/auth.slice";

const initError = {
  empty: {
    value: false,
    msg: "* Vui lòng upload đầy đủ ảnh",
  },
  invalidID: {
    value: false,
    msg: "* Ảnh căn cước công dân không hợp lệ",
  },
  notMatch: {
    value: false,
    msg: "* Ảnh căn cước và ảnh cá nhân không khớp",
  },
};

function VerifyID() {
  const [ownerIdImg, setOwnerIdImg] = useState<File | null>(null);
  const [ownerFaceImg, setOwnerFaceImg] = useState<File | null>(null);
  const [selfError, setSelfError] = useState(initError);
  const [selfIdInfo, setSelfIdInfo] = useState<IIdReadingResponse | null>(null);

  const [partnerIdImg, setPartnerIdImg] = useState<File | null>(null);
  const [partnerFaceImg, setPartnerFaceImg] = useState<File | null>(null);
  const [partnerError, setPartnerError] = useState(initError);
  const [partnerIdInfo, setPartnerIdInfo] = useState<IIdReadingResponse | null>(
    null
  );

  const dispatch = useAppDispatch();

  const { id: customerId } = useAppSelector((state) => state.auth.userInfo);

  const selfIdReadMutation = useMutation({
    mutationFn: (file: File) => {
      return postIdReading(file);
    },
    onSuccess: (response) => {
      const selfState = _.cloneDeep(selfError);

      if (response.errorCode === IdReadingResponseCode.Success) {
        selfState.invalidID.value = false;
        setSelfError(selfState);
        setSelfIdInfo(response.data[0]);

        // start matching face
        if (ownerIdImg && ownerFaceImg)
          selfFaceMatchMutation.mutate({
            idImage: ownerIdImg,
            faceImage: ownerFaceImg,
          });
      } else if (response.errorCode === IdReadingResponseCode.InvalidImage) {
        // invalid id image
        selfState.invalidID.value = true;
        setSelfError(selfState);
      } else {
        toast.error(response.errorMessage);
      }
    },
  });

  const partnerIdReadMutation = useMutation({
    mutationFn: (file: File) => {
      return postIdReading(file);
    },
    onSuccess: (response) => {
      const partnerState = _.cloneDeep(partnerError);

      if (response.errorCode === IdReadingResponseCode.Success) {
        partnerState.invalidID.value = false;
        setPartnerError(partnerState);
        setPartnerIdInfo(response.data[0]);

        // start matching face
        if (partnerIdImg && partnerFaceImg)
          partnerFaceMatchMutation.mutate({
            idImage: partnerIdImg,
            faceImage: partnerFaceImg,
          });
      } else if (response.errorCode === IdReadingResponseCode.InvalidImage) {
        // invalid id image
        partnerState.invalidID.value = true;
        setPartnerError(partnerState);
      } else {
        toast.error(response.errorMessage);
      }
    },
  });

  const selfFaceMatchMutation = useMutation({
    mutationFn: (data: IFaceIdMatchRequest) => {
      return postIdFaceMatching(data);
    },
    onSuccess: (response) => {
      if (response.code === FaceMatchResponseCode.Success) {
        const { isMatch } = response.data as IFaceIdMatchResponse;
        const selfState = _.cloneDeep(selfError);

        if (isMatch) {
          selfState.notMatch.value = false;
          setSelfError(selfState);

          console.log(selfIdInfo);
        } else {
          selfState.notMatch.value = true;
          setSelfError(selfState);
        }
      } else {
        toast.error(response.data as string);
      }
    },
  });

  const partnerFaceMatchMutation = useMutation({
    mutationFn: (data: IFaceIdMatchRequest) => {
      return postIdFaceMatching(data);
    },
    onSuccess: (response) => {
      if (response.code === FaceMatchResponseCode.Success) {
        const { isMatch } = response.data as IFaceIdMatchResponse;

        const partnerState = _.cloneDeep(partnerError);

        if (isMatch) {
          partnerState.notMatch.value = false;
          setPartnerError(partnerState);

          console.log(partnerIdInfo);
        } else {
          partnerState.notMatch.value = true;
          setPartnerError(partnerState);
        }
      } else {
        toast.error(response.data as string);
      }
    },
  });

  const createSpouseMutation = useMutation({
    mutationFn: (data: ICreateSpouseRequest) => {
      return postCreateSpouse(data);
    },
    onSuccess: (response) => {
      if (response.type === ResponseType.Info) {
        toast.success("Xác minh danh tính thành công");
        dispatch(saveProfile({ hasSpouse: true }));
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

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
        const cloneState = _.cloneDeep(partnerError);
        cloneState.empty.value = false;
        setPartnerError(cloneState);
      }
    }
  };

  const onChangePartnerFaceImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPartnerFaceImg(e.target.files[0]);
      if (partnerIdImg) {
        const cloneState = _.cloneDeep(partnerError);
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

    if (!ownerIdImg || !ownerFaceImg || !partnerIdImg || !partnerFaceImg)
      return;

    selfIdReadMutation.mutate(ownerIdImg);
    partnerIdReadMutation.mutate(partnerIdImg);
  };

  useEffect(() => {
    // if matching is done processing
    if (
      !selfFaceMatchMutation.isPending &&
      !partnerFaceMatchMutation.isPending
    ) {
      // if id info is available
      if (selfIdInfo && partnerIdInfo) {
        // if matching is success
        if (!selfError.notMatch.value && !partnerError.notMatch.value) {
          if (selfIdInfo.id === partnerIdInfo.id) {
            toast.error("Căn cước công dân của bạn và bạn đời bị trùng");
            return;
          }

          const currentYear = moment().year();
          const selfYear = moment(selfIdInfo.dob, "DD/MM/YYYY").year();
          const partnerYear = moment(partnerIdInfo.dob, "DD/MM/YYYY").year();
          const selfAge = currentYear - selfYear;
          const partnerAge = currentYear - partnerYear;

          if (selfAge < 18) {
            toast.error("Bạn chưa đủ tuổi. Yêu cầu trên 18 tuổi");
            return;
          }

          if (partnerAge < 18) {
            toast.error("Bạn đời chưa đủ tuổi. Yêu cầu trên 18 tuổi");
            return;
          }

          const data: ICreateSpouseRequest = {
            primarySpouse: {
              customerId,
              citizenId: selfIdInfo.id,
              fullName: selfIdInfo.name,
              dateOfBirth: moment(selfIdInfo.dob, "DD/MM/YYYY").toISOString(),
            },
            secondarySpouse: {
              citizenId: partnerIdInfo.id,
              fullName: partnerIdInfo.name,
              dateOfBirth: moment(
                partnerIdInfo.dob,
                "DD/MM/YYYY"
              ).toISOString(),
            },
          };

          createSpouseMutation.mutate(data);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    partnerError.notMatch.value,
    partnerFaceMatchMutation.isPending,
    partnerIdInfo,
    selfError.notMatch.value,
    selfFaceMatchMutation.isPending,
    selfIdInfo,
  ]);

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
            {selfError.invalidID.value && (
              <FormHelperText error>{selfError.invalidID.msg}</FormHelperText>
            )}
            {selfError.notMatch.value && (
              <FormHelperText error>{selfError.notMatch.msg}</FormHelperText>
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
            {partnerError.invalidID.value && (
              <FormHelperText error>
                {partnerError.invalidID.msg}
              </FormHelperText>
            )}
            {partnerError.notMatch.value && (
              <FormHelperText error>{partnerError.notMatch.msg}</FormHelperText>
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
        <LoadingButton
          variant="contained"
          sx={primaryBtn}
          fullWidth
          onClick={handleVerify}
          loading={
            selfIdReadMutation.isPending ||
            partnerIdReadMutation.isPending ||
            selfFaceMatchMutation.isPending ||
            partnerFaceMatchMutation.isPending ||
            createSpouseMutation.isPending
          }
        >
          Tiếp Tục
        </LoadingButton>

        {(selfError.notMatch.value || partnerError.notMatch.value) && (
          <LoadingButton
            variant="contained"
            sx={{ ...primaryBtn, mt: 2 }}
            fullWidth
          >
            Yêu Cầu Duyệt
          </LoadingButton>
        )}

        <LoadingButton
          variant="text"
          fullWidth
          sx={{ ...textBtn, mt: 2 }}
          disabled={
            selfIdReadMutation.isPending ||
            partnerIdReadMutation.isPending ||
            selfFaceMatchMutation.isPending ||
            partnerFaceMatchMutation.isPending ||
            createSpouseMutation.isPending
          }
        >
          Liên Hệ
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default VerifyID;
