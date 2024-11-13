import { useDispatch, useSelector } from "react-redux";
import Ratings from "../../../../components/Rating/Rating";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../../store/store";
import { useCallback, useEffect, useState } from "react";
import {
  fetchGetImgProduct,
  fetchGetImgProductId,
  fetchProductApi,
} from "../../../../store/slices/CartProductSlice";
import {
  fetchAddProductId,
  fetchDecrease,
  fetchIncrease,
} from "../../../../store/slices/UserProductSlice";
import { axiosInstance } from "../../../../api/axiosClient";
const cx = classNames.bind(styles);

const ProductList = () => {
  const id: any = localStorage.getItem("productId");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
  const { cardId, cardImg, status }: any = useSelector(
    (state: RootState) => state.cartProductState
  );
  const handleDecrease = async () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };
  const handleIncrease = async () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = async (id: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (data && user?.id) {
      try {
        const existData: any = await axiosInstance.get(
          `/cart?userId=${user?.id}`
        );
        const hasProduct = existData.find(
          (item: any) => item?.productId === id
        );
        if (hasProduct) {
          const body = {
            productId: id,
            quantity: Number(hasProduct?.quantity) + quantity,
          };
          await axiosInstance.put(
            `/cart?productId=${hasProduct?.productId}`,
            body
          );
        } else {
          const body = {
            productId: id,
            quantity: quantity,
            userId: user?.id,
            color: color,
          };
          await axiosInstance.post("/cart", body);
        }
      } catch (error) {}
    }
  };
  const fetchData = useCallback(async (id: any) => {
    try {
      await dispatch(fetchProductApi(id));
      await dispatch(fetchGetImgProductId(id));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, []);
  const data = { ...cardId, ...cardImg };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
    if (data?.color && data?.color.length > 0) {
      setColor(data?.color[0]);
    }
  }, [id, fetchData]);
  const handleAddColor = (item: any) => {
    setColor(item);
  };
  return (
    <>
      {data && (
        <>
          <div className={cx("product-list")}>
            <div className={cx("product-list-content")}>
              <div className={cx("product-list-img2")}>
                <img
                  src={data?.img}
                  alt=""
                  className={cx("product-list-img2")}
                />
              </div>
              <br />
              <br />
              <div className={cx("product-list-info")}>
                <span className={cx("text-title")}>{data?.name}</span>
                <span className={cx("text-price")}>${data?.price}</span>
                <Ratings />
                <span className={cx("text-muted")}>{data?.description}</span>
                <span className={cx("text-size")}>Size</span>
                <div className={cx("size-list")}>
                  {data?.size &&
                    data?.size.map((item: any) => {
                      return (
                        <div key={item} className={cx("size-item")}>
                          {item}
                        </div>
                      );
                    })}
                </div>
                <span className={cx("text-color")}>Color</span>
                <div className={cx("color-list")}>
                  {data?.color &&
                    data?.color.map((item: any, index: any) => {
                      return (
                        <div
                          key={item}
                          style={{
                            backgroundColor: item,
                            ...(color === item
                              ? { border: "2px solid red" }
                              : {}),
                          }}
                          // className={cx("color-item")}
                          onClick={() => {
                            handleAddColor(item);
                          }}
                        >
                          {/* {item} */}
                        </div>
                      );
                    })}
                </div>
                <div className={cx("product-list-button")}>
                  <div className={cx("product-list-quantity")}>
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                  </div>
                  <button
                    className={cx("btn-add")}
                    onClick={() => {
                      handleAddToCart(data?.id);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
                <div className={cx("border-style")}></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
