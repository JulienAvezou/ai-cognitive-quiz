import type { ArchetypeId, ArchetypeMeta } from "./types";

export const archetypes: Record<ArchetypeId, ArchetypeMeta> = {
  architect: {
    id: "architect",
    name: "AI Architect",
    colorName: "emerald",
    identity: "You use AI as a system partner without giving up authorship.",
    description:
      "You tend to frame the problem, set constraints, and use AI to accelerate the work while keeping verification and architectural judgment in your hands.",
    quote: "AI can widen the search space, but ownership stays with me.",
    traits: ["High ownership", "Strong verification", "Low dependency"],
    strengths: [
      "You keep a clear mental model of the system while using AI.",
      "You are likely to catch plausible but misaligned suggestions.",
      "You turn AI output into leverage instead of replacement judgment.",
    ],
    risks: [
      "You may underuse AI for low-risk exploration or rote transformation.",
      "You can spend too long building certainty before moving.",
    ],
    improvementActions: [
      "Create a reusable prompt pattern for fast option generation before deep design work.",
      "Timebox verification passes so rigor does not become hidden latency.",
      "Ask AI to produce counterarguments to your preferred architecture, then decide explicitly.",
    ],
    recommendedResource: "AI Review Checklist",
  },
  balancer: {
    id: "balancer",
    name: "AI Balancer",
    colorName: "blue",
    identity: "You get real leverage from AI while actively protecting judgment.",
    description:
      "You usually combine AI speed with human review, but your results depend on preserving the habits that keep dependency drift in check.",
    quote: "I use AI to move faster, then slow down where judgment matters.",
    traits: ["Productive leverage", "Controlled dependency", "Practical review"],
    strengths: [
      "You know when AI is a multiplier and when it needs constraints.",
      "You usually keep enough context to evaluate generated code.",
      "You can ship faster without fully outsourcing decisions.",
    ],
    risks: [
      "Under pressure, you may accept convincing output before your own model is complete.",
      "Your review depth can vary by task urgency or confidence in the tool.",
    ],
    improvementActions: [
      "Add a two-minute pre-prompt note: goal, constraints, known unknowns, and expected failure modes.",
      "Before merging AI-assisted code, explain the key tradeoff in one sentence.",
      "Track one recurring AI failure pattern each week and update your review checklist.",
    ],
    recommendedResource: "Cognitive Drift Guardrail",
  },
  autopilot: {
    id: "autopilot",
    name: "Autopilot Builder",
    colorName: "amber",
    identity: "You move quickly with AI, but speed can outrun understanding.",
    description:
      "You are good at converting prompts into output, yet you may rely on momentum and plausibility when the work needs slower verification.",
    quote: "AI helps me build fast; my next level is making the review just as strong.",
    traits: ["High speed", "High leverage", "Variable reflection"],
    strengths: [
      "You are comfortable using AI to explore, draft, and unblock implementation.",
      "You can generate working paths quickly when requirements are concrete.",
      "You are likely to discover options that would otherwise take longer to surface.",
    ],
    risks: [
      "You may merge code whose behavior you cannot fully explain.",
      "Your debugging loop can become prompt-and-patch instead of diagnosis-led.",
    ],
    improvementActions: [
      "Use a stop rule: no merge until you can name the changed behavior, risk, and test signal.",
      "Ask AI for a failure analysis after it proposes a solution, not only the solution.",
      "For unfamiliar code, write your own three-line model before asking for edits.",
    ],
    recommendedResource: "AI-Assisted Debugging Protocol",
  },
  passenger: {
    id: "passenger",
    name: "AI Passenger",
    colorName: "rose",
    identity: "AI is doing too much of the cognitive driving.",
    description:
      "You may be getting output, but the work carries elevated dependency risk because understanding, verification, or ownership often trails behind implementation.",
    quote: "The next improvement is not less AI. It is more deliberate control.",
    traits: ["High dependency", "Low verification", "Ownership drift"],
    strengths: [
      "You are willing to use tools and move past blank-page friction.",
      "You can get prototypes or first drafts into motion quickly.",
      "You have a clear opportunity to improve results with a few repeatable habits.",
    ],
    risks: [
      "You may accept code that works locally without knowing why.",
      "You can become blocked when AI output fails or conflicts with the system.",
    ],
    improvementActions: [
      "Before prompting, write the smallest version of your own plan, even if incomplete.",
      "After each AI answer, identify one claim to verify in docs, tests, or the codebase.",
      "Pair every generated change with a manual explanation of what changed and why.",
    ],
    recommendedResource: "AI Thinking Habits Starter Kit",
  },
};
