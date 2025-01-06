'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { SkillGraph } from '~/components/custom/skill-graph';

export default function SoftwareEngineerResume() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`min-h-screen`}>
      <div className="bg-gray-100 px-4 py-12 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src="/profile.jpg"
              alt="Taylor Rogers"
              width={200}
              height={200}
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-0 overflow-hidden rounded-full border-4 border-white">
              <a href="https://github.com/trogers1">
                <img
                  src="/picard_square.jpg"
                  alt="Taylor Rogers Picard Avatar"
                  width={64}
                  height={64}
                />
              </a>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold">Taylor Rogers</h1>
          <p className="text-xl text-gray-600">Writer</p>
          <p className="mb-6 text-lg text-gray-600">
            Software, Prose, and Verse
          </p>
          <p className="mb-12 max-w-2xl text-center">
            Professionally, Taylor is an Engineering Manager and Tech Lead with
            8 years of experience and a proven record of excellence and
            performance beyond the scope of his role. He's passionate about
            creative problem-solving, business-focused engineering, and
            fostering a supportive, inclusive environment where excellence is
            the norm. He has also been a professional adventure sportsman.
          </p>
          <p className="mb-12 max-w-2xl text-center">
            Otherwise, Taylor is a writer of both verse and prose in his free
            time. At home, you'll find him making handmade espresso, baking
            sourdough bread, or spending time with his lovely wife, Savannah.
            Taylor can also sometimes be found in the great outdoors, whenever
            he can find the time.
          </p>
        </div>
        <Card className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
          <CardHeader className="flex items-start justify-between bg-gray-800 p-6 text-white dark:bg-gray-700">
            <div className="w-full">
              <div className="mt-4 flex w-full flex-wrap items-center text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                <span className="mr-4">Moscow, ID</span>

                <Mail className="mr-2 h-4 w-4" />
                <a
                  href="mailto:taylor.rea.rogers@gmail.com"
                  className="mr-4 hover:underline"
                >
                  taylor.rea.rogers@gmail.com
                </a>

                <Github className="mr-2 h-4 w-4" />
                <a
                  href="https://github.com/trogers1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:underline"
                >
                  github.com/trogers1
                </a>

                <Linkedin className="mr-2 h-4 w-4" />
                <a
                  href="https://www.linkedin.com/in/taylor-r-rogers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/taylor-r-rogers
                </a>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <section className="mb-6">
              <h2 className="mb-2 text-2xl font-semibold">Summary</h2>
              <p>Do I want this????</p>
            </section>

            <Collapsible
              open={expandedSection === 'skills'}
              onOpenChange={() => toggleSection('skills')}
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full justify-between">
                  <h2 className="text-2xl font-semibold">Skills</h2>
                  <span>{expandedSection === 'skills' ? '▲' : '▼'}</span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-6">
                <SkillGraph />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={expandedSection === 'experience'}
              onOpenChange={() => toggleSection('experience')}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="mt-6 flex w-full justify-between"
                >
                  <h2 className="text-2xl font-semibold">Experience</h2>
                  <span>{expandedSection === 'experience' ? '▲' : '▼'}</span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Engineering Manager</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Lightcast</strong> (Formerly: Emsi) -- Moscow, ID |
                    May 2022 - Present
                  </p>
                  <ul className="<ist-inside list-disc p-6">
                    <li>
                      Developed mainly React.js and Node.js applications hosted
                      on AWS, leveraging S3, Cloudfront, DynamoDB, Postgres
                      (Supabase), Next.js, Terraform, and more.
                    </li>
                    <li>
                      Designed the event logging patterns and observability
                      architecture used by all Full-Stack, Typescript
                      application teams at the company.
                    </li>
                    <li>
                      Was selected to lead several experimental, greenfield
                      projects.
                    </li>{' '}
                    <li>
                      Led the development and launch of a brand-new, AI-based
                      software in less than 1 month.
                    </li>{' '}
                    <li>
                      Acted as both Engineering Manager and Technical Lead for
                      two separate teams and three separate projects, always
                      fostering a supportive and productive environment.
                    </li>{' '}
                    <li>
                      Increased CI/CD Pipeline efficiency, reducing deployment
                      times by 80%.
                    </li>
                    <li>
                      Worked closely with stakeholders to shape the future of
                      software, leveraging experience to create achievable and
                      measurable product and platform goals.
                    </li>
                    <li>
                      Cut operational costs for a SaaS offering by 60% within 3
                      months of taking ownership of the project, while
                      decreasing network response times by 10-15%.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Software Engineer</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Trustpilot</strong> -- Edinburgh, UK | Jun 2021 -
                    Dec 2021
                  </p>
                  <ul className="<ist-inside list-disc p-6">
                    <li>
                      Supported and extended over 100 mission-critical AWS
                      microservices.
                    </li>
                    <li>
                      Introduced testing guidelines and best practices while
                      finding and fixing hundreds of previously unknown or
                      ignored bugs.
                    </li>
                    <li>
                      Initiated Agile and Scrum processes and refocused the team
                      toward an ethos of testing and documentation.
                    </li>{' '}
                    <li>
                      Led the development and launch of a brand-new, AI-based
                      software in less than 1 month.
                    </li>{' '}
                    <li>
                      Acted as both Engineering Manager and Technical Lead for
                      two separate teams and three separate projects, always
                      fostering a supportive and productive environment.
                    </li>{' '}
                    <li>
                      Increased CI/CD Pipeline efficiency, reducing deployment
                      times by 80%.
                    </li>
                    <li>
                      Worked closely with stakeholders to shape the future of
                      software, leveraging experience to create achievable and
                      measurable product and platform goals.
                    </li>
                    <li>
                      Cut operational costs for a SaaS offering by 60% within 3
                      months of taking ownership of the project, while
                      decreasing network response times by 10-15%.
                    </li>
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <section className="mt-6">
              <h2 className="mb-2 text-2xl font-semibold">Education</h2>
              <div>
                <h3 className="text-xl font-semibold">
                  Minor in Computer Science BA History BA Spanish
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  University of Idaho | Graduated: May 2014
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
