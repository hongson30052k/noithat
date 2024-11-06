import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const WithAuthAdmin = (WrappedComponent: React.FC) => {
  const AuthHOC: React.FC<any> = (props) => {
    const navigate = useNavigate();
    const { isAdmin } = useSelector((state: RootState) => state.userState);

    useEffect(() => {
      if (!isAdmin) {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }, [isAdmin, navigate]);

    return isAdmin ? <WrappedComponent {...props} /> : null;
  };

  return AuthHOC;
};

export default WithAuthAdmin;
