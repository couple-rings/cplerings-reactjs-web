import { useState } from "react";
import { Button, Card, Grid, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./RequestRefund.module.scss";
import { secondaryBtn, primaryBtn } from "src/utils/styles";

const reasons = [
  "Kích thước không phù hợp",
  "Chất lượng sản phẩm",
  "Không đúng mẫu thiết kế",
  "Khác"
];

function RequestRefund() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderId: "",
    reason: "",
    description: "",
    images: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...Array.from(e.target.files!)]
      }));
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
                value={formData.orderId}
                onChange={(e) => setFormData(prev => ({...prev, orderId: e.target.value}))}
                required
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
                fullWidth
                multiline
                rows={4}
                label="Mô tả chi tiết"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              <div className={styles.imageNote}>
                Vui lòng đính kèm hình ảnh sản phẩm (tối đa 3 ảnh)
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
          >
            Gửi Yêu Cầu
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RequestRefund;
