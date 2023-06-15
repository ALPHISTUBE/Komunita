import "./Login.css";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmission = () => {

    if (!values.email || !values.pass) {
      setErrorMsg("FILL ALL FIELDS");
      return;
    }

    setErrorMsg("");

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((userCredential) => {
        localStorage.setItem("isAuth", true);
        navigate("/Home");
      })
      .catch((error) => {});
  };

  return (
    <section className="BorderBox">
      <div className="form-box">
        <div className="form-value">
          <h2>LOGIN</h2>
          <div className="inputBox">
            <ion-icon name="person-outline"></ion-icon>
            <input
              type="text"
              required
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <label>Email</label>
          </div>
          <div className="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              required
              onChange={(event) =>
                setValues((prev) => ({ ...prev, pass: event.target.value }))
              }
            />
            <label>Password</label>
            <b className="errorMsg">{errorMsg}</b>
          </div>
          <div className="register">
            <p>
              Don't have a account? <a href="/Signup">Register</a>{" "}
            </p>
          </div>
          <button className="logButton" onClick={handleSubmission}>
            Log in
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
