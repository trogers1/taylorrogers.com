'use client';
import { Card, CardContent } from '~/components/ui/card';
import { SkillGraph } from '~/about/resume/SkillGraph';
import { ContactSection } from './ContactSection';
import { CollapseSection } from './CollapseSection';
import { ExperienceContent } from './ExperienceContent';
import { EducationContent } from './EducationContent';

export const Resume: React.FC = () => {
  return (
    <Card className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
      <ContactSection />
      <CardContent className="p-6">
        <CollapseSection sectionName="Skills">
          <SkillGraph />
        </CollapseSection>
        <CollapseSection sectionName="Experience">
          <ExperienceContent />
        </CollapseSection>
        <CollapseSection sectionName="Education">
          <EducationContent />
        </CollapseSection>
      </CardContent>
    </Card>
  );
};
