import type { NumberLineLabel, NumberLineProps } from '.';

type NumberLineLabelWithPercentage = NumberLineLabel & { percentage: number };

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

export function organizeLabels({
  positions,
  minNumber,
  maxNumber,
}: NumberLineProps) {
  // Sort and deduplicate positions based on their percentage
  const sortedPositions = positions
    .map(
      (pos): NumberLineLabelWithPercentage => ({
        ...pos,
        percentage: Math.round(
          calculatePercentage({ value: pos.value, minNumber, maxNumber }),
        ),
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
  }, [] as Array<NumberLineLabelWithPercentage>);
  return deduplicatedLabels;
}
