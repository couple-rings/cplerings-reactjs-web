import styles from "./ViewAccountInfo.module.scss";
import { Grid } from "@mui/material";
import { useState } from "react";
import user from "src/assets/User.png";
import TableAccountList from "./TableAccountList";

function createData(
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  role: string,
  status: string
) {
  return { id, name, email, phoneNumber, role, status };
}

const rows = [
  createData(
    "#281",
    "Bean Nguyen",
    "ndthung281@gmail.com",
    "0903448630",
    "Customer",
    "Active"
  ),
  createData(
    "#282",
    "John Doe",
    "johndoe@gmail.com",
    "0903448611",
    "Design Staff",
    "Active"
  ),
  createData(
    "#283",
    "Jane Smith",
    "janesmith@gmail.com",
    "0903448622",
    "Sale Staff",
    "Active"
  ),
  createData(
    "#284",
    "Alice Brown",
    "alicebrown@gmail.com",
    "0903448633",
    "Jeweler",
    "Inactive"
  ),
  createData(
    "#285",
    "Bob White",
    "bobwhite@gmail.com",
    "0903448644",
    "Transporter",
    "Active"
  ),
];

function ViewAccountInfo() {
  const [selectedItem, setSelectedItem] = useState("All");

  const tableArray = [
    "All",
    "Customer",
    "Sale Staff",
    "Design Staff",
    "Jeweler",
    "Transporter",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <div className={styles.title}>Thông Tin Tài Khoản</div>

          <div>
            <Grid container justifyContent={"space-between"}>
              <Grid item lg={2.2}>
                <div className={styles.customers}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={user} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Customers</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>28</p>Tài khoản
                  </div>
                </div>
              </Grid>

              <Grid item lg={2.2}>
                <div className={styles.saleStaff}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={user} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Sale Staffs</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>28</p>Tài khoản
                  </div>
                </div>
              </Grid>

              <Grid item lg={2.2}>
                <div className={styles.designStaff}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={user} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Design Staffs</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>28</p>Tài khoản
                  </div>
                </div>
              </Grid>

              <Grid item lg={2.2}>
                <div className={styles.transporter}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={user} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Transporters</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>28</p>Tài khoản
                  </div>
                </div>
              </Grid>

              <Grid item lg={2.2}>
                <div className={styles.jeweler}>
                  <div className={styles.boxTitle}>
                    <div className={styles.boxIcon}>
                      <img src={user} alt="" />
                    </div>
                    <div className={styles.title}>
                      <p>Jewelers</p>
                    </div>
                  </div>

                  <div className={styles.numberContainer}>
                    <p>28</p>Tài khoản
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      <div className={styles.table}>
        <div>
          <div className={styles.tabBar}>
            {tableArray?.map((item) => (
              <p
                key={item}
                className={
                  selectedItem === item ? styles.itemSelected : styles.item
                }
                onClick={() => setSelectedItem(item)}
              >
                {item}
              </p>
            ))}
          </div>


          <div>
            <TableAccountList rows={rows} selectedRole={selectedItem}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAccountInfo;
