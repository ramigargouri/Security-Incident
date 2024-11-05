import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    var loginInfo = { email, password };
    axios
      .get("http://localhost:8000/api/users/" + email)
      .then((res) => {
        if (res.data !== null) {
          // let type = "user";
          // if (res.data.type === "admin") {
          //   type = "admin";
          // }
          axios
            .post("http://localhost:8000/api/login", loginInfo, {
              withCredentials: true,
            })
            .then((result) => {
              console.log("LOGGGIN IN RESPONSE", result);
              if (result.data.msg === "success!") {
                alert("Login Successful");
                window.location.reload(false);
              } else {
                seterrorpassword("password incorrect");
              }
            })
            .catch((err) => alert("Error Server"));
        } else {
          seterroremail("not found");
        }
      })
      .catch((err) => alert("Error Server"));
  };

  return (
    <div className="wrapper">
      <form onSubmit={login}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Username"
            id="email"
            name="email"
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="Password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          {erroremail !== "" ? <p className="text-danger">{erroremail}</p> : ""}
          {errorpassword !== "" ? (
            <p className="text-danger">{errorpassword}</p>
          ) : (
            ""
          )}
          {/* <label>
            <input type="checkbox" />
            Remember me{" "}
          </label> */}
          <a href="#"> Forgot password ? </a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
