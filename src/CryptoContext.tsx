import { createContext, useState, useContext, useEffect } from "react";

interface CryptoContext {
  symbol: string,
  currency: string,
  setCurrency: Function;
}
export const Crypto = createContext<CryptoContext | null>(null);

export const CryptoContext = ({ children }: any) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "MXN") setSymbol("MXN$");
    else if (currency === "USD") setSymbol("US$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

// export const CryptoState = ():(CryptoContext|null) => {
//   const ExportedContext = useContext(Crypto)
//   return {
//     symbol: ExportedContext?.symbol,
//     currency: ExportedContext?.currency,
//     setCurrency: ExportedContext?.setCurrency
//   };
// };