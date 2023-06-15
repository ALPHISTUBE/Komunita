import { useEffect, useState } from "react";
import "./Navber.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { TurnON } from "./userEdit";

function Navber() {
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log(auth.currentUser);
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const l = () => {
    TurnON();
  };

  return (
    <section className="Navber">
      <div className="logo">KOMUNITA</div>
      <div className="searchBar">
        <label className="srcIcon">
          <ion-icon name="search-outline"></ion-icon>
        </label>
        <input type="text" required></input>
      </div>
      <ul className="ProfileBox">
        <li className="profile">
          <ion-icon name="person-circle-outline"></ion-icon>
          <p>{username}</p>
          <button onClick={l}></button>
        </li>
        <li className="Logout">
          <button onClick={handleLogout}>LOG OUT</button>
        </li>
      </ul>
    </section>
  );
}

export default Navber;
