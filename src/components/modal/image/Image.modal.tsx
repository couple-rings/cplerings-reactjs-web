import Dialog from "@mui/material/Dialog";

function ImageModal(props: IImageModalProps) {
  const { open, setOpen, img } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <img
        src={img}
        width={"100%"}
        style={{ objectFit: "contain", maxHeight: 600 }}
      />
    </Dialog>
  );
}

export default ImageModal;
