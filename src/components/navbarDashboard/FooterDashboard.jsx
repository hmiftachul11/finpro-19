import "./footerDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
  return (
    <footer id="footer">
      {/* Copyright */}
      <div className="container pb-4">
        <div
          className="row align-items-center justify-content-between"
          style={{ paddingTop: "30px" }}
        >
          <div className="col-md-auto mb-2">
            <img
              src="/logo.webp"
              width={"160px"}
              height={"40px"}
              alt="logo"
            />
          </div>
          <div
            className="col-md-auto mb-2"
            style={{ fontSize: "16px", color: "#4392F6" }}
          >
            All rights Reserved <i className="bi bi-c-circle"></i>{" "}
            <b>Miftachul Huda 2024</b>
          </div>
          <div
            className="col-md-auto mb-2"
            style={{ fontSize: "16px", color: "#4392F6" }}
          >
            Made with <i className="bi bi-heart-fill"></i> for Dibimbing Final
            Project
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
