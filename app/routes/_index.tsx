import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Columns } from '~/components/Columns';
import { Heading } from '~/components/Heading';
import { Image } from '~/components/Image';
import { PostedDate } from '~/components/PostedDate';
import { Quote } from '~/components/Quote';

const typewriterImg = './images/library-typewriter.webp';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <>
      <header className="bg-white py-6 sm:py-12 font-serif">
        <div className="container px-4">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="space-y-2">
              <Heading component="h1">Taxing Laughter: The Joke Tax Chronicles</Heading>
              <PostedDate>Posted on August 24, 2023</PostedDate>
            </div>
            <div className="prose prose-gray max-w-none not-italic">
              <p>
                Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
                throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
              </p>
              <p>
                Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place:
                under the king&apos;s pillow, in his soup, even in the royal toilet. The king was furious, but he
                couldn&apos;t seem to stop Jokester.
              </p>
              <p>
                And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny
                that they couldn&apos;t help but laugh. And once they started laughing, they couldn&apos;t stop.
              </p>
            </div>
            <Columns>
              <div className="prose prose-gray max-w-none not-italic">
                <p>
                  The king thought long and hard, and finally came up with
                  <Link to="#">a brilliant plan</Link>: he would tax the jokes in the kingdom.
                </p>
                <Quote attribution={{ name: 'The King', subtitle: 'King of the Realm' }}>
                  “After all,” he said, “everyone enjoys a good joke, so it&apos;s only fair that they should pay for
                  the privilege.”
                </Quote>
                <Heading component="h1">The Joke Tax</Heading>
                <p>The king&apos;s subjects were not amused. They grumbled and complained, but the king was firm:</p>
                <ul>
                  <li>1st level of puns: 5 gold coins</li>
                  <li>2nd level of jokes: 10 gold coins</li>
                  <li>3rd level of one-liners : 20 gold coins</li>
                </ul>
                <p>
                  As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person
                  who refused to let the king&apos;s foolishness get him down: a court jester named Jokester.
                </p>
              </div>
              <Image alt="A typewriter in an ancient library" src={typewriterImg} caption="Image caption goes here" />
            </Columns>
          </div>
        </div>
      </header>
    </>
  );
}
