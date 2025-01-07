'use client';

import { ProfileImages } from './ProfileImgs';
import { Resume } from './resume/Resume';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 px-4 py-12 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center">
          <ProfileImages />
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
          <Resume />
        </div>
      </div>
    </div>
  );
}
