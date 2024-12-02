import {
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
  Skeleton,
} from "@mui/material";
import styles from "./CustomDesign.module.scss";
import female from "src/assets/female-icon.png";
import male from "src/assets/male-icon.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { primaryBtn } from "src/utils/styles";
import HoverCard from "src/components/product/HoverCard";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { useEffect, useState } from "react";
import {
  CustomRequestStatus,
  DesignCharacteristic,
  Status,
  VersionOwner,
} from "src/utils/enums";
import { SubmitHandler, useForm } from "react-hook-form";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDesignVersionDetail } from "src/services/designVersion.service";
import {
  fetchCustomDesigns,
  fetchCustomerSpouse,
  fetchCustomRequestDetail,
  fetchDesignVersionDetail,
  fetchDiamondSpecs,
  fetchMetalSpecs,
} from "src/utils/querykey";
import { getDiamondSpecs } from "src/services/diamondSpec.service";
import { getMetalSpecs } from "src/services/metalSpec.service";
import { getCustomRequestDetail } from "src/services/customRequest.service";
import { getCustomerSpouse } from "src/services/spouse.service";
import {
  getCustomDesigns,
  postCreateCustomDesign,
} from "src/services/customDesign.service";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import moment from "moment";

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

const specFilter = {
  page: 0,
  pageSize: 100,
};

const initError = {
  notSelectedDiamond: false,
  notSelectedMetal: false,
  noDiamondsAdded: false,
  noMetalsAdded: false,
};

function CustomDesign() {
  const [designFilterObj, setDesignFilterObj] =
    useState<ICustomDesignFilter | null>(null);

  const [ownerSpouse, setOwnSpouse] = useState<ISpouse | null>(null);
  const [partnerSpouse, setPartnerSpouse] = useState<ISpouse | null>(null);
  const [maleVersion, setMaleVersion] = useState<IDesignVersion | null>(null);
  const [femaleVersion, setFemaleVersion] = useState<IDesignVersion | null>(
    null
  );

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

  const { maleDesignId, femaleDesignId, id } = useParams<{
    maleDesignId: string;
    femaleDesignId: string;
    id: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: designResponse } = useQuery({
    queryKey: [fetchCustomDesigns, designFilterObj],

    queryFn: () => {
      if (designFilterObj) return getCustomDesigns(designFilterObj);
    },
    enabled: !!designFilterObj,
  });

  const { data: response } = useQuery({
    queryKey: [fetchCustomRequestDetail, id],

    queryFn: () => {
      if (id) return getCustomRequestDetail(+id);
    },
    enabled: !!id,
  });

  const { data: spouseResponse } = useQuery({
    queryKey: [fetchCustomerSpouse, response?.data?.customer.id],

    queryFn: () => {
      if (response?.data?.customer.id)
        return getCustomerSpouse(response?.data?.customer.id);
    },
    enabled: !!response?.data?.customer.id,
  });

  const { data: maleVersionResponse } = useQuery({
    queryKey: [fetchDesignVersionDetail, maleDesignId],

    queryFn: () => {
      if (maleDesignId) return getDesignVersionDetail(+maleDesignId);
    },

    enabled: !!maleDesignId,
  });

  const { data: femaleVersionResponse } = useQuery({
    queryKey: [fetchDesignVersionDetail, femaleDesignId],

    queryFn: () => {
      if (femaleDesignId) return getDesignVersionDetail(+femaleDesignId);
    },

    enabled: !!femaleDesignId,
  });

  const { data: diamondSpecResponse } = useQuery({
    queryKey: [fetchDiamondSpecs, specFilter],

    queryFn: () => {
      return getDiamondSpecs(specFilter);
    },
  });

  const { data: metalSpecResponse } = useQuery({
    queryKey: [fetchMetalSpecs, specFilter],

    queryFn: () => {
      return getMetalSpecs(specFilter);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ICreateCustomDesignRequest) => {
      return postCreateCustomDesign(data);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

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

    if (
      spouseResponse?.data &&
      response?.data &&
      maleVersion &&
      femaleVersion
    ) {
      const ownerSpouse = spouseResponse.data.spouses.find(
        (item) => !!item.customerId
      );
      const partnerSpouse = spouseResponse.data.spouses.find(
        (item) => !item.customerId
      );

      if (ownerSpouse && partnerSpouse) {
        const { female, male } = data;

        const maleResponse = await mutation.mutateAsync({
          customerId: response.data.customer.id,
          spouseId:
            maleVersion.owner === VersionOwner.Self
              ? ownerSpouse.id
              : partnerSpouse.id,
          designVersionId: maleVersion.id,
          blueprintId: maleVersion.designFile.id,
          metalWeight: male.metalWeight,
          sideDiamondAmount: male.sideDiamondsCount,
          metalSpecIds: maleAddedMetals,
          diamondSpecIds: maleAddedDiamonds,
        });

        const femaleResponse = await mutation.mutateAsync({
          customerId: response.data.customer.id,
          spouseId:
            femaleVersion.owner === VersionOwner.Self
              ? ownerSpouse.id
              : partnerSpouse.id,
          designVersionId: femaleVersion.id,
          blueprintId: femaleVersion.designFile.id,
          metalWeight: female.metalWeight,
          sideDiamondAmount: female.sideDiamondsCount,
          metalSpecIds: femaleAddedMetals,
          diamondSpecIds: femaleAddedDiamonds,
        });

        if (maleResponse.data && femaleResponse.data) {
          toast.success("Bản thiết kế đã được tạo thành công");
          queryClient.invalidateQueries({
            queryKey: [fetchCustomDesigns, designFilterObj],
          });
        }
      }
    }
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

  useEffect(() => {
    if (response?.data) {
      if (response.data.status !== CustomRequestStatus.OnGoing)
        navigate("not-found");

      setDesignFilterObj({
        page: 0,
        pageSize: 100,
        state: Status.Active,
        customerId: response.data.customer.id,
      });
    }

    if (response && response.errors) {
      navigate("not-found");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (maleVersionResponse?.data) {
      setMaleVersion(maleVersionResponse.data.designVersion);
    }
  }, [maleVersionResponse]);

  useEffect(() => {
    if (femaleVersionResponse?.data) {
      setFemaleVersion(femaleVersionResponse.data.designVersion);
    }
  }, [femaleVersionResponse]);

  useEffect(() => {
    if (spouseResponse?.data) {
      const ownerSpouse = spouseResponse.data.spouses.find(
        (item) => !!item.customerId
      );
      const partnerSpouse = spouseResponse.data.spouses.find(
        (item) => !item.customerId
      );

      if (ownerSpouse && partnerSpouse) {
        setOwnSpouse(ownerSpouse);
        setPartnerSpouse(partnerSpouse);
      }
    }
  }, [spouseResponse]);

  if (
    !response?.data ||
    !maleVersion ||
    !femaleVersion ||
    !diamondSpecResponse ||
    !metalSpecResponse ||
    !designResponse?.data
  )
    return (
      <Grid container justifyContent={"center"}>
        <Grid item lg={11}>
          <Skeleton width={"100%"} height={400} />

          <Skeleton width={"100%"} height={100} />

          <Skeleton width={"100%"} height={400} />
        </Grid>
      </Grid>
    );

  if (designResponse.data?.items.length === 0)
    return (
      <div className={styles.container}>
        <div className={styles.title}>Hoàn Chỉnh Thiết Kế</div>

        <Grid container item xs={6} mb={5}>
          <fieldset style={{ width: "100%" }}>
            <legend>Khách Hàng</legend>
            <Grid container mb={1}>
              <Grid item xs={4}>
                Username:
              </Grid>

              <Grid item>{response.data.customer.username}</Grid>
            </Grid>

            <Grid container mb={1}>
              <Grid item xs={4}>
                Email:
              </Grid>

              <Grid item>{response.data.customer.email}</Grid>
            </Grid>

            <Grid container>
              <Grid item xs={4}>
                Số điện thoại:
              </Grid>

              <Grid item>
                {response.data.customer.phone
                  ? response.data.customer.phone
                  : "--"}
              </Grid>
            </Grid>
          </fieldset>
        </Grid>

        <Grid container justifyContent={"center"}>
          {/* Male custom design */}
          <Grid
            container
            item
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item md={4.5} className={styles.left}>
              <HoverCard
                file={maleVersion?.designFile.url ?? ""}
                image={maleVersion?.image.url ?? ""}
                shadow={true}
              />

              <fieldset>
                <legend>
                  <div className={styles.label}>
                    <img src={male} />
                    <span>Nam Tính</span>
                  </div>
                </legend>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Bản thiết kế:</div>{" "}
                  <div>
                    Version {maleVersion.versionNumber} - Bản{" "}
                    {maleVersion.design.name}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Ngày tạo:</div>{" "}
                  <div>
                    {moment(maleVersion.createdAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Ngày chốt:</div>{" "}
                  <div>
                    {moment(maleVersion.acceptedAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} px={2}>
                  <div>Người sở hữu:</div>

                  <div>
                    {maleVersion.owner === VersionOwner.Self
                      ? ownerSpouse?.fullName
                      : partnerSpouse?.fullName}
                  </div>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12} md={6.5} className={styles.right}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={7} md={5} mb={3}>
                  <FormLabel error={!!errors.male?.metalWeight}>
                    Khối lượng nhẫn:
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
                      max: {
                        value: 3,
                        message: "* Số chỉ nhỏ hơn hoặc bằng 3",
                      },
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
                      min: { value: 1, message: "* Lớn hơn hoặc bằng 1" },
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
                    error={
                      maleError.notSelectedMetal || maleError.noMetalsAdded
                    }
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
                    {metalSpecResponse?.data?.items
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
                    const spec = metalSpecResponse?.data?.items.find(
                      (item) => item.id === id
                    );
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
                error={
                  maleError.notSelectedDiamond || maleError.noDiamondsAdded
                }
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
                    {diamondSpecResponse?.data?.items
                      .filter((item) => !maleAddedDiamonds.includes(item.id))
                      .map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.shape} {item.weight * 100}PT - {item.color} -{" "}
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
                    const spec = diamondSpecResponse?.data?.items.find(
                      (item) => item.id === id
                    );
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
                          primary={
                            spec &&
                            `${spec.shape} ${spec.weight * 100}PT - ${
                              spec.color
                            } - ${spec.clarity}`
                          }
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
          {/* Male custom design */}

          {/* Female custom design */}
          <Grid
            container
            item
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item md={4.5} className={styles.left}>
              <HoverCard
                file={femaleVersion?.designFile.url ?? ""}
                image={femaleVersion?.image.url ?? ""}
                shadow={true}
              />

              <fieldset>
                <legend>
                  <div className={styles.label}>
                    <img src={female} />
                    <span>Nữ Tính</span>
                  </div>
                </legend>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Bản thiết kế:</div>{" "}
                  <div>
                    Version {femaleVersion.versionNumber} - Bản{" "}
                    {femaleVersion.design.name}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Ngày tạo:</div>{" "}
                  <div>
                    {moment(femaleVersion.createdAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Ngày chốt:</div>{" "}
                  <div>
                    {moment(femaleVersion.acceptedAt).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} px={2}>
                  <div>Người sở hữu:</div>

                  <div>
                    {femaleVersion.owner === VersionOwner.Self
                      ? ownerSpouse?.fullName
                      : partnerSpouse?.fullName}
                  </div>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12} md={6.5} className={styles.right}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={7} md={5}>
                  <FormLabel error={!!errors.female?.metalWeight}>
                    Khối lượng nhẫn:
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
                      max: {
                        value: 3,
                        message: "* Số chỉ nhỏ hơn hoặc bằng 3",
                      },
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
                      min: { value: 1, message: "* Lớn hơn hoặc bằng 1" },
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
                error={
                  femaleError.notSelectedMetal || femaleError.noMetalsAdded
                }
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
                    {metalSpecResponse?.data?.items
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
                    const spec = metalSpecResponse?.data?.items.find(
                      (item) => item.id === id
                    );
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
                    {diamondSpecResponse?.data?.items
                      .filter((item) => !femaleAddedDiamonds.includes(item.id))
                      .map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.shape} {item.weight * 100}PT - {item.color} -{" "}
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
                    const spec = diamondSpecResponse?.data?.items.find(
                      (item) => item.id === id
                    );
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
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemIcon>
                          <ArrowRightRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ mr: 5 }}
                          primary={
                            spec &&
                            `${spec.shape} ${spec.weight * 100}PT - ${
                              spec.color
                            } - ${spec.clarity}`
                          }
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
          {/* Female custom design */}

          <Grid item xs={6} mt={10}>
            <LoadingButton
              loading={mutation.isPending}
              variant="contained"
              sx={{ ...primaryBtn, borderRadius: 1 }}
              fullWidth
              onClick={handleSubmit(onSubmit, onError)}
            >
              Tạo Thiết Kế
            </LoadingButton>
          </Grid>
        </Grid>
      </div>
    );
  else if (partnerSpouse && ownerSpouse)
    return (
      <ViewCustomDesign
        customRequestId={response.data.id}
        maleVersion={maleVersion}
        femaleVersion={femaleVersion}
        designs={designResponse.data.items}
        ownerSpouse={ownerSpouse}
        partnerSpouse={partnerSpouse}
      />
    );
  else return <></>;
}

const ViewCustomDesign = (props: IViewCustomDesignProps) => {
  const {
    designs,
    maleVersion,
    femaleVersion,
    customRequestId,
    ownerSpouse,
    partnerSpouse,
  } = props;

  const maleDesign = designs.find(
    (item) =>
      item.designVersion.design.characteristic === DesignCharacteristic.Male
  );

  const femaleDesign = designs.find(
    (item) =>
      item.designVersion.design.characteristic === DesignCharacteristic.Female
  );

  const navigate = useNavigate();

  if (maleDesign && femaleDesign)
    return (
      <div className={styles.container}>
        <div className={styles.title}>Thiết Kế Của Khách Hàng</div>

        <Grid container item xs={6} mb={5}>
          <fieldset style={{ width: "100%" }}>
            <legend>Khách Hàng</legend>
            <Grid container mb={1}>
              <Grid item xs={4}>
                Username:
              </Grid>

              <Grid item>{maleVersion.customer.username}</Grid>
            </Grid>

            <Grid container mb={1}>
              <Grid item xs={4}>
                Email:
              </Grid>

              <Grid item>{maleVersion.customer.email}</Grid>
            </Grid>

            <Grid container>
              <Grid item xs={4}>
                Số điện thoại:
              </Grid>

              <Grid item>
                {maleVersion.customer.phone ? maleVersion.customer.phone : "--"}
              </Grid>
            </Grid>
          </fieldset>
        </Grid>

        <Grid container justifyContent={"center"}>
          {/* Male custom design */}
          <Grid
            container
            item
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item md={4.5} className={styles.left}>
              <HoverCard
                file={maleVersion?.designFile.url ?? ""}
                image={maleVersion?.image.url ?? ""}
                shadow={true}
              />
              <fieldset>
                <legend>
                  <div className={styles.label}>
                    <img src={male} />
                    <span>Nam Tính</span>
                  </div>
                </legend>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Bản thiết kế:</div>{" "}
                  <div>
                    Version {maleVersion.versionNumber} - Bản{" "}
                    {maleVersion.design.name}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Ngày tạo:</div>{" "}
                  <div>
                    {moment(maleVersion.createdAt).format("DD/MM/YYYY")}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} px={2}>
                  <div>Người sở hữu:</div>

                  <div>
                    {maleVersion.owner === VersionOwner.Self
                      ? ownerSpouse.fullName
                      : partnerSpouse.fullName}
                  </div>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12} md={6.5} className={styles.right}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={7} md={5} mb={3}>
                  <FormLabel>Khối lượng nhẫn:</FormLabel>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2, mt: 2 }}
                    size="small"
                    type="number"
                    placeholder="Nhập số chỉ"
                    readOnly
                    value={maleDesign.metalWeight}
                  />
                </Grid>

                <Grid item xs={7} md={5}>
                  <FormLabel>Kim cương phụ:</FormLabel>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2, mt: 2 }}
                    size="small"
                    type="number"
                    placeholder="Nhập số lượng"
                    readOnly
                    value={maleDesign.sideDiamondsCount}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

              {/* Male metal spec start */}
              <FormLabel>Chất liệu:</FormLabel>

              <Grid container>
                <List>
                  {maleDesign.metalSpecifications.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemIcon>
                          <ArrowRightRoundedIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ mr: 5 }} primary={item.name} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              {/* Male metal spec end */}

              <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

              {/* Male diamond spec start */}
              <FormLabel>Kim cương:</FormLabel>

              <Grid container>
                <List>
                  {maleDesign.diamondSpecifications.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemIcon>
                          <ArrowRightRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ mr: 5 }}
                          primary={`${item.shape} ${item.weight * 100}PT - ${
                            item.color
                          } - ${item.clarity}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
            {/* Male diamond spec end */}

            <Divider sx={{ backgroundColor: "#ccc", my: 4, width: "100%" }} />
          </Grid>
          {/* Male custom design */}

          {/* Female custom design */}
          <Grid
            container
            item
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item md={4.5} className={styles.left}>
              <HoverCard
                file={femaleVersion?.designFile.url ?? ""}
                image={femaleVersion?.image.url ?? ""}
                shadow={true}
              />
              <fieldset>
                <legend>
                  <div className={styles.label}>
                    <img src={female} />
                    <span>Nữ Tính</span>
                  </div>
                </legend>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Bản thiết kế:</div>{" "}
                  <div>
                    Version {femaleVersion.versionNumber} - Bản{" "}
                    {femaleVersion.design.name}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} mb={1} px={2}>
                  <div>Ngày tạo:</div>{" "}
                  <div>
                    {moment(femaleVersion.createdAt).format("DD/MM/YYYY")}
                  </div>
                </Grid>

                <Grid container justifyContent={"space-between"} px={2}>
                  <div>Người sở hữu:</div>

                  <div>
                    {femaleVersion.owner === VersionOwner.Self
                      ? ownerSpouse?.fullName
                      : partnerSpouse?.fullName}
                  </div>
                </Grid>
              </fieldset>
            </Grid>

            <Grid item xs={12} md={6.5} className={styles.right}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={7} md={5}>
                  <FormLabel>Khối lượng nhẫn:</FormLabel>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2, mt: 2 }}
                    size="small"
                    type="number"
                    placeholder="Nhập số chỉ"
                    readOnly
                    value={femaleDesign.metalWeight}
                  />
                </Grid>

                <Grid item xs={7} md={5}>
                  <FormLabel>Kim cương phụ:</FormLabel>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2, mt: 2 }}
                    size="small"
                    type="number"
                    placeholder="Nhập số lượng"
                    readOnly
                    value={femaleDesign.sideDiamondsCount}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

              {/* Female metal spec start */}
              <FormLabel>Chất liệu:</FormLabel>

              <Grid container>
                <List>
                  {femaleDesign.metalSpecifications.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemIcon>
                          <ArrowRightRoundedIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ mr: 5 }} primary={item.name} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              {/* Female metal spec end */}

              <Divider sx={{ backgroundColor: "#ccc", my: 4 }} />

              {/* Female diamond spec start */}
              <FormLabel>Kim cương:</FormLabel>

              <Grid container>
                <List>
                  {femaleDesign.diamondSpecifications.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemIcon>
                          <ArrowRightRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ mr: 5 }}
                          primary={`${item.shape} ${item.weight} - ${item.color} - ${item.clarity}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              {/* Female diamond spec end */}
            </Grid>
          </Grid>
          {/* Female custom design */}

          <Grid item xs={6} mt={5}>
            <LoadingButton
              variant="contained"
              sx={{ ...primaryBtn, borderRadius: 2 }}
              fullWidth
              onClick={() =>
                navigate(
                  `/staff/custom-request/${customRequestId}/design-version`
                )
              }
            >
              Quay Lại
            </LoadingButton>
          </Grid>
        </Grid>
      </div>
    );
};

export default CustomDesign;
