export const gumroadUrl =
  "https://javz.gumroad.com/l/the-thinking-engineer-toolkit";
export const productionQuizUrl = "https://ai-cognitive-quiz.vercel.app";

const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);

export function getQuizUrl() {
  if (typeof window === "undefined") {
    return productionQuizUrl;
  }

  if (localHostnames.has(window.location.hostname)) {
    return window.location.origin;
  }

  return productionQuizUrl;
}
