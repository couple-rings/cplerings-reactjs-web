import styles from "./ImageMessage.module.scss";

const ImageMessage = (props: IImageMessageProps) => {
  const { handleOnLoad, url } = props;

  return (
    <div className={styles.container}>
      <img src={url} className={styles.image} onLoad={handleOnLoad} />
    </div>
  );
};

export default ImageMessage;