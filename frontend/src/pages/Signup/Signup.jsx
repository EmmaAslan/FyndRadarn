import { useState } from 'react'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Loading from '../../components/Loading.jsx'
import './Signup.css'

const Signup = () => { 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
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
    newErrors.email = "E-post är obligatorisk.";
  } else if (!emailRegex.test(emailValue.trim())) {
    newErrors.email = "Ange en giltig e-postadress.";
  }

  if (!passwordValue) {
    newErrors.password = "Lösenord är obligatoriskt.";
  } else if (!passwordRegex.test(passwordValue)) {
    newErrors.password =
      "Minst 8 tecken, en versal, en gemen, en siffra och ett specialtecken.";
  }

  if (!confirmPasswordValue) {
    newErrors.confirmPassword = "Bekräfta ditt lösenord.";
  } else if (passwordValue !== confirmPasswordValue) {
    newErrors.confirmPassword = "Lösenorden matchar inte.";
  }

    return newErrors;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setValidated(true);

    const validationErrors = validateForm(
      email,
      password,
      confirmPassword
    );

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }
    
    setLoading(true);

    // Här kommer API-anropet senare
    setTimeout(() => {
      console.log("Signup...");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="signup-page">
      <h1> Registrera nytt konto </h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <Input 
          type="email" 
          placeholder="E-post"
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
        {errors.email && (
          <p className="signup-error">{errors.email}</p>
        )}

        <Input 
          type="password" 
          placeholder="Lösenord" 
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
        {errors.password && (
          <p className="signup-error">{errors.password}</p>
        )}

        <Input 
          type="password" 
          placeholder="Bekräfta lösenord" 
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

        {errors.confirmPassword && (
          <p className="signup-error">{errors.confirmPassword}</p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? <Loading size="sm" /> : "Skapa konto"}
        </Button>
      </form>

      <div className="signup-links">
        <span>
          <a href="/login">Har du redan ett konto?</a>
        </span>
      </div>
    </div>
  )
}

export default Signup;