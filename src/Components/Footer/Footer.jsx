import "./Footer.css";

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">LOCATIONS</div>
          <div className="list">
            <ul>
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">ABOUT US</div>
          <div className="list">
            <ul>
              <li>About OLX Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>OLXPeople</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading"> OLX</div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries Pakistan - South Africa - Indonesia</p>
        <p className="copyright-text">
          Free Classifieds in India. © 2006-2021 OLX
        </p>
      </div>
    </div>
  );
}

export default Footer;
