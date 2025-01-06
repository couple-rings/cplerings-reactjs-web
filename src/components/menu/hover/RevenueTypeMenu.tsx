// import {
//   bindHover,
//   bindPopper,
//   usePopupState,
// } from "material-ui-popup-state/hooks";
// import styles from "src/components/menu/HoverMenu.module.scss";
// import filterIcon from "src/assets/Filter.png";
// import { v4 as uuidv4 } from "uuid";
// import {
//   Checkbox,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   Popper,
//   SxProps,
// } from "@mui/material";
// import { useState } from "react";

// const paperStyle: SxProps = {
//   borderRadius: "10px",
//   backgroundColor: "#fbfaf9",
//   mt: 1,
//   boxShadow: "none",
//   minWidth: "200px",
//   maxHeight: "300px",
  
// //   overflowY: "scroll",
// };

// const filterType = [
//     // {
//     //     id : "All",
//     //     description : "Tất Cả"
//     // },
//     {
//         id : "CASH",
//         description : "Tiền Mặt"
//     },
//     {
//         id: "TRANSFER",
//         description: "Chuyển Khoản"
//     }
// ]

// const RevenueTypeMenu = (props: IOrderStatisticFilter) => {
//   const { setFilterPaymentMethod } = props;

//   const [checked, setChecked] = useState<string[]>([]);
//   const [allChecked, setAllChecked] = useState(true);

//   const popupState = usePopupState({
//     variant: "popper",
//   });

//   const handleToggle = (id: string) => () => {
//     const found = checked.find((item) => item === id);
//     if (found) {
//       setChecked([]);
//     } else {
//       setChecked([id])
//       setFilterPaymentMethod(id);
//     }

//     setAllChecked(false);
//   };

//   const handleCheckAll = () => {
//     setAllChecked(!allChecked);
//     setChecked([]);

//     // if (allChecked) setChecked([]);
//     // else {
//     //     if(response?.data) {
//     //         const all = response?.data?.items.map(item => item.id)

//     //         setChecked(all);
//     //     }
//     // }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.iconFilterBox} {...bindHover(popupState)}>
//         <img src={filterIcon} alt="" />
//       </div>

//       <Popper {...bindPopper(popupState)} placement="bottom-start">
//         <Paper sx={paperStyle}>
//           <List>
//             <ListItemButton key={uuidv4()} onClick={handleCheckAll}>
//               <ListItemIcon>
//                 <Checkbox edge="start" checked={allChecked} disableRipple />
//               </ListItemIcon>
//               <ListItemText primary={"Tất Cả"} />
//             </ListItemButton>

//             {filterType.map((value, index) => {
//               return (
//                 <ListItemButton key={index} onClick={handleToggle(value.id)}>
//                   <ListItemIcon>
//                     <Checkbox
//                       edge="start"
//                       checked={checked.includes(value.id)}
//                       disableRipple
//                     />
//                   </ListItemIcon>
//                   <ListItemText primary={value.description} />
//                 </ListItemButton>
//               );
//             })}
//           </List>
//         </Paper>
//       </Popper>
//     </div>
//   );
// };

// export default RevenueTypeMenu;


import {
  bindHover,
  bindPopper,
  usePopupState,
} from "material-ui-popup-state/hooks";
import styles from "src/components/menu/HoverMenu.module.scss";
import filterIcon from "src/assets/Filter.png";
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  SxProps,
} from "@mui/material";
import { useState } from "react";

// interface IRevenueMenuPaymentType {
//   setFilterPaymentMethod: (v: string) => void;
// }

const paperStyle: SxProps = {
  borderRadius: "10px",
  backgroundColor: "#fbfaf9",
  mt: 1,
  boxShadow: "none",
  minWidth: "200px",
  maxHeight: "300px",
};

const filterType = [
  { id: "All", description: "Tất Cả" },
  { id: "CASH", description: "Tiền Mặt" },
  { id: "TRANSFER", description: "Chuyển Khoản" },
];

const RevenueTypeMenu: React.FC<IRevenueMenuPaymentType> = ({ setFilterPaymentMethod }) => {
  const [checked, setChecked] = useState<string[]>([]);
  // const [allChecked, setAllChecked] = useState(true);
  const popupState = usePopupState({ variant: "popper" });

  const handleToggle = (id: string) => {
    const isSelected = checked.includes(id);
    setChecked(isSelected ? [] : [id]);
    setFilterPaymentMethod(isSelected ? "" : id);
    // setAllChecked(false);
  };

  // const handleCheckAll = () => {
  //   setAllChecked(!allChecked);
  //   setChecked([]);
  //   setFilterPaymentMethod("");
  // };

  return (
    <div className={styles.container}>
      <div className={styles.iconFilterBox} {...bindHover(popupState)}>
        <img src={filterIcon} alt="Filter Icon" />
      </div>

      <Popper {...bindPopper(popupState)} placement="bottom-start">
        <Paper sx={paperStyle}>
          <List>
            {/* <ListItemButton onClick={handleCheckAll}>
              <ListItemIcon>
                <Checkbox edge="start" checked={allChecked} disableRipple />
              </ListItemIcon>
              <ListItemText primary="Tất Cả" />
            </ListItemButton> */}
            {filterType.map(({ id, description }) => (
              <ListItemButton key={id} onClick={() => handleToggle(id)}>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checked.includes(id)} disableRipple />
                </ListItemIcon>
                <ListItemText primary={description} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Popper>
    </div>
  );
};

export default RevenueTypeMenu;
