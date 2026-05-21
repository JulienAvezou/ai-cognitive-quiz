import type { QuizQuestion } from "../../lib/quiz/types";
import { ProgressBar } from "./ProgressBar";

type QuestionCardProps = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswerId?: string;
  canGoBack: boolean;
  onSelect: (answerId: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswerId,
  canGoBack,
  onSelect,
  onNext,
  onBack,
}: QuestionCardProps) {
  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <section className="quiz-panel question-panel" aria-labelledby="question-title">
      <ProgressBar current={questionNumber} total={totalQuestions} />

      <div className="question-copy">
        <p className="eyebrow">{question.eyebrow}</p>
        <h1 id="question-title">{question.prompt}</h1>
      </div>

      <div
        className="option-list"
        role="radiogroup"
        aria-label={`Answers for question ${questionNumber}`}
      >
        {question.options.map((option, index) => {
          const isSelected = selectedAnswerId === option.id;

          return (
            <label
              key={option.id}
              className={`option-button ${isSelected ? "is-selected" : ""}`}
            >
              <input
                className="option-input"
                type="radio"
                name={question.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
              />
              <span className="option-index">{String.fromCharCode(65 + index)}</span>
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>

      <div className="quiz-actions">
        <button
          type="button"
          className="ghost-button"
          onClick={onBack}
          disabled={!canGoBack}
        >
          Back
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={onNext}
          disabled={!selectedAnswerId}
        >
          {isLastQuestion ? "Calculate archetype" : "Continue"}
        </button>
      </div>
    </section>
  );
}
