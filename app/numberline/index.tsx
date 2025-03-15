import React, {
  useMemo,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { organizeLabels } from './utils';

// Define the type for a numberline event
export type NumberLineLabel = {
  value: number;
  distFromNumberLine?: number;
  labelElements: ReactElement[];
};

// Props for the NumberLine component
export type NumberLineProps = {
  positions: NumberLineLabel[];
  topLabels?: { minLabel: string; maxLabel: string };
  bottomLabels?: { minLabel: string; maxLabel: string };
  minNumber: number;
  maxNumber: number;
};

const TopAndBottomLabel = (props: PropsWithChildren) => (
  // <div className="rounded border border-gray-300 bg-gray-100 px-1">
  <div className="z-20 my-2 bg-background">{props.children}</div>
);
export const NumberLine: React.FC<NumberLineProps> = ({
  positions,
  topLabels,
  bottomLabels,
  minNumber,
  maxNumber,
}) => {
  const deduplicatedPositions = useMemo(() => {
    return organizeLabels({ positions, minNumber, maxNumber });
  }, [positions, minNumber, maxNumber]);
  return (
    <div className="relative w-full">
      {/* 👆 Container for minNumber, maxNumber, and the NumberLine */}

      {/* 👇 Container for top end-labels */}
      {topLabels ? (
        <div className="flex justify-between text-sm text-gray-600">
          <TopAndBottomLabel>{topLabels.minLabel}</TopAndBottomLabel>
          <TopAndBottomLabel>{topLabels.maxLabel}</TopAndBottomLabel>
        </div>
      ) : (
        ''
      )}
      {/* The NumberLine */}
      <div className="relative h-2 w-full bg-gradient-to-r from-[#000004] via-[#3b0f70] via-[#8c2981] via-[#de4968] via-[#fe9f6d] to-[#fcfdbf]">
        {/* Absolute positioned div for ticks and labels */}
        <div className="absolute left-0 top-0 flex h-full w-full">
          {deduplicatedPositions.map((pos, index) => {
            const prevPercentage =
              index === 0 ? 0 : deduplicatedPositions[index - 1].percentage;
            const spaceWidth = pos.percentage - prevPercentage;

            return (
              <React.Fragment key={pos.percentage}>
                {/* Space between ticks */}
                <div
                  style={{ width: `${spaceWidth}%` }}
                  className="h-full"
                ></div>
                {/* Tick */}
                <div
                  id={`numberLineTick_${pos.percentage}`}
                  className="relative h-full w-[3px] border-[1px] border-white bg-black"
                >
                  {/* Label Wrapper */}
                  <div className="absolute left-1/2 top-2 flex -translate-x-1/2 transform flex-col items-center justify-center space-y-4 text-xs text-gray-700">
                    {/* TODO: Dynamic positioning of label elements according to overlap.

                        I started this work, but gave up to get the blog post published.
                        To pick it up again, revert the commit that reverted those changes:
                        01ddbfe13b83d7d52653ed91785c8e6e0cb6562d
                    */}
                    {/* The line from the label to the tick on the numberline */}
                    {/* The `style` prop is necessary for dynamic styling. See: 
                        https://stackoverflow.com/a/73899468 */}
                    <div
                      style={{
                        minHeight: `${pos.distFromNumberLine}rem`,
                      }}
                      className={`z-10 h-full w-[1px] bg-gray-300 dark:bg-gray-300`}
                    />
                    {/* The actual label elements */}
                    <div
                      id={`labelWrapper_${pos.percentage}`}
                      style={{ zIndex: 30 }}
                    >
                      {pos.labelElements}
                    </div>
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

      {/* Container for bottom end-labels */}
      {bottomLabels ? (
        <div className="flex justify-between text-sm text-gray-600">
          <TopAndBottomLabel>{bottomLabels.minLabel}</TopAndBottomLabel>
          <TopAndBottomLabel>{bottomLabels.maxLabel}</TopAndBottomLabel>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
