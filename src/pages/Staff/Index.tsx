import { useAppDispatch } from "src/utils/hooks";
import styles from "./Index.module.scss";
import { logout } from "src/redux/slice/auth.slice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { removeRoute } from "src/redux/slice/route.slice";
import ExperimentalTable from "./ExperimentalTable";

function Index() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeRoute());
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      staff home
      <ExperimentalTable />
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}

export default Index;
