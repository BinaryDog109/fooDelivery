import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { BellIcon, SettingsIcon } from "@chakra-ui/icons";

export const Navbar = () => {
    const iconSize = 8
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* logo image */}
        <h2>D3l1ver00</h2>
        {/* <input type="text" /> */}
      </div>
      <nav className={styles.links}>
        <Link to={"/"}>
          <BellIcon w={iconSize} h={iconSize} />
        </Link>
        <Link to={"/"}>
          <SettingsIcon w={iconSize} h={iconSize}/>
        </Link>
        <div className="notification">{/* Icon */}</div>
      </nav>
    </header>
  );
};
