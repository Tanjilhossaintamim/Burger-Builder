import { connect } from "react-redux";
import Burger from "./burger/Burger";
import Control from "./controls/Control";
import {
  add_ingrediant,
  remove_ingrediant,
  updata_purcsheable,
} from "../../../redux/ActionCreators";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from "react";
import Summery from "./summery/Summery";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    ingrediants: state.ingrediants,
    totalAmount: state.totalAmount,
    purchsesAble: state.purchsesAble,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add_ingrediants: (igType) => dispatch(add_ingrediant(igType)),
    remove_ingrediants: (igType) => dispatch(remove_ingrediant(igType)),
    update_purchaseable: () => dispatch(updata_purcsheable()),
  };
};

const BurgerBuilder = ({
  ingrediants,
  totalAmount,
  add_ingrediants,
  remove_ingrediants,
  purchsesAble,
  update_purchaseable,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
  };
  const addIngrediant = (type) => {
    add_ingrediants(type);
    update_purchaseable();
  };
  const removeIngediant = (type) => {
    remove_ingrediants(type);
    update_purchaseable();
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  document.title = "Burger Build";
  return (
    <div className="container">
      <div className="d-flex mt-5 flex-md-row flex-column justify-content-center">
        <Burger ingrediants={ingrediants} />
        <Control
          totalAmount={totalAmount}
          ingrediantAdd={addIngrediant}
          ingrediantRemove={removeIngediant}
          purchsesAble={purchsesAble}
          toggleModal={toggleModal}
        />
      </div>
      <Modal isOpen={modalOpen}>
        <ModalHeader>Your Order Summery </ModalHeader>
        <ModalBody>
          <Summery ingrediants={ingrediants} />
        </ModalBody>
        <ModalFooter>
          <button
            style={{ backgroundColor: "#D70F64", color: "#fff" }}
            className="btn"
            onClick={goToCheckout}
          >
            Proceed To Check Out{" "}
          </button>
          <button className="btn btn-secondary" onClick={toggleModal}>
            Cancel{" "}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
