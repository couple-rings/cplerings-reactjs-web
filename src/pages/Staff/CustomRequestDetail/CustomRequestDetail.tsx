import { useNavigate, useParams } from "react-router-dom";
import styles from "./CustomRequestDetail.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { roundedPrimaryBtn } from "src/utils/styles";
import HoverCard from "src/components/product/HoverCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCustomerSpouse,
  fetchCustomRequestDetail,
  fetchDesigners,
} from "src/utils/querykey";
import {
  getCustomRequestDetail,
  putUpdateCustomRequest,
} from "src/services/customRequest.service";
import { useEffect, useState } from "react";
import {
  CustomRequestStatus,
  DesignCharacteristic,
  StaffPosition,
} from "src/utils/enums";
import {
  currencyFormatter,
  formatCustomRequestStatus,
  getDiamondSpec,
} from "src/utils/functions";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { toast } from "react-toastify";
import { useAppSelector } from "src/utils/hooks";
import { postCreateConversation } from "src/services/conversation.service";
import CustomExpandIcon from "src/components/icon/CustomExpandIcon";
import moment from "moment";
import { getCustomerSpouse } from "src/services/spouse.service";
import { getDesignStaffs } from "src/services/account.service";

function CustomRequestDetail() {
  const [maleDesign, setMaleDesign] = useState<IDesign | null>(null);
  const [femaleDesign, setFemaleDesign] = useState<IDesign | null>(null);

  const [ownerSpouse, setOwnerSpouse] = useState<ISpouse | null>(null);

  const [selected, setSelected] = useState(0);
  const [designerFilterObj, setDesignerFilterObj] =
    useState<IDesignStaffFilter | null>(null);

  const { id } = useParams<{ id: string }>();
  const {
    id: staffId,
    branchId,
    staffPosition,
  } = useAppSelector((state) => state.auth.userInfo);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: designerResponse } = useQuery({
    queryKey: [fetchDesigners, designerFilterObj],

    queryFn: () => {
      if (designerFilterObj) return getDesignStaffs(designerFilterObj);
    },
    enabled: !!designerFilterObj,
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

  const statusMutation = useMutation({
    mutationFn: (data: IUpdateCRRequest) => {
      return putUpdateCustomRequest(data, +(id as string));
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Đã giao yêu cầu");
        queryClient.invalidateQueries({
          queryKey: [fetchCustomRequestDetail, id],
        });
      }

      if (response.errors) {
        response.errors.forEach((err) => {
          toast.error(err.description);
        });
      }
    },
  });

  const chatMutation = useMutation({
    mutationFn: (data: ICreateConversationRequest) => {
      return postCreateConversation(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        navigate("/staff", { state: { conversation: response.data } });
      }

      if (response.error) {
        toast.error(response.error);
      }
    },
  });

  const handleAccept = () => {
    statusMutation.mutate({
      staffId,
      customRequestStatus: CustomRequestStatus.OnGoing,
    });
  };

  const handleChat = () => {
    if (response?.data?.customer)
      chatMutation.mutate({
        participants: [staffId, response.data.customer.id],
      });
  };

  useEffect(() => {
    if (branchId !== 0) {
      setDesignerFilterObj({
        page: 0,
        pageSize: 100,
        branchId,
      });
    }
  }, [branchId]);

  useEffect(() => {
    if (response && response.data) {
      const maleDesign = response.data.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Male
      );
      const femaleDesign = response.data.designs.find(
        (item) => item.characteristic === DesignCharacteristic.Female
      );

      if (maleDesign && femaleDesign) {
        setMaleDesign(maleDesign);
        setFemaleDesign(femaleDesign);
      }
    }

    if (response && response.errors) {
      navigate("not-found");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (spouseResponse?.data) {
      const ownerSpouse = spouseResponse.data.spouses.find(
        (item) => !!item.customerId
      );
      if (ownerSpouse) setOwnerSpouse(ownerSpouse);
    }
  }, [spouseResponse]);

  if (!maleDesign || !femaleDesign)
    return (
      <Grid container justifyContent={"center"} py={5}>
        <Grid container item xs={10} justifyContent={"center"}>
          <Skeleton
            variant="rectangular"
            width={"50%"}
            height={50}
            sx={{ my: 3 }}
          />
          <Skeleton variant="rectangular" width={"100%"} height={300} />

          <Skeleton
            variant="rectangular"
            width={"50%"}
            height={50}
            sx={{ my: 3 }}
          />
          <Skeleton variant="rectangular" width={"100%"} height={300} />
        </Grid>
      </Grid>
    );

  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>Yêu Cầu Thiết Kế</div>

      <Grid container justifyContent={"center"} mb={5}>
        <Grid container item xs={11} lg={9} mb={5}>
          <Grid container item xs={5.7}>
            <Grid container>
              <Grid item xs={5}>
                Ngày Tạo:
              </Grid>
              <FormLabel>
                {moment(response?.data?.createdAt).format("DD/MM/YYYY HH:mm")}
              </FormLabel>
            </Grid>

            <Grid container mt={2}>
              <Grid item xs={5}>
                Ngày Cập Nhật:
              </Grid>
              <FormLabel>
                {moment(
                  response?.data?.customRequestHistories.find(
                    (item) => item.status === response.data?.status
                  )?.createdAt
                ).format("DD/MM/YYYY HH:mm")}
              </FormLabel>
            </Grid>
          </Grid>

          <Grid container item xs={5.7}>
            <Grid container>
              <Grid item xs={5}>
                Tiền Thanh Toán:
              </Grid>
              <FormLabel>
                {response?.data &&
                  currencyFormatter(response.data.designFee.amount)}
              </FormLabel>
            </Grid>

            <Grid container alignItems={"center"} mt={2}>
              <Grid item xs={5}>
                Trạng Thái:
              </Grid>
              <Grid item>
                <Chip
                  label={
                    formatCustomRequestStatus(
                      response?.data?.status as CustomRequestStatus
                    ).text
                  }
                  color={
                    formatCustomRequestStatus(
                      response?.data?.status as CustomRequestStatus
                    ).color
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={11} lg={9} className={styles.customer}>
          <fieldset style={{ width: "100%", padding: "1rem" }}>
            <legend className={styles.title}>Khách Hàng</legend>
            <Grid container mb={1}>
              <Grid item xs={3}>
                Họ Tên:
              </Grid>
              <Grid item sx={{ textTransform: "capitalize" }}>
                {ownerSpouse?.fullName.toLowerCase()}
              </Grid>
            </Grid>

            <Grid container mb={1}>
              <Grid item xs={3}>
                Tên tài khoản:
              </Grid>
              <Grid item>{response?.data?.customer.username}</Grid>
            </Grid>

            <Grid container mb={1}>
              <Grid item xs={3}>
                Email:
              </Grid>
              <Grid item>{response?.data?.customer.email}</Grid>
            </Grid>

            <Grid container>
              <Grid item xs={3}>
                Số điện thoại:
              </Grid>
              <Grid item>{response?.data?.customer.phone ?? "--"}</Grid>
            </Grid>
          </fieldset>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid container item xs={11} lg={9}>
          <div className={styles.title}>Thiết Kế Gốc</div>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        <Grid
          container
          item
          xs={11}
          lg={9}
          py={6}
          className={styles.sectionContainer}
        >
          <Grid container item xs={5.8} className={styles.section}>
            <div className={styles.title}>Bản Thiết Kế {maleDesign.name}</div>
            <Grid item xs={9}>
              <HoverCard
                shadow={true}
                file={maleDesign.blueprint.url}
                image={maleDesign.designMetalSpecifications[0].image.url}
              />
            </Grid>

            <Grid item xs={12} md={9} className={styles.info}>
              <div className={styles.gender}>
                <img src={male} />
                <span>Nam Tính</span>
              </div>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Chất Liệu</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {maleDesign.designMetalSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span>{item.metalSpecification.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Kim Cương</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {maleDesign.designDiamondSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span style={{ marginRight: 8 }}>
                              {item.diamondSpecification.shape}
                            </span>
                            {getDiamondSpec(item.diamondSpecification)}
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Khối Lượng:
                </Grid>
                <div className={styles.item}>{maleDesign.metalWeight} Chỉ</div>
              </Grid>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Kim Cương Phụ:
                </Grid>
                <div className={styles.item}>
                  {maleDesign.sideDiamondsCount} Viên
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={5.8} className={styles.section}>
            <div className={styles.title}>Bản Thiết Kế {femaleDesign.name}</div>
            <Grid item xs={9}>
              <HoverCard
                shadow={true}
                file={femaleDesign.blueprint.url}
                image={femaleDesign.designMetalSpecifications[0].image.url}
              />
            </Grid>

            <Grid item xs={12} md={9} className={styles.info}>
              <div className={styles.gender}>
                <img src={female} />
                <span>Nữ Tính</span>
              </div>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Chất Liệu</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {femaleDesign.designMetalSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span>{item.metalSpecification.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  sx={{ p: 0, pt: 1 }}
                  expandIcon={<CustomExpandIcon />}
                >
                  <div>Kim Cương</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div>
                      {femaleDesign.designDiamondSpecifications.map((item) => {
                        return (
                          <div key={item.id} className={styles.item}>
                            <ArrowRightRoundedIcon />{" "}
                            <span style={{ marginRight: 8 }}>
                              {item.diamondSpecification.shape}
                            </span>
                            {getDiamondSpec(item.diamondSpecification)}
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Khối Lượng:
                </Grid>
                <div className={styles.item}>
                  {femaleDesign.metalWeight} Chỉ
                </div>
              </Grid>

              <Divider />
              <Grid container justifyContent={"space-between"}>
                <Grid item py={2} className={styles.label}>
                  Kim Cương Phụ:
                </Grid>
                <div className={styles.item}>
                  {femaleDesign.sideDiamondsCount} Viên
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent={"center"} mt={5}>
            <Grid
              container
              item
              xs={8}
              md={6}
              gap={3}
              justifyContent={"center"}
            >
              {response?.data?.status === CustomRequestStatus.OnGoing && (
                <Grid item>
                  <LoadingButton
                    loading={chatMutation.isPending}
                    variant="contained"
                    fullWidth
                    sx={roundedPrimaryBtn}
                    onClick={handleChat}
                  >
                    Chat Với Khách Hàng
                  </LoadingButton>
                </Grid>
              )}

              {response?.data?.status !== CustomRequestStatus.Waiting && (
                <Grid item>
                  <LoadingButton
                    disabled={chatMutation.isPending}
                    variant="contained"
                    fullWidth
                    sx={{ ...roundedPrimaryBtn, px: 3 }}
                    onClick={() =>
                      navigate(`/staff/custom-request/${id}/design-version`)
                    }
                  >
                    Quá Trình Thiết Kế
                  </LoadingButton>
                </Grid>
              )}
            </Grid>

            {response?.data?.status === CustomRequestStatus.Waiting &&
              staffPosition === StaffPosition.Sales && (
                <Grid container justifyContent={"center"} gap={3}>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      value={selected}
                      onChange={(e) => setSelected(+e.target.value)}
                    >
                      <MenuItem value={0} disabled>
                        <em>Chọn nhân viên thiết kế</em>
                      </MenuItem>
                      {designerResponse?.data?.items.map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.username} - Đang nhận{" "}
                            {item.numberOfHandledCustomRequest} yêu cầu
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>

                  <Grid item>
                    <LoadingButton
                      loading={statusMutation.isPending}
                      variant="contained"
                      fullWidth
                      sx={{ ...roundedPrimaryBtn, px: 3 }}
                      onClick={handleAccept}
                    >
                      Giao Yêu Cầu
                    </LoadingButton>
                  </Grid>
                </Grid>
              )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomRequestDetail;
