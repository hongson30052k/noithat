import React from "react";
import { Navigate } from "react-router-dom";

/**
 * xử lý chỗ này:
 * Kiểm tra nếu như là user thì mình mới cho vào trang , còn ko thì mình sẽ chuyển sang trang nào đó bất kì
 */
const WithAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    /** Lấy thông tin từ localStorage ra xem thử đã có thông tin hay chưa */
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    /** Kiểm tra nếu như ko có user trong localStorage thì mình sẽ chuyển hướng về lại trang register */
    if (!parsedUser) {
      return <Navigate to="/register" />;
    }

    return <Component {...props} />;
  };
};

export default WithAuth;
