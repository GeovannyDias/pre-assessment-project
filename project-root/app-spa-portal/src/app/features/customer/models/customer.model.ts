export interface ICustomer {
    idCustomer: string
    firstName: string
    lastName: string
    identification: string
    address: string
    phone: string
    createdAt: string
    updatedAt: string
}

export interface ICustomerPartial {
    idCustomer?: string
    firstName?: string
    lastName?: string
    identification?: string
    address?: string
    phone?: string
    createdAt?: string
    updatedAt?: string
}
