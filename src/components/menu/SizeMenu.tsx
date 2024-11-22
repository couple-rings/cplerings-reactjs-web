import { Button, Menu } from "@mui/material";
import styles from "./SizeMenu.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFingerSize } from "src/services/fingerSize.service";
import { fetchFingerSizes } from "src/utils/querykey";

const filterObj: IFingerSizeFilter = {
  page: 0,
  pageSize: 100,
};

function SizeMenu(props: ISizeMenuProps) {
  const { size, setSize, label, sx, paperStyle } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchFingerSizes, filterObj],

    queryFn: () => {
      return getFingerSize(filterObj);
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (response?.data) {
      response.data.items.sort((a, b) => a.size - b.size);
    }
  }, [response]);

  if (isLoading) return <></>;

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
        <div>
          {label && "Chọn kích thước:"} {size !== 0 && size}
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: paperStyle } }}
      >
        <div className={styles.container}>
          <div className={styles.column}>
            <div className={styles.title}>Kích thước</div>
            {response?.data?.items.map((item) => {
              const selected = item.size === size ? styles.selected : "";
              return (
                <div
                  key={uuidv4()}
                  className={`${styles.item} ${selected}`}
                  onClick={() => {
                    setSize(item.size);
                    handleClose();
                  }}
                >
                  {item.size}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Đường kính (cm)</div>
            {response?.data?.items.map((item) => {
              return (
                <div key={uuidv4()} className={styles.plainItem}>
                  {item.diameter}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Chu vi (cm)</div>
            {response?.data?.items.map((item) => {
              return (
                <div key={uuidv4()} className={styles.plainItem}>
                  {(item.diameter * 3.14).toFixed(1)}
                </div>
              );
            })}
          </div>
        </div>
      </Menu>
    </>
  );
}

export default SizeMenu;
