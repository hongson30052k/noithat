import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import styles from "./ProfileEdit.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ProfileEdit = () => {
  const user1 = useSelector(
    (state: RootState) => state.UserLoginState.idUserProduct
  );
  const user2: any = useSelector(
    (state: RootState) => state.userState.userRender
  );
  console.log(user2, "user");

  return (
    <div>
      <form action="" className={cx("form-profile")}>
        {user1.map((item: any) => {
          return (
            <>
              <label htmlFor="" className={cx("label-profile")}>name</label>
              <input type="text" value={item.myname} className={cx("input-profile")}/>
            </>
          );
        })}
        <label htmlFor="" className={cx("label-profile")}>phone</label>
        <input type="text" value={user2.phone} className={cx("input-profile")} />

        <label htmlFor="" className={cx("label-profile")}>Address</label>
        <input type="text" value={user2.address} className={cx("input-profile")} />
      </form>
    </div>
  );
};

export default ProfileEdit;
