export function ConvertStringDateToDate(value: string): Date {
  if (value.split('-').length > 0) {
    const values = value.split('-');
    if (values[0].length === 4) {
      return new Date(Number(values[0]), Number(values[1]) - 1, Number(values[2]));
    } else {
      return new Date(Number(values[2]), Number(values[1]) - 1, Number(values[0]));
    }
  }

  if (value.split('/').length > 0) {
    const values = value.split('/');
    return new Date(Number(values[2]), Number(values[1]) - 1, Number(values[0]));
  }


}
