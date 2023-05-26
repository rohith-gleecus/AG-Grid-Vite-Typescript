import './footer.css';

function Footer(): JSX.Element {
  return (
    <div className="footer" style={{ marginTop: "90px" }}>
      <div className="container">
        <footer>
          <ul className="nav justify-content-center border-bottom pb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Footer</a></li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default Footer;

