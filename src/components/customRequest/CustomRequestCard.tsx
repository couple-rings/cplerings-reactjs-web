import { Box, Button, Card, Chip, Divider, Grid } from "@mui/material";
import styles from "./CustomRequestCard.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { secondaryBtn } from "src/utils/styles";
import { CustomRequestStatus, DesignCharacteristic } from "src/utils/enums";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postCreateConversation } from "src/services/conversation.service";
import { toast } from "react-toastify";
import { useAppSelector } from "src/utils/hooks";
import { ChipColor } from "src/utils/constants";

function CustomRequestCard(props: ICustomRequestCardProps) {
  const { designs, status, id, staffId } = props;

  const navigate = useNavigate();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const maleDesign = designs.find(
    (item) => item.characteristic === DesignCharacteristic.Male
  );
  const femaleDesign = designs.find(
    (item) => item.characteristic === DesignCharacteristic.Female
  );

  let statusLabel = "";
  let chipColor: ChipColor = "primary";

  if (status === CustomRequestStatus.Waiting) {
    statusLabel = "Đang chờ duyệt";
    chipColor = "warning";
  }
  if (status === CustomRequestStatus.OnGoing) {
    statusLabel = "Đang thiết kế";
    chipColor = "warning";
  }
  if (status === CustomRequestStatus.Completed) {
    statusLabel = "Đã hoàn thành";
    chipColor = "success";
  }
  if (status === CustomRequestStatus.Canceled) {
    statusLabel = "Đã hủy";
    chipColor = "error";
  }

  const chatMutation = useMutation({
    mutationFn: (data: ICreateConversationRequest) => {
      return postCreateConversation(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        navigate("/customer/support", {
          state: { conversation: response.data },
        });
      }

      if (response.error) {
        toast.error(response.error);
      }
    },
  });

  const handleChat = () => {
    if (staffId)
      chatMutation.mutate({
        participants: [userId, staffId],
      });
  };

  return (
    <Card className={styles.container}>
      <Grid container p={3} justifyContent={"space-between"}>
        <Grid item xs={12} sm={4} md={2.5}>
          <img
            src={maleDesign?.designMetalSpecifications[0].image.url}
            width={"100%"}
            style={{ border: "1px solid #ccc" }}
          />
        </Grid>
        <Grid container item xs={12} md={9} py={3}>
          <Grid item flex={1}>
            <Grid
              container
              className={styles.name}
              justifyContent={"space-between"}
            >
              <div>Bản Thiết Kế {maleDesign?.name}</div>

              <Chip label={statusLabel} color={chipColor} variant="filled" />
            </Grid>
            <div className={styles.gender}>
              <img src={male} width={15} />
              Nhẫn nam
            </div>
            <div className={styles.description}>{maleDesign?.description}</div>
          </Grid>
        </Grid>
      </Grid>

      <Grid container px={3}>
        <Divider sx={{ width: "100%" }} />
      </Grid>

      <Grid container p={3} justifyContent={"space-between"}>
        <Grid item xs={12} sm={4} md={2.5}>
          <img
            src={femaleDesign?.designMetalSpecifications[0].image.url}
            width={"100%"}
            style={{ border: "1px solid #ccc" }}
          />
        </Grid>
        <Grid item xs={12} md={9} pt={3}>
          <div className={styles.name}>Bản Thiết Kế {femaleDesign?.name}</div>
          <div className={styles.gender}>
            <img src={female} width={15} />
            Nhẫn nữ
          </div>
          <div className={styles.description}>{femaleDesign?.description}</div>
          {(status === CustomRequestStatus.OnGoing ||
            status === CustomRequestStatus.Completed) && (
            <Box sx={{ textAlign: "right" }}>
              <Button
                sx={{ ...secondaryBtn, px: 2, mt: 2 }}
                variant="contained"
                onClick={handleChat}
              >
                Chat với nhân viên
              </Button>
              <Button
                sx={{ ...secondaryBtn, px: 2, mt: 2, ml: 2 }}
                variant="contained"
                onClick={() =>
                  navigate(`/customer/support/custom-request/detail/${id}`)
                }
              >
                Xem Chi Tiết
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default CustomRequestCard;
