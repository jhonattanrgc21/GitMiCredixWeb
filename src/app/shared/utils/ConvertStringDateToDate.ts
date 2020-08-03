export function ConvertStringDateToDate(value: string): Date {
  return new Date(Number(value.split('/')[2]), Number(value.split('/')[1]) - 1, Number(value.split('/')[0]));
}
