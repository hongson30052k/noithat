import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.scss";
import classNames from "classnames/bind";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGetUser, loginUser } from "../../../../store/slices/UserSlice";
import { RootState } from "../../../../store/store";
const cx = classNames.bind(styles);

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state: RootState) => state.userState.status);
  const loginError = useSelector((state: RootState) => state.userState.error);
  console.log(loginError, "error");
  useEffect(() => {
    dispatch(fetchGetUser());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const handleSubmit = (values: any) => {
    dispatch(loginUser(values));
  };

  return (
    <div className={cx("form-container")}>
      <Container className={cx("sign-up-form")}>
        <Typography
          variant="h4"
          component="h4"
          fontWeight="bold"
          color="#131118"
          sx={{ fontSize: "40px", mb: 2 }}
        >
          Welcome 👋
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            mb: 2,
            fontFamily: "Jost",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "23px",
            color: "#A4A2AA",
          }}
        >
          Please login here
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className={cx("form")}>
              <Typography
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "17px",
                  color: "#131118",
                  mb: 1,
                }}
              >
                Username
              </Typography>
              <TextField
                fullWidth
                className={cx("input")}
                id="username"
                name="username"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                slotProps={{
                  input: {
                    style: { fontSize: "16px" },
                  },
                  inputLabel: {
                    style: {
                      fontSize: "18px",
                      transform: "translate(14px, 12px) scale(1)",
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "17px",
                      color: "#131118",
                    },
                  },
                  formHelperText: {
                    style: { fontSize: "16px", marginBottom: "10px" },
                  },
                }}
              />

              <Typography
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "17px",
                  color: "#131118",
                  mb: 1,
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                className={cx("input")}
                id="password"
                name="password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                slotProps={{
                  input: {
                    style: { fontSize: "16px" },
                  },
                  inputLabel: {
                    style: {
                      fontSize: "18px",
                      transform: "translate(14px, 12px) scale(1)",
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "17px",
                      color: "#131118",
                    },
                  },
                  formHelperText: {
                    style: { fontSize: "16px", marginBottom: "10px" },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loginStatus === "loading"}
                className={cx("btn-submit")}
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "17px",
                  color: "#FFFFFF",
                }}
              >
                {loginStatus === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              {loginError === "error" ? (
                <p className={cx("error-message")} style={{ color: "red" }}>
                  {loginError}
                </p>
              ) : null}
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default LoginForm;