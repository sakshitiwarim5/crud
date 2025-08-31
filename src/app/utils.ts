export const SKILL_OPTIONS = [
  "Java",
  "Angular",
  "CSS",
  "HTML",
  "JavaScript",
  "UI",
  "SQL",
  "React",
  "PHP",
  "GIT",
  "AWS",
  "Python",
  "Django",
  "C",
  "C++",
  "C#",
  "Unity",
  "R",
  "AI",
  "NLP",
  "Photoshop",
  "Node.js",
];

export const DESIGNATIONS = [
  "Developer",
  "Manager",
  "System Admin",
  "Team Lead",
  "PM",
] as const;

export function isPastDate(value: string | undefined | null): boolean {
  if (!value) return false;
  const d = new Date(value);
  const today = new Date();
  // compare date parts to allow same-day
  return d.getTime() <= today.getTime();
}

export function genId(): string {
  return Math.random().toString(36).slice(2, 9);
}
