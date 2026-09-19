import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { updateUser, signOut } from "../../services/authService.js";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateForm = (passwordValue, confirmPasswordValue) => {
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]).{8,}$/;

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

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setValidated(true);

    const validationErrors = validateForm(password, confirmPassword);

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }

    setLoading(true);

    try {
      await updateUser(password);
      setSuccess("Password has been reset.");
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="reset-password-page">
      <h1> Reset Password </h1>
      <form className="reset-password-form" onSubmit={handleResetPassword}>
        {error && <p className="reset-password-error">{error}</p>}
        {success && (
          <>
            <p className="reset-password-success">{success}</p>
            <button type="button" className="go-to-login-button" onClick={handleGoToLogin}>
              Go to Login <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </>
        )}

        <Input
          type="password"
          placeholder="Password"
          status={validated && errors.password ? "error" : ""}
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
          }}
        />
        {errors.password && <p className="reset-password-error">{errors.password}</p>}

        <Input
          type="password"
          placeholder="Confirm Password"
          status={validated && errors.confirmPassword ? "error" : ""}
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);
          }}
        />
        {errors.confirmPassword && <p className="reset-password-error">{errors.confirmPassword}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Save new password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
