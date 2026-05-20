import { quizQuestions } from "./quiz-data";
import type {
  ArchetypeId,
  ArchetypeScoreMap,
  DimensionKey,
  DimensionScores,
  DriftRisk,
  NormalizedDimensions,
  QuizQuestion,
  QuizResult,
} from "./types";

export const dimensionKeys: DimensionKey[] = [
  "ownership",
  "reflection",
  "dependency",
  "leverage",
  "verification",
  "speedBias",
];

const emptyScores = (): DimensionScores => ({
  ownership: 0,
  reflection: 0,
  dependency: 0,
  leverage: 0,
  verification: 0,
  speedBias: 0,
});

const round = (value: number) => Math.round(value);

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function calculateDimensionRanges(questions: QuizQuestion[]) {
  return questions.reduce(
    (ranges, question) => {
      dimensionKeys.forEach((dimension) => {
        const values = question.options.map((option) => option.scores[dimension]);
        ranges.min[dimension] += Math.min(...values);
        ranges.max[dimension] += Math.max(...values);
      });

      return ranges;
    },
    { min: emptyScores(), max: emptyScores() },
  );
}

export function normalizeDimensions(
  rawDimensions: DimensionScores,
  questions: QuizQuestion[] = quizQuestions,
): NormalizedDimensions {
  const ranges = calculateDimensionRanges(questions);

  return dimensionKeys.reduce((normalized, dimension) => {
    const min = ranges.min[dimension];
    const max = ranges.max[dimension];
    const span = max - min;
    normalized[dimension] =
      span === 0 ? 50 : round(((rawDimensions[dimension] - min) / span) * 100);
    normalized[dimension] = clamp(normalized[dimension], 0, 100);

    return normalized;
  }, {} as NormalizedDimensions);
}

export function calculateArchetypeScores(
  dimensions: NormalizedDimensions,
): ArchetypeScoreMap {
  const {
    ownership,
    reflection,
    dependency,
    leverage,
    verification,
    speedBias,
  } = dimensions;

  return {
    architect:
      ownership * 0.3 +
      reflection * 0.25 +
      verification * 0.25 +
      (100 - dependency) * 0.2,
    balancer:
      ownership * 0.25 +
      leverage * 0.25 +
      reflection * 0.2 +
      verification * 0.15 +
      (100 - dependency) * 0.15,
    autopilot:
      leverage * 0.25 +
      speedBias * 0.25 +
      dependency * 0.2 +
      (100 - reflection) * 0.15 +
      (100 - verification) * 0.15,
    passenger:
      dependency * 0.35 +
      speedBias * 0.2 +
      (100 - ownership) * 0.2 +
      (100 - reflection) * 0.15 +
      (100 - verification) * 0.1,
  };
}

export function getDriftRisk(dimensions: NormalizedDimensions): {
  driftRisk: DriftRisk;
  driftScore: number;
} {
  const driftScore = round(
    dimensions.dependency * 0.3 +
      dimensions.speedBias * 0.2 +
      (100 - dimensions.ownership) * 0.2 +
      (100 - dimensions.reflection) * 0.15 +
      (100 - dimensions.verification) * 0.15,
  );

  if (driftScore >= 65) {
    return { driftRisk: "High", driftScore };
  }

  if (driftScore >= 40) {
    return { driftRisk: "Moderate", driftScore };
  }

  return { driftRisk: "Low", driftScore };
}

export function pickArchetype(scores: ArchetypeScoreMap): ArchetypeId {
  return (Object.entries(scores) as [ArchetypeId, number][]).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }

    const tieBreakOrder: ArchetypeId[] = [
      "architect",
      "balancer",
      "autopilot",
      "passenger",
    ];

    return tieBreakOrder.indexOf(a[0]) - tieBreakOrder.indexOf(b[0]);
  })[0][0];
}

export function calculateQuizResult(
  selectedAnswerIds: string[],
  questions: QuizQuestion[] = quizQuestions,
): QuizResult {
  const selectedAnswerSet = new Set(selectedAnswerIds);
  const rawDimensions = emptyScores();

  questions.forEach((question) => {
    const selectedOption = question.options.find((option) =>
      selectedAnswerSet.has(option.id),
    );

    if (!selectedOption) {
      return;
    }

    dimensionKeys.forEach((dimension) => {
      rawDimensions[dimension] += selectedOption.scores[dimension];
    });
  });

  const dimensions = normalizeDimensions(rawDimensions, questions);
  const archetypeScores = calculateArchetypeScores(dimensions);
  const archetype = pickArchetype(archetypeScores);
  const { driftRisk, driftScore } = getDriftRisk(dimensions);

  return {
    archetype,
    dimensions,
    rawDimensions,
    archetypeScores,
    driftRisk,
    driftScore,
  };
}
