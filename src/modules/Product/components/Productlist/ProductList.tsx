import { useDispatch, useSelector } from "react-redux";
import Ratings from "../../../../components/Rating/Rating";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";
import { fetchProductApi } from "../../../../store/slices/CartProductSlice";
const cx = classNames.bind(styles);

const ProductList = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: any) => state.cartProductState.productId);
  const cartId: any = useSelector(
    (state: RootState) => state.cartProductState.cardId
  );
  useEffect(() => {
    dispatch(fetchProductApi(id));
  }, []);
  return (
    <>
      {cartId && (
        <>
          <div className={cx("product-list")}>
            <div className={cx("product-list-img2")}>
              <img src="" alt="" className={cx("product-list-img2")} />
            </div>
            <div className={cx("product-list-info")}>
              <span className={cx("text-title")}>{cartId.name}</span>
              <span className={cx("text-price")}>${cartId.price}</span>
              <Ratings />
              <span className={cx("text-muted")}>{cartId.description}</span>
              <span className={cx("text-size")}>Size</span>
              <div className={cx("size-list")}>
                <span>L</span>
                <span>XL</span>
                <span>XS</span>
              </div>
              <span className={cx("text-color")}>Color</span>
              <div className={cx("color-list")}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={cx("product-list-button")}>
                <div className={cx("product-list-quantity")}>
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <button className={cx("btn-add")}>ADD TO CART</button>
              </div>
              <div className={cx("border-style")}></div>
            </div>
          </div>
          <div className={cx("product-list-img")}>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
