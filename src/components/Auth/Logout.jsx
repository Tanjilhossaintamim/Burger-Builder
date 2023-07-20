import { connect } from "react-redux";
import { logout } from "../../redux/AuthActionCreators";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const Logout = ({ logout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
  }, []);
};

export default connect(null, mapDispatchToProps)(Logout);
