import './Footer.css';
import fundoOnca from '../assets/fundoOnca.png';

function Footer() {
  return (
    <div
      className="siteFooter"
      style={{
        backgroundImage: `url(${fundoOnca})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <span className="fontBrattzynha">Brattzynha</span>
    </div>
  );
}

export default Footer;
