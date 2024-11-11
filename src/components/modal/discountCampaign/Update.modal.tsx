import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import LabelImportantRoundedIcon from "@mui/icons-material/LabelImportantRounded";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

const samples = [
  {
    id: 1,
    name: "Eternal Bond",
    description: "",
  },

  {
    id: 2,
    name: "Timeless Elegance",
    description: "",
  },
  {
    id: 3,
    name: "Infinity Love",
    description: "",
  },
];

interface IFormInput {
  name: string;
  description: string;
  discountPercentage: number;
}

function UpdateModal(props: IDiscountCampaignModalProps) {
  const {
    open,
    setOpen,
    collections,
    description,
    name,
    discountPercentage,
    resetSelected,
  } = props;

  const [selected, setSelected] = useState(0);
  const [addedList, setAddedList] = useState<number[]>([]);
  const [notSelected, setNotSelected] = useState(false);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return {
        name,
        description,
        discountPercentage,
      };
    }, [description, discountPercentage, name]),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(addedList);
  };

  const handleSelect = (id: number) => {
    if (id !== 0) {
      setNotSelected(false);
      setSelected(id);
    }
  };

  const handleAdd = (id: number) => {
    if (id === 0) {
      setNotSelected(true);
      return;
    }
    setAddedList([...addedList, id]);
    setSelected(0);
  };

  const handleRemove = (id: number) => {
    setAddedList(addedList.filter((item) => item !== id));
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    const idArr = collections.map((item) => item.id);

    setSelected(0);
    setNotSelected(false);
    setAddedList(idArr);
    setOpen(false);
    resetSelected && resetSelected();
  };

  useEffect(() => {
    reset({
      name,
      description,
      discountPercentage,
    });

    const idArr = collections.map((item) => item.id);
    setAddedList(idArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, discountPercentage, collections]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { p: 2 },
      }}
      fullWidth
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Update Discount Campaign</DialogTitle>
      <DialogContent>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.name}
              {...register("name", {
                required: "* Name must not be empty",
              })}
            />
            {errors.name && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.name.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={5.5}>
            <TextField
              autoFocus
              label="Discount Percentage"
              type="number"
              fullWidth
              variant="standard"
              error={!!errors.discountPercentage}
              {...register("discountPercentage", {
                required: "* Must not be empty",
                min: { value: 1, message: "* Must be more than 0" },
                max: { value: 15, message: "* Must be 15 or less" },
              })}
            />
            {errors.discountPercentage && (
              <FormHelperText error>
                {errors.discountPercentage.message}
              </FormHelperText>
            )}
          </Grid>
        </Grid>

        <TextField
          error={!!errors.description}
          autoFocus
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 3 }}
          variant="standard"
          {...register("description", {
            required: "* Description must not be empty",
          })}
        />
        {errors.description && (
          <FormHelperText error>{errors.description.message}</FormHelperText>
        )}

        <Grid container mt={3}>
          <Grid item xs={12}>
            <FormLabel>Collections</FormLabel>
            <Grid container gap={3}>
              <Select
                autoWidth
                variant="standard"
                value={selected}
                onChange={(e) => handleSelect(+e.target.value)}
              >
                <MenuItem value={0} disabled>
                  <em>Select collection to apply</em>
                </MenuItem>
                {samples
                  .filter((item) => !addedList.includes(item.id))
                  .map((item) => {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <IconButton onClick={() => handleAdd(selected)}>
                <AddCircleRoundedIcon color="primary" />
              </IconButton>
            </Grid>
            {notSelected && (
              <FormHelperText error>* Must select collection</FormHelperText>
            )}

            <List>
              {addedList.map((id) => {
                const collection = samples.find((item) => item.id === id);
                return (
                  <ListItem
                    key={id}
                    secondaryAction={
                      <IconButton onClick={() => handleRemove(id)}>
                        <RemoveSharpIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <LabelImportantRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={collection?.name} />
                  </ListItem>
                );
              })}
              {addedList.length === 0 && (
                <ListItem>
                  <ListItemText primary="No collection selected" />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateModal;
