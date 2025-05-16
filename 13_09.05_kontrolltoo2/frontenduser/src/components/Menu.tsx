import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <ul>
        <li><Link to="/users">Kasutajad</Link></li>
        <li><Link to="/users/add">Lisa kasutaja</Link></li>
        <li><Link to="/login">Logi sisse</Link></li> 
      </ul>
    </nav>
  );
}

export default Menu;
