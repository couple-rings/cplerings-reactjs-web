import { IconButton } from "@mui/material";
import { useRef } from "react";

const SelectFileButton = (props: ISelectFileButtonProps) => {
  const { children, handleSelect, fileAccept } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <IconButton
        size="large"
        sx={{ color: "#4f4f4f" }}
        onClick={() => inputRef.current?.click()}
      >
        {children}
      </IconButton>
      <input
        type="file"
        hidden
        ref={inputRef}
        accept={fileAccept}
        onChange={handleSelect}
      />
    </>
  );
};

export default SelectFileButton;
