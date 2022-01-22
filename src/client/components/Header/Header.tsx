import Link from "next/link";
import style from "./style.module.scss";

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.headerContents}>
        <h1 className={style.logo}>
          <Link passHref href="/">
            <a>Nestjs App</a>
          </Link>
        </h1>
        <Link passHref href="/auth/login">
          <a className={style.loginButton}>
            로그인
          </a>
        </Link>
      </div>
    </header>
  )
}