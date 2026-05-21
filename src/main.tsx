import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QuizApp } from "./components/quiz/QuizApp";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <QuizApp />
  </StrictMode>,
);
