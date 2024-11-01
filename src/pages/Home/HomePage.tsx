import { Fragment } from "react/jsx-runtime";
import Header from "../../components/Header/Header";
import HomeModule from "../../modules/Home/Home.module";
import Footer from "../../components/Footer/Footer";
import ShoppingCart from "../../components/Shopping Cart/ShoppingCart";

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <HomeModule />
      <ShoppingCart />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
