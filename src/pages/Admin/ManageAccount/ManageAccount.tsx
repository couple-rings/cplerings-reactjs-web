import styles from "./ManageAccount.module.scss";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { AccountStatus, UserRole } from "src/utils/enums";
import avatar from "src/assets/male-icon.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import ViewModal from "src/components/modal/account/View.modal";
import UpdateModal from "src/components/modal/account/Update.modal";
import AddModal from "src/components/modal/account/Add.modal";
import { Button, Grid } from "@mui/material";
import { primaryBtn } from "src/utils/styles";

interface Row {
  id: number;
  avatar: string;
  email: string;
  username: string;
  role: UserRole;
  status: AccountStatus;
  phone: string;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains", "equals" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    avatar,
    username: "Nguyễn Văn A",
    email: "nva@gmail.com",
    role: UserRole.Customer,
    status: AccountStatus.Active,
    phone: "0987654321",
  },
  {
    id: 2,
    avatar,
    username: "Nguyễn Văn B",
    email: "nvb@gmail.com",
    role: UserRole.Staff,
    status: AccountStatus.Active,
    phone: "0987654321",
  },
  {
    id: 3,
    avatar,
    username: "Nguyễn Văn C",
    email: "nvc@gmail.com",
    role: UserRole.Manager,
    status: AccountStatus.Inactive,
    phone: "0987654321",
  },
  {
    id: 4,
    avatar,
    username: "Nguyễn Văn D",
    email: "nvd@gmail.com",
    role: UserRole.Jeweler,
    status: AccountStatus.Verifying,
    phone: "0987654321",
  },
  {
    id: 5,
    avatar,
    username: "Nguyễn Văn E",
    email: "nve@gmail.com",
    role: UserRole.Transporter,
    status: AccountStatus.Verifying,
    phone: "0987654321",
  },
];

const initSelected = {
  id: 0,
  avatar: "",
  email: "",
  username: "",
  phone: "",
  role: UserRole.Default,
  status: AccountStatus.Active,
};

function ManageAccount() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selected, setSelected] = useState<Row>(initSelected);

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "avatar",
        headerName: "",
        width: 200,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => (
          <img
            src={row.avatar}
            alt=""
            style={{ height: "5rem", margin: "1rem" }}
          />
        ),
      },
      {
        field: "username",
        headerName: "Username",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "role",
        headerName: "Role",
        width: 150,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        renderCell: ({ row }) => {
          let classname = "";

          if (row.status === AccountStatus.Active) classname = styles.active;
          if (row.status === AccountStatus.Inactive)
            classname = styles.inactive;
          if (row.status === AccountStatus.Verifying)
            classname = styles.verifying;

          return <div className={classname}>{row.status.toLowerCase()}</div>;
        },
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<VisibilityIcon color="action" />}
            label="Detail"
            onClick={() => {
              setOpenDetail(true);
              setSelected(row);
            }}
          />,
          <GridActionsCellItem
            icon={<BorderColorSharpIcon color="action" />}
            label="Update"
            onClick={() => {
              setOpenUpdate(true);
              setSelected(row);
            }}
          />,
        ],
      },
    ],
    []
  );

  const resetSelected = () => {
    setSelected(initSelected);
  };

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Manage Account</div>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1, mb: 3 }}
          onClick={() => setOpenAdd(true)}
        >
          Add New
        </Button>
      </Grid>

      <DataGrid
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        onFilterModelChange={handleFilter}
        onSortModelChange={handleSort}
        pageSizeOptions={[100]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
      />

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <ViewModal open={openDetail} setOpen={setOpenDetail} {...selected} />
      <UpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        {...selected}
        resetSelected={resetSelected}
      />
    </div>
  );
}

export default ManageAccount;
