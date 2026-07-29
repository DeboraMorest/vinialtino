import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import fundoOnca from '../assets/fundoOnca.png';
import vinialtino from '../assets/vinialtino.png';

const links = [
  { to: '/', label: 'Sobre' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/roleta', label: 'Roleta' },

  { to: '/sorteio', label: 'Sorteio' },
  { to: '/vini', label: 'Vini' },
];

function Navbar() {
  return (
    <nav
      className="navBar"
      style={{
        backgroundImage: `url(${fundoOnca})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#111',
      }}
    >
      <Link to="/" className="logoContainer logoLink">
        <img className="logoViniImage" src={vinialtino} alt="Vini Altíssimo" />
        <h1 className="logoViniNavbar">Vinialtino</h1>
      </Link>

      <ul className="listaNavBar">
        {links.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'navLink active' : 'navLink'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
