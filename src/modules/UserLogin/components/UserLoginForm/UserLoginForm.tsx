import FileBase from "react-file-base64";
import { useFormik } from "formik";
import styles from "./UserLogin.module.scss";
import classNames from "classnames/bind";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchCreateUserLogin } from "../../../../store/slices/UserLoginSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const UserLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState<string | null>(null);

  const handleFileUpload = (file: { base64: string }) => {
    setImageData(file.base64);
  };

  const formik = useFormik({
    initialValues: {
      myname: "",
      img: "",
    },
    validationSchema: Yup.object().shape({
      myname: Yup.string().required("Vui lòng nhập tên người dùng"),
    }),
    onSubmit: async (values) => {
      const value = {
        id: 1,
        myname: values.myname,
        img: imageData,
      };
      console.log(value);

      await dispatch(fetchCreateUserLogin(value));
      formik.resetForm();
      navigate("/login");
    },
  });
  return (
    <div className={cx("login-form")}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="myname">Tên người dùng</label>
        <input
          id="myname"
          type="text"
          placeholder="Nhập tên người dùng"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.myname}
        />
        {formik.touched.myname && formik.errors.myname && (
          <div className={cx("error")}>Vui lòng chọn ảnh đại diện</div>
        )}

        <label htmlFor="img">Chọn ảnh đại diện</label>
        <FileBase type="file" multiple={false} onDone={handleFileUpload} />
        {imageData && (
          <img
            src={imageData}
            alt="Uploaded"
            style={{ width: "200px", height: "auto", marginTop: "10px" }}
          />
        )}
        {!imageData && <div className={cx("error")}>{formik.errors.img}</div>}

        <button type="submit" className={cx("login-btn")}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
