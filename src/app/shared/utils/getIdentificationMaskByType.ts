export function getIdentificationMaskByType(value: string): { mask: string, maxLength: number } {
  switch (value) {
    case 'CN':
      return {
        mask: '0-0000-0000',
        maxLength: 9
      };
    case 'CJ':
      return {
        mask: '0-000-000000',
        maxLength: 10
      };
    case 'CR':
      return {
        mask: '000000000000',
        maxLength: 12
      };
    case 'PE':
      return {
        mask: '000000000000',
        maxLength: 12
      };
    default:
      return {
        mask: '0-0000-0000',
        maxLength: 9
      };
  }
}
