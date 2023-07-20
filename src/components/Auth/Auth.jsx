import { Formik } from "formik";
import { useState } from "react";
import { Authenication } from "../../redux/AuthActionCreators";
import { connect } from "react-redux";
import Spinner from "../body/spinner/Spinner";
import { Alert } from "reactstrap";

const mapDispatchToProps = (dispatch) => {
  return {
    authenication: (email, password, mode) =>
      dispatch(Authenication(email, password, mode)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth_is_loading: state.auth_is_loading,
    auth_error_message: state.auth_error_message,
  };
};

const Auth = ({ authenication, auth_is_loading, auth_error_message }) => {
  const [formMode, setFormChange] = useState("SignUp");
  const handelSwithAuthForm = () => {
    setFormChange(formMode === "SignUp" ? "Login" : "SignUp");
  };
  if (formMode == "SignUp") {
    document.title = "SignUP";
  } else {
    document.title = "Login";
  }
  if (auth_is_loading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-4">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) =>
          authenication(values.email, values.password, formMode)
        }
        validate={(values) => {
          let errors = {};
          if (!values.email) {
            errors.email = "Email Field Must Required !";
          } else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              values.email
            )
          ) {
            errors.email = "Invalid Email !";
          }
          if (!values.password) {
            errors.password = "Password Must Required !";
          } else if (values.password.length < 8) {
            errors.password = "Password Must Be 8 Character";
          }
          if (formMode == "SignUp") {
            if (!values.confirmPassword) {
              errors.confirmPassword = "Confirm Password Must Required !";
            } else if (values.password != values.confirmPassword) {
              errors.confirmPassword = "Password Does not Match !";
            }
          }

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <div
            style={{
              width: "80%",
              margin: "0 auto",
              border: "1px solid gray",
              padding: "20px",
              marginTop: "50px",
              borderRadius: "5px",
            }}
          >
            {auth_error_message && (
              <Alert color="danger">{auth_error_message}</Alert>
            )}

            <button
              className="btn btn-lg"
              style={{
                width: "100%",
                backgroundColor: "#D70F64",
                color: "#fff",
                marginBottom: "15px",
              }}
              onClick={handelSwithAuthForm}
            >
              {formMode == "SignUp" ? "Switch To Login" : "Switch To SignUp"}
            </button>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="form-control"
                value={values.email}
                onChange={handleChange}
              />

              <span style={{ color: "red" }}>{errors.email}</span>
              <br />
              <br />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                className="form-control"
                onChange={handleChange}
              />

              <span style={{ color: "red" }}>{errors.password}</span>
              <br />
              <br />
              {formMode == "SignUp" && (
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    id=""
                    value={values.confirmPassword}
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />

                  <span style={{ color: "red" }}>{errors.confirmPassword}</span>
                  <br />
                  <br />
                </div>
              )}

              <input
                type="submit"
                value={formMode == "SignUp" ? "SignUp" : "Login"}
                className="btn btn-success"
              />
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
