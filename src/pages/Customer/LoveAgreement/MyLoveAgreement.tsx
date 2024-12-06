import LoveAgreeMentDetail from "src/components/loveAgreement/LoveAgreementDetail";
import styles from "./MyLoveAgreement.module.scss";
import { Button, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/utils/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAgreements,
  putUpdateAgreement,
} from "src/services/agreement.service";
import { fetchAgreements } from "src/utils/querykey";
import { postUploadFile } from "src/services/file.service";
import { toast } from "react-toastify";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";

function MyLoveAgreement() {
  const [filterObj, setFilterObj] = useState<IAgreementFilter | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { id } = useAppSelector((state) => state.auth.userInfo);

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchAgreements, filterObj],

    queryFn: () => {
      if (filterObj) return getAgreements(filterObj);
    },
    enabled: !!filterObj,
  });

  const uploadMutation = useMutation({
    mutationFn: (base64: string) => {
      return postUploadFile(base64);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const signMutation = useMutation({
    mutationFn: (data: IUpdateAgreementRequest) => {
      return putUpdateAgreement(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Bản cam kết đã được ký thành công.");
        queryClient.invalidateQueries({
          queryKey: [fetchAgreements, filterObj],
        });
      }

      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const handleSignAgreement = async (
    mainSig: string,
    mainName: string,
    partnerSig: string,
    partnerName: string
  ) => {
    const mainResponse = await uploadMutation.mutateAsync(mainSig);
    const partnerResponse = await uploadMutation.mutateAsync(partnerSig);

    if (mainResponse.data && partnerResponse.data && response?.data) {
      return await signMutation.mutateAsync({
        agreementId: response.data.items[0].id,
        mainName,
        mainSignatureId: mainResponse.data.id,
        partnerName,
        partnerSignatureId: partnerResponse.data.id,
      });
    }
  };

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize: 100,
      customerId: id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <Grid container justifyContent={"center"} mt={5}>
        <Grid item xs={5} mb={3}>
          <Skeleton variant="rectangular" width={"100%"} height={700} />
        </Grid>
      </Grid>
    );

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <div className={styles.title}>Chứng Nhận Tình Yêu Đích Thực</div>
      {response?.data && response.data.items.length > 0 ? (
        <LoveAgreeMentDetail
          data={response.data.items[0]}
          handleSignAgreement={handleSignAgreement}
          loading={uploadMutation.isPending || signMutation.isPending}
        />
      ) : (
        <Grid container justifyContent={"center"} mt={5}>
          <Grid item xs={12} textAlign={"center"} mb={10}>
            Bạn chưa có chứng nhận tình yêu
          </Grid>

          <Button
            variant="contained"
            sx={secondaryBtn}
            onClick={() => navigate("/wedding-rings")}
          >
            Mua Nhẫn Cưới
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default MyLoveAgreement;
