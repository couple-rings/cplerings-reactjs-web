import { Chip } from "@mui/material";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";

const ViewImgChip = (props: IViewImgChipProps) => {
  const { handleViewImage, image } = props;

  return (
    <Chip
      icon={<ImageSharpIcon sx={{ fontSize: "1.3rem" }} />}
      label={"View"}
      color="info"
      sx={{ px: 1, mr: 3, cursor: "pointer" }}
      onClick={() => handleViewImage(image)}
    />
  );
};

export default ViewImgChip;
