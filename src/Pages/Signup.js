import "./Login.css";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const [values, setValues] = useState({
    email: "",
    pass: "",
    username: "",
  });

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmission = () => {
    if (!values.email || !values.username || !values.pass) {
      setErrorMsg("FILL ALL FIELDS");
      return;
    }

    setErrorMsg("");

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async(res) => {
        const user = res.user;
        await updateProfile(user, {displayName: values.username});
        navigate("/Login");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <section className="BorderBox">
      <div className="form-box">
        <div className="form-value">
          <h2>SIGNUP</h2>
          <div className="inputBox">
            <ion-icon name="person-outline"></ion-icon>
            <input
              type="text"
              required
              onChange={(event) =>
                setValues((prev) => ({ ...prev, username: event.target.value }))
              }
            />
            <label>Username</label>
          </div>
          <div className="inputBox">
            <ion-icon name="lock-closed-outline"></ion-icon>
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
              Already Have account? <a href="/Login">Log in</a>{" "}
            </p>
          </div>
          <button className="logButton" onClick={handleSubmission}>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}

export default Signup;
