export type SkillTag =
  | 'Hard Skill'
  | 'Frontend'
  | 'Backend'
  | 'Soft Skill'
  | 'Leadership';
export const allTags: SkillTag[] = [
  'Leadership',
  'Backend',
  'Frontend',
  'Soft Skill',
  'Hard Skill',
] as const;
type Skill = { name: string; level: number; tags: SkillTag[] };
export const skills: Skill[] = [
  { name: 'React', level: 90, tags: ['Hard Skill', 'Frontend'] },
  { name: 'Node.js', level: 95, tags: ['Hard Skill', 'Frontend'] },
  { name: 'TypeScript', level: 96, tags: ['Hard Skill', 'Frontend'] },
  { name: 'Javascript', level: 96, tags: ['Hard Skill', 'Frontend'] },
  { name: 'Python', level: 70, tags: ['Hard Skill', 'Backend'] },
  { name: 'CSS', level: 70, tags: ['Hard Skill', 'Frontend'] },
  { name: 'Tailwind CSS', level: 60, tags: ['Hard Skill', 'Frontend'] },
  { name: 'AWS', level: 75, tags: ['Hard Skill', 'Frontend'] },
  { name: 'Technical Documentation', level: 100, tags: ['Soft Skill'] },
  { name: 'Code Review', level: 92, tags: ['Soft Skill'] },
  { name: 'Public Speaking', level: 100, tags: ['Soft Skill', 'Leadership'] },
  {
    name: 'Non-Dogmatic Opinions',
    level: 95,
    tags: ['Soft Skill', 'Leadership'],
  },
  {
    name: 'CI Pipelines',
    level: 87,
    tags: ['Hard Skill', 'Frontend', 'Backend'],
  },
  { name: 'RFCs', level: 96, tags: ['Soft Skill'] },
  { name: 'Experimentation', level: 98, tags: ['Soft Skill'] },
  { name: 'Initiative', level: 98, tags: ['Soft Skill'] },
  { name: 'Git', level: 80, tags: ['Hard Skill', 'Frontend', 'Backend'] },
  { name: 'Terraform / OpenTofu', level: 80, tags: ['Hard Skill', 'Backend'] },
  { name: 'Agile', level: 96, tags: ['Soft Skill', 'Leadership'] },
  { name: 'Shape Up', level: 88, tags: ['Hard Skill', 'Leadership'] },
  {
    name: 'Performance Reviews',
    level: 100,
    tags: ['Soft Skill', 'Leadership'],
  },
  { name: 'Docker', level: 50, tags: ['Hard Skill', 'Frontend'] },
  {
    name: 'Software Design / Architecture',
    level: 89,
    tags: ['Hard Skill', 'Frontend', 'Backend'],
  },
  {
    name: 'Generative AI (LLMs)',
    level: 93,
    tags: ['Hard Skill', 'Backend', 'Frontend'],
  },
  {
    name: 'Cloudfront (AWS)',
    level: 83,
    tags: ['Hard Skill', 'Backend'],
  },
  {
    name: 'Software Testing',
    level: 92,
    tags: ['Hard Skill', 'Frontend', 'Backend'],
  },
  {
    name: 'Scalability',
    level: 86,
    tags: ['Hard Skill', 'Backend', 'Frontend'],
  },
];
