import TabContext from "@mui/lab/TabContext";
import ManageTag from "./ManageTag";
import ManageTopic from "./ManageTopic";
import { Box, SxProps, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import { useState } from "react";
import TabPanel from "@mui/lab/TabPanel";

const boxStyle: SxProps = {
  width: "100%",
  py: 4,
  px: 6,
};

function ManageTopicAndTag() {
  const [value, setValue] = useState("topic");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={boxStyle}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
              sx={{ textTransform: "capitalize" }}
              label="Topic"
              value="topic"
            />
            <Tab
              classes={{
                selected: "selectedCustomRequestTab",
              }}
              sx={{ textTransform: "capitalize" }}
              label="Tag"
              value="tag"
            />
          </TabList>
        </Box>
        <TabPanel value="topic" sx={{ px: 0 }}>
          <ManageTopic />
        </TabPanel>
        <TabPanel value="tag" sx={{ px: 0 }}>
          <ManageTag />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default ManageTopicAndTag;
