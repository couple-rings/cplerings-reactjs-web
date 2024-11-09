import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

function ViewModal(props: IAccountModalProps) {
  const { open, setOpen, email, phone, role, username, status } = props;

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
      <DialogTitle>Account Detail</DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"space-between"} mb={3}>
          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={email}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={username}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent={"space-between"} mb={3}>
          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={phone}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Role"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={role}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container item xs={3}>
          <TextField
            autoFocus
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={status}
            InputProps={{ readOnly: true }}
          />
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
