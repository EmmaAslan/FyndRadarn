import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, getCurrentUser, resendVerificationEmail } from "../../services/authService";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

import "./Login.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const validateForm = (emailValue, passwordValue) => {
    const newErrors = {
      email: "",
      password: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue.trim()) {
      newErrors.email = "E-post är obligatorisk.";
    } else if (!emailRegex.test(emailValue.trim())) {
      newErrors.email = "Ange en giltig e-postadress.";
    }

    if (!passwordValue.trim()) {
      newErrors.password = "Lösenord är obligatoriskt.";
    }

    return newErrors;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setValidated(true);

    const validationErrors = validateForm(email, password);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email.trim(), password);
      const user = await getCurrentUser();
      console.log("Current user:", user);

      setLoginError("");
      setEmailNotConfirmed(false);
      navigate("/", { replace: true });
    } catch (error) {
      setLoginError(error.message.charAt(0).toUpperCase() + error.message.slice(1));

      if (error.message === "Email not confirmed") {
        setEmailNotConfirmed(true);
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail(email.trim());
      setResendMessage("Verification email has been sent. Please check your inbox.");
      setResendCooldown(60);
    } catch (error) {
      setResendMessage(error.message.charAt(0).toUpperCase() + error.message.slice(1));
    }
  };

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [resendCooldown]);

  return (
    <div className="login-page">
      <h1> Log In </h1>
      <form className="login-form" onSubmit={handleLogin}>
        {loginError && <p className="login-error error-loginError">{loginError}</p>}
        {emailNotConfirmed && (
          <button type="button" onClick={handleResendVerification} className="resend-verification-button" disabled={resendCooldown > 0}>
            {resendCooldown > 0 ? `Resend Verification Email (${resendCooldown})` : "Resend Verification Email"}
          </button>
        )}
        {resendMessage && <p className="login-error resend-message">{resendMessage}</p>}

        <Input
          type="email"
          placeholder="Email"
          status={validated && errors.email ? "error" : ""}
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);

            if (validated) {
              setErrors(validateForm(value, password));
            }
          }}
        />
        {errors.email && <p className="login-error">{errors.email}</p>}

        <Input
          type="password"
          placeholder="Password"
          status={validated && errors.password ? "error" : ""}
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);

            if (validated) {
              setErrors(validateForm(email, value));
            }
          }}
        />

        {errors.password && <p className="login-error">{errors.password}</p>}

        <Button type="submit" disabled={isloading}>
          {isloading ? <LoadingSpinner size="sm" /> : "Continue"}
        </Button>
      </form>

      <div className="login-links">
        <span>
          <a href="/forgot-password">Forgot password?</a>
        </span>
        <span>
          <a href="/signup">Create new account</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
