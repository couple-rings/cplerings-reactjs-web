import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className={styles.container}>
      <h1>Hi ~ Welcome to CR</h1>
      <div className="email-input">
        <input className={styles.type} type="text" placeholder="Email" />
      </div>
      <div className="password-input">
        <input className={styles.type} type="password" placeholder="Password" />
      </div>

      <div className="access-code-input">
        <input className={styles.type} placeholder="Access code" />
      </div>
      <div className={styles.checkboxContainer}>
        <input className={styles.checkbox} type="checkbox" />
        <p>Email me Couple Ring news, updates and offers</p>
      </div>

      <div className="button-register">
        <button>Creat account</button>
      </div>

      <p className={styles.description}>
        By creating this account, you agree to the DR’s user registration
        agreement and privacy terms
      </p>

      <h2 className="note">Already have one</h2>
      <p className={styles.navigateSignIn}>
        Sign in{" "}
        <NavigateNextIcon
          sx={{
            fontSize: 20,
            color: "gray",
            "&:hover": {
              color: "#a6402a", 
            },
          }}
        />
      </p>
    </div>
  );
};

export default Register;
