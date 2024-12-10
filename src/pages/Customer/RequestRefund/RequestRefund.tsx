import { useState } from "react";
import { Button, Card, Grid, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./RequestRefund.module.scss";
import { secondaryBtn, primaryBtn } from "src/utils/styles";
import { postRefundRequest } from "src/services/refund.service";
import { PaymentMethod } from "src/utils/enums";
import { toast } from "react-toastify";

const reasons = [
  "Kích thước không phù hợp",
  "Chất lượng sản phẩm",
  "Không đúng mẫu thiết kế",
  "Khác"
];

function RequestRefund() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customOrderId: 0,
    staffId: 0,
    reason: "",
    proofImageId: 0,
    method: PaymentMethod.Cash
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await postRefundRequest(formData.customOrderId, formData);
      if (response.data) {
        toast.success("Gửi yêu cầu hoàn trả thành công!");
        navigate('/customer/refund');
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi yêu cầu hoàn trả!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Yêu Cầu Hoàn Trả</div>

      <form onSubmit={handleSubmit}>
        <Card className={styles.formCard}>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mã đơn hàng"
                value={formData.customOrderId}
                onChange={(e) => setFormData(prev => ({...prev, customOrderId: Number(e.target.value)}))}
                required
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Lý do hoàn trả"
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({...prev, reason: e.target.value}))}
                required
              >
                {reasons.map((reason) => (
                  <MenuItem key={reason} value={reason}>
                    {reason}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Phương thức hoàn tiền"
                value={formData.method}
                onChange={(e) => setFormData(prev => ({...prev, method: e.target.value as PaymentMethod}))}
                required
              >
                {Object.values(PaymentMethod).map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData(prev => ({...prev, proofImageId: 1}));
                  }
                }}
                className={styles.fileInput}
                required
              />
              <div className={styles.imageNote}>
                Vui lòng đính kèm hình ảnh chứng minh
              </div>
            </Grid>
          </Grid>
        </Card>

        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            sx={secondaryBtn}
            onClick={() => navigate('/customer/refund')}
          >
            Quay Lại
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={primaryBtn}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Gửi Yêu Cầu"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RequestRefund;
