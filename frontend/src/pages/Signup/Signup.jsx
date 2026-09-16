import { useState } from "react";
import { signUp } from "../../services/authService";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import Loading from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = (emailValue, passwordValue, confirmPasswordValue) => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]).{8,}$/;

    if (!emailValue.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(emailValue.trim())) {
      newErrors.email = "Wrong email format.";
    }

    if (!passwordValue) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(passwordValue)) {
      newErrors.password = "At least 8 characters, one uppercase, one lowercase, one number and one special character.";
    }

    if (!confirmPasswordValue) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (passwordValue !== confirmPasswordValue) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setValidated(true);

    const validationErrors = validateForm(email, password, confirmPassword);

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }

    setLoading(true);

    try {
      await signUp(email.trim(), password);

      setSignupSuccess(true);
      setSignupError("");

      console.log("Account created");
    } catch (error) {
      setSignupSuccess(false);
      setSignupError(error.message.charAt(0).toUpperCase() + error.message.slice(1));

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return !signupSuccess ? (
    <div className="signup-page">
      <h1> Register a new account </h1>

      <form className="signup-form" onSubmit={handleSignup}>
        {signupError && <p className="signup-error error-signupError">{signupError}</p>}
        <Input
          type="email"
          placeholder="Email"
          status={validated && errors.email ? "error" : ""}
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);

            if (validated) {
              setErrors(validateForm(value, password, confirmPassword));
            }
          }}
        />
        {errors.email && <p className="signup-error">{errors.email}</p>}

        <Input
          type="password"
          placeholder="Password"
          status={validated && errors.password ? "error" : ""}
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);

            if (validated) {
              setErrors(validateForm(email, value, confirmPassword));
            }
          }}
        />
        {errors.password && <p className="signup-error">{errors.password}</p>}

        <Input
          type="password"
          placeholder="Confirm Password"
          status={validated && errors.confirmPassword ? "error" : ""}
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);
            if (validated) {
              setErrors(validateForm(email, password, value));
            }
          }}
        />

        {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? <Loading size="sm" /> : "Create Account"}
        </Button>
      </form>

      <div className="signup-links">
        <span>
          <a href="/login">Do you already have an account?</a>
        </span>
      </div>
    </div>
  ) : (
    <div className="signup-success">
      <h1> Account created! </h1>
      <p> Please check your email to confirm your account.</p>
    </div>
  );
};

export default Signup;
