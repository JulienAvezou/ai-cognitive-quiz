import { describe, expect, it } from "vitest";
import { quizQuestions } from "./quiz-data";
import { calculateQuizResult, dimensionKeys } from "./scoring";

describe("calculateQuizResult", () => {
  it("returns architect for consistently high-ownership answers", () => {
    const answerIds = quizQuestions.map((question) => question.options[0].id);
    const result = calculateQuizResult(answerIds);

    expect(result.archetype).toBe("architect");
    expect(result.driftRisk).toBe("Low");
    expect(result.dimensions.ownership).toBeGreaterThan(90);
    expect(result.dimensions.dependency).toBeLessThan(20);
  });

  it("returns passenger for consistently high-dependency answers", () => {
    const answerIds = quizQuestions.map((question) => question.options[3].id);
    const result = calculateQuizResult(answerIds);

    expect(result.archetype).toBe("passenger");
    expect(result.driftRisk).toBe("High");
    expect(result.dimensions.dependency).toBeGreaterThan(80);
    expect(result.dimensions.verification).toBeLessThan(30);
  });

  it("returns balancer for consistently controlled-leverage answers", () => {
    const answerIds = quizQuestions.map((question) => question.options[1].id);
    const result = calculateQuizResult(answerIds);

    expect(result.archetype).toBe("balancer");
    expect(result.driftRisk).toBe("Low");
    expect(result.dimensions.ownership).toBeGreaterThan(60);
    expect(result.dimensions.dependency).toBeLessThan(50);
  });

  it("returns autopilot for consistently speed-biased leverage answers", () => {
    const answerIds = quizQuestions.map((question) => question.options[2].id);
    const result = calculateQuizResult(answerIds);

    expect(result.archetype).toBe("autopilot");
    expect(result.driftRisk).toBe("High");
    expect(result.dimensions.speedBias).toBeGreaterThan(80);
    expect(result.dimensions.reflection).toBeLessThan(50);
  });

  it("exposes the top three score drivers for the selected archetype", () => {
    const answerIds = quizQuestions.map((question) => question.options[3].id);
    const result = calculateQuizResult(answerIds);

    expect(result.scoreDrivers).toHaveLength(3);
    expect(result.scoreDrivers[0].label).toBe("High AI dependency");
    expect(result.scoreDrivers[0].value).toBeGreaterThan(30);
  });

  it("normalizes every dimension between 0 and 100", () => {
    const answerIds = quizQuestions.map(
      (question, index) => question.options[index % question.options.length].id,
    );
    const result = calculateQuizResult(answerIds);

    dimensionKeys.forEach((dimension) => {
      expect(result.dimensions[dimension]).toBeGreaterThanOrEqual(0);
      expect(result.dimensions[dimension]).toBeLessThanOrEqual(100);
    });
  });

  it("is deterministic for the same answer set", () => {
    const answerIds = quizQuestions.map((question) => question.options[1].id);

    expect(calculateQuizResult(answerIds)).toEqual(calculateQuizResult(answerIds));
  });
});
