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
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HoverMenuPurpose } from "src/utils/enums";
import { instanceOfMetalSpec } from "src/utils/functions";

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
  justifyContent: "flex-end",
};

const HoverMenu = (props: IHoverMenuProps) => {
  const { title, lists, purpose, handleFilter } = props;

  const [checked, setChecked] = useState<string[] | number[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [sortValue, setSortValue] = useState("Mặc định");

  const popupState = usePopupState({
    variant: "popper",
  });

  const renderName = (value: string | IMetalSpec) => {
    if (typeof value === "string") return value;
    if (instanceOfMetalSpec(value)) return value.name;

    return value;
  };

  const getValue = (item: string | IMetalSpec) => {
    if (typeof item === "string") return item;
    if (instanceOfMetalSpec(item)) return item.id;

    return item;
  };

  const getCheckedState = (value: string | number) => {
    if (typeof value === "string") {
      return (checked as string[]).includes(value);
    }

    if (typeof value === "number") {
      return (checked as number[]).includes(value);
    }

    return false;
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  const handleToggle = (value: string | number) => () => {
    let currentIndex = 0;
    let newChecked: string[] | number[] = [];

    if (typeof value === "string") {
      currentIndex = (checked as string[]).indexOf(value);
      newChecked = [...(checked as string[])];
    }
    if (typeof value === "number") {
      currentIndex = (checked as number[]).indexOf(value);
      newChecked = [...(checked as number[])];
    }

    if (currentIndex === -1) {
      if (typeof value === "string") {
        (newChecked as string[]).push(value);
      }
      if (typeof value === "number") {
        (newChecked as number[]).push(value);
      }
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckAll = () => {
    setAllChecked(!allChecked);
    if (allChecked) setChecked([]);
    else {
      let all: string[] | number[] = [];

      if (typeof lists[0] === "string") {
        all = lists as string[];
      }

      if (typeof lists[0] === "object") {
        if (instanceOfMetalSpec(lists[0])) {
          all = (lists as IMetalSpec[]).map((item) => item.id);
        }
      }

      setChecked(all);
    }
  };

  useEffect(() => {
    if (handleFilter) {
      if (typeof lists[0] === "object" && instanceOfMetalSpec(lists[0])) {
        if (checked.length === 0 || checked.length === lists.length)
          handleFilter();
        else handleFilter(checked[0] as number);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, lists]);

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
                  <ListItemButton
                    key={index}
                    onClick={handleToggle(getValue(value))}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={getCheckedState(getValue(value))}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={renderName(value)} />
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
                  <MenuItem
                    key={uuidv4()}
                    value={typeof value === "string" ? value : ""}
                  >
                    {typeof value === "string" && value}
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
