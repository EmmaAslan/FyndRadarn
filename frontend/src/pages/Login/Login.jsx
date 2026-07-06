import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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

    // Här kommer API-anropet senare
    setTimeout(() => {
      console.log("Login...");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page">
      <h1> Logga in </h1>
      <form className="login-form" onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="E-post"
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
          placeholder="Lösenord"
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
          {loading ? <LoadingSpinner size="sm" /> : "Fortsätt"}
        </Button>
      </form>

      <div className="login-links">
        <span>
          <a href="/forgot-password">Glömt lösenord?</a>
        </span>
        <span>
          <a href="/signup">Registrera nytt konto</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
