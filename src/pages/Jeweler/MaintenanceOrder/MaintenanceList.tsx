import { Button, Divider, Grid } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";

const maintainService = [
  {
    id: 1,
    title: "Đánh bóng bề mặt của nhẫn",
    price: 100000,
    description: "Làm sạch và đánh bóng để loại bỏ vết xước nhỏ, giúp nhẫn sáng bóng như mới.",
  },
  {
    id: 2,
    title: "Mạ lại bề mặt nhẫn",
    price: 100000,
    description: "Phủ lại lớp mạ để giữ màu sắc và độ sáng bóng của nhẫn.",
  },
];

function MaintenanceOrderList() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);

  const handleCheckboxClick = (itemId: number, itemPrice: number) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.includes(itemId);
      if (isSelected) {
        setTotal((prevTotal) => prevTotal - itemPrice);
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        setTotal((prevTotal) => prevTotal + itemPrice);
        return [...prevSelectedItems, itemId];
      }
    });
  };

  return (
    <div>
      <h2>Danh Sách Dịch Vụ Bảo Trì</h2>
      <Grid container>
        {maintainService.map((item) => (
          <Grid item xs={12} key={item.id}>
            <div onClick={() => handleCheckboxClick(item.id, item.price)}>
              {selectedItems.includes(item.id) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              <span>{item.title} - {item.price} VND</span>
              <p>{item.description}</p>
            </div>
            <Divider />
          </Grid>
        ))}
      </Grid>
      <div>
        <h3>Tổng Tiền: {total} VND</h3>
        <Button variant="contained">Xác Nhận Đơn</Button>
      </div>
    </div>
  );
}

export default MaintenanceOrderList;