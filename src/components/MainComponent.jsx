import { useEffect } from "react";
import { authCheck } from "../redux/AuthActionCreators";
import BodyComponent from "./body/BodyComponent";
import HeaderComponent from "./header/HeaderComponent";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    auth_check: () => dispatch(authCheck()),
  };
};

const MainComponent = ({ auth_check }) => {
  useEffect(() => {
    auth_check();
  }, []);
  return (
    <div>
      <HeaderComponent />
      <BodyComponent />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MainComponent);
