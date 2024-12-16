import React from "react";
import "./Auth.css"; // Shared styles
import localisLogo from "../../assets/images/localisLogo.png";


const AuthCard = ({
  title,
  subtitle,
  buttonText,
  roleSpecificText,
  onSubmit,
  children,
  footerText,
  footerLinkText,
  footerAction,
}) => {
  return (
    <div className="col-lg-6 col-md-6">
      <div className="auth-card">
        <div className="logo-container">
          <img src={localisLogo} alt="Localis Logo" className="logo" />
          <h1>localis</h1>
        </div>
        <div className="auth-details">
          <h2>{title}</h2>
          <p className="auth-card-prompt">
            {roleSpecificText ? roleSpecificText : subtitle}
          </p>
          <form onSubmit={onSubmit}>{children}</form>
          <button type="submit" className="auth-button">
            {buttonText}
          </button>
          {footerText && (
            <p className="footer-text">
              {footerText}{" "}
              <span className="footer-link" onClick={footerAction}>
                {footerLinkText}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
