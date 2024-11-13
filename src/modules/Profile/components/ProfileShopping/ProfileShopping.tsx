import { useEffect, useState } from "react";
import styles from "./ProfileShopping.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDecrease,
  fetchDeleteProduct,
  fetchDeleteUserProduct,
  fetchGetUserProduct,
  fetchIncrease,
} from "../../../../store/slices/UserProductSlice";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const ProfileShopping = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  let result = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProducts, action } = useSelector(
    (state: RootState) => state.userProductState
  );
  console.log(userProducts, "userProducts");
  const deleteAllCart = async () => {
    const res: any = await dispatch(fetchDeleteUserProduct(user.id));
  };
  const handleIncrease = (id: any) => {
    dispatch(fetchIncrease(id));
  };
  const handleDecrease = (id: any) => {
    dispatch(fetchDecrease(id));
  };
  const handleDelete = async (id: any) => {
    await dispatch(fetchDeleteProduct(id));
  };
  useEffect(() => {
    dispatch(fetchGetUserProduct(user.id));
  }, [action, dispatch]);

  if (userProducts && userProducts.length > 0) {
    for (let i = 0; i < userProducts.length; i++) {
      result += userProducts[i].product.price * userProducts[i].quantity;
    }
  }
  const handleSubmit = () => {
    if (result > 0) {
      navigate("/order");
    } else {
      alert("Gior hàng trống!");
    }
  };
  return (
    <div className={cx("shopping-cart")}>
      <div className={cx("cart-header")}>
        <h2>Giỏ Hàng</h2>
        <button className={cx("clear-cart")} onClick={deleteAllCart}>
          Xóa Giỏ Hàng
        </button>
      </div>
      {userProducts && userProducts.length > 0 ? (
        userProducts.map((item: any) => (
          <div className={cx("cart-items")}>
            <div key={item.product.id} className={cx("cart-item")}>
              <img alt={item.product.name} className="item-image" />
              <div className={cx("item-details")}>
                <h3>{item.product.name}</h3>
                <div className={cx("price-info")}>
                  <p className={cx("original-price")}>
                    {item.product.original_price} VND
                  </p>
                  <p className={cx("discounted-price")}>
                    {item.product.discounted_price} VND
                  </p>
                </div>
                <div className={cx("item-quantity")}>
                  <button onClick={() => handleDecrease(item.productId)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.productId)}>
                    +
                  </button>
                </div>
                <button
                  className={cx("remove-item")}
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={cx("cart-empty")}>không có sản phẩm</div>
      )}

      <div className={cx("cart-summary")}>
        <div className={cx("total")}>
          <p>Tổng tiền:</p>
          <p className={cx("total-price")}>{result} VND</p>
        </div>
        <button className={cx("checkout-button")} onClick={handleSubmit}>
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default ProfileShopping;
