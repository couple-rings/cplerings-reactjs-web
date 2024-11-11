import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LabelImportantRoundedIcon from "@mui/icons-material/LabelImportantRounded";

function ViewModal(props: IDiscountCampaignModalProps) {
  const { open, setOpen, description, name, discountPercentage, collections } =
    props;

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
      <DialogTitle>Discount Campaign Detail</DialogTitle>
      <DialogContent>
        <Grid container mb={3} justifyContent={"space-between"}>
          <Grid item xs={5.5} mb={3}>
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

          <Grid item xs={5.5} mb={3}>
            <TextField
              autoFocus
              label="Discount Percentage"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={discountPercentage}
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
              rows={4}
              variant="standard"
              defaultValue={description}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item mt={3}>
            <FormLabel>Collections Applied</FormLabel>
            <List>
              {collections.map((item) => {
                return (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      <LabelImportantRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                );
              })}
              {collections.length === 0 && (
                <ListItem>
                  <ListItemText primary="Currently not used for any collections" />
                </ListItem>
              )}
            </List>
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
