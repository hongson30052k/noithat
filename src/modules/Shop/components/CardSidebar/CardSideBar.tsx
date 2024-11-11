import { menus } from "./CardSideBarData";
import styles from "./CardSideBar.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);
const CardSideBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const onClickMenu = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className={cx("sidebar-shop")}>
      {menus &&
        menus.map((item, index) => {
          return (
            <div>
              <div
                key={index}
                className={cx("menu-item")}
                style={activeIndex === index ? { backgroundColor: "aqua" } : {}}
              >
                <span
                  key={index}
                  className={cx("btn-menu-item")}
                  onClick={() => onClickMenu(index)}
                >
                  {item.name}
                </span>
              </div>
              <div className={cx("sub-menu")}>
                {activeIndex === index &&
                  item.children &&
                  item.children.map((item, index) => {
                    return (
                      <div className={cx("sub-menu-item")} key={index}>
                        <span className={cx("sub-menu-item-name")}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CardSideBar;
