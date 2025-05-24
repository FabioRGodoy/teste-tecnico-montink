import { Address } from "@/types/address.types"


export interface DeliveryCheckProps {
  cep: string
  setCep: (cep: string) => void
  address: Address | null
  setAddress: (address: Address | null) => void
}