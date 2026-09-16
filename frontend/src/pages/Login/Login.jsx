import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/authService";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);

    try {
      await signIn(email.trim(), password);

      setLoginError("");

      navigate("/");
    } catch (error) {
      setLoginError(error.message.charAt(0).toUpperCase() + error.message.slice(1));

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1> Sign in </h1>
      <form className="login-form" onSubmit={handleLogin}>
      {loginError && <p className="login-error error-loginError">{loginError}</p>}
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

        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Continue"}
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
