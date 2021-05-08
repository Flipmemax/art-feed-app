import { NavLink } from "react-router-dom";
import "./Style/NavBar.css";

export default function NavBar() {
  return (
    <div className="NavStyle">
      <div className="InnerNav">
        <NavLink className="NavText" to="/">
          Home
        </NavLink>
        <NavLink className="NavText" to="/explore">
          Explore Art
        </NavLink>
      </div>
    </div>
  );
}
