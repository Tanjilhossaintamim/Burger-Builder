import { Navigate, Route, Routes } from "react-router-dom";
import BurgerBuilder from "./burgerBuilder/BurgerBuilder";
import Order from "./burgerBuilder/order/Order";
import Checkout from "./burgerBuilder/order/Checkout";
import Auth from "../Auth/Auth";
import { connect } from "react-redux";
import Logout from "../Auth/Logout";

const mapStateToProps = (state) => {
  return {
    token: state.tokenId,
  };
};

const BodyComponent = ({ token }) => {
  let route = null;
  if (token == null) {
    route = (
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  } else {
    route = (
      <Routes>
        <Route path="/" element={<BurgerBuilder />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return <>{route}</>;
};

export default connect(mapStateToProps)(BodyComponent);
