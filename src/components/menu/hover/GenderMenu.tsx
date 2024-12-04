import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import {
  usePopupState,
  bindHover,
  bindPopper,
} from "material-ui-popup-state/hooks";
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import styles from "src/components/menu/HoverMenu.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DesignCharacteristic } from "src/utils/enums";

const paperStyle: SxProps = {
  borderRadius: 0,
  backgroundColor: "#fbfaf9",
  mt: 1,
  boxShadow: "none",
  minWidth: "250px",
  maxHeight: "300px",
  overflowY: "scroll",
};

const GenderHoverMenu = (props: IGenderSpecHoverMenuProps) => {
  const { characteristic, setFilterObj } = props;

  const [checked, setChecked] = useState<DesignCharacteristic[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const popupState = usePopupState({
    variant: "popper",
  });

  const handleToggle = (gender: DesignCharacteristic) => () => {
    const found = checked.find((item) => item === gender);
    if (found) {
      setChecked([]);
    } else setChecked([gender]);

    setAllChecked(false);
  };

  const handleCheckAll = () => {
    setAllChecked(!allChecked);
    setChecked([]);

    // if (allChecked) setChecked([]);
    // else {
    //     if(response?.data) {
    //         const all = response?.data?.items.map(item => item.id)

    //         setChecked(all);
    //     }
    // }
  };

  useEffect(() => {
    if (setFilterObj) {
      if (checked.length === 0)
        setFilterObj((current) => ({
          ...current,
          characteristic: undefined,
        }));
      else
        setFilterObj((current) => ({
          ...current,
          characteristic: checked[0],
        }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    if (characteristic) setChecked([characteristic]);
  }, [characteristic]);

  return (
    <div className={styles.container}>
      <div className={styles.title} {...bindHover(popupState)}>
        <span>Giới Tính</span>
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

            {[
              { value: DesignCharacteristic.Female, label: "Nữ Giới" },
              { value: DesignCharacteristic.Male, label: "Nam Giới" },
            ].map((item, index) => {
              return (
                <ListItemButton key={index} onClick={handleToggle(item.value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(item.value)}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </List>
        </Paper>
      </Popper>
    </div>
  );
};

export default GenderHoverMenu;
