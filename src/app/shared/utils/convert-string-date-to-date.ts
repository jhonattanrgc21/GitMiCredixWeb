export function ConvertStringDateToDate(value: string): Date {

  if (value.search('-') !== -1) {
    const values = value.split('-');
    if (values[0].length === 4) {
      return new Date(Number(values[0]), Number(values[1]) - 1, Number(values[2].substring(0, 2)));
    } else {
      return new Date(Number(values[2]), Number(values[1]) - 1, Number(values[0].substring(0, 2)));
    }
  }

  if (value.search('/') !== -1) {
    const values = value.split('/');
    return new Date(Number(values[2]), Number(values[1]) - 1, Number(values[0].substring(0, 2)));
  }

  if (value.length === 6) {
    return new Date(Number(value.substr(0, 4)), Number(value.substr(4, 2)) - 1, 1);
  } else {
    return new Date(Number(value.substr(0, 4)), Number(value.substr(4, 2)) - 1, Number(value.substr(7, 2)));
  }

}
