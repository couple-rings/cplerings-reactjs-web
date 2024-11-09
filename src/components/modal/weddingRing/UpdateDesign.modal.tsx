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
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { DesignCharacteristic } from "src/utils/enums";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import LabelImportantRoundedIcon from "@mui/icons-material/LabelImportantRounded";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import _ from "lodash";
import ImageModal from "../image/Image.modal";
import UploadImgChip from "src/components/chip/UploadImgChip";
import ViewImgChip from "src/components/chip/ViewImgChip";

interface IFormInput {
  collectionId: number;
  male: {
    blueprint: File;
    metalWeight: number;
    sideDiamondsCount: number;
    name: string;
    description: string;
  };
  female: {
    blueprint: File;
    metalWeight: number;
    sideDiamondsCount: number;
    name: string;
    description: string;
  };
}

const collections = [
  {
    id: 1,
    name: "Eternal Bond",
    description: "",
  },

  {
    id: 11,
    name: "Timeless Elegance",
    description: "",
  },
  {
    id: 21,
    name: "Infinity Love",
    description: "",
  },
];

const diamondSpecs = [
  {
    id: 1,
    name: "Pure Heart",
    weight: 0.05,
    color: "D",
    clarity: "VS2",
    shape: "HEART",
    price: 3600000,
  },
  {
    id: 11,
    name: "Delicate Heart",
    weight: 0.1,
    color: "H",
    clarity: "SI1",
    shape: "HEART",
    price: 6000000,
  },
  {
    id: 21,
    name: "Radiant Heart",
    weight: 0.15,
    color: "H",
    clarity: "VS2",
    shape: "HEART",
    price: 9000000,
  },
  {
    id: 31,
    name: "Graceful Oval",
    weight: 0.1,
    color: "G",
    clarity: "SI1",
    shape: "OVAL",
    price: 3120000,
  },
  {
    id: 41,
    name: "Radiant Oval",
    weight: 0.15,
    color: "G",
    clarity: "VS2",
    shape: "OVAL",
    price: 5320000,
  },
  {
    id: 51,
    name: "Brilliant Oval",
    weight: 0.15,
    color: "G",
    clarity: "VS2",
    shape: "OVAL",
    price: 9120000,
  },
  {
    id: 61,
    name: "Elegant Round",
    weight: 0.05,
    color: "E",
    clarity: "VS1",
    shape: "ROUND",
    price: 3360000,
  },
  {
    id: 71,
    name: "Luminous Round",
    weight: 0.1,
    color: "E",
    clarity: "VS1",
    shape: "ROUND",
    price: 6720000,
  },
  {
    id: 81,
    name: "Dazzling Round",
    weight: 0.15,
    color: "G",
    clarity: "VS1",
    shape: "ROUND",
    price: 10080000,
  },
];

const metalsSpecs = [
  { id: 1, name: "Gold 14k - Yellow" },
  { id: 11, name: "Gold 18k - Yellow" },
  { id: 21, name: "Gold 14k - White" },
  { id: 31, name: "Gold 18k - White" },
  { id: 41, name: "Gold 14k - Rose" },
  { id: 51, name: "Gold 18k - Rose" },
];

const initError = {
  notSelectedDiamond: false,
  notSelectedMetal: false,
};

function UpdateDesignModal(props: ICoupleDesignModalProps) {
  const { open, setOpen, designs, resetSelected } = props;

  const [openImg, setOpenImg] = useState(false);

  const [previewImg, setPreviewImg] = useState("");

  const [maleSelectedDiamond, setMaleSelectedDiamond] = useState(0);
  const [maleAddedDiamonds, setMaleAddedDiamonds] = useState<number[]>([]);
  const [maleSelectedMetal, setMaleSelectedMetal] = useState(0);
  const [maleAddedMetals, setMaleAddedMetals] = useState<
    { id: number; image: string }[]
  >([]);
  const [maleError, setMaleError] = useState(initError);

  const [femaleSelectedDiamond, setFemaleSelectedDiamond] = useState(0);
  const [femaleAddedDiamonds, setFemaleAddedDiamonds] = useState<number[]>([]);
  const [femaleSelectedMetal, setFemaleSelectedMetal] = useState(0);
  const [femaleAddedMetals, setFemaleAddedMetals] = useState<
    { id: number; image: string }[]
  >([]);
  const [femaleError, setFemaleError] = useState(initError);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      const maleDesign = designs.find(
        (item) => item.characteristic === DesignCharacteristic.Male
      );
      const femaleDesign = designs.find(
        (item) => item.characteristic === DesignCharacteristic.Female
      );

      return {
        collectionId: maleDesign?.designCollection.id,
        male: {
          name: maleDesign?.name,
          description: maleDesign?.description,
          metalWeight: maleDesign?.metalWeight,
          sideDiamondsCount: maleDesign?.sideDiamondsCount,
        },
        female: {
          name: femaleDesign?.name,
          description: femaleDesign?.description,
          metalWeight: femaleDesign?.metalWeight,
          sideDiamondsCount: femaleDesign?.sideDiamondsCount,
        },
      };
    }, [designs]),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    console.log(await toBase64(data.male.blueprint));
  };

  const handleSelectDiamond = (id: number, gender: DesignCharacteristic) => {
    if (id !== 0) {
      if (gender === DesignCharacteristic.Male) {
        setMaleError({ ...maleError, notSelectedDiamond: false });
        setMaleSelectedDiamond(id);
      }

      if (gender === DesignCharacteristic.Female) {
        setFemaleError({ ...femaleError, notSelectedDiamond: false });
        setFemaleSelectedDiamond(id);
      }
    }
  };

  const handleAddDiamond = (id: number, gender: DesignCharacteristic) => {
    if (gender === DesignCharacteristic.Male) {
      if (id === 0) {
        setMaleError({ ...maleError, notSelectedDiamond: true });
        return;
      }
      setMaleAddedDiamonds([...maleAddedDiamonds, id]);
      setMaleSelectedDiamond(0);
    }

    if (gender === DesignCharacteristic.Female) {
      if (id === 0) {
        setFemaleError({ ...femaleError, notSelectedDiamond: true });
        return;
      }
      setFemaleAddedDiamonds([...femaleAddedDiamonds, id]);
      setFemaleSelectedDiamond(0);
    }
  };

  const handleRemoveDiamond = (id: number, gender: DesignCharacteristic) => {
    if (gender === DesignCharacteristic.Male)
      setMaleAddedDiamonds(maleAddedDiamonds.filter((item) => item !== id));

    if (gender === DesignCharacteristic.Female)
      setFemaleAddedDiamonds(femaleAddedDiamonds.filter((item) => item !== id));
  };

  const handleSelectMetal = (id: number, gender: DesignCharacteristic) => {
    if (id !== 0) {
      if (gender === DesignCharacteristic.Male) {
        setMaleError({ ...maleError, notSelectedMetal: false });
        setMaleSelectedMetal(id);
      }

      if (gender === DesignCharacteristic.Female) {
        setFemaleError({ ...femaleError, notSelectedMetal: false });
        setFemaleSelectedMetal(id);
      }
    }
  };

  const handleRemoveMetal = (id: number, gender: DesignCharacteristic) => {
    if (gender === DesignCharacteristic.Male)
      setMaleAddedMetals(maleAddedMetals.filter((item) => item.id !== id));

    if (gender === DesignCharacteristic.Female)
      setFemaleAddedMetals(femaleAddedMetals.filter((item) => item.id !== id));
  };

  const handleAddMetal = (id: number, gender: DesignCharacteristic) => {
    if (gender === DesignCharacteristic.Male) {
      if (id === 0) {
        setMaleError({ ...maleError, notSelectedMetal: true });
        return;
      }
      setMaleAddedMetals([...maleAddedMetals, { id, image: "" }]);
      setMaleSelectedMetal(0);
    }

    if (gender === DesignCharacteristic.Female) {
      if (id === 0) {
        setFemaleError({ ...femaleError, notSelectedMetal: true });
        return;
      }
      setFemaleAddedMetals([...femaleAddedMetals, { id, image: "" }]);
      setFemaleSelectedMetal(0);
    }
  };

  const handleUploadMetalImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    gender: DesignCharacteristic
  ) => {
    if (e.target.files && e.target.files[0]) {
      const image = await toBase64(e.target.files[0]);

      if (gender === DesignCharacteristic.Male) {
        const cloneList = _.cloneDeep(maleAddedMetals);
        cloneList.forEach((metal) => {
          if (metal.id === id) metal.image = image;
        });

        setMaleAddedMetals(cloneList);
      }

      if (gender === DesignCharacteristic.Female) {
        const cloneList = _.cloneDeep(femaleAddedMetals);
        cloneList.forEach((metal) => {
          if (metal.id === id) metal.image = image;
        });

        setFemaleAddedMetals(cloneList);
      }
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

    setMaleSelectedDiamond(0);
    setMaleSelectedMetal(0);
    setMaleError(initError);

    setFemaleSelectedDiamond(0);
    setFemaleSelectedMetal(0);
    setFemaleError(initError);

    resetSelected && resetSelected();
    reset();
  };

  useEffect(() => {
    const maleDesign = designs.find(
      (item) => item.characteristic === DesignCharacteristic.Male
    );
    const femaleDesign = designs.find(
      (item) => item.characteristic === DesignCharacteristic.Female
    );

    reset({
      collectionId: maleDesign?.designCollection.id,
      male: {
        name: maleDesign?.name,
        description: maleDesign?.description,
        metalWeight: maleDesign?.metalWeight,
        sideDiamondsCount: maleDesign?.sideDiamondsCount,
      },
      female: {
        name: femaleDesign?.name,
        description: femaleDesign?.description,
        metalWeight: femaleDesign?.metalWeight,
        sideDiamondsCount: femaleDesign?.sideDiamondsCount,
      },
    });

    if (maleDesign) {
      const maleAddedDiamonds = maleDesign?.designDiamondSpecifications.map(
        (item) => item.diamondSpecification.id
      );
      const maleAddedMetals = maleDesign.designMetalSpecifications.map(
        (item) => {
          return { id: item.metalSpecification.id, image: item.image.url };
        }
      );

      setMaleAddedDiamonds(maleAddedDiamonds);
      setMaleAddedMetals(maleAddedMetals);
    }

    if (femaleDesign) {
      const femaleAddedDiamonds = femaleDesign?.designDiamondSpecifications.map(
        (item) => item.diamondSpecification.id
      );
      const femaleAddedMetals = femaleDesign.designMetalSpecifications.map(
        (item) => {
          return { id: item.metalSpecification.id, image: item.image.url };
        }
      );

      setFemaleAddedDiamonds(femaleAddedDiamonds);
      setFemaleAddedMetals(femaleAddedMetals);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designs]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
      TransitionComponent={Transition}
      fullScreen
      onSubmit={handleSubmit(onSubmit)}
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
      <Container sx={{ mt: 5 }}>
        <Grid container item xs={12} sm={4} mt={2} mb={5}>
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
            <FormHelperText error>{errors.collectionId.message}</FormHelperText>
          )}
        </Grid>

        {/* Male design start */}
        <Card sx={{ p: 5, border: "1px solid #ccc" }}>
          <Box sx={{ fontSize: "1.2rem", mb: 2 }}>
            <img src={male} width={15} style={{ marginRight: 10 }} />
            Male Design
          </Box>
          {/* Male general info start */}
          <Grid container item justifyContent={"space-between"}>
            <Grid container item md={4}>
              <FormLabel error={!!errors.male?.blueprint}>
                Design Blueprint
              </FormLabel>
              <Link
                href={
                  designs.find(
                    (item) => item.characteristic === DesignCharacteristic.Male
                  )?.blueprint.url
                }
                sx={{ textDecoration: "none", ml: 3 }}
              >
                View PDF File
              </Link>
              <Controller
                name="male.blueprint"
                rules={{ required: "* Must provide blueprint file" }}
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField
                    sx={{ mt: 1 }}
                    type="file"
                    fullWidth
                    inputProps={{
                      accept: ".pdf",
                    }}
                    error={!!errors.male?.blueprint}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.files && e.target.files[0]);
                    }}
                  />
                )}
              />
              {errors.male?.blueprint && (
                <FormHelperText error>
                  {errors.male.blueprint.message}
                </FormHelperText>
              )}

              <Grid container justifyContent={"space-between"} mt={3}>
                <Grid item xs={5.5}>
                  <TextField
                    error={!!errors.male?.metalWeight}
                    autoFocus
                    label="Metal Weight"
                    type="number"
                    fullWidth
                    variant="standard"
                    {...register("male.metalWeight", {
                      required: "* Must not be empty",
                      min: { value: 1, message: "Must be more than 0" },
                      max: { value: 3, message: "Must be 3 or less" },
                    })}
                  />
                  {errors.male?.metalWeight && (
                    <FormHelperText error>
                      {errors.male.metalWeight.message}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={5.5}>
                  <TextField
                    error={!!errors.male?.sideDiamondsCount}
                    autoFocus
                    label="Side Diamond Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                    {...register("male.sideDiamondsCount", {
                      required: "* Must not be empty",
                      min: { value: 0, message: "Must be 0 or more" },
                    })}
                  />
                  {errors.male?.sideDiamondsCount && (
                    <FormHelperText error>
                      {errors.male?.sideDiamondsCount.message}
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
                  error={!!errors.male?.name}
                  {...register("male.name", {
                    required: "* Name must not be empty",
                  })}
                />
                {errors.male?.name && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {errors.male.name.message}
                  </FormHelperText>
                )}

                <TextField
                  error={!!errors.male?.description}
                  autoFocus
                  label="Description"
                  type="text"
                  fullWidth
                  multiline
                  rows={6}
                  sx={{ mt: 3 }}
                  variant="standard"
                  {...register("male.description", {
                    required: "* Description must not be empty",
                  })}
                />
                {errors.male?.description && (
                  <FormHelperText error>
                    {errors.male.description.message}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* Male general info end */}

          <Grid container item justifyContent={"space-between"} mt={5}>
            {/* Male diamond spec start */}
            <Grid item md={4}>
              <Grid
                container
                item
                xs={12}
                gap={3}
                alignItems={"flex-end"}
                mb={1}
              >
                <FormControl>
                  <FormLabel>Diamond Specification</FormLabel>
                  <Select
                    fullWidth
                    variant="standard"
                    value={maleSelectedDiamond}
                    onChange={(e) =>
                      handleSelectDiamond(
                        +e.target.value,
                        DesignCharacteristic.Male
                      )
                    }
                  >
                    <MenuItem value={0} disabled>
                      <em>Select diamond specification</em>
                    </MenuItem>
                    {diamondSpecs
                      .filter((item) => !maleAddedDiamonds.includes(item.id))
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

                <IconButton
                  onClick={() =>
                    handleAddDiamond(
                      maleSelectedDiamond,
                      DesignCharacteristic.Male
                    )
                  }
                >
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
              </Grid>
              {maleError.notSelectedDiamond && (
                <FormHelperText error>
                  * Must select diamond specification
                </FormHelperText>
              )}

              <Grid item xs={12}>
                <List>
                  {maleAddedDiamonds.map((id) => {
                    const spec = diamondSpecs.find((item) => item.id === id);
                    return (
                      <ListItem
                        key={id}
                        secondaryAction={
                          <IconButton
                            onClick={() =>
                              handleRemoveDiamond(id, DesignCharacteristic.Male)
                            }
                          >
                            <RemoveSharpIcon />
                          </IconButton>
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
                  {maleAddedDiamonds.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No diamond specification added" />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            {/* Male diamond spec end */}

            {/* Male metal spec start */}
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
                  <FormLabel>Metal Specification</FormLabel>
                  <Select
                    autoWidth
                    variant="standard"
                    value={maleSelectedMetal}
                    onChange={(e) =>
                      handleSelectMetal(
                        +e.target.value,
                        DesignCharacteristic.Male
                      )
                    }
                  >
                    <MenuItem value={0} disabled>
                      <em>Select metal specification</em>
                    </MenuItem>
                    {metalsSpecs
                      .filter(
                        (item) => !maleAddedMetals.find((i) => i.id === item.id)
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

                <IconButton
                  onClick={() =>
                    handleAddMetal(maleSelectedMetal, DesignCharacteristic.Male)
                  }
                >
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
              </Grid>
              {maleError.notSelectedMetal && (
                <FormHelperText error>
                  * Must select metal specification
                </FormHelperText>
              )}

              <Grid item xs={12}>
                <List>
                  {maleAddedMetals.map((metal) => {
                    const spec = metalsSpecs.find(
                      (item) => item.id === metal.id
                    );
                    return (
                      <ListItem
                        key={metal.id}
                        secondaryAction={
                          <IconButton
                            onClick={() =>
                              handleRemoveMetal(
                                metal.id,
                                DesignCharacteristic.Male
                              )
                            }
                          >
                            <RemoveSharpIcon />
                          </IconButton>
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
                                gender={DesignCharacteristic.Male}
                                handleUploadMetalImg={handleUploadMetalImg}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })}
                  {maleAddedMetals.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No metal specification added" />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            {/* Male metal spec end */}
          </Grid>
        </Card>
        {/* Male design end */}

        {/* Female design start */}
        <Card sx={{ p: 5, border: "1px solid #ccc", mt: 5 }}>
          <Box sx={{ fontSize: "1.2rem", mb: 2 }}>
            <img src={female} width={15} style={{ marginRight: 10 }} />
            Female Design
          </Box>
          {/* Female general info start */}
          <Grid container item justifyContent={"space-between"}>
            <Grid container item md={4}>
              <FormLabel error={!!errors.female?.blueprint}>
                Design Blueprint
              </FormLabel>
              <Link
                href={
                  designs.find(
                    (item) =>
                      item.characteristic === DesignCharacteristic.Female
                  )?.blueprint.url
                }
                sx={{ textDecoration: "none", ml: 3 }}
              >
                View PDF File
              </Link>
              <Controller
                name="female.blueprint"
                rules={{ required: "* Must provide blueprint file" }}
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField
                    sx={{ mt: 1 }}
                    type="file"
                    fullWidth
                    inputProps={{
                      accept: ".pdf",
                    }}
                    error={!!errors.female?.blueprint}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.files && e.target.files[0]);
                    }}
                  />
                )}
              />
              {errors.female?.blueprint && (
                <FormHelperText error>
                  {errors.female.blueprint.message}
                </FormHelperText>
              )}

              <Grid container justifyContent={"space-between"} mt={3}>
                <Grid item xs={5.5}>
                  <TextField
                    error={!!errors.female?.metalWeight}
                    autoFocus
                    label="Metal Weight"
                    type="number"
                    fullWidth
                    variant="standard"
                    {...register("female.metalWeight", {
                      required: "* Must not be empty",
                      min: { value: 1, message: "Must be more than 0" },
                      max: { value: 3, message: "Must be 3 or less" },
                    })}
                  />
                  {errors.female?.metalWeight && (
                    <FormHelperText error>
                      {errors.female.metalWeight.message}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={5.5}>
                  <TextField
                    error={!!errors.female?.sideDiamondsCount}
                    autoFocus
                    label="Side Diamond Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                    {...register("female.sideDiamondsCount", {
                      required: "* Must not be empty",
                      min: { value: 0, message: "Must be 0 or more" },
                    })}
                  />
                  {errors.female?.sideDiamondsCount && (
                    <FormHelperText error>
                      {errors.female?.sideDiamondsCount.message}
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
                  error={!!errors.female?.name}
                  {...register("female.name", {
                    required: "* Name must not be empty",
                  })}
                />
                {errors.female?.name && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {errors.female.name.message}
                  </FormHelperText>
                )}

                <TextField
                  error={!!errors.female?.description}
                  autoFocus
                  label="Description"
                  type="text"
                  fullWidth
                  multiline
                  rows={6}
                  sx={{ mt: 3 }}
                  variant="standard"
                  {...register("female.description", {
                    required: "* Description must not be empty",
                  })}
                />
                {errors.female?.description && (
                  <FormHelperText error>
                    {errors.female.description.message}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* Female general info end */}

          <Grid container item justifyContent={"space-between"} mt={5}>
            {/* Female diamond spec start */}
            <Grid item md={4}>
              <Grid
                container
                item
                xs={12}
                gap={3}
                alignItems={"flex-end"}
                mb={1}
              >
                <FormControl>
                  <FormLabel>Diamond Specification</FormLabel>
                  <Select
                    fullWidth
                    variant="standard"
                    value={femaleSelectedDiamond}
                    onChange={(e) =>
                      handleSelectDiamond(
                        +e.target.value,
                        DesignCharacteristic.Female
                      )
                    }
                  >
                    <MenuItem value={0} disabled>
                      <em>Select diamond specification</em>
                    </MenuItem>
                    {diamondSpecs
                      .filter((item) => !femaleAddedDiamonds.includes(item.id))
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

                <IconButton
                  onClick={() =>
                    handleAddDiamond(
                      femaleSelectedDiamond,
                      DesignCharacteristic.Female
                    )
                  }
                >
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
              </Grid>
              {femaleError.notSelectedDiamond && (
                <FormHelperText error>
                  * Must select diamond specification
                </FormHelperText>
              )}

              <Grid item xs={12}>
                <List>
                  {femaleAddedDiamonds.map((id) => {
                    const spec = diamondSpecs.find((item) => item.id === id);
                    return (
                      <ListItem
                        key={id}
                        secondaryAction={
                          <IconButton
                            onClick={() =>
                              handleRemoveDiamond(
                                id,
                                DesignCharacteristic.Female
                              )
                            }
                          >
                            <RemoveSharpIcon />
                          </IconButton>
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
                  {femaleAddedDiamonds.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No diamond specification added" />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            {/* Female diamond spec end */}

            {/* Female metal spec start */}
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
                  <FormLabel>Metal Specification</FormLabel>
                  <Select
                    autoWidth
                    variant="standard"
                    value={femaleSelectedMetal}
                    onChange={(e) =>
                      handleSelectMetal(
                        +e.target.value,
                        DesignCharacteristic.Female
                      )
                    }
                  >
                    <MenuItem value={0} disabled>
                      <em>Select metal specification</em>
                    </MenuItem>
                    {metalsSpecs
                      .filter(
                        (item) =>
                          !femaleAddedMetals.find((i) => i.id === item.id)
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

                <IconButton
                  onClick={() =>
                    handleAddMetal(
                      femaleSelectedMetal,
                      DesignCharacteristic.Female
                    )
                  }
                >
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
              </Grid>
              {femaleError.notSelectedMetal && (
                <FormHelperText error>
                  * Must select metal specification
                </FormHelperText>
              )}

              <Grid item xs={12}>
                <List>
                  {femaleAddedMetals.map((metal) => {
                    const spec = metalsSpecs.find(
                      (item) => item.id === metal.id
                    );
                    return (
                      <ListItem
                        key={metal.id}
                        secondaryAction={
                          <IconButton
                            onClick={() =>
                              handleRemoveMetal(
                                metal.id,
                                DesignCharacteristic.Female
                              )
                            }
                          >
                            <RemoveSharpIcon />
                          </IconButton>
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
                  {femaleAddedMetals.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No metal specification added" />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            {/* Female metal spec end */}
          </Grid>
        </Card>
        {/* Female design end */}
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

export default UpdateDesignModal;
