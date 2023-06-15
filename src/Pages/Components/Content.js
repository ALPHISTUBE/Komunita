import SideBar from "./SideBar";
import Post from "./Post";
import './Content.css';

function Content(){
    return(
    <div className="content">
        <div className="ChatBox"><SideBar/></div>
        <div className="PostBox"><Post/></div>        
    </div>
    );
}

export default Content;