import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

function ViewModal(props: ITopicModalProps) {
  const { open, setOpen, description, name } = props;

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2 },
      }}
      fullWidth
    >
      <DialogTitle>Topic Detail</DialogTitle>
      <DialogContent>
        <Grid container mb={3}>
          <Grid item xs={12} mb={3}>
            <TextField
              autoFocus
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={name}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoFocus
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={6}
              variant="standard"
              defaultValue={description}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewModal;
