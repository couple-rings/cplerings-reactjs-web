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

export const secondaryBtn: SxProps = {
  backgroundColor: "#b43620",
  textTransform: "capitalize",
  borderRadius: 0,
  "&: hover": {
    backgroundColor: "#79281a",
  },
  py: 1,
  px: 10,
};

export const iconBtn: SxProps = {
  backgroundColor: "#a7a7a7",
  borderRadius: 0,
  "&: hover": {
    backgroundColor: "#414141",
  },
};

export const outlinedBtn: SxProps = {
  textTransform: "capitalize",
  borderRadius: 0,
  borderColor: "black",
  color: "black",
  "&: hover": {
    backgroundColor: "#b43620",
    borderColor: "#b43620",
    color: "white",
  },
  py: 1,
  px: 10,
};

export const textBtn: SxProps = {
  textTransform: "capitalize",
  color: "#555",
  py: 2,
};
