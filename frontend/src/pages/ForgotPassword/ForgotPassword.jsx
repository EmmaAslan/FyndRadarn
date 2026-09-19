import { resetPassword } from "../../services/authService";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

import "./ForgotPassword.css";
import { useState } from "react";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess("Password reset email has been sent.");
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="forgot-password-page">
      <h1> Forgot Password </h1>
      <form className="forgot-password-form" onSubmit={handleResetPassword}>
        {error && <p className="forgot-password-error">{error}</p>}
        {success && <p className="forgot-password-success">{success}</p>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
          }}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Send reset email"}{" "}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
