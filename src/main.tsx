import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QuizApp } from "./components/quiz/QuizApp";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuizApp />
  </StrictMode>,
);
