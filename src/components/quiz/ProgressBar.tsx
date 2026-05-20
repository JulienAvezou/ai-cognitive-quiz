type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="progress-shell" aria-label={`Question ${current} of ${total}`}>
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
