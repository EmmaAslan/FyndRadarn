import './LoadingSpinner.css';

const LoadingSpinner = ({ size = "md" }) => {
  return (
    <div className={`loading loading-${size}`}>
      <span className="loading-spinner"></span>
    </div>
  );
};

export default LoadingSpinner;