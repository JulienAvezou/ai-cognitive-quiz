import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { archetypes } from "../../lib/quiz/archetypes";
import { getQuizUrl, gumroadUrl } from "../../lib/quiz/links";
import type { DimensionKey, QuizResult } from "../../lib/quiz/types";
import { ShareCard } from "./ShareCard";

const dimensionLabels: { key: DimensionKey; label: string }[] = [
  { key: "ownership", label: "Ownership" },
  { key: "reflection", label: "Reflection" },
  { key: "verification", label: "Verification" },
  { key: "dependency", label: "AI Dependency" },
  { key: "leverage", label: "Leverage" },
];

type ResultPageProps = {
  result: QuizResult;
  shareMode: boolean;
  onRetake: () => void;
  onOpenShare: () => void;
  onCloseShare: () => void;
};

export function ResultPage({
  result,
  shareMode,
  onRetake,
  onOpenShare,
  onCloseShare,
}: ResultPageProps) {
  const archetype = archetypes[result.archetype];
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">(
    "idle",
  );
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "working" | "failed"
  >("idle");
  const quizUrl = getQuizUrl();

  const shareText = `I got ${archetype.name} on the AI Cognitive Archetype Quiz.\n\n${archetype.identity}\n\nTake the quiz: ${quizUrl}`;

  function fallbackCopyText(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  }

  async function copyShareText() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(shareText);
      setCopyStatus("copied");
    } catch {
      setCopyStatus(fallbackCopyText(shareText) ? "copied" : "manual");
    }
  }

  async function downloadShareCard() {
    if (!shareCardRef.current) {
      return;
    }

    try {
      setDownloadStatus("working");
      const dataUrl = await toPng(shareCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#0b1020",
      });
      const link = document.createElement("a");
      link.download = `${archetype.name.toLowerCase().replaceAll(" ", "-")}-card.png`;
      link.href = dataUrl;
      link.click();
      setDownloadStatus("idle");
    } catch {
      setDownloadStatus("failed");
    }
  }

  return (
    <section className="result-layout" aria-labelledby="result-title">
      <div className="result-main">
        <p className="eyebrow">Assessment complete</p>
        <h1 id="result-title">{archetype.name}</h1>
        <p className="identity-line">{archetype.identity}</p>
        <p className="result-description">{archetype.description}</p>

        <div className={`risk-badge theme-${archetype.colorName}`}>
          <span>Cognitive drift risk</span>
          <strong>
            {result.driftRisk} · {result.driftScore}/100
          </strong>
        </div>

        <div className="dimension-panel">
          <h2>Dimension profile</h2>
          <div className="dimension-list">
            {dimensionLabels.map(({ key, label }) => (
              <div className="dimension-row" key={key}>
                <div className="dimension-label">
                  <span>{label}</span>
                  <span>{result.dimensions[key]}</span>
                </div>
                <div className="dimension-track">
                  <div style={{ width: `${result.dimensions[key]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="insight-grid">
          <div>
            <h2>Strengths</h2>
            <ul>
              {archetype.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Risks</h2>
            <ul>
              {archetype.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="actions-panel">
          <h2>Three improvement actions</h2>
          <ol>
            {archetype.improvementActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </div>

        <div className="toolkit-panel">
          <div>
            <span className="mono-label">Recommended resource</span>
            <h2>{archetype.recommendedResource}</h2>
            <p>
              The Thinking Engineer Toolkit helps developers use AI without
              outsourcing their judgment.
            </p>
          </div>
          <a
            className="primary-button link-button"
            href={gumroadUrl}
            target="_blank"
            rel="noreferrer"
          >
            Improve your AI thinking habits
          </a>
        </div>
      </div>

      <aside className={`share-rail ${shareMode ? "is-focused" : ""}`}>
        <ShareCard ref={shareCardRef} result={result} quizUrl={quizUrl} />

        <div className="share-actions">
          <button
            type="button"
            className="primary-button"
            onClick={copyShareText}
          >
            Copy share text
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={downloadShareCard}
            disabled={downloadStatus === "working"}
          >
            {downloadStatus === "working" ? "Rendering PNG" : "Download PNG"}
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={shareMode ? onCloseShare : onOpenShare}
          >
            {shareMode ? "Back to result" : "Focus share card"}
          </button>
          <button type="button" className="ghost-button" onClick={onRetake}>
            Retake quiz
          </button>
        </div>

        <div className="share-feedback" aria-live="polite">
          {copyStatus === "copied" && "Share text copied."}
          {copyStatus === "manual" &&
            "Clipboard access was blocked. Select the share text below."}
          {downloadStatus === "failed" && "PNG export failed in this browser."}
        </div>

        {copyStatus === "manual" && (
          <textarea
            className="share-text-fallback"
            aria-label="Share text"
            readOnly
            value={shareText}
          />
        )}
      </aside>
    </section>
  );
}
