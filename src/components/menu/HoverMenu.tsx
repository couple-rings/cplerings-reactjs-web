import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import {
  usePopupState,
  bindHover,
  bindPopper,
} from "material-ui-popup-state/hooks";
import {
  Box,
  Checkbox,
  FormControl,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import styles from "./HoverMenu.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HoverMenuPurpose } from "src/utils/enums";

const paperStyle: SxProps = {
  borderRadius: 0,
  backgroundColor: "#fbfaf9",
  mt: 1,
  boxShadow: "none",
  minWidth: "250px",
  maxHeight: "300px",
  overflowY: "scroll",
};

const boxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
};

const HoverMenu = (props: IHoverMenuProps<string>) => {
  const { title, lists, purpose } = props;

  const [checked, setChecked] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [sortValue, setSortValue] = useState("Mặc định");

  const popupState = usePopupState({
    variant: "popper",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckAll = () => {
    setAllChecked(!allChecked);
    if (allChecked) setChecked([]);
    else setChecked(lists);
  };

  if (purpose === HoverMenuPurpose.Filter)
    return (
      <div className={styles.container}>
        <div className={styles.title} {...bindHover(popupState)}>
          <span>{title}</span>
          {popupState.isOpen ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </div>
        <Popper {...bindPopper(popupState)} placement="bottom-start">
          <Paper sx={paperStyle}>
            <List>
              <ListItemButton key={uuidv4()} onClick={handleCheckAll}>
                <ListItemIcon>
                  <Checkbox edge="start" checked={allChecked} disableRipple />
                </ListItemIcon>
                <ListItemText primary={"Tất Cả"} />
              </ListItemButton>

              {lists.map((value, index) => {
                return (
                  <ListItemButton key={index} onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.includes(value)}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={value} />
                  </ListItemButton>
                );
              })}
            </List>
          </Paper>
        </Popper>
      </div>
    );

  if (purpose === HoverMenuPurpose.Sort)
    return (
      <div className={styles.container}>
        <Box sx={boxStyle}>
          <div className={styles.title} {...bindHover(popupState)}>
            <span>{title}:</span>
          </div>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select disableUnderline value={sortValue} onChange={handleChange}>
              <MenuItem value="Mặc định">Mặc định</MenuItem>
              {lists.map((value) => {
                return (
                  <MenuItem key={uuidv4()} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
    );
};

export default HoverMenu;
