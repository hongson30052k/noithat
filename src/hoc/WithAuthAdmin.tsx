import React from "react";
import { Navigate } from "react-router-dom";

/**
 * xử lý chỗ này:
 * Kiểm tra nếu như là user thì mình mới cho vào trang , còn ko thì mình sẽ chuyển sang trang nào đó bất kì
 */
const WithAuthAdmin = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    /** Lấy thông tin từ localStorage ra xem thử đã có thông tin hay chưa */
    // const user = localStorage.getItem("user");
    // const parsedUser = user ? JSON.parse(user) : null;

    /**
     * Thứ 1:Kiểm tra user có nằm trong trong localStorage
     * Thứ 2:Kiểm tra xem user đó nếu có thì cái role của nó có phải là admin hay ko,
     * Rơi vào 1 trong 2 điều kiện trên thì chuyển về trang hom
     */

    // const noUser = !parsedUser;
    // const hasUserButNotAdmin = parsedUser && parsedUser.isAdmin === false;
    // if (noUser || hasUserButNotAdmin) {
    //   return <Navigate to="/" />;
    // }

    return <Component {...props} />;
  };
};

export default WithAuthAdmin; 
