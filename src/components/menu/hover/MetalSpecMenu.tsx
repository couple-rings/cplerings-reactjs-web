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
import { useQuery } from "@tanstack/react-query";
import { fetchMetalSpecs } from "src/utils/querykey";
import { getMetalSpecs } from "src/services/metalSpec.service";
import { ProductType } from "src/utils/enums";

const paperStyle: SxProps = {
  borderRadius: 0,
  backgroundColor: "#fbfaf9",
  mt: 1,
  boxShadow: "none",
  minWidth: "250px",
  maxHeight: "300px",
  overflowY: "scroll",
};

const generalFilter = {
  page: 0,
  pageSize: 100,
};

const MetalSpecHoverMenu = (props: IMetalSpecHoverMenuProps) => {
  const { setFilterObj, setCoupleFilterObj, metalSpecId, type } = props;

  const [checked, setChecked] = useState<number[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const popupState = usePopupState({
    variant: "popper",
  });

  const { data: response } = useQuery({
    queryKey: [fetchMetalSpecs, generalFilter],

    queryFn: () => {
      return getMetalSpecs(generalFilter);
    },
  });

  const handleToggle = (id: number) => () => {
    const found = checked.find((item) => item === id);
    if (found) {
      setChecked([]);
    } else setChecked([id]);

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
      if (type === ProductType.Jewelry) {
        if (checked.length === 0)
          setFilterObj((current) => ({
            ...current,
            metalSpecId: undefined,
          }));
        else
          setFilterObj((current) => ({
            ...current,
            metalSpecId: checked[0],
          }));
      }
    }

    if (setCoupleFilterObj) {
      if (type === ProductType.Ring) {
        if (checked.length === 0)
          setCoupleFilterObj((current) => ({
            ...current,
            metalSpecificationId: undefined,
          }));
        else
          setCoupleFilterObj((current) => ({
            ...current,
            metalSpecificationId: checked[0],
          }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    if (metalSpecId) setChecked([metalSpecId]);
  }, [metalSpecId]);

  return (
    <div className={styles.container}>
      <div className={styles.title} {...bindHover(popupState)}>
        <span>Chất Liệu</span>
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

            {response?.data?.items.map((value, index) => {
              return (
                <ListItemButton key={index} onClick={handleToggle(value.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(value.id)}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={value.name} />
                </ListItemButton>
              );
            })}
          </List>
        </Paper>
      </Popper>
    </div>
  );
};

export default MetalSpecHoverMenu;
