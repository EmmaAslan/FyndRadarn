import "./Input.css";

const Input = ({ className = "", status = "", ...props }) => {
  return (
    <input
      className={`input ${status} ${className}`.trim()}
      aria-invalid={status === "error" ? true : undefined}
      {...props}
    />
  )
}

export default Input;