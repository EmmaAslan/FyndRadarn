import './Components.css';

const Loading = ({ size = "md" }) => {
  return (
    <div className={`loading loading-${size}`}>
      <span className="loading-spinner"></span>
    </div>
  );
};

export default Loading;