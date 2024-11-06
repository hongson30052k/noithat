import { useState } from "react";
import styles from "./ProfileShopping.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const ProfileShopping = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Áo thun nam",
      originalPrice: 250000,
      discountedPrice: 199000,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Giày thể thao",
      originalPrice: 650000,
      discountedPrice: 550000,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Balo thời trang",
      originalPrice: 400000,
      discountedPrice: 350000,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ]);

  return (
    <div className={cx("shopping-cart")}>
      <div className={cx("cart-header")}>
        <h2>Giỏ Hàng</h2>
        <button className={cx("clear-cart")}>Xóa Giỏ Hàng</button>
      </div>

      <div className={cx("cart-items")}>
        {cartItems.map((item) => (
          <div key={item.id} className={cx("cart-item")}>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className={cx("item-details")}>
              <h3>{item.name}</h3>
              <div className={cx("price-info")}>
                <p className={cx("original-price")}>
                  {item.originalPrice.toLocaleString()} VND
                </p>
                <p className={cx("discounted-price")}>
                  {item.discountedPrice.toLocaleString()} VND
                </p>
              </div>
              <div className={cx("item-quantity")}>
                <button disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
              <button className={cx("remove-item")}>Xóa</button>
            </div>
          </div>
        ))}
      </div>

      <div className={cx("cart-summary")}>
        <div className={cx("total")}>
          <p>Tổng tiền:</p>
          <p className={cx("total-price")}>{2000000} VND</p>
        </div>
        <button className={cx("checkout-button")}>Thanh Toán</button>
      </div>
    </div>
  );
};

export default ProfileShopping;
