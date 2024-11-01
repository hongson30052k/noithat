import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsSharpIcon from "@mui/icons-material/CompareArrowsSharp";
import img from "./img/img.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/CartSlice";
import { getProductId } from "../../store/slices/CartProductSlice";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Card = ({ product }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  const onGetProduct = (id: any) => {
    dispatch(getProductId(id));
  };
  console.log(product);
  return (
    <>
      {product && (
        <div className={cx("card")}>
          {product.discount && (
            <div className={cx("card-percent-discount")}>
              <span className={cx("text-percent-discount")}>
                {product.discount}
              </span>
            </div>
          )}
          <img src={img} alt="" onClick={() => onGetProduct(product.id)} />
          <div
            className={cx("card-info")}
            onClick={() => {
              onGetProduct(product.id);
              navigate(`/product/${product.id}`);
            }}
          >
            <span className={cx("card-title")}>{product.name}</span>
            <span className={cx("card-text")}>{product.description}</span>
            <div className={cx("card-price-container")}>
              <span className={cx("card-price")}>{product.price}</span>
              <span className={cx("card-price-discount")}>{product.price}</span>
            </div>
          </div>
          <div className={cx("card-button")}>
            <div className={cx("btn")} onClick={() => onAddToCart(product)}>
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
