import React from "react";
import { Link } from "react-router-dom";
import  AppLogo from '../../assets/images/app-logo.svg'
import  BgLogo from '../../assets/images/background/background-1.jpg'

export const ForgotPasswordPage = () => {
  return (
    <div className="row g-0 app-auth-wrapper" style={{backgroundImage: `url(${BgLogo})`,backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
        <div className="d-flex flex-column align-content-end">
          <div className="app-auth-body mx-auto">
            <div className="app-auth-branding mb-4">
              <Link className="app-logo" to="/">
                <img className="logo-icon me-2" src={AppLogo} alt="logo" />
              </Link>
            </div>
            <h2 className="auth-heading text-center mb-4">
              Forgot Your Password?
            </h2>
            <p className="mb-4 text-center">
              Enter your email address below and we’ll send you instructions to
              reset your password.
            </p>

            <div className="auth-form-container text-start mx-auto">
              <form className="auth-form">
                <div className="email mb-3">
                  <label className="sr-only" htmlFor="reset-email">
                    Email
                  </label>
                  <input
                    id="reset-email"
                    name="reset-email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mx-auto"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>

              <div className="auth-option text-center pt-5">
                <Link className="text-link" to={"/"}>
                  Back to Log In
                </Link>
              </div>
            </div>
          </div>

          <footer className="app-auth-footer">
            <div className="container text-center py-3">
              <small className="copyright">
                Designed with <span className="sr-only">love</span>
                <i className="fas fa-heart" style={{ color: "#fb866a" }} /> by{" "}
                <a
                  className="app-link"
                  href="http://themes.3rdwavemedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xiaoying Riley
                </a>{" "}
                for developers
              </small>
            </div>
          </footer>
        </div>
      </div>

      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
        <div className="auth-background-overlay p-3 p-lg-5">
          <div className="d-flex flex-column align-content-end h-100">
            <div className="h-100"></div>
            <div className="overlay-content p-3 p-lg-4 rounded">
              <h5 className="mb-3 overlay-title">Explore Portal Admin Template</h5>
              <div>
                Portal is a free Bootstrap 5 admin dashboard template. You can
                download and view the template license{" "}
                <a href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/">
                  here
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
