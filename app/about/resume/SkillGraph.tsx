'use client';

import { motion } from 'framer-motion';
import { allTags, skills, type SkillTag } from './Skills';
import { useState } from 'react';
import { Toggle } from '~/components/ui/toggle';

export function SkillGraph() {
  // TODO: Make this URL-controlled eventually.
  const [tagToFilterTo, setTagToFilterTo] = useState<SkillTag | null>(null);
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h3 className="mb-6 text-center text-lg font-bold">Skill Types</h3>

      <div className="flex w-full flex-col justify-center sm:flex-row">
        {allTags.map((tag) => (
          <Toggle
            className="m-2"
            key={tag}
            pressed={tagToFilterTo === tag}
            onPressedChange={(isPressed) =>
              setTagToFilterTo(isPressed ? tag : null)
            }
          >
            {tag}
          </Toggle>
        ))}
      </div>
      <div className="space-y-4">
        {skills
          .filter((skill) =>
            tagToFilterTo
              ? skill.tags.some((tag) => tag === tagToFilterTo)
              : true,
          )
          .sort((a, b) => b.level - a.level)
          .map((skill) => (
            <div key={skill.name} className="flex items-center">
              <span className="mr-4 min-w-28 max-w-28 text-right">
                {skill.name}
              </span>
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                  className="h-4 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <span className="ml-4 w-12 text-right">{skill.level}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
