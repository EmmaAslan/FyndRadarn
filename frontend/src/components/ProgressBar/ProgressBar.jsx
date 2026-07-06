import "./ProgressBar.css";
import { useEffect, useState } from "react";

const ProgressBar = ({ currentPrice, targetPrice, className }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const remaining = Math.max(0, currentPrice - targetPrice);
  const progress = Math.max(
    0,
    Math.min(100, 100 - (remaining / currentPrice) * 100),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={className}>
      <div className="progress-bar active-item-card-progress-bar">
        <div
          className="progress"
          style={{
            width: `${animatedProgress}%`,
          }}
        ></div>
      </div>
      <p className="card-hint small-text">{remaining} kr kvar</p>
    </div>
  );
};

export default ProgressBar;
