import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsSharpIcon from "@mui/icons-material/CompareArrowsSharp";
import img from "./img/img.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetImgProductId,
  fetchProductApi,
  getProductId,
} from "../../store/slices/CartProductSlice";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { fetchCreateProductId } from "../../store/slices/UserProductSlice";
import { useEffect } from "react";
import { RootState } from "../../store/store";
import { calculateDiscountPercentage } from "../../utils/calculateDiscountPercentage/calculateDiscountPercentage";

const cx = classNames.bind(styles);

const Card = ({ data }: any) => {
  console.log(data, "datas");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onAddToCart = async (id: any) => {
    const res: any = await dispatch(fetchCreateProductId(id));
    const result = res.payload;
    if (typeof result === "string") {
      alert(result);
    } else {
      alert("Đã thêm sản phẩm vào giỏ hàng");
    }
  };
  const onGetProduct = (id: any) => {
    dispatch(getProductId(id));
    localStorage.setItem("productId", id);
  };
  return (
    <>
      {data && (
        <div className={cx("card")}>
          {data.title > 0 && (
            <div className={cx("card-percent-discount")}>
              <span className={cx("text-percent-discount")}>
                -{calculateDiscountPercentage(data.price, data.title)}%
              </span>
            </div>
          )}
          <img src={data.img} alt="" onClick={() => onGetProduct(data.id)} />
          <div
            className={cx("card-info")}
            onClick={() => {
              onGetProduct(data.id);
              navigate(`/product/${data.id}`);
            }}
          >
            <span className={cx("card-title")}>{data.name}</span>
            <span className={cx("card-text")}>{data.description}</span>
            <div className={cx("card-price-container")}>
              <span className={cx("card-price")}>{data.price}</span>
              <span className={cx("card-price-discount")}>{data.title}</span>
            </div>
          </div>
          <div className={cx("card-button")}>
            <div className={cx("btn")} onClick={() => onAddToCart(data.id)}>
              ADD TO CART
            </div>
            <div className={cx("card-icon")}>
              <Link to="/" className={cx("card-button-icon")}>
                <FavoriteIcon />
                <span className={cx("card-button-icon-text")}>Like</span>
              </Link>
              <Link to="/" className={cx("card-button-icon")}>
                <CompareArrowsSharpIcon />
                <span className={cx("card-button-icon-text")}>Share</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
