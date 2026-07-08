import React from "react";

const ProgressCard = ({ taken = 0, total = 0 }) => {
  const safeTaken = Math.max(0, Number(taken) || 0);
  const safeTotal = Math.max(0, Number(total) || 0);

  const percent =
    safeTotal > 0
      ? Math.min((safeTaken / safeTotal) * 100, 100)
      : 0;

  const size = 140;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (percent / 100) * circumference;

  const remaining = Math.max(
    0,
    safeTotal - safeTaken
  );

  const note =
    percent === 100
      ? "All done for today! 🎉"
      : safeTaken > 0
        ? "✨ Great start! Keep going."
        : "Time to take your supplements.";

  return (
    <div className="card progress-card">
      <div className="progress-title">
        Today's Progress
      </div>

      <div className="progress-content">
        <div
          className="progress-ring-wrapper"
          style={{
            width: size,
            height: size,
          }}
        >
          <svg width={size} height={size}>
            <circle
              className="progress-ring-bg"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={stroke}
            />

            <circle
              className="progress-ring-fill"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>

          <div className="progress-center">
            <div className="progress-value">
              {safeTaken} / {safeTotal}
            </div>

            <div className="progress-subtitle">
              taken today
            </div>
          </div>
        </div>

        <div className="progress-details">
          <div className="progress-percent">
            {Math.round(percent)}%
          </div>

          <div className="progress-caption">
            of your supplements taken today
          </div>

          <div className="progress-note">
            {note}
          </div>
        </div>
      </div>

      <div className="progress-legend">
        <div className="legend-item">
          <span className="legend-dot taken" />
          Taken {safeTaken}
        </div>

        <div className="legend-item">
          <span className="legend-dot missing" />
          Missing {remaining}
        </div>

        <div className="legend-item">
          <span className="legend-dot total" />
          Total {safeTotal}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
