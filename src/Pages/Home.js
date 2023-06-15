import Navber from "./Components/Navber";
import UserEdit from "./Components/userEdit";
import Content from "./Components/Content";
import "./Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      navigate("/Login");
    }
  }, []);

  return (
    <section className="Home">
      <div className="nav">
        <Navber/>
      </div>
      <div className="user">
        <UserEdit />
      </div>
      <div className="content">
        <Content />
      </div>
    </section>
  );
}

export default Home;
