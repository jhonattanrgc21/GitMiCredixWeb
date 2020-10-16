export function ConvertStringAmountToNumber(value: string): number {
  const integer = (value.split(',')[0]).split('.').join('');
  const decimal = value.split(',')[1];
  return Number(`${integer}.${decimal ? decimal : '00'}`);
}
