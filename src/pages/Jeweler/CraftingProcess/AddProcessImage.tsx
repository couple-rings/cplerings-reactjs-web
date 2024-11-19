import React, { ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Modal } from "@mui/material";
import styles from "./AddProcessImage.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  display: "grid",
  gap: "10px",
  gridTemplateColumns: "repeat(4, 1fr)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,

  overflow: "scroll",
};

function AddProcessImage(props: IImageProcessProps) {
  const { imageSrcs, setImageSrcs } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImageSrcs: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newImageSrcs.push(reader.result as string);
            // Use a closure to update the state after all files are processed
            if (newImageSrcs.length === files.length) {
              setImageSrcs([...imageSrcs, ...newImageSrcs]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item className={styles.imageBox}>
          {imageSrcs.length > 0 ? (
            <>
              <img
                src={imageSrcs[0]}
                alt="Uploaded preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div onClick={handleOpen} className={styles.pdf}>
                Xem Hình
              </div>
            </>
          ) : (
            <Grid
              container
              justifyContent={"center"}
              direction={"column"}
              alignItems={"center"}
            >
              <Grid item>
                <AddIcon
                  sx={{ fontSize: "80px", color: "gray", margin: "0" }}
                />
              </Grid>
              <Grid item className={styles.content}>
                <label
                  style={{
                    cursor: "pointer",
                    display: "block",
                    textAlign: "center",
                  }}
                  htmlFor="fileInputxx"
                >
                  Add Image
                </label>
                <input
                  type="file"
                  id="fileInputxx"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {imageSrcs.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Pictures"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default AddProcessImage;
