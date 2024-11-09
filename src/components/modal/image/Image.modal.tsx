import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";

function ImageModal(props: IImageModalProps) {
  const { open, setOpen, img } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <Box>
        <img src={img} width={"100%"} />
      </Box>
    </Dialog>
  );
}

export default ImageModal;
