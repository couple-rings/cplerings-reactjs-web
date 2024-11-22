import React, { ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, IconButton, Modal } from "@mui/material";
import styles from "./AddProcessImage.module.scss";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

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
  const { imageSrcs, setImageSrcs, setNoImg, stage } = props;
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
              setNoImg(false);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item className={styles.imageBox} xs={12}>
          {imageSrcs.length > 0 ? (
            <>
              <img
                src={imageSrcs[0]}
                alt="Uploaded preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />

              <div onClick={handleOpen} className={styles.pdf}>
                Xem Hình
              </div>
            </>
          ) : (
            <label
              style={{
                width: "100%",
                cursor: "pointer",
                textAlign: "center",
                padding: "4rem 0",
              }}
            >
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
                  Add Image
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Grid>
              </Grid>
            </label>
          )}
        </Grid>

        {imageSrcs.length > 0 && !stage.completionDate && (
          <Grid container justifyContent={"center"}>
            <IconButton sx={{ mt: 1 }} onClick={() => setImageSrcs([])}>
              <RestartAltRoundedIcon />
            </IconButton>
          </Grid>
        )}
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
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
          ))}
        </Box>
      </Modal>
    </>
  );
}

export default AddProcessImage;
