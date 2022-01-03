import style from "../styles/productDetail.module.css";

export default function Title({ title }) {
  return (
    <div className={style.title}>
      <h2>{title}</h2>
      <hr />
    </div>
  );
}
