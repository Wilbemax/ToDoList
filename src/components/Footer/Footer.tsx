
import styels from "./Footer.module.css";

import logo from "/1213.png"

const Footer = () => {
  return (
    <div className={styels.Footer} id="contact">
      <div className={styels.wrapper}>
        <div className={styels.logo}>
          <img src={logo} alt="WBM.company" />
        </div>
        <div className={styels.contact}>
          <a className={styels.a} href="https://github.com/Wilbemax" rel="noreferrer" target="_blank">

            github
          </a>
          <a className={styels.a}
            href="https://web.telegram.org/k/#@jkdlon"
            rel="noreferrer"
            target="_blank"
          >

            Telegram
          </a>
          <a className={styels.a}
            href="https://habr.com/ru/users/Wilbemax/"
            rel="noreferrer"
            target="_blank"
          >

            хабр
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;