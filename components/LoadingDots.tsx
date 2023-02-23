import styles from "../styles/loading-dots.module.css";

const LoadingDots = ({ style = "small" }: { color: string; style: string }) => {
  return (
    <span className={style == "small" ? styles.loading2 : styles.loading}>
      <span className="bg-yellow-400" />
      <span className="bg-orange-500" />
      <span className="bg-red-600" />
    </span>
  );
};

export default LoadingDots;
