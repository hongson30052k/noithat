import CardContent from "../CardContent/CardContent";
import SideBar from "../CardSidebar/CardSideBar";
import styles from "./ShopCard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const CardMain = () => {
  return (
    <>
      <div className={cx("shop-card")}>
        <SideBar />
        <CardContent />
      </div>
    </>
  );
};

export default CardMain;
