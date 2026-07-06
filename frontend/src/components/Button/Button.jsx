import "./Button.css";
import { NavLink } from "react-router-dom";

const Button = ({
  children,
  buttonType = "button",
  onClick,
  variant = "primary",
  to,
  href,
}) => {
  if (href) {
    return (
      <a
        href={href}
        className={`button ${variant}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <NavLink to={to} className={`button ${variant}`}>
        {children}
      </NavLink>
    );
  }

  return (
    <button type={buttonType} onClick={onClick} className={`button ${variant}`}>
      {children}
    </button>
  );
};

export default Button;
