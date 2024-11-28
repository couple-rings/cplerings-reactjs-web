import { useState } from "react";
import { Button, Card, Grid, TextField, Divider, Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./RefundCreateForm.module.scss";
import { secondaryBtn, primaryBtn } from "src/utils/styles";
import { currencyFormatter } from "src/utils/functions";

interface Ring {
  material: string;
  size: string;
  diamond: string;
}

interface Order {
  id: number;
  collection: string;
  price: number;
  orderDate: string;
  rings: {
    male: Ring;
    female: Ring;
  };
}

interface CustomerData {
  name: string;
  address: string;
  orders: Order[];
}

interface CustomerOrders {
  [key: string]: CustomerData;
}

const mockCustomerOrders: CustomerOrders = {
  "0123456789": {
    name: "Nguyễn Văn A",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    orders: [
      {
        id: 1,
        collection: "Bộ Sưu Tập FOREVER",
        price: 24000000,
        orderDate: "01/03/2024",
        rings: {
          male: {
            material: "Vàng Trắng 18K",
            size: "15",
            diamond: "5PT, F, SI1"
          },
          female: {
            material: "Vàng Trắng 18K",
            size: "10",
            diamond: "5PT, F, SI1"
          }
        }
      }
    ]
  }
};

function RefundCreateForm() {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    phone: "",
    name: "",
    address: ""
  });
  const [customerOrders, setCustomerOrders] = useState<Order[] | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [reason, setReason] = useState("");

  const handleCustomerInfoChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'phone' && value.length >= 10) {
      const customerData = mockCustomerOrders[value];
      if (customerData) {
        setCustomerInfo(prev => ({
          ...prev,
          name: customerData.name,
          address: customerData.address
        }));
        setCustomerOrders(customerData.orders);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedOrderId || !reason) {
      alert("Vui lòng chọn bộ sưu tập và nhập lý do hoàn trả");
      return;
    }

    console.log({
      customerInfo,
      selectedOrder: customerOrders?.find(order => order.id === selectedOrderId),
      reason
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Tạo Đơn Hoàn Trả</div>

      <Card className={styles.formCard}>
        <Grid container spacing={3} p={3}>
          <Grid item xs={12}>
            <div className={styles.sectionTitle}>
              <span className={styles.icon}>👤</span>
              Thông Tin Khách Hàng
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Số điện thoại"
              value={customerInfo.phone}
              onChange={handleCustomerInfoChange('phone')}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Họ và tên"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange('name')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa chỉ"
              value={customerInfo.address}
              onChange={handleCustomerInfoChange('address')}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </Card>

      {customerOrders && (
        <Card className={styles.formCard}>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12}>
              <div className={styles.sectionTitle}>
                <span className={styles.icon}>💍</span>
                Chọn Bộ Sưu Tập Hoàn Trả
              </div>
            </Grid>

            <Grid item xs={12}>
              <RadioGroup
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(Number(e.target.value))}
              >
                {customerOrders.map((order: Order) => (
                  <FormControlLabel
                    key={order.id}
                    value={order.id}
                    control={<Radio />}
                    label={
                      <div className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                          <div className={styles.collection}>{order.collection}</div>
                          <div className={styles.price}>{currencyFormatter(order.price)}</div>
                        </div>
                        
                        <div className={styles.orderDate}>
                          Ngày mua: {order.orderDate}
                        </div>

                        <div className={styles.ringsInfo}>
                          <div className={styles.ringSection}>
                            <div className={styles.ringTitle}>
                              <span className={styles.icon}>👨</span>
                              Nhẫn Nam
                            </div>
                            <div className={styles.specs}>
                              <div className={styles.spec}>
                                <span className={styles.label}>Chất liệu:</span>
                                <span className={styles.value}>{order.rings.male.material}</span>
                              </div>
                              <div className={styles.spec}>
                                <span className={styles.label}>Size:</span>
                                <span className={styles.value}>{order.rings.male.size}</span>
                              </div>
                              <div className={styles.spec}>
                                <span className={styles.label}>Kim cương:</span>
                                <span className={styles.value}>{order.rings.male.diamond}</span>
                              </div>
                            </div>
                          </div>

                          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />

                          <div className={styles.ringSection}>
                            <div className={styles.ringTitle}>
                              <span className={styles.icon}>👩</span>
                              Nhẫn Nữ
                            </div>
                            <div className={styles.specs}>
                              <div className={styles.spec}>
                                <span className={styles.label}>Chất liệu:</span>
                                <span className={styles.value}>{order.rings.female.material}</span>
                              </div>
                              <div className={styles.spec}>
                                <span className={styles.label}>Size:</span>
                                <span className={styles.value}>{order.rings.female.size}</span>
                              </div>
                              <div className={styles.spec}>
                                <span className={styles.label}>Kim cương:</span>
                                <span className={styles.value}>{order.rings.female.diamond}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </Grid>

            {selectedOrderId && (
              <Grid item xs={12}>
                <div className={styles.sectionTitle}>
                  <span className={styles.icon}>❗</span>
                  Lý Do Hoàn Trả
                </div>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Nhập lý do hoàn trả..."
                />
              </Grid>
            )}
          </Grid>
        </Card>
      )}

      <div className={styles.buttonGroup}>
        <Button
          variant="contained"
          sx={{
            ...secondaryBtn,
            width: "200px",
            fontSize: "1.1rem",
            padding: "10px 0",
          }}
          onClick={() => navigate('/staff/refund-order')}
        >
          Quay Lại
        </Button>
        
        {customerOrders && (
          <Button
            variant="contained"
            sx={{
              ...primaryBtn,
              width: "200px",
              fontSize: "1.1rem",
              padding: "10px 0",
            }}
            onClick={handleSubmit}
            disabled={!selectedOrderId || !reason}
          >
            Tạo Đơn
          </Button>
        )}
      </div>
    </div>
  );
}

export default RefundCreateForm;