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
      <div
        id="numberLine"
        className="relative h-2 w-full bg-gradient-to-r from-[#000004] via-[#3b0f70] via-[#8c2981] via-[#de4968] via-[#fe9f6d] to-[#fcfdbf]"
      >
        {/*
          There are two mappings of `deduplicatedPositions:
          1. First create all the gray lines between the numberline ticks and where the labels WILL be
          2. Create all the labels for each tick

          The reason for this is so the label LINES will appear underneath the labels when two labels
          have positions right next to one another on the numberLine. 

          Because the `numberLineOverlayForLines` and `numberLineOverLayForLabels` divs
          (below) is absolutely positioned, and the wrappers for the labels and lines are absolutely positioned, 
          each label and line have different stacking contexts, so z-index cannot be used to enforce stack order.
 `
        */}

        {/* Absolute positioned div for labelLines ONLY */}
        <div
          id="numberLineOverlayForLines"
          className="absolute left-0 top-0 flex h-full w-full"
        >
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
                {/* Hidden Tick (for positioning of the labelLine) */}
                <div
                  id={`hiddenNumberLineTick_${pos.percentage}`}
                  className="relative h-full w-[3px] border-[1px] border-transparent bg-transparent"
                >
                  {/* LabelLine Wrapper */}
                  <div
                    id={`labelLineWrapper_${pos.percentage}`}
                    className="absolute left-1/2 top-2 flex -translate-x-1/2 transform flex-col items-center justify-center space-y-4 text-xs text-gray-700"
                  >
                    {/* TODO: Dynamic positioning of label elements according to overlap.

                        I started this work, but gave up to get the blog post published.
                        To pick it up again, revert the commit that reverted those changes:
                        01ddbfe13b83d7d52653ed91785c8e6e0cb6562d
                    */}
                    {/* The line from the label to the tick on the numberline */}
                    {/* The `style` prop is necessary for dynamic styling. See: 
                        https://stackoverflow.com/a/73899468 */}
                    <div
                      id={`labelLine_${pos.percentage}`}
                      style={{
                        minHeight: `${pos.distFromNumberLine}rem`,
                      }}
                      className={`z-10 h-full w-[1px] bg-gray-300 dark:bg-gray-300`}
                    />
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
          />
        </div>

        {/* Absolute positioned div for ticks and labels */}
        <div
          id="numberLineOverlayForLabels"
          className="absolute left-0 top-0 flex h-full w-full"
        >
          {deduplicatedPositions.map((pos, index) => {
            const prevPercentage =
              index === 0 ? 0 : deduplicatedPositions[index - 1].percentage;
            const spaceWidth = pos.percentage - prevPercentage;

            return (
              <React.Fragment key={pos.percentage}>
                {/* Space between ticks */}
                <div
                  id={`labelSpacer_${pos.percentage}`}
                  style={{ width: `${spaceWidth}%` }}
                  className="h-full"
                ></div>
                {/* Tick */}
                <div
                  id={`numberLineTick_${pos.percentage}`}
                  className="relative h-full w-[3px] border-[1px] border-white bg-black"
                >
                  {/* Label Wrapper */}
                  <div
                    id={`fullLabelContainer_${pos.percentage}`}
                    className="absolute left-1/2 top-2 flex -translate-x-1/2 transform flex-col items-center justify-center space-y-4 text-xs text-gray-700"
                  >
                    {/* TODO: Dynamic positioning of label elements according to overlap.

                        I started this work, but gave up to get the blog post published.
                        To pick it up again, revert the commit that reverted those changes:
                        01ddbfe13b83d7d52653ed91785c8e6e0cb6562d
                    */}
                    {/* The line from the label to the tick on the numberline */}
                    {/* The `style` prop is necessary for dynamic styling. See: 
                        https://stackoverflow.com/a/73899468 */}
                    <div
                      id={`hiddenLabelTopSpacer_${pos.percentage}`}
                      style={{
                        minHeight: `${pos.distFromNumberLine}rem`,
                      }}
                      className={`z-10 h-full w-[0px]`}
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
          />
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
