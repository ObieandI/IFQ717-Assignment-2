import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer mt-5 p-3 d-flex flex-wrap">
      <div className="container footer-container">
        <div className="row">
          <div className="col-md-6 align-content-end">
          <p>&copy; 2022, Statistics Insights Platform</p>
          </div>
          <div className="col-md-6">
          <p className="fw-light">
              Dedicated to enhancing service delivery and transparency, our
              platform provides valuable insights into hotel services and
              government operations. By leveraging comprehensive data analytics,
              we aim to promote a more efficient and accountable service
              industry. Join us in fostering an informed and engaged public.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
