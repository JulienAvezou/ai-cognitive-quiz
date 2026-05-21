type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div
      className="progress-shell"
      role="progressbar"
      aria-label={`Question ${current} of ${total}`}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div className="progress-meta">
        <span>Diagnostic sequence</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
