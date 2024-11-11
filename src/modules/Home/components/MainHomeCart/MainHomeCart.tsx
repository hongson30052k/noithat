import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card/Card";
import { RootState } from "../../../../store/store";
import styles from "./MainHomeCart.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import {
  fetchCartProductAPI,
  fetchGetImgProduct,
} from "../../../../store/slices/CartProductSlice";

const cx = classNames.bind(styles);

const MainHomeCart = () => {
  const dispatch = useDispatch();
  const { card, cartImg } = useSelector(
    (state: RootState) => state.cartProductState
  );
  console.log(cartImg, "cartImg");
  console.log(card, "card");
  const data = card?.map((item) => {
    const item1 = cartImg?.find((item2) => item2?.id === item?.id);
    return item1 ? { ...item, ...item1 } : item;
  });
  console.log(data, "data");
  useEffect(() => {
    dispatch(fetchCartProductAPI());
    dispatch(fetchGetImgProduct());
  }, []);
  return (
    <div className={cx("main-home-cart")}>
      <span className={cx("title")}>Our Products</span>
      <div className={cx("main-home-cart-content")}>
        {data && data.map((data) => <Card key={data.id} data={data} />)}
      </div>
      <button className={cx("show-all")}>Show More</button>
    </div>
  );
};

export default MainHomeCart;
