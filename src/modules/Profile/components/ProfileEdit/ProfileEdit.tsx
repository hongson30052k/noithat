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
      <form action="">
        {user1.map((item: any) => {
          return (
            <>
              <label htmlFor="">name</label>
              <input type="text" value={item.myname} />
            </>
          );
        })}
        <label htmlFor="">phone</label>
        <input type="text" value={user2.phone} />

        <label htmlFor="">Address</label>
        <input type="text" value={user2.address} />
      </form>
    </div>
  );
};

export default ProfileEdit;
