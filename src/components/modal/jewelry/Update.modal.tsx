import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import {
  AppBar,
  Box,
  Card,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Transition from "src/components/layout/Transistion";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useMemo, useState } from "react";
import { toBase64 } from "src/utils/functions";
import { DesignCharacteristic } from "src/utils/enums";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import LabelImportantRoundedIcon from "@mui/icons-material/LabelImportantRounded";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import _ from "lodash";
import ImageModal from "../image/Image.modal";
import ViewImgChip from "src/components/chip/ViewImgChip";
import UploadImgChip from "src/components/chip/UploadImgChip";

interface IFormInput {
  collectionId: number;
  blueprint: File;
  metalWeight: number;
  sideDiamondsCount: number;
  name: string;
  description: string;
  size: number;
  characteristic: DesignCharacteristic;
}

const initError = {
  // notSelectedDiamond: false,
  notSelectedMetal: false,
  imageMissing: false,
};

function UpdateModal(props: IDesignModalProps) {
  const { open, setOpen, resetSelected, design, collections, metalSpecs } =
    props;

  const [openImg, setOpenImg] = useState(false);

  const [previewImg, setPreviewImg] = useState("");

  // const [selectedDiamond, setSelectedDiamond] = useState(0);
  // const [addedDiamonds, setAddedDiamonds] = useState<number[]>([]);
  const [selectedMetal, setSelectedMetal] = useState(0);
  const [addedMetals, setAddedMetals] = useState<
    { id: number; image: string }[]
  >([]);
  const [error, setError] = useState(initError);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      const {
        name,
        description,
        characteristic,
        designCollection,
        metalWeight,
        sideDiamondsCount,
        size,
      } = design;
      return {
        collectionId: designCollection.id,
        name,
        description,
        metalWeight,
        characteristic,
        sideDiamondsCount,
        size,
      };
    }, [design]),
  });

  const onError = () => {
    const clone = _.cloneDeep(initError);

    addedMetals.forEach((metal) => {
      if (!metal.image) clone.imageMissing = true;
    });

    setError(clone);

    if (clone.imageMissing) return true;
    else return false;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (onError()) return;

    console.log(data);
    if (data.blueprint) console.log(await toBase64(data.blueprint));
  };

  // const handleSelectDiamond = (id: number) => {
  //   if (id !== 0) {
  //     setError({ ...error, notSelectedDiamond: false });
  //     setSelectedDiamond(id);
  //   }
  // };

  // const handleAddDiamond = (id: number) => {
  //   if (id === 0) {
  //     setError({ ...error, notSelectedDiamond: true });
  //     return;
  //   }
  //   setAddedDiamonds([...addedDiamonds, id]);
  //   setSelectedDiamond(0);
  // };

  // const handleRemoveDiamond = (id: number) => {
  //   setAddedDiamonds(addedDiamonds.filter((item) => item !== id));
  // };

  const handleSelectMetal = (id: number) => {
    if (id !== 0) {
      setError({ ...error, notSelectedMetal: false });
      setSelectedMetal(id);
    }
  };

  const handleRemoveMetal = (id: number) => {
    const list = addedMetals.filter((item) => item.id !== id);
    setAddedMetals(list);

    const imageMissing = list.find((metal) => !metal.image);
    if (!imageMissing) setError({ ...error, imageMissing: false });
  };

  const handleAddMetal = (id: number) => {
    if (id === 0) {
      setError({ ...error, notSelectedMetal: true });
      return;
    }
    setAddedMetals([...addedMetals, { id, image: "" }]);
    setSelectedMetal(0);
  };

  const handleUploadMetalImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const image = await toBase64(e.target.files[0]);
      const cloneList = _.cloneDeep(addedMetals);
      cloneList.forEach((metal) => {
        if (metal.id === id) metal.image = image;
      });

      const imageMissing = cloneList.find((item) => !item.image);
      if (!imageMissing) setError({ ...error, imageMissing: false });
      setAddedMetals(cloneList);
    }
  };

  const handleViewImage = (img: string) => {
    setPreviewImg(img);
    setOpenImg(true);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);

    // setSelectedDiamond(0);
    setSelectedMetal(0);
    setError(initError);

    resetSelected && resetSelected();
    reset();
  };

  useEffect(() => {
    const {
      name,
      description,
      characteristic,
      designCollection,
      metalWeight,
      sideDiamondsCount,
      size,
      // designDiamondSpecifications,
      designMetalSpecifications,
    } = design;

    reset({
      collectionId: designCollection.id,
      name,
      description,
      metalWeight,
      characteristic,
      sideDiamondsCount,
      size,
    });

    // const maleAddedDiamonds = designDiamondSpecifications.map(
    //   (item) => item.diamondSpecification.id
    // );
    const maleAddedMetals = designMetalSpecifications.map((item) => {
      return { id: item.metalSpecification.id, image: item.image.url };
    });

    // setAddedDiamonds(maleAddedDiamonds);
    setAddedMetals(maleAddedMetals);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [design]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
      TransitionComponent={Transition}
      fullScreen
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#313131" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Update Design
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Grid container mb={5} justifyContent={"space-between"}>
          <Grid item xs={12} sm={4} mt={3}>
            <InputLabel error={!!errors.collectionId} sx={{ mb: 1 }}>
              Collection
            </InputLabel>
            <Controller
              defaultValue={0}
              name="collectionId"
              rules={{
                required: "* Must select collection",
                min: { value: 1, message: "* Must select collection" },
              }}
              control={control}
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  error={!!errors.collectionId}
                  variant="standard"
                >
                  <MenuItem value={0} disabled>
                    <em>Select collection</em>
                  </MenuItem>
                  {collections.map((item) => {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            {errors.collectionId && (
              <FormHelperText error>
                {errors.collectionId.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={5.5} sm={4} mt={3}>
            <InputLabel error={!!errors.collectionId} sx={{ mb: 1 }}>
              Characteristic
            </InputLabel>
            <Controller
              defaultValue={DesignCharacteristic.Default}
              name="characteristic"
              rules={{
                required: "* Must select characteristic",
              }}
              control={control}
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  error={!!errors.characteristic}
                  variant="standard"
                >
                  <MenuItem value={DesignCharacteristic.Default} disabled>
                    <em>Select characteristic</em>
                  </MenuItem>
                  {[DesignCharacteristic.Male, DesignCharacteristic.Female].map(
                    (item) => {
                      return (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              )}
            />
            {errors.characteristic && (
              <FormHelperText error>
                {errors.characteristic.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={5.5} sm={3} mt={3}>
            <InputLabel error={!!errors.size} sx={{ mb: 1 }}>
              Size
            </InputLabel>
            <TextField
              error={!!errors.size}
              autoFocus
              type="number"
              fullWidth
              variant="standard"
              {...register("size", {
                required: "* Must not be empty",
                min: { value: 1, message: "Must be more than 0" },
              })}
            />
            {errors.size && (
              <FormHelperText error>{errors.size.message}</FormHelperText>
            )}
          </Grid>
        </Grid>

        {/* Design start */}
        <Card sx={{ p: 5, border: "1px solid #ccc" }}>
          {/* General info start */}
          <Grid container item justifyContent={"space-between"}>
            <Grid container item md={4}>
              <FormLabel error={!!errors.blueprint}>Design Blueprint</FormLabel>
              <Link
                href={design.blueprint.url}
                sx={{ textDecoration: "none", ml: 3 }}
              >
                View PDF File
              </Link>
              <Controller
                name="blueprint"
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField
                    sx={{ mt: 1 }}
                    type="file"
                    fullWidth
                    inputProps={{
                      accept: ".pdf",
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.files && e.target.files[0]);
                    }}
                  />
                )}
              />
              {errors.blueprint && (
                <FormHelperText error>
                  {errors.blueprint.message}
                </FormHelperText>
              )}

              <Grid container justifyContent={"space-between"} mt={3}>
                <Grid item xs={5.5}>
                  <TextField
                    error={!!errors.metalWeight}
                    autoFocus
                    label="Metal Weight"
                    type="number"
                    fullWidth
                    variant="standard"
                    inputProps={{
                      step: 0.1,
                    }}
                    {...register("metalWeight", {
                      required: "* Must not be empty",
                      min: { value: 1, message: "Must be more than 0" },
                      max: { value: 3, message: "Must be 3 or less" },
                    })}
                  />
                  {errors.metalWeight && (
                    <FormHelperText error>
                      {errors.metalWeight.message}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={5.5}>
                  <TextField
                    error={!!errors.sideDiamondsCount}
                    autoFocus
                    label="Side Diamond Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                    {...register("sideDiamondsCount", {
                      required: "* Must not be empty",
                      min: { value: 0, message: "Must be 0 or more" },
                    })}
                  />
                  {errors.sideDiamondsCount && (
                    <FormHelperText error>
                      {errors.sideDiamondsCount.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid item xs={12}>
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

                <TextField
                  error={!!errors.description}
                  autoFocus
                  label="Description"
                  type="text"
                  fullWidth
                  multiline
                  rows={6}
                  sx={{ mt: 3 }}
                  variant="standard"
                  {...register("description", {
                    required: "* Description must not be empty",
                  })}
                />
                {errors.description && (
                  <FormHelperText error>
                    {errors.description.message}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* General info end */}

          <Grid container item justifyContent={"space-between"} mt={5}>
            {/* Diamond spec start */}
            {/* <Grid item md={4}>
              <Grid
                container
                item
                xs={12}
                gap={3}
                alignItems={"flex-end"}
                mb={1}
              >
                <FormControl>
                  <FormLabel error={error.notSelectedDiamond}>
                    Diamond Specification
                  </FormLabel>
                  <Select
                    error={error.notSelectedDiamond}
                    fullWidth
                    variant="standard"
                    value={selectedDiamond}
                    onChange={(e) => handleSelectDiamond(+e.target.value)}
                  >
                    <MenuItem value={0} disabled>
                      <em>Select diamond specification</em>
                    </MenuItem>
                    {diamondSpecs
                      .filter((item) => !addedDiamonds.includes(item.id))
                      .map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.shape} {item.weight} - {item.color} -{" "}
                            {item.clarity}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>

                <IconButton onClick={() => handleAddDiamond(selectedDiamond)}>
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
              </Grid>
              {error.notSelectedDiamond && (
                <FormHelperText error>
                  * Must select diamond specification
                </FormHelperText>
              )}

              <Grid item xs={12}>
                <List>
                  {addedDiamonds.map((id) => {
                    const spec = diamondSpecs.find((item) => item.id === id);
                    return (
                      <ListItem
                        key={id}
                        secondaryAction={
                          addedDiamonds.length > 1 && (
                            <IconButton onClick={() => handleRemoveDiamond(id)}>
                              <RemoveSharpIcon />
                            </IconButton>
                          )
                        }
                      >
                        <ListItemIcon>
                          <LabelImportantRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ mr: 5 }}
                          primary={`${spec?.shape} ${spec?.weight} - ${spec?.color} - ${spec?.clarity}`}
                        />
                      </ListItem>
                    );
                  })}
                  {addedDiamonds.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No diamond specification added" />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid> */}
            {/* Diamond spec end */}

            {/* Metal spec start */}
            <Grid item md={7}>
              <Grid
                container
                item
                xs={12}
                gap={3}
                alignItems={"flex-end"}
                mb={1}
              >
                <FormControl>
                  <FormLabel error={error.notSelectedMetal}>
                    Metal Specification
                  </FormLabel>
                  <Select
                    error={error.notSelectedMetal}
                    autoWidth
                    variant="standard"
                    value={selectedMetal}
                    onChange={(e) => handleSelectMetal(+e.target.value)}
                  >
                    <MenuItem value={0} disabled>
                      <em>Select metal specification</em>
                    </MenuItem>
                    {metalSpecs
                      .filter(
                        (item) => !addedMetals.find((i) => i.id === item.id)
                      )
                      .map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>

                <IconButton onClick={() => handleAddMetal(selectedMetal)}>
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
              </Grid>
              {error.notSelectedMetal && (
                <FormHelperText error>
                  * Must select metal specification
                </FormHelperText>
              )}

              <Grid item xs={12}>
                <List>
                  {addedMetals.map((metal) => {
                    const spec = metalSpecs.find(
                      (item) => item.id === metal.id
                    );
                    return (
                      <ListItem
                        key={metal.id}
                        secondaryAction={
                          addedMetals.length > 1 && (
                            <IconButton
                              onClick={() => handleRemoveMetal(metal.id)}
                            >
                              <RemoveSharpIcon />
                            </IconButton>
                          )
                        }
                      >
                        <ListItemIcon>
                          <LabelImportantRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ mr: 5 }}
                          primary={
                            <Box>
                              <span style={{ marginRight: 30 }}>
                                {spec?.name}
                              </span>
                              {metal.image && (
                                <ViewImgChip
                                  image={metal.image}
                                  handleViewImage={handleViewImage}
                                />
                              )}
                              <UploadImgChip
                                metalId={metal.id}
                                gender={DesignCharacteristic.Female}
                                handleUploadMetalImg={handleUploadMetalImg}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })}
                  {addedMetals.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No metal specification added" />
                    </ListItem>
                  )}
                </List>
                {error.imageMissing && (
                  <FormHelperText error>* Must upload image</FormHelperText>
                )}
              </Grid>
            </Grid>
            {/* Metal spec end */}
          </Grid>
        </Card>
        {/* Design end */}
      </Container>
      <Container sx={{ my: 5, py: 5, textAlign: "right" }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" sx={{ ml: 1 }}>
          Confirm
        </Button>
      </Container>

      <ImageModal open={openImg} setOpen={setOpenImg} img={previewImg} />
    </Dialog>
  );
}

export default UpdateModal;
