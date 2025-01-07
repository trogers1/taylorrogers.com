import { useState, type PropsWithChildren } from 'react';
import { Button } from '~/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';

export const CollapseSection = ({
  sectionName,
  children,
}: PropsWithChildren<{ sectionName: string }>) => {
  const [expandedSection, setExpandedSection] = useState<boolean>(false);

  const toggleSection = () => {
    setExpandedSection(!expandedSection);
  };

  return (
    <section className="mt-6">
      <Collapsible open={expandedSection} onOpenChange={() => toggleSection()}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between">
            <h2 className="text-2xl font-semibold">{sectionName}</h2>
            <span>{expandedSection ? '▲' : '▼'}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-6">
          {children}{' '}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
