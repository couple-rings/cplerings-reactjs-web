import styles from "./Index.module.scss";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import { useState } from "react";
import WeddingRings from "./WeddingRing/WeddingRings";
import Jewelry from "./Jewelry/Jewelry";

function ManageDesign() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Manage Design</div>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab
              label="Wedding Rings"
              value="1"
              sx={{ textTransform: "capitalize" }}
            />
            <Tab
              label="Regular Jewelry"
              value="2"
              sx={{ textTransform: "capitalize" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <WeddingRings />
        </TabPanel>
        <TabPanel value="2">
          <Jewelry />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default ManageDesign;
