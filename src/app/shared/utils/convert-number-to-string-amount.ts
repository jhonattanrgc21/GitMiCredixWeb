export function ConvertNumberToStringAmount(value: number): string {
  const sign = value >= 0 ? '' : '-';
  const integerValue = Math.trunc(value).toLocaleString('es');
  const decimalValue = (value + '').split('.')[1] ? (value + '').split('.')[1].substring(0, 2) : '00';
  return `${sign}${integerValue},${decimalValue}`;
}
