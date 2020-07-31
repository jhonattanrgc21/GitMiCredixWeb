export function ConvertStringAmountToNumber(value: string): number {
  const integer = (value.split(',')[0]).replace('.', '');
  const decimal = value.split(',')[1];
  return Number(`${integer}.${decimal ? decimal : '00'}`);
}
