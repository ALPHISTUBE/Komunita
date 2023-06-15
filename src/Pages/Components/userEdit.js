import "./userEdit.css";
import { updateProfile } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase";

export function TurnON() {
  const element = document.getElementById("editorPop");
  element.style.display = "flex";
}

let userInfo;

function UserEdit() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        userInfo = user;
      }
    });
  }, []);

  const changeOnState = () => {
    const name = document.getElementById("username");
    updateProfile(userInfo, {displayName: name.value});
    const element = document.getElementById("editorPop");
    element.style.display = "none";
    window.location.reload();
  };

  return (
    <div id="editorPop" className="Editior">
      <div className="box">
        <button>
          <div src="" />
        </button>
        <p>Change Username</p>
        <input id="username"></input>
      </div>
      <button onClick={changeOnState} className="close">
      <ion-icon name="close-circle-outline"></ion-icon>
      </button>
    </div>
  );
}

export default UserEdit;
