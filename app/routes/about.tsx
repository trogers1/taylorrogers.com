'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Moon, Sun } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { Switch } from '~/components/ui/switch';

export default function SoftwareEngineerResume() {
  const [darkMode, setDarkMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 px-4 py-12 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
          <CardHeader className="flex items-start justify-between bg-gray-800 p-6 text-white dark:bg-gray-700">
            <div>
              <CardTitle className="text-3xl font-bold">John Doe</CardTitle>
              <CardDescription className="mt-2 text-xl text-gray-300">
                Senior Software Engineer
              </CardDescription>
              <div className="mt-4 flex flex-wrap items-center text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                <span className="mr-4">San Francisco, CA</span>
                <Mail className="mr-2 h-4 w-4" />
                <a
                  href="mailto:john.doe@example.com"
                  className="mr-4 hover:underline"
                >
                  john.doe@example.com
                </a>
                <Github className="mr-2 h-4 w-4" />
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 hover:underline"
                >
                  github.com/johndoe
                </a>
                <Linkedin className="mr-2 h-4 w-4" />
                <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/johndoe
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <Sun className="mr-2 h-4 w-4" />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="ml-2 h-4 w-4" />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <section className="mb-6">
              <h2 className="mb-2 text-2xl font-semibold">Summary</h2>
              <p>
                Experienced software engineer with a strong background in
                full-stack development, cloud technologies, and agile
                methodologies. Passionate about creating efficient, scalable,
                and user-friendly applications.
              </p>
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
              <CollapsibleContent className="mt-2">
                <ul className="grid list-inside list-disc grid-cols-2 gap-2 md:grid-cols-3">
                  <li>JavaScript (ES6+)</li>
                  <li>TypeScript</li>
                  <li>React</li>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>AWS</li>
                  <li>Docker</li>
                  <li>GraphQL</li>
                  <li>SQL & NoSQL databases</li>
                </ul>
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
              <CollapsibleContent className="mt-2">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    Senior Software Engineer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    TechCorp Inc. | Jan 2019 - Present
                  </p>
                  <ul className="mt-2 list-inside list-disc">
                    <li>
                      Led the development of a microservices-based e-commerce
                      platform
                    </li>
                    <li>
                      Implemented CI/CD pipelines, reducing deployment time by
                      40%
                    </li>
                    <li>
                      Mentored junior developers and conducted code reviews
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Software Engineer</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    InnoSoft Solutions | Jun 2016 - Dec 2018
                  </p>
                  <ul className="mt-2 list-inside list-disc">
                    <li>
                      Developed and maintained multiple web applications using
                      React and Node.js
                    </li>
                    <li>
                      Optimized database queries, improving application
                      performance by 30%
                    </li>
                    <li>
                      Collaborated with UX designers to implement responsive and
                      accessible interfaces
                    </li>
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <section className="mt-6">
              <h2 className="mb-2 text-2xl font-semibold">Education</h2>
              <div>
                <h3 className="text-xl font-semibold">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  University of Technology | Graduated: May 2016
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
