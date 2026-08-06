import {
  Bot,
  Brain,
  Database,
  ShieldCheck,
  Workflow,
  Wrench,
} from "lucide-react";

// `icon` stocke le composant lui-même (la fonction), pas un élément rendu :
// c'est FeatureCard qui décidera de sa taille et de ses attributs.
const features = [
  {
    icon: Bot,
    title: "Autonomous agents",
    description:
      "Deploy self-sufficient AI agents that can work 24/7 without supervision.",
  },
  {
    icon: Workflow,
    title: "Multi-step planning",
    description:
      "Break down complex goals into actionable steps with intelligent planning.",
  },
  {
    icon: Brain,
    title: "Advanced reasoning",
    description:
      "Leverage state-of-the-art language models for intelligent decision-making.",
  },
  {
    icon: Database,
    title: "Memory & context",
    description:
      "Persistent memory allows agents to learn and improve over time.",
  },
  {
    icon: Wrench,
    title: "Tool integration",
    description: "Connect to thousands of APIs and services seamlessly.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and compliance with SOC2, GDPR, and HIPAA.",
  },
];

export default features;
