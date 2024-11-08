import { useSelector } from "react-redux";
import styles from "./ProfileSidebar.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useState } from "react";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileShopping from "../ProfileShopping/ProfileShopping";
const cx = classNames.bind(styles);

const ProfileSidebar = () => {
  const userProduct = useSelector(
    (state: RootState) => state.UserLoginState.idUserProduct
  );
  const { isAdmin } = useSelector((state: RootState) => state.userState);
  const [idContent, setIdContent] = useState(1);
  return (
    <>
      <div className={cx("sidebar")}>
        <h2>Menu</h2>
        <ul>
          <li>
            {userProduct.map((item: any) => {
              return (
                <div key={item.id} className={cx("item")}>
                  <a>{item.myname}</a>
                  <img src={item.img} alt="" width="50px" height="50px" />
                </div>
              );
            })}
          </li>
          <li>
            <span
              style={idContent === 1 ? { backgroundColor: "#1abc9c" } : {}}
              onClick={() => setIdContent(1)}
            >
              Thông tin Users
            </span>
          </li>
          {isAdmin ? null : (
            <li>
              <span
                style={idContent === 2 ? { backgroundColor: "#1abc9c" } : {}}
                onClick={() => setIdContent(2)}
              >
                Đơn Hàng
              </span>
            </li>
          )}
        </ul>
      </div>
      <div className={cx("content")}>
        {idContent === 1 && (
          <div>
            <ProfileEdit />
          </div>
        )}
        {idContent === 2 && (
          <>
            <ProfileShopping />
          </>
        )}
      </div>
    </>
  );
};

export default ProfileSidebar;
