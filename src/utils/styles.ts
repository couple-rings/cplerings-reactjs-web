import { SxProps } from "@mui/material";

export const primaryBtn: SxProps = {
  backgroundColor: "black",
  textTransform: "capitalize",
  borderRadius: 0,
  "&: hover": {
    backgroundColor: "#414141",
  },
  padding: 2,
};

export const iconBtn: SxProps = {
  backgroundColor: "#a7a7a7",
  borderRadius: 0,
  "&: hover": {
    backgroundColor: "#414141",
  },
};
