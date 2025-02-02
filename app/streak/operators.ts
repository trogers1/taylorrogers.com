// filterDefinitions
type NumberRelationalOperator = '>' | '<' | '=' | '>=' | '<=';
export const numberRelationalOperators: NumberRelationalOperator[] = [
  '>',
  '<',
  '=',
  '>=',
  '<=',
];
type InverseNumberRelationalOperator = `!${NumberRelationalOperator}`;
export const inverseNumberRelationalOperators: InverseNumberRelationalOperator[] =
  ['!>', '!<', '!=', '!>=', '!<='];
type StringRelationalOperator = '=' | 'includes'; // maybe add 'match', 'startsWith', 'endsWith'
export const stringRelationalOperators: StringRelationalOperator[] = [
  '=',
  'includes',
];
type InverseStringRelationalOperator = `!${StringRelationalOperator}`;
export const inverseStringRelationalOperators: InverseStringRelationalOperator[] =
  ['!=', '!includes'];
type BooleanRelationalOperator = '=';
export const booleanRelationalOperators: BooleanRelationalOperator[] = ['='];
type InverseBooleanRelationalOperator = `!${BooleanRelationalOperator}`;
export const inverseBooleanRelationalOperators: InverseBooleanRelationalOperator[] =
  ['!='];
export type AllRelationalOperators =
  | NumberRelationalOperator
  | InverseNumberRelationalOperator
  | StringRelationalOperator
  | InverseStringRelationalOperator
  | BooleanRelationalOperator
  | InverseBooleanRelationalOperator;
export type LogicalOperator = 'and' | 'or'; // For use later between filters (or for array filter values)
