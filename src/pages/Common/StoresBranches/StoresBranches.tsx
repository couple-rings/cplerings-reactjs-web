import { Breadcrumbs, Grid, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./StoresBranches.module.scss";
import BranchCard from "src/components/branch/BranchCard";
import StoreImage from "src/assets/store.png";

const StoresBranches = () => {
  const navigate = useNavigate();

  const store = [
    {
      coverImg: StoreImage,
      name: "Paris-Carrousel du Louvre",
      adr: "Darry Ring, Carrousel du Louvre, 99 Rue de Rivoli, 75001 Paris",
      contact: "+33 986414300",
    },
    {
      coverImg: StoreImage,
      name: "Hong Kong International Plaza",
      adr: "No.6B Store,International Plaza, No.63 Nathan Road, Tsim Sha Tsui, Kowloon, Hong Kong (H exit, Tsim Sha Tsui metro station)",
      contact: "00852-23677389",
    },
    {
      coverImg: StoreImage,
      name: "Paris-Carrousel du Louvre",
      adr: "Darry Ring, Carrousel du Louvre, 99 Rue de Rivoli, 75001 Paris",
      contact: "021-59100836",
    },
  ];

  return (
    <div className={styles.container}>
      <Grid container item xs={10}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            sx={{ cursor: "pointer" }}
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Trang Chủ
          </Link>
          <Typography sx={{ color: "text.primary" }}>Cửa Hàng</Typography>
        </Breadcrumbs>
      </Grid>
      <div className={styles.title}>
        <h1>Tìm kiếm cửa hàng</h1>
        <p>
          Vui lòng liên hệ với nhóm trực tuyến hoặc các cửa hàng bên dưới nếu có
          bất kỳ thắc mắc nào và chúng tôi rất vui lòng được trợ giúp.
        </p>
      </div>

      <Grid
        container
        item
        xs={10}
        spacing={3}
        justifyContent={"center"}
        className="list"
      >
        {store?.map((item, index) => {
          return (
            <Grid item sm={6} md={4} lg={3.5} key={index}>
              <BranchCard store={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default StoresBranches;
