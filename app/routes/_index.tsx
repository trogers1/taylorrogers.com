import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <>
      <nav className="bg-gray-900 text-gray-50 py-4 px-4 flex items-center justify-between">
        <Link className="font-medium" href="#">
          Home
        </Link>
        <Link className="font-medium" href="#">
          About
        </Link>
        <Link className="font-medium" href="#">
          Services
        </Link>
        <Link className="font-medium" href="#">
          Contact
        </Link>
      </nav>

      <header className="bg-white py-6 sm:py-12 font-serif">
        <div className="container px-4">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl font-serif">
                Taxing Laughter: The Joke Tax Chronicles
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
            </div>
            <div className="prose prose-gray max-w-none not-italic">
              <p>
                Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
                throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
              </p>
              <p>
                Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place:
                under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't
                seem to stop Jokester.
              </p>
              <p>
                And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny
                that they couldn't help but laugh. And once they started laughing, they couldn't stop.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
              <div className="prose prose-gray max-w-none not-italic">
                <p>
                  The king thought long and hard, and finally came up with
                  <Link href="#">a brilliant plan</Link>: he would tax the jokes in the kingdom.
                </p>
                <blockquote>
                  “After all,” he said, “everyone enjoys a good joke, so it's only fair that they should pay for the
                  privilege.”
                </blockquote>
                <h3>The Joke Tax</h3>
                <p>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
                <ul>
                  <li>1st level of puns: 5 gold coins</li>
                  <li>2nd level of jokes: 10 gold coins</li>
                  <li>3rd level of one-liners : 20 gold coins</li>
                </ul>
                <p>
                  As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person
                  who refused to let the king's foolishness get him down: a court jester named Jokester.
                </p>
              </div>
              <div className="space-y-4">
                <img
                  alt="Cover image"
                  className="aspect-[4/3] rounded-lg object-cover overflow-hidden"
                  height={400}
                  src="/placeholder.svg"
                  width={600}
                />
                <figcaption>Image caption goes here</figcaption>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
