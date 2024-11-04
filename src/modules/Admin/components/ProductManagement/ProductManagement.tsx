import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddToCart,
  fetchCartProductAPI,
  fetchDeleteCart,
} from "../../../../store/slices/CartProductSlice";
import { RootState } from "../../../../store/store";
import styles from "./ProductManagement.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch();
  const handleAddProduct = async (values: any) => {
    await dispatch(fetchAddToCart(values));
    await dispatch(fetchCartProductAPI());
  };
  const product = useSelector(
    (state: RootState) => state.cartProductState.card
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      image: "",
      title: "",
      frame: "",
      armrest: "",
      seatCushion: "",
      seatPlate: "",
      hydraulic: "",
      chairLeg: "",
      wheels: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
      price: Yup.string().required("Vui lòng nhập giá sản phẩm"),
      image: Yup.mixed().required("Vui lòng nhập ảnh sản phẩm"),
      title: Yup.string().required("Vui lòng nhập tiêu đề cho sản phẩm"),
      frame: Yup.string().required("Vui lòng nhập thông tin"),
      armrest: Yup.string().required("Vui lòng nhập thông tin"),
      seatCushion: Yup.string().required("Vui lòng nhập thông tin"),
      seatPlate: Yup.string().required("Vui lòng nhập thông tin"),
      hydraulic: Yup.string().required("Vui lòng nhập thông tin"),
      chairLeg: Yup.string().required("Vui lòng nhập thông tin"),
      wheels: Yup.string().required("Vui lòng nhập thông tin"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleAddProduct(values);
      formik.resetForm();
    },
  });
  const handDelete = async (id: string) => {
    await dispatch(fetchDeleteCart(id));
    await dispatch(fetchCartProductAPI());
  };
  useEffect(() => {
    dispatch(fetchCartProductAPI());
  }, []);
  return (
    <div className={cx("product-management")}>
      <span className={cx("product-management-title")}>Quản lý Sản phẩm</span>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Tên sản phẩm</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Nhập tên sản phẩm"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={cx("error")}> *{formik.errors.name}</div>
        ) : null}
        <label htmlFor="price">Giá sản phẩm</label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
          placeholder="Nhập giá sản phẩm"
        />
        {formik.touched.price && formik.errors.price ? (
          <div className={cx("error")}> *{formik.errors.price}</div>
        ) : null}
        <label htmlFor="category">Danh mục sản phẩm</label>
        <select name="category" id="">
          <option value="1">Ghế</option>
          <option value="2">Sofa</option>
          <option value="3">Bàn</option>
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className={cx("error")}>{formik.errors.category}</div>
        ) : null}
        <br />
        <label htmlFor="image">ảnh sản phẩm</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className={cx("error")}>{formik.errors.image}</div>
        ) : null}

        <label htmlFor="title">Tiêu đề sản phẩm</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className={cx("error")}>{formik.errors.title}</div>
        ) : null}
        <label htmlFor="frame">Khung xe</label>
        <input
          type="text"
          id="frame"
          name="frame"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.frame}
        />
        {formik.touched.frame && formik.errors.frame ? (
          <div className={cx("error")}>{formik.errors.frame}</div>
        ) : null}
        <label htmlFor="armrest">Tựa tay</label>
        <input
          type="text"
          id="armrest"
          name="armrest"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.armrest}
        />
        {formik.touched.armrest && formik.errors.armrest ? (
          <div className={cx("error")}>{formik.errors.armrest}</div>
        ) : null}

        <label htmlFor="seatCushion">Đệm ngồi</label>
        <input
          type="text"
          id="seatCushion"
          name="seatCushion"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.seatCushion}
        />
        {formik.touched.seatCushion && formik.errors.seatCushion ? (
          <div className={cx("error")}>{formik.errors.seatCushion}</div>
        ) : null}

        <label htmlFor="seatPlate">Mân ghế</label>
        <input
          type="text"
          id="seatPlate"
          name="seatPlate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.seatPlate}
        />
        {formik.touched.seatPlate && formik.errors.seatPlate ? (
          <div className={cx("error")}>{formik.errors.seatPlate}</div>
        ) : null}

        <label htmlFor="hydraulic">Thủy lực</label>
        <input
          type="text"
          id="hydraulic"
          name="hydraulic"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.hydraulic}
        />
        {formik.touched.hydraulic && formik.errors.hydraulic ? (
          <div className={cx("error")}>{formik.errors.hydraulic}</div>
        ) : null}

        <label htmlFor="chairLeg">Khung chân</label>
        <input
          type="text"
          id="chairLeg"
          name="chairLeg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.chairLeg}
        />
        {formik.touched.chairLeg && formik.errors.chairLeg ? (
          <div className={cx("error")}>{formik.errors.chairLeg}</div>
        ) : null}

        <label htmlFor="wheels">Bánh xe</label>
        <input
          type="text"
          id="wheels"
          name="wheels"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.wheels}
        />
        {formik.touched.wheels && formik.errors.wheels ? (
          <div className={cx("error")}>{formik.errors.wheels}</div>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "16px",
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            padding: "8px 16px",
          }}
          type="submit"
        >
          Thêm Sản phẩm
        </Button>
      </form>
      <div style={{ marginTop: "16px" }}>
        <table style={{ width: "100%" }} className={cx("product-table")}>
          <thead>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Ảnh</th>
            <th>Tiêu đề sản phẩm</th>
            <th>Khung xe</th>
            <th>Tựa tay</th>
            <th>Đệm ngôi</th>
            <th>Mân ghế</th>
            <th>Thủy lực</th>
            <th>Khung chân</th>
            <th>Bánh xe</th>
          </thead>
          <tbody>
            {product &&
              product.map((product) => (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <th>{product.name}</th>
                  <th>{product.price}</th>
                  <th>{product.category}</th>
                  <th>
                    {/* {product.image && (
                      <img
                        src={URL.createObjectURL(product.image)}
                        alt={product.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )} */}
                  </th>
                  <th>{product.title}</th>
                  <th>{product.chair}</th>
                  <th>{product.description}</th>
                  <th>{product.seatPlate}</th>
                  <th>{product.hydraulic}</th>
                  <th>{product.chairLeg}</th>
                  <th>{product.wheels}</th>
                  <th>{product.seatCushion}</th>
                  <th>
                    <Button
                      color="secondary"
                      onClick={() => handDelete(product.id)}
                    >
                      Xóa
                    </Button>
                  </th>
                  <th>
                    <Button color="primary">Cập nhật</Button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
