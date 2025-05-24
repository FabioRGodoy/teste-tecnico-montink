"use client";

import { MapPin, Truck, AlertCircle } from "lucide-react";
import type { DeliveryCheckProps } from "./props";
import { useDeliveryCheck } from "@/hooks";
import { Card } from "@/components/ui/card.";
import { Button } from "@/components/ui/button";

export default function DeliveryCheck({
  cep,
  setCep,
  address,
  setAddress,
}: DeliveryCheckProps) {
  const { isLoading, error, handleCEPChange, checkCEP } = useDeliveryCheck(
    cep,
    setCep,
    setAddress
  );

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Truck className="h-5 w-5 text-gray-700" />
        <h3 className="text-base font-medium text-gray-900">
          Calcular frete e prazo
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={cep}
              onChange={handleCEPChange}
              placeholder="Digite seu CEP"
              maxLength={9}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition duration-200"
            />
          </div>
          {error && (
            <div className="flex items-center gap-1 mt-2 text-rose-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <Button
          onClick={checkCEP}
          disabled={isLoading}
          className="py-3 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed max-h-13"
        >
          {isLoading ? "Consultando..." : "Consultar"}
        </Button>
      </div>

      {address && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 bg-green-100 rounded-full p-1">
              <Truck className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                Entrega disponível para:
              </h4>
              <p className="text-gray-700">{address.logradouro}</p>
              <p className="text-gray-700">
                {address.bairro}, {address.localidade} - {address.uf}
              </p>
              <p className="text-gray-700">CEP: {address.cep}</p>
              <div className="mt-2 text-sm">
                <span className="text-green-600 font-medium">
                  Entrega em até 3 dias úteis
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-sm text-gray-500">
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition"
        >
          Não sei meu CEP
        </a>
      </p>
    </Card>
  );
}
