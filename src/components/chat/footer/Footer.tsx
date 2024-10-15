import { IconButton, TextField } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import styles from "./Footer.module.scss";
import { useAppSelector } from "src/utils/hooks";
import { validAttachments } from "src/utils/constants";
import SelectFileButton from "src/components/chat/button/SelectFileButton";
import {
  postUploadAttachment,
  postUploadImage,
} from "src/services/file.service";

const Footer = (props: IFooterProps) => {
  const { handleSubmitText, handleSubmitFile } = props;

  const [message, setMessage] = useState("");

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const handleChooseImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      if (!imageFile.type.includes("image")) alert("Invalid image file");
      else {
        const res = await postUploadImage(imageFile, userId);
        if (res.statusCode === 201 && res.data) {
          handleSubmitFile(res.data, "image");
        } else alert("Something went wrong...");
      }
    }
  };

  const handleChooseAttachment = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const attachmentFile = e.target.files[0];
      if (!validAttachments.includes(attachmentFile.type))
        alert("Only accept .pdf, .doc or .docx");
      else {
        const res = await postUploadAttachment(attachmentFile, userId);
        if (res.statusCode === 201 && res.data) {
          handleSubmitFile(res.data, "attachment");
        } else alert("Something went wrong...");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconButtonBar}>
        <SelectFileButton
          fileAccept=".png, .jpg, .jpeg"
          handleSelect={handleChooseImage}
        >
          <ImageOutlinedIcon />
        </SelectFileButton>

        <SelectFileButton
          fileAccept=".pdf, .doc, .docx"
          handleSelect={handleChooseAttachment}
        >
          <AttachmentOutlinedIcon />
        </SelectFileButton>
      </div>

      <form className={styles.messageInputBar}>
        <TextField
          id="outlined-multiline-static"
          multiline
          maxRows={4}
          placeholder="Enter message"
          sx={{ width: "90%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmitText(message);
              setMessage("");
            }
          }}
        />
        <IconButton
          size="large"
          color="primary"
          onClick={() => handleSubmitText(message)}
        >
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default Footer;
