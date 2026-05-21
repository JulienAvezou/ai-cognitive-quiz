export type DimensionKey =
  | "ownership"
  | "reflection"
  | "dependency"
  | "leverage"
  | "verification"
  | "speedBias";

export type DimensionScores = Record<DimensionKey, number>;

export type ArchetypeId = "architect" | "balancer" | "autopilot" | "passenger";

export type DriftRisk = "Low" | "Moderate" | "High";

export type QuizOption = {
  id: string;
  label: string;
  scores: DimensionScores;
};

export type QuizQuestion = {
  id: string;
  eyebrow: string;
  prompt: string;
  options: QuizOption[];
};

export type NormalizedDimensions = Record<DimensionKey, number>;

export type ArchetypeScoreMap = Record<ArchetypeId, number>;

export type QuizResult = {
  archetype: ArchetypeId;
  dimensions: NormalizedDimensions;
  rawDimensions: DimensionScores;
  archetypeScores: ArchetypeScoreMap;
  scoreDrivers: ScoreDriver[];
  driftRisk: DriftRisk;
  driftScore: number;
};

export type ScoreDriver = {
  label: string;
  value: number;
};

export type ArchetypeMeta = {
  id: ArchetypeId;
  name: string;
  colorName: string;
  identity: string;
  description: string;
  quote: string;
  traits: string[];
  strengths: string[];
  risks: string[];
  improvementActions: string[];
  recommendedResource: string;
};
