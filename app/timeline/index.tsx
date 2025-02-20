import React, { type ReactElement, type ReactNode } from 'react';

// Define the type for a timeline event
export type NumberLineLabel = {
  value: number;
  labelElements: ReactElement[];
};

type NumberLineLabelWithPercentage = NumberLineLabel & { percentage: number };

// Props for the NumberLine component
type NumberLineProps = {
  positions: NumberLineLabel[];
  minNumber: number;
  maxNumber: number;
};

export const NumberLine: React.FC<NumberLineProps> = ({
  positions,
  minNumber,
  maxNumber,
}) => {
  // Calculate the percentage position for each value
  const calculatePercentage = (value: number) => {
    return ((value - minNumber) / (maxNumber - minNumber)) * 100;
  };

  // Sort and deduplicate positions based on their percentage
  console.log({ positions, minNumber, maxNumber });
  const sortedPositions = positions
    .map(
      (pos): NumberLineLabelWithPercentage => ({
        ...pos,
        percentage: Math.round(calculatePercentage(pos.value)),
      }),
    )
    .sort((a, b) => a.percentage - b.percentage);
  console.log({ sortedPositions });
  const deduplicatedLabels = sortedPositions.reduce((acc, curr) => {
    console.log({ label: 'reduce', acc: [...acc], curr: { ...curr } });
    const duplicatePercentageLabelIndex = acc.findIndex(
      (val) => val.percentage === curr.percentage,
    );
    console.log({ duplicatePercentageLabelIndex });
    if (duplicatePercentageLabelIndex !== -1) {
      const labelElements = acc[duplicatePercentageLabelIndex].labelElements;
      console.log({ labelElements });
      acc[duplicatePercentageLabelIndex].labelElements = [
        ...labelElements,
        ...curr.labelElements,
      ];
    } else {
      acc.push(curr);
    }
    return acc;
  }, [] as Array<NumberLineLabelWithPercentage>);

  return (
    <div className="relative w-full">
      {/* Container for minNumber, maxNumber, and the NumberLine */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{minNumber}</span>
        <span>{maxNumber}</span>
      </div>

      {/* The NumberLine */}
      <div className="relative h-2 w-full bg-gray-300">
        {/* Absolute positioned div for ticks and labels */}
        <div className="absolute left-0 top-0 flex h-full w-full">
          {deduplicatedLabels.map((pos, index) => {
            const prevPercentage =
              index === 0 ? 0 : deduplicatedLabels[index - 1].percentage;
            const spaceWidth = pos.percentage - prevPercentage;

            return (
              <React.Fragment key={pos.value}>
                {/* Space between ticks */}
                <div
                  style={{ width: `${spaceWidth}%` }}
                  className="h-full"
                ></div>
                {/* Tick */}
                <div className="relative h-full w-px bg-black">
                  {/* Label */}
                  <div className="absolute left-1/2 top-2 -translate-x-1/2 transform text-xs text-gray-700">
                    {pos.labelElements}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          {/* Fill the remaining space after the last tick */}
          <div
            style={{
              width: `${100 - deduplicatedLabels[deduplicatedLabels.length - 1].percentage}%`,
            }}
            className="h-full"
          ></div>
        </div>
      </div>
    </div>
  );
};
