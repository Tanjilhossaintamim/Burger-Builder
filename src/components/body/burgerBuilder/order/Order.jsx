import { useEffect } from "react";
import { fetchOrder } from "../../../../redux/ActionCreators";
import { connect } from "react-redux";
import Spinner from "../../spinner/Spinner";
import SingelOrder from "./SingelOrder";
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    order_is_loading: state.order_is_loading,
    order_load_err: state.order_load_err,
    errorMessage: state.errorMessage,
    token: state.tokenId,
    userId: state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_order: (token, userId) => dispatch(fetchOrder(token, userId)),
  };
};
const Order = ({
  fetch_order,
  order_is_loading,
  orders,
  order_load_err,
  errorMessage,
  token,
  userId,
}) => {
  let order = null;
  if (order_load_err) {
    order = (
      <p
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "0 10px",
          borderRadius: "5px",
        }}
      >
        {errorMessage}
      </p>
    );
  } else {
    if (orders.length == 0) {
      order = (
        <p
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "0 10px",
            borderRadius: "5px",
          }}
        >
          You Have No Order
        </p>
      );
    } else {
      order = orders.map((item) => {
        return <SingelOrder order={item} key={item.id} />;
      });
    }
  }

  useEffect(() => {
    fetch_order(token, userId);
  }, []);
  document.title = "Order";

  return (
    <div className="container mt-3">
      {order_is_loading ? <Spinner /> : order}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
