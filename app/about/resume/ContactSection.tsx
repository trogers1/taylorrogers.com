import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { CardHeader } from '~/components/ui/card';
export const ContactSection: React.FC = () => (
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
);
