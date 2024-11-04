import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const WithAuth = (WrappedComponent: React.FC<any>) => {
  const AuthHOC: React.FC<any> = (props) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(
      (state: RootState) => state.userState
    );

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);
    return !isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthHOC;
};

export default WithAuth;
