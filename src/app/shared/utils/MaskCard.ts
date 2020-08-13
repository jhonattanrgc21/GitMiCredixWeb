export function MaskCard(card: string): string {
  return `${card.substr(card.length - 8, 4)} ${card.substr(card.length - 4, card.length)}`;
}
