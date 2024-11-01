import { Fragment } from "react/jsx-runtime";
import Header from "../../components/Header/Header";
import Shop from "../../modules/Shop/Shop.module";
import Footer from "../../components/Footer/Footer";
import ShoppingCart from "../../components/Shopping Cart/ShoppingCart";

const ShopPage = () => {
  return (
    <Fragment>
      <Header />
      <Shop />
      <Footer />
      <ShoppingCart />
    </Fragment>
  );
};
export default ShopPage;
