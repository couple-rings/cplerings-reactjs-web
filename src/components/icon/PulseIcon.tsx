import styles from "./PulseIcon.module.scss";

function PulseIcon(props: IPulseIconProps) {
  const { backgroundColor, icon } = props;

  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <span></span>
      {icon}
    </div>
  );
}

export default PulseIcon;
