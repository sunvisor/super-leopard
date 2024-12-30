import { Field } from '../object';

export type FieldValueType = string | number | boolean;

export type FieldValues = Record<string, FieldValueType>;

export function getValue(
  values: FieldValues | FieldValueType | undefined,
  field: Field
): FieldValueType {
  values = values === undefined ? {} : values;
  if (typeof values === 'object') return values[field.name] ?? '';
  return values;
}
