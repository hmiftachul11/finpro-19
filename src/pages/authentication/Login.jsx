import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { login } from "../../api/api";
import "./login.css";
import Layout from "../../components/layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");
  const [notifError, setNotifError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  console.log(email, password);
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    setLoading(true);

    login(payload)
      .then((response) => {
        setNotif("Login Success");
        const token = response.data.token;
        const data = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("data", JSON.stringify(data));
        console.log("response", response.data);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response);
        setNotifError(error.response.data.message);
        setShowModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="loginpage row ">
        <div className="login-container col-md-6">
          <div className="login-box">
            <img
              src="/logo.webp"
              width={"160px"}
              height={"40px"}
            />
            <h2>Account Log in / Sign up</h2>
            <label className="form-label">Email:</label>
            <input
              type="text"
              placeholder="your@email.com"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <label className="form-label">Password:</label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <p className="register">
              Dont have account? <Link to="/register">Register</Link>
            </p>
            <button disabled={loading ? true : false} onClick={handleSubmit}>
              {loading ? "Loading..." : "Continue with this email"}
            </button>
            {!!notif.length && <p className="notif">{notif}</p>}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>error</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>{notifError}</h4>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="tagline">
            From Cozy Corners to Grand Horizons,
            <br />
            Embrace Your Adventure.
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
