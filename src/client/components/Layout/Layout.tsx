import Header from "../Header";
import style from "./style.module.scss";

export default function Layout({ children }) {
  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.contents}>
        {children}
      </div>
    </div>
  )
}