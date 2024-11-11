import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddImgProduct,
  fetchAddToCart,
  fetchCartProductAPI,
  fetchDeleteCart,
  fetchDeleteImgCart,
  fetchGetImgProduct,
} from "../../../../store/slices/CartProductSlice";
import { RootState } from "../../../../store/store";
import styles from "./ProductManagement.module.scss";
import classNames from "classnames/bind";
import FileBase from "react-file-base64";
import { generateUUID2 } from "../../../../utils/GenerateldUIID/GenerateldUIID";
const cx = classNames.bind(styles);

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch();
  const isValidBase64Image = (base64: string) => {
    const regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/;
    return regex.test(base64);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgProduct, setImgProduct] = useState<any>(null);
  const [error, setError] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const handleAddImage = (files: { base64: string }) => {
    if (!isValidBase64Image(files.base64)) {
      setError("File bạn chọn không phải là hình ảnh hợp lệ.");
      setImgProduct(null);
      return;
    }
    setImgProduct(files.base64);
    setError("");
  };
  const handleAddProduct = async (values: any) => {
    console.log(values, "values");
    const value = {
      id: values.id,
      img: imgProduct,
    };
    console.log(value, "value");
    if (!imgProduct) return;
    await dispatch(fetchAddImgProduct(value));
    await dispatch(fetchAddToCart(values));
    await dispatch(fetchCartProductAPI());
    setImgProduct(null);
  };
  const { card, cartImg, status } = useSelector(
    (state: RootState) => state.cartProductState
  );
  console.log(card, "data");
  console.log(cartImg, "cartImg");
  const data = card.map((item: any) => {
    const item1 = cartImg?.find((item2: any) => item2?.id === item?.id);
    return item1 ? { ...item, ...item1 } : item;
  });
  console.log(data, "data");
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: 1,
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
      if (!imgProduct) return;
      const value: any = {
        ...values,
        id: generateUUID2(),
      };
      handleAddProduct(value);
      formik.resetForm();
    },
  });
  const handDelete = async (productId: string) => {
    console.log(productId);
    await dispatch(fetchDeleteCart(productId));
    await dispatch(fetchDeleteImgCart(productId));
    await dispatch(fetchCartProductAPI());
  };
  useEffect(() => {
    dispatch(fetchCartProductAPI());
    dispatch(fetchGetImgProduct());
  }, [dispatch, status]);
  return (
    <div className={cx("data-management")}>
      <span className={cx("data-management-title")}>Quản lý Sản phẩm</span>
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
        <label htmlFor="title">Giảm giá</label>
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
        <label htmlFor="category">Danh mục sản phẩm</label>
        <select
          name="category"
          id=""
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="1">Ghế</option>
          <option value="2">Sofa</option>
          <option value="3">Bàn</option>
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className={cx("error")}>{formik.errors.category}</div>
        ) : null}
        <br />
        <label htmlFor="image">ảnh sản phẩm</label>
        <FileBase type="file" multiple={false} onDone={handleAddImage} />
        {imgProduct && (
          <img
            src={imgProduct}
            alt="Uploaded"
            style={{ width: "200px", height: "auto", marginTop: "10px" }}
          />
        )}
        {error && <div className={cx("error")}>{error}</div>}
        <div>
          <button onClick={() => setIsModalOpen(true)}>
            Thông tin chi tiết
          </button>

          {isModalOpen && (
            <div className={cx("modal-open-description")}>
              <div className={cx("modal-content")}>
                <div
                  onClick={() => setIsModalOpen(false)}
                  className={cx("close-modal")}
                >
                  X
                </div>
                <h2>Thông tin sản phẩm</h2>
                <form>
                  {/* Khung xe */}
                  <div>
                    <label htmlFor="frame">Khung xe</label>
                    <input
                      type="text"
                      id="frame"
                      name="frame"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.frame}
                    />
                    {formik.touched.frame && formik.errors.frame && (
                      <div className={cx("error")}>{formik.errors.frame}</div>
                    )}
                  </div>

                  {/* Tựa tay */}
                  <div>
                    <label htmlFor="armrest">Tựa tay</label>
                    <input
                      type="text"
                      id="armrest"
                      name="armrest"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.armrest}
                    />
                    {formik.touched.armrest && formik.errors.armrest && (
                      <div className={cx("error")}>{formik.errors.armrest}</div>
                    )}
                  </div>

                  {/* Đệm ngồi */}
                  <div>
                    <label htmlFor="seatCushion">Đệm ngồi</label>
                    <input
                      type="text"
                      id="seatCushion"
                      name="seatCushion"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.seatCushion}
                    />
                    {formik.touched.seatCushion &&
                      formik.errors.seatCushion && (
                        <div className={cx("error")}>
                          {formik.errors.seatCushion}
                        </div>
                      )}
                  </div>

                  {/* Mân ghế */}
                  <div>
                    <label htmlFor="seatPlate">Mân ghế</label>
                    <input
                      type="text"
                      id="seatPlate"
                      name="seatPlate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.seatPlate}
                    />
                    {formik.touched.seatPlate && formik.errors.seatPlate && (
                      <div className={cx("error")}>
                        {formik.errors.seatPlate}
                      </div>
                    )}
                  </div>

                  {/* Thủy lực */}
                  <div>
                    <label htmlFor="hydraulic">Thủy lực</label>
                    <input
                      type="text"
                      id="hydraulic"
                      name="hydraulic"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.hydraulic}
                    />
                    {formik.touched.hydraulic && formik.errors.hydraulic && (
                      <div className={cx("error")}>
                        {formik.errors.hydraulic}
                      </div>
                    )}
                  </div>

                  {/* Khung chân */}
                  <div>
                    <label htmlFor="chairLeg">Khung chân</label>
                    <input
                      type="text"
                      id="chairLeg"
                      name="chairLeg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.chairLeg}
                    />
                    {formik.touched.chairLeg && formik.errors.chairLeg && (
                      <div className={cx("error")}>
                        {formik.errors.chairLeg}
                      </div>
                    )}
                  </div>

                  {/* Bánh xe */}
                  <div>
                    <label htmlFor="wheels">Bánh xe</label>
                    <input
                      type="text"
                      id="wheels"
                      name="wheels"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.wheels}
                    />
                    {formik.touched.wheels && formik.errors.wheels && (
                      <div className={cx("error")}>{formik.errors.wheels}</div>
                    )}
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <button onClick={() => setIsModalOpen(false)}>
                      Lưu thông tin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
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
        <table style={{ width: "100%" }} className={cx("data-table")}>
          <thead>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Giảm Giá</th>
            <th>Danh mục</th>
            <th>Ảnh</th>
            <th>Thông tin chi tiết</th>
          </thead>
          <tbody>
            {data?.map((data: any, index: any) => (
              <tr key={index}>
                <th>{data.id}</th>
                <th>{data.name}</th>
                <th>{data.price}</th>
                <th>{data.title}</th>
                <th>{data.category}</th>

                <th>
                  <img
                    src={data.img}
                    alt={data.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </th>

                <th>
                  <button onClick={() => setShowModal(true)}>
                    Xem chi tiết
                  </button>
                  {showModal && (
                    <div className={cx("modal-show-description")}>
                      <div className={cx("modal-content-show-description")}>
                        <button
                          className={cx("close-modal")}
                          onClick={() => setShowModal(false)}
                        >
                          X
                        </button>
                        <h2>Thông tin chi tiết</h2>
                        <table>
                          <tbody>
                            <tr>
                              <th>Khung xe</th>
                              <td>{data.chair}</td>
                            </tr>
                            <tr>
                              <th>Mô tả</th>
                              <td>{data.description}</td>
                            </tr>
                            <tr>
                              <th>Mân ghế</th>
                              <td>{data.seatPlate}</td>
                            </tr>
                            <tr>
                              <th>Thủy lực</th>
                              <td>{data.hydraulic}</td>
                            </tr>
                            <tr>
                              <th>Khung chân</th>
                              <td>{data.chairLeg}</td>
                            </tr>
                            <tr>
                              <th>Bánh xe</th>
                              <td>{data.wheels}</td>
                            </tr>
                            <tr>
                              <th>Đệm ngồi</th>
                              <td>{data.seatCushion}</td>
                            </tr>
                          </tbody>
                        </table>
                        <button onClick={() => setShowModal(false)}>
                          Xác nhận
                        </button>
                      </div>
                    </div>
                  )}
                </th>

                <th>
                  <Button color="secondary" onClick={() => handDelete(data.id)}>
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
