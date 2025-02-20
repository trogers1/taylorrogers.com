import React from 'react';
import { NumberLine, type NumberLineLabel } from '../timeline';

const Page: React.FC = () => {
  const positions: NumberLineLabel[] = [
    {
      value: 10,
      labelElements: [<span>Ten Percent</span>],
    },
    {
      value: 20,
      labelElements: [<span>Twenty Percent</span>],
    },
    {
      value: 90,
      labelElements: [<span>Ninety Percent</span>],
    },
    {
      value: 10,
      labelElements: [<span>10 Percent Again</span>],
    },
    ,
  ];

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Project Timeline</h1>
      <NumberLine positions={positions} minNumber={0} maxNumber={100} />
    </div>
  );
};

export default Page;
