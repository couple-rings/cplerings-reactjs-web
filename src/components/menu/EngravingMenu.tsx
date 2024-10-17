import {
  Button,
  FormControl,
  FormHelperText,
  Menu,
  OutlinedInput,
  SxProps,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import styles from "./EngravingMeu.module.scss";
import { primaryBtn } from "src/utils/styles";

const paperStyle: SxProps = {
  borderRadius: 0,
  boxShadow: "none",
  px: 3,
  pt: 2,
  backgroundColor: "#f5f5f5",
};

function EngravingMenu(props: IEngravingMenuProps) {
  const { sx, engraving, setEngraving } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        fullWidth
        sx={sx}
      >
        <div>{engraving ? engraving : "None"}</div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: paperStyle } }}
        sx={{ mt: 2 }}
      >
        <div className={styles.container}>
          <FormControl size="small" variant="outlined" fullWidth>
            <div className={styles.title}>Khắc Chữ Miễn Phí</div>

            <div className={styles.input}>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                placeholder="Tối đa 10 ký tự"
                inputProps={{ maxLength: 10 }}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
              />
              <Button variant="contained" sx={{ ...primaryBtn, py: 1 }}>
                Xác Nhận
              </Button>
            </div>

            <FormHelperText>{engraving.length}/10 ký tự</FormHelperText>
          </FormControl>
        </div>
      </Menu>
    </>
  );
}

export default EngravingMenu;
