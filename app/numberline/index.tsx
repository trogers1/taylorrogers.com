import React, { useMemo, type ReactElement, type ReactNode } from 'react';
import { organizeLabels } from './utils';

// Define the type for a numberline event
export type NumberLineLabel = {
  value: number;
  labelElements: ReactElement[];
};

// Props for the NumberLine component
export type NumberLineProps = {
  positions: NumberLineLabel[];
  minNumber: number;
  maxNumber: number;
};

export const NumberLine: React.FC<NumberLineProps> = ({
  positions,
  minNumber,
  maxNumber,
}) => {
  const deduplicatedPositions = useMemo(() => {
    return organizeLabels({ positions, minNumber, maxNumber });
  }, [positions, minNumber, maxNumber]);
  return (
    <div className="relative w-full">
      {/* Container for minNumber, maxNumber, and the NumberLine */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{minNumber}</span>
        <span>{maxNumber}</span>
      </div>

      {/* The NumberLine */}
      <div className="relative h-2 w-full bg-gradient-to-r from-[#000004] via-[#3b0f70] via-[#8c2981] via-[#de4968] via-[#fe9f6d] to-[#fcfdbf]">
        {/* Absolute positioned div for ticks and labels */}
        <div className="absolute left-0 top-0 flex h-full w-full">
          {deduplicatedPositions.map((pos, index) => {
            const prevPercentage =
              index === 0 ? 0 : deduplicatedPositions[index - 1].percentage;
            const spaceWidth = pos.percentage - prevPercentage;

            return (
              <React.Fragment key={pos.value}>
                {/* Space between ticks */}
                <div
                  style={{ width: `${spaceWidth}%` }}
                  className="h-full"
                ></div>
                {/* Tick */}
                <div className="relative h-full w-[3px] border-[1px] border-white bg-black">
                  {/* Label */}
                  <div className="absolute left-1/2 top-2 flex -translate-x-1/2 transform flex-col space-y-4 text-xs text-gray-700">
                    {pos.labelElements}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          {/* Fill the remaining space after the last tick */}
          <div
            style={{
              width: `${100 - deduplicatedPositions[deduplicatedPositions.length - 1].percentage}%`,
            }}
            className="h-full"
          ></div>
        </div>
      </div>
    </div>
  );
};
