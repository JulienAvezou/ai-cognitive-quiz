import type { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    eyebrow: "Unclear feature",
    prompt:
      "A product manager asks for a feature with ambiguous requirements and a tight deadline. What is your first move?",
    options: [
      {
        id: "q1_a",
        label:
          "Draft the core user flow and constraints myself, then ask AI to expose missing cases.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -2,
          leverage: 2,
          verification: 2,
          speedBias: 0,
        },
      },
      {
        id: "q1_b",
        label:
          "Ask AI for a requirements breakdown, then adapt it into a plan after reviewing tradeoffs.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 3,
          verification: 1,
          speedBias: 1,
        },
      },
      {
        id: "q1_c",
        label:
          "Prompt AI for an implementation plan and start building the most direct path.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 2,
          leverage: 3,
          verification: 0,
          speedBias: 3,
        },
      },
      {
        id: "q1_d",
        label:
          "Use AI to get a working version quickly, then depend on later testing and review to expose requirement gaps.",
        scores: {
          ownership: -2,
          reflection: -1,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q2",
    eyebrow: "Unfamiliar technology",
    prompt:
      "You need to use a library you have never touched before. How do you bring AI into the work?",
    options: [
      {
        id: "q2_a",
        label:
          "Read the official concepts briefly, then use AI to compare implementation patterns.",
        scores: {
          ownership: 3,
          reflection: 2,
          dependency: -1,
          leverage: 2,
          verification: 3,
          speedBias: 0,
        },
      },
      {
        id: "q2_b",
        label:
          "Ask AI for a minimal example, then check the API surface against docs before using it.",
        scores: {
          ownership: 2,
          reflection: 1,
          dependency: 0,
          leverage: 3,
          verification: 2,
          speedBias: 1,
        },
      },
      {
        id: "q2_c",
        label:
          "Ask AI for the likely code, paste it in, and adjust errors as they appear.",
        scores: {
          ownership: 0,
          reflection: -1,
          dependency: 2,
          leverage: 3,
          verification: 0,
          speedBias: 3,
        },
      },
      {
        id: "q2_d",
        label:
          "Let AI propose the library and integration shape, then adjust if the implementation conflicts with the app.",
        scores: {
          ownership: -2,
          reflection: -2,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q3",
    eyebrow: "Production bug",
    prompt:
      "A production bug appears in a path touched by recent AI-assisted work. What does your debugging loop look like?",
    options: [
      {
        id: "q3_a",
        label:
          "Reconstruct the failure path, form a hypothesis, then ask AI to challenge it and suggest probes.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -2,
          leverage: 2,
          verification: 3,
          speedBias: -1,
        },
      },
      {
        id: "q3_b",
        label:
          "Feed AI the stack trace and logs, then verify its diagnosis with a targeted reproduction.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 3,
          verification: 2,
          speedBias: 1,
        },
      },
      {
        id: "q3_c",
        label:
          "Ask AI for a likely patch, run the failing path, and iterate quickly around the observed symptom.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 2,
          leverage: 3,
          verification: 0,
          speedBias: 3,
        },
      },
      {
        id: "q3_d",
        label:
          "Paste the relevant files into AI and apply the fix it recommends if tests pass.",
        scores: {
          ownership: -1,
          reflection: -1,
          dependency: 3,
          leverage: 2,
          verification: 1,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q4",
    eyebrow: "Generated code review",
    prompt:
      "AI produces a plausible implementation for a non-trivial component. How do you review it?",
    options: [
      {
        id: "q4_a",
        label:
          "Trace data flow, invariants, and failure modes before considering style or cleanup.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -2,
          leverage: 1,
          verification: 3,
          speedBias: -1,
        },
      },
      {
        id: "q4_b",
        label:
          "Check the important branches, ask AI about edge cases, then revise the code yourself.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 2,
          verification: 2,
          speedBias: 1,
        },
      },
      {
        id: "q4_c",
        label:
          "Run it, skim for obvious issues, and spend more review time only if something feels off.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 1,
          leverage: 2,
          verification: 0,
          speedBias: 3,
        },
      },
      {
        id: "q4_d",
        label:
          "Prioritize compile errors, integration fit, and obvious edge cases before doing a deeper pass only if the change feels risky.",
        scores: {
          ownership: -2,
          reflection: -2,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q5",
    eyebrow: "Tests",
    prompt:
      "You need tests for code that AI helped generate. Which approach feels closest?",
    options: [
      {
        id: "q5_a",
        label:
          "Define the behavioral contract first, then use AI to draft cases that cover it.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -1,
          leverage: 2,
          verification: 3,
          speedBias: 0,
        },
      },
      {
        id: "q5_b",
        label:
          "Ask AI for test cases, then add or remove cases based on the actual risk profile.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 3,
          verification: 2,
          speedBias: 1,
        },
      },
      {
        id: "q5_c",
        label:
          "Use AI to generate the first test pass, then focus mainly on getting useful coverage into the suite quickly.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 2,
          leverage: 3,
          verification: 1,
          speedBias: 3,
        },
      },
      {
        id: "q5_d",
        label:
          "Use AI to create tests mostly as confidence signals, unless failures force a deeper look.",
        scores: {
          ownership: -1,
          reflection: -1,
          dependency: 2,
          leverage: 2,
          verification: 0,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q6",
    eyebrow: "Refactoring",
    prompt:
      "A messy module needs refactoring, and AI suggests a broad rewrite. What do you do?",
    options: [
      {
        id: "q6_a",
        label:
          "Identify invariants and migration steps, then use AI to produce smaller mechanical edits.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -2,
          leverage: 2,
          verification: 3,
          speedBias: -1,
        },
      },
      {
        id: "q6_b",
        label:
          "Ask AI for refactor options, choose the least disruptive path, and test behavior around it.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 3,
          verification: 2,
          speedBias: 1,
        },
      },
      {
        id: "q6_c",
        label:
          "Accept the rewrite in a branch and rely on tests and review to catch behavior changes.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 2,
          leverage: 3,
          verification: 0,
          speedBias: 3,
        },
      },
      {
        id: "q6_d",
        label:
          "Use AI's broader rewrite as a way to simplify the module, then rely on review and tests to catch behavior drift.",
        scores: {
          ownership: -2,
          reflection: -1,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q7",
    eyebrow: "Architecture",
    prompt:
      "You are choosing between two architectural approaches. How does AI participate?",
    options: [
      {
        id: "q7_a",
        label:
          "Write the decision criteria yourself, then ask AI to stress-test each option.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -2,
          leverage: 2,
          verification: 2,
          speedBias: -1,
        },
      },
      {
        id: "q7_b",
        label:
          "Ask AI to compare options, then make the decision based on system constraints it may not know.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 3,
          verification: 1,
          speedBias: 1,
        },
      },
      {
        id: "q7_c",
        label:
          "Use AI's recommendation as the starting default, then adjust if team context or constraints point elsewhere.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 2,
          leverage: 2,
          verification: 0,
          speedBias: 2,
        },
      },
      {
        id: "q7_d",
        label:
          "Ask AI for the common current pattern and move with it unless the system has a clear reason to diverge.",
        scores: {
          ownership: -1,
          reflection: -1,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 3,
        },
      },
    ],
  },
  {
    id: "q8",
    eyebrow: "Learning",
    prompt: "AI shows you a pattern you have not used before. What happens next?",
    options: [
      {
        id: "q8_a",
        label:
          "I ask why it works, identify the underlying concept, and look for where it fails.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -1,
          leverage: 2,
          verification: 2,
          speedBias: -1,
        },
      },
      {
        id: "q8_b",
        label:
          "I ask for a simpler explanation and use it once I can explain the main idea.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 2,
          verification: 1,
          speedBias: 1,
        },
      },
      {
        id: "q8_c",
        label:
          "I use the pattern if the code is clean and keep learning as I encounter issues.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 1,
          leverage: 3,
          verification: 0,
          speedBias: 2,
        },
      },
      {
        id: "q8_d",
        label:
          "I let AI apply the pattern and learn it through the implementation details as I review the result.",
        scores: {
          ownership: -2,
          reflection: -2,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q9",
    eyebrow: "Unclear code",
    prompt:
      "You have working code in your branch that you do not fully understand. What is the next responsible step?",
    options: [
      {
        id: "q9_a",
        label:
          "Stop and build a mental model before moving forward, even if it slows the task.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -2,
          leverage: 0,
          verification: 3,
          speedBias: -2,
        },
      },
      {
        id: "q9_b",
        label:
          "Ask AI to walk through it, then verify the explanation against the code and tests.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 3,
          verification: 2,
          speedBias: 0,
        },
      },
      {
        id: "q9_c",
        label:
          "Add comments and tests around what it seems to do, then proceed if behavior is stable.",
        scores: {
          ownership: 0,
          reflection: 1,
          dependency: 1,
          leverage: 2,
          verification: 1,
          speedBias: 2,
        },
      },
      {
        id: "q9_d",
        label:
          "Keep the working version for now, add a light note to revisit it, and dig deeper if the area changes again.",
        scores: {
          ownership: -2,
          reflection: -2,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 3,
        },
      },
    ],
  },
  {
    id: "q10",
    eyebrow: "Team review",
    prompt:
      "A teammate reviews your AI-assisted pull request and asks why a particular approach was chosen. How do you respond?",
    options: [
      {
        id: "q10_a",
        label:
          "Explain the tradeoff, note what AI contributed, and describe the verification signal.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -1,
          leverage: 1,
          verification: 3,
          speedBias: 0,
        },
      },
      {
        id: "q10_b",
        label:
          "Share the reasoning I reconstructed and use the comment to tighten the implementation.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 2,
          verification: 2,
          speedBias: 1,
        },
      },
      {
        id: "q10_c",
        label:
          "Say AI suggested it, but it passed local checks and seemed like the simplest route.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 2,
          leverage: 2,
          verification: 0,
          speedBias: 2,
        },
      },
      {
        id: "q10_d",
        label:
          "Ask AI to produce a rationale for the approach and use that to answer the review.",
        scores: {
          ownership: -1,
          reflection: -1,
          dependency: 3,
          leverage: 2,
          verification: -1,
          speedBias: 2,
        },
      },
    ],
  },
  {
    id: "q11",
    eyebrow: "Documentation",
    prompt:
      "You need to document a complex change that AI helped implement. What do you include?",
    options: [
      {
        id: "q11_a",
        label:
          "The intent, constraints, failure modes, and the parts future maintainers should inspect.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -1,
          leverage: 1,
          verification: 2,
          speedBias: -1,
        },
      },
      {
        id: "q11_b",
        label:
          "A concise explanation drafted with AI, edited to match the actual design decisions.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 3,
          verification: 1,
          speedBias: 1,
        },
      },
      {
        id: "q11_c",
        label: "AI-generated docs that describe the final behavior and setup steps.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 2,
          leverage: 3,
          verification: 0,
          speedBias: 2,
        },
      },
      {
        id: "q11_d",
        label:
          "Keep docs minimal and rely on the code, PR context, and AI transcript to preserve the reasoning if it becomes relevant.",
        scores: {
          ownership: -2,
          reflection: -1,
          dependency: 2,
          leverage: 1,
          verification: -1,
          speedBias: 3,
        },
      },
    ],
  },
  {
    id: "q12",
    eyebrow: "Post-ship reflection",
    prompt:
      "After shipping an AI-assisted feature, what do you usually do with what you learned?",
    options: [
      {
        id: "q12_a",
        label:
          "Review what AI accelerated, where it misled me, and update my working checklist.",
        scores: {
          ownership: 3,
          reflection: 3,
          dependency: -1,
          leverage: 2,
          verification: 2,
          speedBias: -1,
        },
      },
      {
        id: "q12_b",
        label:
          "Note the useful prompt or workflow and keep an eye on whether it repeats well.",
        scores: {
          ownership: 2,
          reflection: 2,
          dependency: 0,
          leverage: 2,
          verification: 1,
          speedBias: 1,
        },
      },
      {
        id: "q12_c",
        label:
          "Move to the next task unless something about the feature felt especially risky.",
        scores: {
          ownership: 0,
          reflection: 0,
          dependency: 1,
          leverage: 2,
          verification: 0,
          speedBias: 3,
        },
      },
      {
        id: "q12_d",
        label:
          "Keep the prompts that worked and trust the workflow if the shipped result held up.",
        scores: {
          ownership: -1,
          reflection: -1,
          dependency: 2,
          leverage: 2,
          verification: -1,
          speedBias: 2,
        },
      },
    ],
  },
];
