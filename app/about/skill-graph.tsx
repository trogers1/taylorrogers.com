'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'AWS', level: 70 },
  { name: 'Docker', level: 65 },
];

export function SkillGraph() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="mb-6 text-center text-2xl font-bold">Skills</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center">
            <span className="mr-4 w-24 text-right">{skill.name}</span>
            <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-4 rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <span className="ml-4 w-12 text-right">{skill.level}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
