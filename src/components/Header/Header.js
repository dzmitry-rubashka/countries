import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const Header = () => {
  const navigate = useNavigate();

  document.querySelector(".themes")?.addEventListener("change", (event) => {
    if (event.target.nodeName === "INPUT") {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(event.target.value);
    }
  });

  return (
    <>
      <div className={styles.routes}>
        <div
          className={styles.page}
          onClick={() => {
            navigate("/continents");
          }}
        >
          Continents Page
        </div>
        <div
          className={styles.page}
          onClick={() => {
            navigate("/validation");
          }}
        >
          Validation Page
        </div>
      </div>
    </>
  );
};

export default Header;
