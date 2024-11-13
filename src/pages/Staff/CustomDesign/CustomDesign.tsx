import {
  Button,
  Divider,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import styles from "./CustomDesign.module.scss";
import menring from "src/assets/sampledata/menring.png";
import womenring from "src/assets/sampledata/womenring.png";
import female from "src/assets/female-icon.png";
import male from "src/assets/male-icon.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { primaryBtn } from "src/utils/styles";
import HoverCard from "src/components/product/HoverCard";
import blueprint from "src/assets/sampledata/blueprint.pdf";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { useState } from "react";
import { DesignCharacteristic } from "src/utils/enums";
import { SubmitHandler, useForm } from "react-hook-form";
import _ from "lodash";

const metalsSpecs = [
  {
    id: 1,
    name: "Gold 18K - Yellow",
  },
  {
    id: 2,
    name: "Gold 18K - White",
  },
  {
    id: 3,
    name: "Gold 18K - Rose",
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
    id: 2,
    name: "Graceful Oval",
    weight: 0.05,
    color: "G",
    clarity: "SI1",
    shape: "OVAL",
    price: 3120000,
  },
  {
    id: 3,
    name: "Dazzling Round",
    weight: 0.15,
    color: "G",
    clarity: "VS2",
    shape: "ROUND",
    price: 3600000,
  },
];

interface IFormInput {
  male: {
    metalWeight: number;
    sideDiamondsCount: number;
  };
  female: {
    metalWeight: number;
    sideDiamondsCount: number;
  };
}

const initError = {
  notSelectedDiamond: false,
  notSelectedMetal: false,
  noDiamondsAdded: false,
  noMetalsAdded: false,
};

function CustomDesign() {
  const [maleSelectedMetal, setMaleSelectedMetal] = useState(0);
  const [maleAddedMetals, setMaleAddedMetals] = useState<number[]>([]);
  const [maleSelectedDiamond, setMaleSelectedDiamond] = useState(0);
  const [maleAddedDiamonds, setMaleAddedDiamonds] = useState<number[]>([]);
  const [maleError, setMaleError] = useState(initError);

  const [femaleSelectedDiamond, setFemaleSelectedDiamond] = useState(0);
  const [femaleAddedDiamonds, setFemaleAddedDiamonds] = useState<number[]>([]);
  const [femaleSelectedMetal, setFemaleSelectedMetal] = useState(0);
  const [femaleAddedMetals, setFemaleAddedMetals] = useState<number[]>([]);
  const [femaleError, setFemaleError] = useState(initError);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onError = () => {
    const maleClone = _.cloneDeep(initError);
    const femaleClone = _.cloneDeep(initError);

    if (maleAddedDiamonds.length === 0) maleClone.noDiamondsAdded = true;
    if (maleAddedMetals.length === 0) maleClone.noMetalsAdded = true;

    if (femaleAddedDiamonds.length === 0) femaleClone.noDiamondsAdded = true;
    if (femaleAddedMetals.length === 0) femaleClone.noMetalsAdded = true;

    setMaleError(maleClone);
    setFemaleError(femaleClone);

    if (
      maleClone.noDiamondsAdded ||
      maleClone.noMetalsAdded ||
      femaleClone.noDiamondsAdded ||
      femaleClone.noMetalsAdded
    )
      return true;
    else return false;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (onError()) return;

    console.log(data);
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
    if (gender === DesignCharacteristic.Male) {
      const list = maleAddedMetals.filter((item) => item !== id);
      setMaleAddedMetals(list);

      if (list.length === 0) {
        setMaleError({
          ...maleError,
          noMetalsAdded: true,
          notSelectedMetal: false,
        });
      }
    }

    if (gender === DesignCharacteristic.Female) {
      const list = femaleAddedMetals.filter((item) => item !== id);
      setFemaleAddedMetals(list);

      if (list.length === 0) {
        setFemaleError({
          ...femaleError,
          noMetalsAdded: true,
          notSelectedMetal: false,
        });
      }
    }
  };

  const handleAddMetal = (id: number, gender: DesignCharacteristic) => {
    if (gender === DesignCharacteristic.Male) {
      if (id === 0) {
        setMaleError({
          ...maleError,
          noMetalsAdded: false,
          notSelectedMetal: true,
        });
        return;
      }
      setMaleAddedMetals([...maleAddedMetals, id]);
      setMaleSelectedMetal(0);
      setMaleError({ ...maleError, noMetalsAdded: false });
    }

    if (gender === DesignCharacteristic.Female) {
      if (id === 0) {
        setFemaleError({
          ...femaleError,
          noMetalsAdded: false,
          notSelectedMetal: true,
        });
        return;
      }
      setFemaleAddedMetals([...femaleAddedMetals, id]);
      setFemaleSelectedMetal(0);
      setFemaleError({ ...femaleError, noMetalsAdded: false });
    }
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
        setMaleError({
          ...maleError,
          noDiamondsAdded: false,
          notSelectedDiamond: true,
        });
        return;
      }
      setMaleAddedDiamonds([...maleAddedDiamonds, id]);
      setMaleSelectedDiamond(0);
      setMaleError({ ...maleError, noDiamondsAdded: false });
    }

    if (gender === DesignCharacteristic.Female) {
      if (id === 0) {
        setFemaleError({
          ...femaleError,
          noDiamondsAdded: false,
          notSelectedDiamond: true,
        });
        return;
      }
      setFemaleAddedDiamonds([...femaleAddedDiamonds, id]);
      setFemaleSelectedDiamond(0);
      setFemaleError({ ...femaleError, noDiamondsAdded: false });
    }
  };

  const handleRemoveDiamond = (id: number, gender: DesignCharacteristic) => {
    if (gender === DesignCharacteristic.Male) {
      const list = maleAddedDiamonds.filter((item) => item !== id);
      setMaleAddedDiamonds(list);
      if (list.length === 0)
        setMaleError({
          ...maleError,
          notSelectedDiamond: false,
          noDiamondsAdded: true,
        });
    }

    if (gender === DesignCharacteristic.Female) {
      const list = femaleAddedDiamonds.filter((item) => item !== id);
      setFemaleAddedDiamonds(list);
      if (list.length === 0)
        setFemaleError({
          ...femaleError,
          notSelectedDiamond: false,
          noDiamondsAdded: true,
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Tạo Thiết Kế</div>

      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          lg={11}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item md={4} className={styles.left}>
            <HoverCard file={blueprint} image={menring} shadow={true} />
            <div className={styles.label}>
              <img src={male} />
              <span>Nhẫn Nam</span>
            </div>
          </Grid>

          <Grid item xs={12} md={7} className={styles.right}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={7} md={5} mb={3}>
                <FormLabel error={!!errors.male?.metalWeight}>
                  Trọng lượng nhẫn:
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  sx={{ borderRadius: 2, mt: 2 }}
                  size="small"
                  type="number"
                  placeholder="Nhập số chỉ"
                  error={!!errors.male?.metalWeight}
                  {...register("male.metalWeight", {
                    required: "* Số chỉ không được bỏ trống",
                    min: { value: 1, message: "* Số chỉ phải lớn hơn 0" },
                    max: { value: 3, message: "* Số chỉ nhỏ hơn hoặc bằng 3" },
                  })}
                />
                {errors.male?.metalWeight && (
                  <FormHelperText error>
                    {errors.male.metalWeight.message}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={7} md={5}>
                <FormLabel error={!!errors.male?.sideDiamondsCount}>
                  Kim cương phụ:
                </FormLabel>
                <OutlinedInput
                  error={!!errors.male?.sideDiamondsCount}
                  fullWidth
                  sx={{ borderRadius: 2, mt: 2 }}
                  size="small"
                  type="number"
                  placeholder="Nhập số lượng"
                  {...register("male.sideDiamondsCount", {
                    required: "* Không được bỏ trống",
                    min: { value: 0, message: "* Lớn hơn hoặc bằng 0" },
                  })}
                />
                {errors.male?.sideDiamondsCount && (
                  <FormHelperText error>
                    {errors.male.sideDiamondsCount.message}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            {/* Male metal spec start */}
            <FormLabel
              error={maleError.notSelectedMetal || maleError.noMetalsAdded}
            >
              Chất liệu:
            </FormLabel>

            <Grid container mb={1} mt={2}>
              <Grid item xs={7} md={5} mr={2}>
                <Select
                  error={maleError.notSelectedMetal || maleError.noMetalsAdded}
                  size="small"
                  sx={{ borderRadius: 2 }}
                  fullWidth
                  value={maleSelectedMetal}
                  onChange={(e) =>
                    handleSelectMetal(
                      +e.target.value,
                      DesignCharacteristic.Male
                    )
                  }
                >
                  <MenuItem disabled value={0}>
                    Chọn chất liệu
                  </MenuItem>
                  {metalsSpecs
                    .filter((item) => !maleAddedMetals.includes(item.id))
                    .map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>

              <IconButton
                onClick={() =>
                  handleAddMetal(maleSelectedMetal, DesignCharacteristic.Male)
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
            {maleError.notSelectedMetal && (
              <FormHelperText error>* Chưa chọn chất liệu</FormHelperText>
            )}
            {maleError.noMetalsAdded && (
              <FormHelperText error>* Vui lòng thêm chất liệu</FormHelperText>
            )}
            <Grid container>
              <List>
                {maleAddedMetals.map((id) => {
                  const spec = metalsSpecs.find((item) => item.id === id);
                  return (
                    <ListItem
                      key={id}
                      secondaryAction={
                        <IconButton
                          onClick={() =>
                            handleRemoveMetal(id, DesignCharacteristic.Male)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <ArrowRightRoundedIcon />
                      </ListItemIcon>
                      <ListItemText sx={{ mr: 5 }} primary={spec?.name} />
                    </ListItem>
                  );
                })}
                {maleAddedMetals.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Chưa thêm chất liệu nào" />
                  </ListItem>
                )}
              </List>
            </Grid>
            {/* Male metal spec end */}

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            {/* Male diamond spec start */}
            <FormLabel
              error={maleError.notSelectedDiamond || maleError.noDiamondsAdded}
            >
              Kim cương:
            </FormLabel>

            <Grid container mb={1} mt={2}>
              <Grid item xs={7} md={5} mr={2}>
                <Select
                  error={
                    maleError.notSelectedDiamond || maleError.noDiamondsAdded
                  }
                  size="small"
                  sx={{ borderRadius: 2 }}
                  fullWidth
                  value={maleSelectedDiamond}
                  onChange={(e) =>
                    handleSelectDiamond(
                      +e.target.value,
                      DesignCharacteristic.Male
                    )
                  }
                >
                  <MenuItem disabled value={0}>
                    Chọn kim cương
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
              </Grid>

              <IconButton
                onClick={() =>
                  handleAddDiamond(
                    maleSelectedDiamond,
                    DesignCharacteristic.Male
                  )
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
            {maleError.notSelectedDiamond && (
              <FormHelperText error>* Chưa chọn kim cương</FormHelperText>
            )}
            {maleError.noDiamondsAdded && (
              <FormHelperText error>* Vui lòng thêm kim cương</FormHelperText>
            )}
            <Grid container>
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
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <ArrowRightRoundedIcon />
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
                    <ListItemText primary="Chưa thêm kim cương nào" />
                  </ListItem>
                )}
              </List>
            </Grid>
          </Grid>
          {/* Male diamond spec end */}

          <Divider sx={{ backgroundColor: "#ccc", my: 4, width: "100%" }} />
        </Grid>

        <Grid
          container
          item
          lg={11}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item md={4} className={styles.left}>
            <HoverCard file={blueprint} image={womenring} shadow={true} />
            <div className={styles.label}>
              <img src={female} />
              <span>Nhẫn Nữ</span>
            </div>
          </Grid>

          <Grid item xs={12} md={7} className={styles.right}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={7} md={5}>
                <FormLabel error={!!errors.female?.metalWeight}>
                  Trọng lượng nhẫn:
                </FormLabel>
                <OutlinedInput
                  error={!!errors.female?.metalWeight}
                  fullWidth
                  sx={{ borderRadius: 2, mt: 2 }}
                  size="small"
                  type="number"
                  placeholder="Nhập số chỉ"
                  {...register("female.metalWeight", {
                    required: "* Số chỉ không được bỏ trống",
                    min: { value: 1, message: "* Số chỉ phải lớn hơn 0" },
                    max: { value: 3, message: "* Số chỉ nhỏ hơn hoặc bằng 3" },
                  })}
                />
                {errors.female?.metalWeight && (
                  <FormHelperText error>
                    {errors.female.metalWeight.message}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={7} md={5}>
                <FormLabel error={!!errors.female?.sideDiamondsCount}>
                  Kim cương phụ:
                </FormLabel>
                <OutlinedInput
                  error={!!errors.female?.sideDiamondsCount}
                  fullWidth
                  sx={{ borderRadius: 2, mt: 2 }}
                  size="small"
                  type="number"
                  placeholder="Nhập số lượng"
                  {...register("female.sideDiamondsCount", {
                    required: "* Không được bỏ trống",
                    min: { value: 0, message: "* Lớn hơn hoặc bằng 0" },
                  })}
                />
                {errors.female?.sideDiamondsCount && (
                  <FormHelperText error>
                    {errors.female.sideDiamondsCount.message}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            {/* Female metal spec start */}
            <FormLabel
              error={femaleError.notSelectedMetal || femaleError.noMetalsAdded}
            >
              Chất liệu:
            </FormLabel>

            <Grid container mb={1} mt={2}>
              <Grid item xs={7} md={5} mr={2}>
                <Select
                  error={
                    femaleError.notSelectedMetal || femaleError.noMetalsAdded
                  }
                  size="small"
                  sx={{ borderRadius: 2 }}
                  fullWidth
                  value={femaleSelectedMetal}
                  onChange={(e) =>
                    handleSelectMetal(
                      +e.target.value,
                      DesignCharacteristic.Female
                    )
                  }
                >
                  <MenuItem hidden value={0}>
                    Chọn chất liệu
                  </MenuItem>
                  {metalsSpecs
                    .filter((item) => !femaleAddedMetals.includes(item.id))
                    .map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>

              <IconButton
                onClick={() =>
                  handleAddMetal(
                    femaleSelectedMetal,
                    DesignCharacteristic.Female
                  )
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
            {femaleError.notSelectedMetal && (
              <FormHelperText error>* Chưa chọn chất liệu</FormHelperText>
            )}
            {femaleError.noMetalsAdded && (
              <FormHelperText error>* Vui lòng thêm chất liệu</FormHelperText>
            )}
            <Grid container>
              <List>
                {femaleAddedMetals.map((id) => {
                  const spec = metalsSpecs.find((item) => item.id === id);
                  return (
                    <ListItem
                      key={id}
                      secondaryAction={
                        <IconButton
                          onClick={() =>
                            handleRemoveMetal(id, DesignCharacteristic.Female)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <ArrowRightRoundedIcon />
                      </ListItemIcon>
                      <ListItemText sx={{ mr: 5 }} primary={spec?.name} />
                    </ListItem>
                  );
                })}
                {femaleAddedMetals.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Chưa thêm chất liệu nào" />
                  </ListItem>
                )}
              </List>
            </Grid>
            {/* Female metal spec end */}

            <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

            {/* Female diamond spec start */}
            <FormLabel
              error={
                femaleError.notSelectedDiamond || femaleError.noDiamondsAdded
              }
            >
              Kim cương:
            </FormLabel>

            <Grid container mb={1} mt={2}>
              <Grid item xs={7} md={5} mr={2}>
                <Select
                  error={
                    femaleError.notSelectedDiamond ||
                    femaleError.noDiamondsAdded
                  }
                  size="small"
                  sx={{ borderRadius: 2 }}
                  fullWidth
                  value={femaleSelectedDiamond}
                  onChange={(e) =>
                    handleSelectDiamond(
                      +e.target.value,
                      DesignCharacteristic.Female
                    )
                  }
                >
                  <MenuItem disabled value={0}>
                    Chọn kim cương
                  </MenuItem>
                  {diamondSpecs
                    .filter((item) => !femaleAddedDiamonds.includes(item.id))
                    .map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.shape} {item.weight} - {item.color} -{" "}
                          {item.clarity}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>

              <IconButton
                onClick={() =>
                  handleAddDiamond(
                    femaleSelectedDiamond,
                    DesignCharacteristic.Female
                  )
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
            {femaleError.notSelectedDiamond && (
              <FormHelperText error>* Chưa chọn kim cương</FormHelperText>
            )}
            {femaleError.noDiamondsAdded && (
              <FormHelperText error>* Vui lòng thêm kim cương</FormHelperText>
            )}
            <Grid container>
              <List>
                {femaleAddedDiamonds.map((id) => {
                  const spec = diamondSpecs.find((item) => item.id === id);
                  return (
                    <ListItem
                      key={id}
                      secondaryAction={
                        <IconButton
                          onClick={() =>
                            handleRemoveDiamond(id, DesignCharacteristic.Female)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <ArrowRightRoundedIcon />
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
                    <ListItemText primary="Chưa thêm kim cương nào" />
                  </ListItem>
                )}
              </List>
            </Grid>
            {/* Female diamond spec end */}
          </Grid>
        </Grid>

        <Grid item xs={6} mt={5}>
          <Button
            variant="contained"
            sx={{ ...primaryBtn, borderRadius: 2 }}
            fullWidth
            onClick={handleSubmit(onSubmit, onError)}
          >
            Tạo Thiết Kế
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomDesign;
