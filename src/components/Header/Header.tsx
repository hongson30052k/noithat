import logo from "./img/logo.svg";
import img from "./img/img.svg";
import img1 from "./img/img1.svg";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toggleCart } from "../../store/slices/CartSlice";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);
const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className={cx("header")}>
      <img src={logo} alt="logo" />
      <nav className={cx("nav-bar")}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <div className={cx("nav-right")}>
        <Link to="/login">
          <img src={img} />
        </Link>
        <div>
          <img src={img1} onClick={() => dispatch(toggleCart())} />
        </div>
        <Link to="/cart">
          <FavoriteBorderIcon className={cx("icon")} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
