import BlogRow from "src/components/blog/BlogRow";
import styles from "./ManageBlog.module.scss";
import moment from "moment";
import sample from "src/assets/story.jpg";
import { Button, Grid } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import AddModal from "src/components/modal/blog/Add.modal";
import { useEffect, useState } from "react";
import UpdateModal from "src/components/modal/blog/Update.modal";

const data: IBlog[] = [
  {
    id: 1,
    title: "Sứ Mệnh Của Couple Ring",
    createdAt: moment().format("DD/MM/YYYY"),
    summary:
      'Sứ mệnh của Couple Ring là tôn vinh tình yêu đích thực thông qua chính sách độc đáo "một chiếc nhẫn duy nhất trong đời," tượng trưng cho cam kết và sự chân thành vĩnh cửu. Mỗi chiếc nhẫn là lời hứa không thể phá vỡ, biến tình yêu thành biểu tượng trân quý và đầy ý nghĩa.',
    coverImage: sample,
    content: "<p>aaa</p>",
    tag: {
      id: 1,
      name: "",
    },
    topic: {
      id: 1,
      name: "",
      description: "",
    },
  },
  {
    id: 2,
    title: "Sứ Mệnh Của Couple Ring",
    createdAt: moment().format("DD/MM/YYYY"),
    summary:
      'Sứ mệnh của Couple Ring là tôn vinh tình yêu đích thực thông qua chính sách độc đáo "một chiếc nhẫn duy nhất trong đời," tượng trưng cho cam kết và sự chân thành vĩnh cửu. Mỗi chiếc nhẫn là lời hứa không thể phá vỡ, biến tình yêu thành biểu tượng trân quý và đầy ý nghĩa.',
    coverImage: sample,
    content: "<p>aaa</p>",
    tag: {
      id: 1,
      name: "",
    },
    topic: {
      id: 1,
      name: "",
      description: "",
    },
  },
  {
    id: 3,
    title: "Sứ Mệnh Của Couple Ring",
    createdAt: moment().format("DD/MM/YYYY"),
    summary:
      'Sứ mệnh của Couple Ring là tôn vinh tình yêu đích thực thông qua chính sách độc đáo "một chiếc nhẫn duy nhất trong đời," tượng trưng cho cam kết và sự chân thành vĩnh cửu. Mỗi chiếc nhẫn là lời hứa không thể phá vỡ, biến tình yêu thành biểu tượng trân quý và đầy ý nghĩa.',
    coverImage: sample,
    content: "<p>aaa</p>",
    tag: {
      id: 1,
      name: "",
    },
    topic: {
      id: 1,
      name: "",
      description: "",
    },
  },
];

const initSelected: IBlog = {
  id: 0,
  title: "",
  summary: "",
  content: "",
  coverImage: "",
  createdAt: "",
  tag: {
    id: 0,
    name: "",
  },
  topic: {
    id: 0,
    name: "",
    description: "",
  },
};

function ManageBlog() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selected, setSelected] = useState<IBlog>(initSelected);

  const resetSelected = () => {
    setSelected(initSelected);
  };

  const handleClick = (blog: IBlog) => {
    setSelected(blog);
    setOpenUpdate(true);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (root) {
      if (openAdd) {
        root.style.overflowY = "hidden";
      } else root.style.overflowY = "scroll";
    }

    return () => {};
  }, [openAdd]);

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Quản Lý Blog</div>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1, mb: 3 }}
          onClick={() => setOpenAdd(true)}
        >
          Thêm Mới
        </Button>
      </Grid>

      {data.map((item, index) => {
        return <BlogRow blog={item} key={index} handleClick={handleClick} />;
      })}

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        blog={selected}
        resetSelected={resetSelected}
      />
    </div>
  );
}

export default ManageBlog;
