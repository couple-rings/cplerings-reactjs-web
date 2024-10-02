/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CustomNextArrow(props: any) {
  const { onClick } = props;

  return (
    <Button
      color="inherit"
      variant="text"
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "40%",
        right: "-5%",
        minWidth: "40px",
        paddingX: 0,
      }}
    >
      <ArrowForwardIosIcon sx={{ fontSize: "2rem" }} />
    </Button>
  );
}

export default CustomNextArrow;
