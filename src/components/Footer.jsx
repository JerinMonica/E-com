
import React from 'react';

const Footer = () => {
  return (
    <div>
      <style>{`
        .footer {
          background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
          color: white;
        }

        .footer a {
          color: #f1f1f1;
          text-decoration: none;
        }

        .footer a:hover {
          color: #ffd700;
          text-decoration: underline;
        }

        .footer .social-icons a {
          margin-right: 15px;
          font-size: 20px;
        }

        .footer .footer-heading {
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .footer .copyright {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ccc;
        }
      `}</style>

      <footer className="footer text-center text-lg-start pt-4">

        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-google"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="footer-heading">
                  <i className="fas fa-gem me-3"></i>Flipkart Store
                </h6>
                <p>Your trusted destination for electronics, fashion, furniture and more!</p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="footer-heading">Products</h6>
                <p><a href="#!">Mobiles</a></p>
                <p><a href="#!">Appliances</a></p>
                <p><a href="#!">Fashion</a></p>
                <p><a href="#!">Grocery</a></p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="footer-heading">Useful links</h6>
                <p><a href="#!">Pricing</a></p>
                <p><a href="#!">Settings</a></p>
                <p><a href="#!">Orders</a></p>
                <p><a href="#!">Help</a></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="footer-heading">Contact</h6>
                <p><i className="fas fa-home me-3"></i> Chennai, TN 600001, India</p>
                <p><i className="fas fa-envelope me-3"></i> support@flipkart.com</p>
                <p><i className="fas fa-phone me-3"></i> +91 98765 43210</p>
                <p><i className="fas fa-print me-3"></i> +91 98765 43211</p>
              </div>

            </div>
          </div>
        </section>

        <div className="text-center p-3 copyright">
          © {new Date().getFullYear()} Flipkart Clone | All Rights Reserved
        </div>

      </footer>
    </div>
  );
};

export default Footer;

