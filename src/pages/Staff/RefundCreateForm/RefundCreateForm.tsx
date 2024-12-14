import { Grid } from "@mui/material";
import styles from "./RefundCreateForm.module.scss";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StandardOrderTab from "./StandardOrderTab";
import CustomOrderTab from "./CustomOrderTab";

function RefundCreateForm() {
  const [value, setValue] = useState("standard");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container className={styles.container}>
      <Grid container item xs={11}>
        <Grid container className={styles.title}>
          Hoàn Trả Hàng
        </Grid>

        <Grid container>
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
            >
              <TabList
                classes={{
                  indicator: "myIndicator",
                }}
                onChange={handleChange}
              >
                <Tab
                  classes={{
                    selected: "selectedCustomRequestTab",
                  }}
                  className={styles.tabLabel}
                  label="Đơn Mua Trang Sức"
                  value="standard"
                />
                <Tab
                  classes={{
                    selected: "selectedCustomRequestTab",
                  }}
                  className={styles.tabLabel}
                  label="Đơn Gia Công Nhẫn"
                  value="custom"
                />
              </TabList>
            </Box>

            <TabPanel value="standard" sx={{ px: 0, width: "100%" }}>
              <StandardOrderTab />
            </TabPanel>
            <TabPanel value="custom" sx={{ px: 0, width: "100%" }}>
              <CustomOrderTab />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RefundCreateForm;
