/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function CustomPrevArrow(props: any) {
  const { onClick } = props;

  return (
    <Button
      color="inherit"
      variant="text"
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "40%",
        left: "-5%",
        minWidth: "40px",
        paddingX: 0,
        zIndex: 2,
      }}
    >
      <ArrowBackIosIcon sx={{ fontSize: "2rem" }} />
    </Button>
  );
}

export default CustomPrevArrow;
