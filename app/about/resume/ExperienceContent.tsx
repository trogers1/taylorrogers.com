export const ExperienceContent: React.FC = () => {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Engineering Manager</h3>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>Lightcast</strong> (Formerly: Emsi) -- Moscow, ID | May 2022 -
          Present
        </p>
        <ul className="<ist-inside list-disc p-6">
          <li>
            Developed mainly React.js and Node.js applications hosted on AWS,
            leveraging S3, Cloudfront, DynamoDB, Postgres (Supabase), Next.js,
            Terraform, and more.
          </li>
          <li>
            Designed the event logging patterns and observability architecture
            used by all Full-Stack, Typescript application teams at the company.
          </li>
          <li>
            Was selected to lead several experimental, greenfield projects.
          </li>{' '}
          <li>
            Led the development and launch of a brand-new, AI-based software in
            less than 1 month.
          </li>{' '}
          <li>
            Acted as both Engineering Manager and Technical Lead for two
            separate teams and three separate projects, always fostering a
            supportive and productive environment.
          </li>{' '}
          <li>
            Increased CI/CD Pipeline efficiency, reducing deployment times by
            80%.
          </li>
          <li>
            Worked closely with stakeholders to shape the future of software,
            leveraging experience to create achievable and measurable product
            and platform goals.
          </li>
          <li>
            Cut operational costs for a SaaS offering by 60% within 3 months of
            taking ownership of the project, while decreasing network response
            times by 10-15%.
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Software Engineer</h3>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>Trustpilot</strong> -- Edinburgh, UK | Jun 2021 - Dec 2021
        </p>
        <ul className="<ist-inside list-disc p-6">
          <li>
            Supported and extended over 100 mission-critical AWS microservices.
          </li>
          <li>
            Introduced testing guidelines and best practices while finding and
            fixing hundreds of previously unknown or ignored bugs.
          </li>
          <li>
            Initiated Agile and Scrum processes and refocused the team toward an
            ethos of testing and documentation.
          </li>{' '}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">
          Software Engineer: React Developer
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>Insights</strong> -- Dundee, UK | Nov 2020 - May 2021
        </p>
        <ul className="<ist-inside list-disc p-6">
          <li>
            Devised cross-team processes to increase collaboration and
            efficiency.{' '}
          </li>
          <li>
            Designed and built features in React and Typescript, such as the
            entire application’s Frontend Permissions architecture.
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Full Stack Software Engineer</h3>
        <p className="text-gray-600 dark:text-gray-400">
          <strong>Emsi</strong> (later: Lightcast) -- Moscow, ID | Sep 2018 -
          Sep 2020
        </p>
        <ul className="<ist-inside list-disc p-6">
          <li>
            Engineered features for a student-centric SaaS product, leveraging
            knowledge of React, Redux, AWS, ES6 Javascript, AWS Lambdas, Git,
            APIs, and more.{' '}
          </li>
        </ul>
      </div>
    </>
  );
};
