import React, { useState } from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import axios from "axios";
import { resetStore } from "../../../../redux/ActionCreators";
import { Formik } from "formik";

const mapStateToProps = (state) => {
  return {
    ingrediants: state.ingrediants,
    purchsesAble: state.purchsesAble,
    totalPrice: state.totalAmount,
    userId: state.userId,
    token: state.tokenId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    reset_store: () => dispatch(resetStore()),
  };
};
const Checkout = ({
  purchsesAble,
  ingrediants,
  totalPrice,
  reset_store,
  userId,
  token,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  const placed_order = (info) => {
    setIsLoading(true);

    let orders = {
      ingrediants: ingrediants,
      customerInfo: info,
      totalAmount: totalPrice,
      orderDate: new Date(),
      userId: userId,
    };
    axios
      .post(
        "https://burger-builder-ac0e1-default-rtdb.firebaseio.com/orders.json?auth=" +
          token,
        orders
      )
      .then((response) => {
        if (response.status == 200) {
          setIsLoading(false);
          setModalOpen(true);
          reset_store();
          setModalMessage("Your Order Placed Successfully !");
        } else {
          setIsLoading(false);
          setModalOpen(true);
          setModalMessage("Some Thing Went Wrong Try Again !");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setModalOpen(true);
        setModalMessage(err.message);
      });
  };

  const form = (
    <Formik
      initialValues={{
        address: "",
        phone: "",
        paymentType: "Cash On Delivary",
      }}
      onSubmit={(values) => {
        placed_order(values);
      }}
      validate={(values) => {
        let errors = {};
        if (!values.address) {
          errors.address = "Field Must Required !";
        }
        if (!values.phone) {
          errors.phone = "Phone Number Must required !";
        } else if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(values.phone)) {
          errors.phone = "Phone number Not Valid !";
        }
        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <div
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px rgba(0,0,0,0.02)",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <p
            style={{
              border: "1px solid #ccc",
              boxShadow: "1px 1px rgba(0,0,0,0.02)",
              padding: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
          >
            Payment : {totalPrice} BDT
          </p>
          <form onSubmit={handleSubmit}>
            <textarea
              name="address"
              cols="30"
              rows="10"
              placeholder="Your Address "
              className="form-control"
              value={values.address}
              onChange={handleChange}
            ></textarea>
            <span style={{ color: "red" }}>{errors.address}</span>
            <br />
            <br />
            <input
              type="tel"
              name="phone"
              id=""
              value={values.phone}
              placeholder="Your Phone Number"
              className="form-control"
              onChange={handleChange}
            />{" "}
            <span style={{ color: "red" }}>{errors.phone}</span>
            <br />
            <br />
            <select
              name="paymentType"
              id=""
              value={values.paymentType}
              className="form-control"
              onChange={handleChange}
            >
              <option value="Cash On Delivary">Cash On Delivary</option>
              <option value="Bkash">Bkash</option>
            </select>
            <br />
            <input
              type="submit"
              value="Place Order"
              className="btn"
              disabled={!purchsesAble}
              style={{
                backgroundColor: "#D60F64",
                color: "#fff",
                margin: "0 10px",
              }}
            />
            <Button type="button" onClick={goBack}>
              Cancel
            </Button>
          </form>
        </div>
      )}
    </Formik>
  );
  document.title = "CheckOut";
  return (
    <div className="container my-5">
      <Modal isOpen={modalOpen}>
        <ModalHeader>{modalMessage}</ModalHeader>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#D70F64", color: "#fff" }}
            onClick={goBack}
          >
            Go Home{" "}
          </Button>
        </ModalFooter>
      </Modal>
      {isLoading ? <Spinner /> : form}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
