import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card/Card";
import PaginationItem from "../../../../components/Pagination/Pagination";
import styles from "./ShowCard.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import {
  fetchCartProductAPI,
  fetchGetImgProduct,
} from "../../../../store/slices/CartProductSlice";
const cx = classNames.bind(styles);

const CardContent = () => {
  const dispatch = useDispatch();
  const { cartImg, card } = useSelector(
    (state: RootState) => state.cartProductState
  );
  console.log(cartImg, "cartImg");
  console.log(card, "cardId");
  const data = card?.map((item) => {
    const item1 = cartImg?.find((item2) => item2?.id === item?.id);
    return item1 ? { ...item, ...item1 } : item;
  });
  console.log(data, "data");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCartProductAPI());
        await dispatch(fetchGetImgProduct());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className={cx("main-home-cart-content-show")}>
        {data?.map((data, index) => {
          return <Card key={index} data={data} />;
        })}
      </div>
      <PaginationItem />
    </div>
  );
};

export default CardContent;
