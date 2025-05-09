import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-word">Add Word</Link></li>
        <li><Link to="/managers">Managers</Link></li>
        {/* <li><Link to="/manage-words">Manage Words</Link></li> */}
      </ul>
    </nav>
  );
}

export default Menu;
