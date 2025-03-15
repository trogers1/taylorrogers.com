import React, {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type PropsWithChildren,
  type ReactElement,
  type Reducer,
} from 'react';
import { defaultLabelToNumberLineDist, organizeLabels } from './utils';

export const getElementOverlap = ({
  element1,
  element2,
}: {
  element1: HTMLElement;
  element2: HTMLElement;
}) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  console.log({ rect1 });
  console.log({ rect2 });

  if (
    rect1 &&
    rect2 &&
    !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    )
  ) {
    // Overlap detected
    return true;
  }
  return false;
};

/* Label Overlap
 * for each label
 * check if there's overlap with any previous label (from first to most recent)
 * if not
 *   continue
 * if hasOverlap
 *   set height of tick-to-label line to:
 *       (overlappedLabel.bottom - numberLine wrapper bottom = the line height to clear preLabel) + (margin amount in px)
 *   return/break and rerender and recheck labels now that this one has a new height
 */
const TopAndBottomLabel = (props: PropsWithChildren) => (
  // <div className="rounded border border-gray-300 bg-gray-100 px-1">
  <div className="z-10 my-2 bg-background">{props.children}</div>
);
type NumberLineState = ReturnType<typeof organizeLabels>;
type NumberLineAction =
  | {
      type: 'SET_STATE';
      payload: NumberLineState;
    }
  | { type: 'UPDATE_LABEL'; payload: NumberLineState[number] }
  | { type: 'ADD_LABEL'; payload: NumberLineState[number] }
  | { type: 'REMOVE_LABEL'; payload: NumberLineState[number] };
const numberLineReducer: Reducer<NumberLineState, NumberLineAction> = (
  prevState,
  action,
) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'ADD_LABEL':
      return [...prevState, action.payload];
    default:
      return [...prevState];
  }
};

// Define the type for a numberline event
export type NumberLineLabel = {
  value: number;
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

export const NumberLine: React.FC<NumberLineProps> = ({
  positions,
  topLabels,
  bottomLabels,
  minNumber,
  maxNumber,
}) => {
  const numberLineRef = useRef<HTMLDivElement | null>(null);
  // TODO: Can you have an array of refs in a useRef??? AI thinks so...
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [state, dispatch] = useReducer(numberLineReducer, []);
  const deduplicatedPositions = useMemo(() => {
    const enrichedLabels = organizeLabels({ positions, minNumber, maxNumber });
    dispatch({ type: 'SET_STATE', payload: enrichedLabels });
    return enrichedLabels;
  }, [positions, minNumber, maxNumber]);
  useEffect(() => {
    // Whenever the deduplicatedPositions or the state is updated, check for label overlap
    for (let i = 0; i < state.length; i++) {
      const currLabel = state[i];
      // Max distance between the label and the numberline is:
      // (distance between the numberLine and the bottom of the screen or parent element [passed in?]) - 100
      // TODO: Allow passing in parent element?
      // TODO: 100 is just random. Really, it should be the height of all the combined label elements
      const maxDist = numberLineRef.current
        ? window.innerHeight -
          numberLineRef.current.getBoundingClientRect().bottom -
          100
        : defaultLabelToNumberLineDist;

      if (i === 0 || maxDist === defaultLabelToNumberLineDist) {
        continue;
      }
      // check if there's overlap with any previous label (from first to most recent)
      for (let j = 0; j < i; j++) {
        const labelToCheckAgainst = state[j];
      }
    }
  }, [
    deduplicatedPositions,
    JSON.stringify(state.sort((a, b) => a.percentage - b.percentage)),
  ]);
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
              <React.Fragment key={pos.value}>
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
                    {/* The line from the label to the tick on the numberline */}
                    <div className="h-full min-h-12 w-[1px] bg-gray-900 dark:bg-gray-300" />

                    {/* The actual label elements */}
                    <div
                      id={`labelWrapper_${pos.percentage}`}
                      ref={(el) => {
                        labelRefs.current[index] = el;
                      }}
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
