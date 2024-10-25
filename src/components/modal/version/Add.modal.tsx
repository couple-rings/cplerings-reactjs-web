import {
  Box,
  Card,
  FormHelperText,
  Grid,
  IconButton,
  SxProps,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { primaryBtn } from "src/utils/styles";
import { useRef, useState } from "react";
import _ from "lodash";

const cardStyle: SxProps = {
  backgroundColor: "#F5F5F5",
  py: 3,
  px: 3,
  my: 2,
  textAlign: "center",
  borderRadius: 5,
  cursor: "pointer",
};

const iconStyle: SxProps = {
  color: "#ccc",
  height: 100,
  width: "100%",
};

const textStyle: SxProps = {
  color: "#888",
  my: 2,
};

const fileInputStyle: SxProps = {
  border: "1px solid #ccc",
  p: 1,
  mb: 2,
  borderRadius: 2,
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const fileName: SxProps = {
  maxWidth: 250,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const fileBtn: SxProps = {
  ...primaryBtn,
  py: 1,
  borderRadius: 2,
  color: "white",
};

const initError = {
  emptyImg: {
    value: false,
    msg: "* Vui lòng upload ảnh",
  },
  emptyPdf: {
    value: false,
    msg: "* Vui lòng upload file thiết kế",
  },
};

function AddModal(props: IModalProps) {
  const { open, setOpen } = props;

  const [img, setImg] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [error, setError] = useState(initError);

  const pdfInputRef = useRef<HTMLInputElement>(null);

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);

      const cloneState = _.cloneDeep(error);
      cloneState.emptyImg.value = false;
      setError(cloneState);
    }
  };

  const onChangePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdf(e.target.files[0]);

      const cloneState = _.cloneDeep(error);
      cloneState.emptyPdf.value = false;
      setError(cloneState);
    }
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  const handleAdd = () => {
    const cloneState = _.cloneDeep(error);

    if (!img) cloneState.emptyImg.value = true;
    if (!pdf) cloneState.emptyPdf.value = true;

    setError(cloneState);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2 },
      }}
    >
      <DialogTitle
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <div>Thêm Bản Thiết Kế</div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container justifyContent={"center"}>
          <Grid item xs={10} sm={6}>
            <label>
              <Card sx={cardStyle}>
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <AddBoxOutlinedIcon sx={iconStyle} />
                )}
                <Box sx={textStyle}>Hình Preview</Box>
              </Card>

              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png"
                onChange={onChangeImg}
              />
            </label>
            {error.emptyImg.value && (
              <FormHelperText error>{error.emptyImg.msg}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={10} my={5}>
            <Box sx={textStyle}>File Thiết Kế: </Box>
            <Box
              sx={fileInputStyle}
              onClick={() => pdfInputRef.current?.click()}
            >
              <Box sx={fileName}>{pdf?.name}</Box>
              <Button sx={fileBtn}>Chọn File</Button>
            </Box>
            <input
              type="file"
              hidden
              accept=".pdf"
              ref={pdfInputRef}
              onChange={onChangePdf}
            />
            {error.emptyPdf.value && (
              <FormHelperText error>{error.emptyPdf.msg}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={10}>
            <Button
              variant="contained"
              sx={{ ...primaryBtn, borderRadius: 2 }}
              fullWidth
              onClick={handleAdd}
            >
              Tạo Mới
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AddModal;
