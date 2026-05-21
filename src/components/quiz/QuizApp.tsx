import { useEffect, useReducer } from "react";
import { quizQuestions } from "../../lib/quiz/quiz-data";
import { calculateQuizResult } from "../../lib/quiz/scoring";
import type { QuizResult } from "../../lib/quiz/types";
import { QuestionCard } from "./QuestionCard";
import { ResultPage } from "./ResultPage";

type QuizStatus = "intro" | "question" | "calculating" | "result" | "share";

type QuizState = {
  status: QuizStatus;
  currentQuestionIndex: number;
  selectedAnswers: Record<string, string>;
  optionOrder: Record<string, string[]>;
  result?: QuizResult;
};

type QuizAction =
  | { type: "START" }
  | { type: "SELECT_ANSWER"; questionId: string; answerId: string }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "SHOW_RESULT" }
  | { type: "OPEN_SHARE" }
  | { type: "CLOSE_SHARE" }
  | { type: "RETAKE" };

const initialState: QuizState = {
  status: "intro",
  currentQuestionIndex: 0,
  selectedAnswers: {},
  optionOrder: {},
};

function getOrderedAnswerIds(selectedAnswers: Record<string, string>) {
  return quizQuestions.map((question) => selectedAnswers[question.id]).filter(Boolean);
}

function shuffleIds(ids: string[]) {
  const shuffledIds = [...ids];

  for (let index = shuffledIds.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledIds[index], shuffledIds[swapIndex]] = [
      shuffledIds[swapIndex],
      shuffledIds[index],
    ];
  }

  return shuffledIds;
}

function createOptionOrder() {
  return quizQuestions.reduce<Record<string, string[]>>((order, question) => {
    order[question.id] = shuffleIds(question.options.map((option) => option.id));
    return order;
  }, {});
}

function getQuestionWithOrderedOptions(
  question: (typeof quizQuestions)[number],
  optionOrder: string[],
) {
  if (optionOrder.length === 0) {
    return question;
  }

  return {
    ...question,
    options: optionOrder
      .map((optionId) => question.options.find((option) => option.id === optionId))
      .filter((option): option is (typeof question.options)[number] => Boolean(option)),
  };
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "START":
      return { ...state, status: "question", optionOrder: createOptionOrder() };
    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswers: {
          ...state.selectedAnswers,
          [action.questionId]: action.answerId,
        },
      };
    case "NEXT": {
      const question = quizQuestions[state.currentQuestionIndex];

      if (!state.selectedAnswers[question.id]) {
        return state;
      }

      if (state.currentQuestionIndex < quizQuestions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      }

      return {
        ...state,
        status: "calculating",
        result: calculateQuizResult(getOrderedAnswerIds(state.selectedAnswers)),
      };
    }
    case "BACK":
      if (state.currentQuestionIndex === 0 || state.status !== "question") {
        return state;
      }

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };
    case "SHOW_RESULT":
      return state.result ? { ...state, status: "result" } : state;
    case "OPEN_SHARE":
      return state.result ? { ...state, status: "share" } : state;
    case "CLOSE_SHARE":
      return state.result ? { ...state, status: "result" } : state;
    case "RETAKE":
      return initialState;
    default:
      return state;
  }
}

function SystemMapVisual() {
  return (
    <div className="system-map" aria-hidden="true">
      <div className="node node-a" />
      <div className="node node-b" />
      <div className="node node-c" />
      <div className="node node-d" />
      <div className="node-link link-a" />
      <div className="node-link link-b" />
      <div className="node-link link-c" />
      <div className="scan-line" />
    </div>
  );
}

export function QuizApp() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const currentQuestion = quizQuestions[state.currentQuestionIndex];
  const orderedQuestion = getQuestionWithOrderedOptions(
    currentQuestion,
    state.optionOrder[currentQuestion.id] ?? [],
  );
  const selectedAnswerId = state.selectedAnswers[currentQuestion.id];

  useEffect(() => {
    if (state.status !== "calculating") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: "SHOW_RESULT" });
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [state.status]);

  return (
    <main className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="topbar">
        <span className="brand-mark">The Thinking Engineer</span>
        <span className="topbar-meta">AI cognition diagnostic</span>
      </header>

      {state.status === "intro" && (
        <section className="intro-layout" aria-labelledby="intro-title">
          <div className="intro-copy">
            <p className="eyebrow">Developer self-assessment</p>
            <h1 id="intro-title">AI Cognitive Archetype Quiz</h1>
            <p>
              A focused diagnostic for how you use AI in real engineering work:
              ownership, reflection, verification, leverage, dependency, and speed bias.
            </p>
            <div className="intro-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => dispatch({ type: "START" })}
              >
                Start assessment
              </button>
              <span className="mono-label">
                12 scenarios · single-select · no tracking
              </span>
            </div>
          </div>

          <div className="intro-visual-card">
            <SystemMapVisual />
          </div>
        </section>
      )}

      {state.status === "question" && (
        <QuestionCard
          question={orderedQuestion}
          questionNumber={state.currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          selectedAnswerId={selectedAnswerId}
          canGoBack={state.currentQuestionIndex > 0}
          onSelect={(answerId) =>
            dispatch({
              type: "SELECT_ANSWER",
              questionId: currentQuestion.id,
              answerId,
            })
          }
          onNext={() => dispatch({ type: "NEXT" })}
          onBack={() => dispatch({ type: "BACK" })}
        />
      )}

      {state.status === "calculating" && (
        <section className="quiz-panel calculating-panel" aria-live="polite">
          <div className="calculation-core">
            <SystemMapVisual />
            <p className="eyebrow">Calculating</p>
            <h1>Mapping your AI cognition profile</h1>
          </div>
        </section>
      )}

      {(state.status === "result" || state.status === "share") && state.result && (
        <ResultPage
          result={state.result}
          shareMode={state.status === "share"}
          onRetake={() => dispatch({ type: "RETAKE" })}
          onOpenShare={() => dispatch({ type: "OPEN_SHARE" })}
          onCloseShare={() => dispatch({ type: "CLOSE_SHARE" })}
        />
      )}
    </main>
  );
}
