import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styles from "./Header.module.scss";
import weddingRing from "src/assets/weddingRing.png";
import { useNavigate } from "react-router-dom";
import { fetchCollections, fetchMetalSpecs } from "src/utils/querykey";
import { getCollections } from "src/services/collection.service";
import { useQuery } from "@tanstack/react-query";
import { getMetalSpecs } from "src/services/metalSpec.service";
import { prices } from "src/utils/constants";

const generalFilter = {
  page: 0,
  pageSize: 100,
};

const WeddingRingsTab = () => {
  const navigate = useNavigate();

  const { data: collectionsResponse } = useQuery({
    queryKey: [fetchCollections, generalFilter],

    queryFn: () => {
      return getCollections(generalFilter);
    },
  });

  const { data: metalResponse } = useQuery({
    queryKey: [fetchMetalSpecs, generalFilter],

    queryFn: () => {
      return getMetalSpecs(generalFilter);
    },
  });

  if (collectionsResponse?.data && metalResponse?.data)
    return (
      <div className={styles.tab}>
        <div className={styles.columnsContainer}>
          <div className={styles.column}>
            <div className={styles.title}>Bộ Sưu Tập</div>
            {collectionsResponse.data.items.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.item}
                  onClick={() =>
                    navigate("/wedding-rings", {
                      state: { collectionId: item.id },
                    })
                  }
                >
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Loại Vàng</div>
            {metalResponse.data.items.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.item}
                  onClick={() =>
                    navigate("/wedding-rings", {
                      state: { metalSpecificationId: item.id },
                    })
                  }
                >
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Mức Giá</div>
            {prices.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
                  {item}
                </div>
              );
            })}
          </div>

          <img src={weddingRing} className={styles.coverImg} />
        </div>

        <div
          className={styles.exploreLink}
          onClick={() => navigate("/wedding-rings")}
        >
          <Container sx={{ mt: 3 }}>Tất Cả Mẫu Nhẫn Cưới &gt;</Container>
        </div>
      </div>
    );
};

export const WeddingRingsTabMobile = () => {
  const navigate = useNavigate();

  const { data: collectionsResponse } = useQuery({
    queryKey: [fetchCollections, generalFilter],

    queryFn: () => {
      return getCollections(generalFilter);
    },
  });

  const { data: metalResponse } = useQuery({
    queryKey: [fetchMetalSpecs, generalFilter],

    queryFn: () => {
      return getMetalSpecs(generalFilter);
    },
  });

  if (collectionsResponse?.data && metalResponse?.data)
    return (
      <List>
        <ListItemButton onClick={() => navigate("/wedding-rings")}>
          <ListItemText primary={"Tất Các Mẫu Nhẫn Cưới >"} />
        </ListItemButton>

        <ListItem>
          <ListItemText primary={"Bộ Sưu Tập"} />
        </ListItem>
        {collectionsResponse.data.items.map((item) => {
          return (
            <ListItemButton
              key={item.id}
              sx={{ pl: 5 }}
              onClick={() =>
                navigate("/wedding-rings", {
                  state: { collectionId: item.id },
                })
              }
            >
              <ListItemText secondary={item.name} />
            </ListItemButton>
          );
        })}

        <ListItem>
          <ListItemText primary={"Loại Vàng"} />
        </ListItem>
        {metalResponse.data.items.map((item) => {
          return (
            <ListItemButton
              key={item.id}
              sx={{ pl: 5 }}
              onClick={() =>
                navigate("/wedding-rings", {
                  state: { metalSpecificationId: item.id },
                })
              }
            >
              <ListItemText secondary={item.name} />
            </ListItemButton>
          );
        })}

        <ListItem>
          <ListItemText primary={"Mức Giá"} />
        </ListItem>
        {prices.map((item, index) => {
          return (
            <ListItemButton key={index} sx={{ pl: 5 }}>
              <ListItemText secondary={item} />
            </ListItemButton>
          );
        })}
      </List>
    );
};

export default WeddingRingsTab;
