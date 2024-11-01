import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card/Card";
import PaginationItem from "../../../../components/Pagination/Pagination";
import styles from "./ShowCard.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import { fetchCartProductAPI } from "../../../../store/slices/CartProductSlice";
const cx = classNames.bind(styles);

const CardContent = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.cartProductState.card
  );
  console.log(products, "shop");
  useEffect(() => {
    dispatch(fetchCartProductAPI());
  }, []);
  return (
    <div>
      <div className={cx("main-home-cart-content")}>
        {products.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
      <PaginationItem />
    </div>
  );
};

export default CardContent;
