import Layout from "../../components/layout/Layout";
import "./contactus.css";

const Contact = () => {
  const handleSave = () => {
    alert("Request sent successfully!");
  };

  return (
    <Layout>
      <div className="container-fluid main">
        {/* Article 2 */}
        <article className="min-vh-1000 p-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-12">
                <h3 className="contact">Contact Us</h3>
                <p
                  className="contactexp"
                  style={{ marginBottom: "30px", textAlign: "justify" }}
                >
                  Reach out to our Trachel team for personalized assistance,
                  reservations, customizations, and any special arrangements you
                  may need.
                </p>
                <form
                  className="form-1 row g-3 p-3 rounded-5"
                  style={{ backgroundColor: "#fff" }}
                >
                  <div className="col-12">
                    <label htmlFor="inputFirstName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control bg-body-white"
                      id="inputFirstName"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control bg-body-white"
                      id="inputEmail"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      className="form-control bg-body-white"
                      id="inputPhone"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputMessage" className="form-label">
                      Message
                    </label>
                    <input
                      type="text"
                      className="form-control bg-body-white"
                      id="inputPhone"
                      style={{ height: "100px" }}
                    />
                  </div>
                  <div className="col-6 membership">
                    <select
                      className="form-select bg-body-white"
                      aria-label="Default select example"
                    >
                      <option selected>Select Membership</option>
                      <option value="1">Non-Member</option>
                      <option value="2">Membership</option>
                    </select>
                  </div>
                  <div className="col-12 button-contact">
                    <button
                      type="submit"
                      className="btn-send"
                      onClick={handleSave}
                      style={{
                        background: "#4392F6",
                        color: "aliceblue",
                        padding: "6px 25px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="col-lg-6 col-sm-12 d-flex justify-content-end"
                style={{ marginTop: "200px" }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <img
                  src="/contactus.svg"
                  alt="Contact Us"
                  style={{ width: "550px", height: "470px" }}
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Contact;
