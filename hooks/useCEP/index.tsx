import { Address } from "@/types/address.types";
import { useState, ChangeEvent } from "react";

export function useDeliveryCheck(
  cep: string,
  setCep: (cep: string) => void,
  setAddress: (address: Address | null) => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formatCEP = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.length <= 5
      ? numericValue
      : `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
  };

  const handleCEPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCep(formatCEP(e.target.value));
  };

  const checkCEP = async () => {
    const numericCEP = cep.replace(/\D/g, "");
    if (numericCEP.length !== 8) {
      setError("CEP deve conter 8 dígitos");
      setAddress(null);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${numericCEP}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado");
        setAddress(null);
      } else {
        setAddress(data);
      }
    } catch {
      setError("Erro ao consultar o CEP");
      setAddress(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleCEPChange,
    checkCEP,
  };
}
