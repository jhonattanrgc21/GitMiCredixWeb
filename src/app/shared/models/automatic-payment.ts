export interface AutomaticPayment {
    transactionTypeId: number,
    publicServiceId: number,
    periodicityId: number,
    currencyId: number,
    startDate: string,
    key: number,
    maxAmount: number,
    aliasName: string,
    publicServiceAccessKeyId: number,
    quota: number,
    credixCode: number
}