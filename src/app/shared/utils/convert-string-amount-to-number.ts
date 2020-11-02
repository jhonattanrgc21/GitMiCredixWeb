export function ConvertStringAmountToNumber(value: string): number {
  if (value.indexOf(',') > -1) {
    const numberValue = value.replace(/\./g, '').replace(',', '.');
    return Number(numberValue);
  } else {
    const numberValue = value.replace(/\./g, '');
    return (Number(numberValue) * 100) / 100;
  }
}
