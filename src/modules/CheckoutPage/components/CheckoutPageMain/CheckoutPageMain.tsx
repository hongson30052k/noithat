import React, {
  useEffect,
  useMemo,
} from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckoutPageMain.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useFormik } from "formik";
import GenerateIdWithDate from "../../../../utils/GenerateIdWithDate/GenerateIdWithDate";
import { useNavigate } from "react-router-dom";
import { fetchCreateOrder } from "../../../../store/slices/CartOderSlice";

const cx = classNames.bind(styles);

const CheckoutPageMain = () => {
  const navigate = useNavigate();

  let result = 0;
  const dispatch = useDispatch();
  const { userProducts } = useSelector(
    (state: RootState) => state.userProductState
  );
  const { idUserProduct }: any = useSelector(
    (state: RootState) => state.UserLoginState
  );
  console.log(idUserProduct, "idUserProduct");

  const { userRender }: any = useSelector(
    (state: RootState) => state.userState
  );

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   const handleSelectPayment = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setFormData({ ...formData, paymentMethod: e.target.value });
  //   };

  //   const handleCheckout = () => {
  //     const cartItems = userProducts.map((item) => ({
  //       productId: item.product.id,
  //       quantity: item.quantity,
  //       discountedPrice: item.product.discountedPrice,
  //     }));
  //     // Gửi thông tin đơn hàng
  //     dispatch(createOrder({ userId: idUser, cartItems }));
  //   };
  for (let i = 0; i < userProducts.length; i++) {
    result += userProducts[i].product.price * userProducts[i].quantity;
  }
  console.log(userProducts, "userProducts");
  const formik = useFormik({
    initialValues: {
      name: idUserProduct[0].myname,
      address: userRender.address,
      phone: userRender.phone,
      paymentMethod: "cash",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Vui lòng nhập tên"),
      address: Yup.string().required("Vui lòng nhập điểm giao hàng"),
      phone: Yup.string().required("Vui lý nhập điểm giao hàng"),
    }),
    onSubmit: async (values) => {
      const value = {
        id: id,
        name: formik.values.name,
        address: formik.values.address,
        phone: formik.values.phone,
        paymentMethod: formik.values.paymentMethod,
        total: result,
        product: userProducts,
        userId : userProducts[0].userId
      };
      const res: any = await dispatch(fetchCreateOrder(value));
      if(res.payload === "string") {
        alert(res.payload);
      } else {
        alert("Đơn hàng thành công");
        navigate("/");
      }
    },
  });
  const handleReset = () => {
    navigate(-1);
  };
  let id = useMemo(() => GenerateIdWithDate(), []);

  useEffect(() => {
    if (userProducts.length === 0) {
      alert("Giỏ hàng của bạn đang trống");
    }
  }, [userProducts]);

  return (
    <div className={cx("checkoutPage")}>
      <h2>Trang Thanh Toán</h2>
      <div className={cx("checkoutForm")}>
        <div className={cx("cartDetails")}>
          <h3>Thông tin giỏ hàng</h3>
          {userProducts.length > 0 ? (
            <div className={cx("cartItems")}>
              {userProducts.map((item: any) => (
                <div key={item.product.id} className={cx("cartItem")}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={cx("productImage")}
                  />
                  <div className={cx("productInfo")}>
                    <h3>{item.product.name}</h3>
                    <p>Số lượng: {item.quantity}</p>
                    <p>{item.product.price} VND</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Giỏ hàng trống.</p>
          )}
        </div>

        <div className={cx("totalAmount")}>
          <h3>Tổng tiền</h3>
          <p>{result} VND</p>
        </div>

        <form className={cx("userInfo")} onSubmit={formik.handleSubmit}>
          <h3>Thông tin giao hàng</h3>
          <label className={cx("label")}>
            Id Sản phẩm:
            <>
              <input type="text" value={id} />
            </>
          </label>

          <label>
            Tên:
            <>
              <input
                onChange={formik.handleChange}
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                placeholder="Nhập tên của bạn"
              />
            </>
          </label>
          <label>
            Địa chỉ:
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Nhập địa chỉ của bạn"
            />
          </label>
          <label>
            Số điện thoại:
            <input
              type="number"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Nhập email của bạn"
            />
          </label>

          <div className={cx("paymentMethod")}>
            <h3>Phương thức thanh toán</h3>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
            >
              <option value="cash">Tiền mặt khi nhận hàng</option>
              <option value="creditCard">Thẻ tín dụng</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className={cx("checkoutButton")}>
            <button type="submit">Thanh toán</button>
            {/* <button onClick={handleReset}>Hủy</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPageMain;
