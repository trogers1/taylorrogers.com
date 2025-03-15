import type { NumberLineLabel, NumberLineProps } from '.';

type EnrichedNumberLineLabel = NumberLineLabel & {
  percentage: number;
  id: string;
  distanceFromNumberline: number;
};

// Calculate the percentage position for each value
const calculatePercentage = ({
  value,
  minNumber,
  maxNumber,
}: {
  value: number;
  minNumber: number;
  maxNumber: number;
}) => {
  return ((value - minNumber) / (maxNumber - minNumber)) * 100;
};

export const defaultLabelToNumberLineDist = 80;
export function organizeLabels({
  positions,
  minNumber,
  maxNumber,
}: NumberLineProps) {
  // Sort and deduplicate positions based on their percentage
  const sortedPositions = positions
    .map(
      (pos): EnrichedNumberLineLabel => ({
        ...pos,
        percentage: Math.round(
          calculatePercentage({ value: pos.value, minNumber, maxNumber }),
        ),
        id: crypto.randomUUID(),
        distanceFromNumberline: defaultLabelToNumberLineDist,
      }),
    )
    .sort((a, b) => a.percentage - b.percentage);
  const deduplicatedLabels = sortedPositions.reduce((acc, curr) => {
    const duplicatePercentageLabelIndex = acc.findIndex(
      (val) => val.percentage === curr.percentage,
    );
    if (duplicatePercentageLabelIndex !== -1) {
      const labelElements = acc[duplicatePercentageLabelIndex].labelElements;
      acc[duplicatePercentageLabelIndex].labelElements = [
        ...labelElements,
        <hr className="w-full border-t border-gray-300" />,
        ...curr.labelElements,
      ];
    } else {
      acc.push(curr);
    }
    return acc;
  }, [] as Array<EnrichedNumberLineLabel>);
  return deduplicatedLabels;
}
