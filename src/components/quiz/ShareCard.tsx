import { forwardRef } from "react";
import { archetypes } from "../../lib/quiz/archetypes";
import type { QuizResult } from "../../lib/quiz/types";

type ShareCardProps = {
  result: QuizResult;
  quizUrl: string;
};

const miniBarDimensions = [
  ["ownership", "Ownership"],
  ["reflection", "Reflection"],
  ["verification", "Verification"],
  ["dependency", "Dependency"],
] as const;

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ result, quizUrl }, ref) => {
    const archetype = archetypes[result.archetype];

    return (
      <article
        className={`share-card theme-${archetype.colorName}`}
        ref={ref}
        aria-label={`${archetype.name} share card`}
      >
        <div className="share-card-grid" aria-hidden="true" />
        <div className="share-card-header">
          <span className="mono-label">AI Cognitive Archetype</span>
          <span className="brand-mark">The Thinking Engineer</span>
        </div>

        <div className="share-card-body">
          <p className="result-kicker">Result</p>
          <h2>{archetype.name}</h2>
          <p className="share-quote">“{archetype.quote}”</p>
        </div>

        <div className="trait-row">
          {archetype.traits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>

        <div className="mini-bars">
          {miniBarDimensions.map(([key, label]) => (
            <div className="mini-bar" key={key}>
              <span>{label}</span>
              <div className="mini-track">
                <div style={{ width: `${result.dimensions[key]}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="share-card-footer">
          <span>Take the quiz</span>
          <span>{quizUrl}</span>
        </div>
      </article>
    );
  },
);

ShareCard.displayName = "ShareCard";
