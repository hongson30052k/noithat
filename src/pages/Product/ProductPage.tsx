import { Fragment } from "react/jsx-runtime";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Product from "../../modules/Product/Product.module";
import ShoppingCart from "../../components/Shopping Cart/ShoppingCart";

const ProductPage = () => {
  return (
    <Fragment>
      <Header />
      <Product />
      <ShoppingCart />
      <Footer />
    </Fragment>
  );
};

export default ProductPage;
