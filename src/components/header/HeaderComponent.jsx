import { NavLink } from "react-router-dom";
import "./header.css";
import Logo from "../../assets/logo.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    tokenId: state.tokenId,
  };
};

const HeaderComponent = ({ tokenId }) => {
  let navLink = null;
  if (tokenId == null) {
    navLink = (
      <ul>
        <li>
          <NavLink to={"/auth"}>Login</NavLink>
        </li>
      </ul>
    );
  } else {
    navLink = (
      <ul>
        <li>
          <NavLink to={"/"}>Burger Build</NavLink>
        </li>
        <li>
          <NavLink to={"/orders"}>Orders</NavLink>
        </li>
        <li>
          <NavLink to={"/logout"}>Logout</NavLink>
        </li>
      </ul>
    );
  }
  return (
    <div className="header" style={{position:'sticky',top:'0'}}>
      <nav className="mynavbar container">
        <div>
          <a href="/">
            <img src={Logo} alt="logo" width={"70px"} />
          </a>
        </div>
        <div className="all-nav-link">{navLink}</div>
      </nav>
    </div>
  );
};

export default connect(mapStateToProps)(HeaderComponent);
