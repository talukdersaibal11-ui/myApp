import { Link, useNavigate } from 'react-router-dom';
import AppLogo from '../../assets/images/app-logo.svg';
import BgLogo from '../../assets/images/background/background-1.jpg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {token, loading, error } = useSelector((state) => state.auth);

  console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className="row g-0 app-auth-wrapper">
      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
        <div className="d-flex flex-column align-content-end">
          <div className="app-auth-body mx-auto">
            <div className="app-auth-branding mb-4">
              <Link to={"/home"} className="app-logo">
                <img className="logo-icon me-2" src={AppLogo} style={{ height: "50px" }} alt="logo" />
              </Link>
            </div>
            <h2 className="auth-heading text-center mb-5">Log in</h2>
            <div className="auth-form-container text-start">
              <form className="auth-form login-form" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="email mb-3">
                  <label className="sr-only" htmlFor="signin-email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control signin-email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="password mb-3">
                  <label className="sr-only" htmlFor="signin-password">Password</label>
                  <input
                    id="signin-password"
                    name="signin-password"
                    type="password"
                    className="form-control signin-password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Remember / Forgot */}
                <div className="extra mt-3 row justify-content-between">
                  <div className="col-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="RememberPassword" />
                      <label className="form-check-label" htmlFor="RememberPassword">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="col-6 text-end">
                    <Link to={"/forget/password"}>Forgot password?</Link>
                  </div>
                </div>

                {/* Show error */}
                {error && (
                  <div className="alert alert-danger mt-3">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
                  </button>
                </div>
              </form>

              <div className="auth-option text-center pt-5">
                No Account? Sign up{" "}
                <Link to={"/register"} className="text-link">Here</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div
        className="col-12 col-md-5 col-lg-6 auth-background-col"
        style={{
          backgroundImage: `url(${BgLogo})`,
          backgroundSize: "cover",
          height: "850px",
          backgroundPosition: "center",
        }}
      >
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
        <div className="auth-background-overlay p-3 p-lg-5">
          <div className="d-flex flex-column align-content-end h-100">
            <div className="h-100"></div>
            <div className="overlay-content p-3 p-lg-4 rounded">
              <h5 className="mb-3 overlay-title">Explore the Portal Admin Template</h5>
              <div>
                This Portal Admin Dashboard was designed and developed by{" "}
                <strong>Shakawat Hoses Saikat</strong>.  
                You are free to customize and use this template as you like.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
