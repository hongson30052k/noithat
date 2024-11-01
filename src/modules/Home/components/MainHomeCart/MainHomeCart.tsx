import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card/Card";
import { RootState } from "../../../../store/store";
import styles from "./MainHomeCart.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { fetchCartProductAPI } from "../../../../store/slices/CartProductSlice";

const cx = classNames.bind(styles);

const MainHomeCart = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.cartProductState.card
  );
  useEffect(() => {
    dispatch(fetchCartProductAPI());
  }, []);
  return (
    <div className={cx("main-home-cart")}>
      <span className={cx("title")}>Our Products</span>
      <div className={cx("main-home-cart-content")}>
        {products &&
          products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
      </div>
      <button className={cx("show-all")}>Show More</button>
    </div>
  );
};

export default MainHomeCart;
