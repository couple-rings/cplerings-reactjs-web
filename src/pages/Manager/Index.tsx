import { Grid } from "@mui/material";
import styles from "./Index.module.scss";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, lineElementClasses } from "@mui/x-charts";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>Financial Dashboard</div>

        <div>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={5.8} className={styles.section}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["group A", "group B", "group C"],
                  },
                ]}
                series={[
                  { data: [4, 3, 5] },
                  { data: [1, 6, 3] },
                  { data: [2, 5, 6] },
                ]}
                height={300}
              />
            </Grid>

            <Grid item xs={5.8} className={styles.section}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["group A", "group B", "group C"],
                  },
                ]}
                series={[
                  { data: [4, 3, 5] },
                  { data: [1, 6, 3] },
                  { data: [2, 5, 6] },
                ]}
                height={300}
              />
            </Grid>

            <Grid item xs={12} className={styles.section} mt={3} p={3}>
              <LineChart
                height={300}
                series={[
                  {
                    data: uData,
                    label: "uv",
                    area: true,
                    stack: "total",
                    showMark: false,
                  },
                  {
                    data: pData,
                    label: "pv",
                    area: true,
                    stack: "total",
                    showMark: false,
                  },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
                sx={{
                  [`& .${lineElementClasses.root}`]: {
                    display: "none",
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Index;
