import { Chip } from "@mui/material";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";

const UploadImgChip = (props: IUploadImgChipProps) => {
  const { handleUploadMetalImg, metalId, gender } = props;

  return (
    <label style={{ cursor: "pointer" }}>
      <Chip
        icon={<ImageSharpIcon sx={{ fontSize: "1.3rem" }} />}
        label={"Upload"}
        color="info"
        sx={{ px: 1 }}
      />
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        hidden
        onChange={(e) => handleUploadMetalImg(e, metalId, gender)}
      />
    </label>
  );
};

export default UploadImgChip;
