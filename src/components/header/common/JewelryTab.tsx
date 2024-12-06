import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styles from "./Header.module.scss";
import jewelry from "src/assets/Jewelry.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCollections,
  fetchJewelryCategories,
  fetchMetalSpecs,
} from "src/utils/querykey";
import { getCollections } from "src/services/collection.service";
import { getMetalSpecs } from "src/services/metalSpec.service";
import { getJewelryCategories } from "src/services/jewelryCategory.service";
import { DesignCharacteristic } from "src/utils/enums";

const genders = [
  {
    value: DesignCharacteristic.Male,
    label: "Nam Giới",
  },
  {
    value: DesignCharacteristic.Female,
    label: "Nữ Giới",
  },
];

const generalFilter = {
  page: 0,
  pageSize: 100,
};

function JewelryTab() {
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

  const { data: categoryResponse } = useQuery({
    queryKey: [fetchJewelryCategories, generalFilter],

    queryFn: () => {
      return getJewelryCategories(generalFilter);
    },
  });

  if (
    collectionsResponse?.data &&
    metalResponse?.data &&
    categoryResponse?.data
  )
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
                    navigate("/jewelry", {
                      state: { designCollectionId: item.id },
                    })
                  }
                >
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Loại Trang Sức</div>
            {categoryResponse.data.items.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.item}
                  onClick={() =>
                    navigate("/jewelry", {
                      state: { categoryId: item.id },
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
                    navigate("/jewelry", {
                      state: { metalSpecId: item.id },
                    })
                  }
                >
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className={styles.column}>
            <div className={styles.title}>Giới Tính</div>
            {genders.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() =>
                    navigate("/jewelry", {
                      state: { characteristic: item.value },
                    })
                  }
                >
                  {item.label}
                </div>
              );
            })}
          </div>

          <img src={jewelry} className={styles.coverImg} />
        </div>

        <div
          className={styles.exploreLink}
          onClick={() => navigate("/jewelry")}
        >
          <Container sx={{ mt: 3 }}>Khám Phá Tất Cả Trang Sức &gt;</Container>
        </div>
      </div>
    );
}

export const JewelryTabMobile = () => {
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

  const { data: categoryResponse } = useQuery({
    queryKey: [fetchJewelryCategories, generalFilter],

    queryFn: () => {
      return getJewelryCategories(generalFilter);
    },
  });

  if (
    collectionsResponse?.data &&
    metalResponse?.data &&
    categoryResponse?.data
  )
    return (
      <List>
        <ListItemButton onClick={() => navigate("/jewelry")}>
          <ListItemText primary={"Tất Các Trang Sức >"} />
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
                navigate("/jewelry", {
                  state: { designCollectionId: item.id },
                })
              }
            >
              <ListItemText secondary={item.name} />
            </ListItemButton>
          );
        })}

        <ListItem>
          <ListItemText primary={"Loại Trang Sức"} />
        </ListItem>
        {categoryResponse.data.items.map((item) => {
          return (
            <ListItemButton
              key={item.id}
              sx={{ pl: 5 }}
              onClick={() =>
                navigate("/jewelry", {
                  state: { categoryId: item.id },
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
                navigate("/jewelry", {
                  state: { metalSpecId: item.id },
                })
              }
            >
              <ListItemText secondary={item.name} />
            </ListItemButton>
          );
        })}

        <ListItem>
          <ListItemText primary={"Giới Tính"} />
        </ListItem>
        {genders.map((item, index) => {
          return (
            <ListItemButton
              key={index}
              sx={{ pl: 5 }}
              onClick={() =>
                navigate("/jewelry", {
                  state: { characteristic: item.value },
                })
              }
            >
              <ListItemText secondary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    );
};

export default JewelryTab;
