import styles from "./HoverCard.module.scss";
import DownloadIcon from "@mui/icons-material/Download";

function HoverCard(props: IHoverCardProps) {
  const { file, image, shadow } = props;

  return (
    <div className={styles.container}>
      <a href={file}>
        <img src={image} className={shadow ? styles.boxShadow : ""} />
        <div className={styles.pdf}>
          <DownloadIcon fontSize="large" />
          <span>Tải file</span>
        </div>
      </a>
    </div>
  );
}

export default HoverCard;
