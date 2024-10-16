export interface CardReplacementData {
  cardId: number[],
  reason: string,
  lostDocuments: boolean,
  deliveryPlace: number,
  addressId?: number,
  receiverName?: string,
  receiverPhone?: string,
  receiverAddress?: string,
  receiverDistrict?: number,
  receiverCanton?: number,
  receiverProvince?: number
}

