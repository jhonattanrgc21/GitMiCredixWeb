export function ConvertStringAmountToNumber(value: string): number {
  const separator = value.indexOf(',') > -1 ? ',' : '.';
  const integerValue = value.split(separator)[0].replace(/\./g, '');
  const decimalValue = value.split(separator)[1] ? value.split(separator)[1].substring(0, value.split(separator)[1].length) : '00';
  return Number(`${integerValue}.${decimalValue ? decimalValue : '00'}`);
}
