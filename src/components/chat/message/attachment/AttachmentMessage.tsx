import { Card, CardContent } from "@mui/material";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";
import styles from "./AttachmentMessage.module.scss";
import { sizeConverter } from "src/utils/functions";

const AttachmentMessage = (props: IAttachmentMessageProps) => {
  const { name, size, url, cardBgColor } = props;

  return (
    <a className={styles.container} href={url}>
      <Card sx={{ minWidth: 150, background: cardBgColor }}>
        <CardContent className={styles.content}>
          <DescriptionSharpIcon />
          <div>
            <div className={styles.name}>{name}</div>
            {/* show in MB if size >= 1024 KB, otherwise show in KB */}
            <div className={styles.size}>{sizeConverter(size)}</div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default AttachmentMessage;
