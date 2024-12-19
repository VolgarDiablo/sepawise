import React, { useState, useEffect } from "react";

const CurrencySelector = ({ currencies, onCurrencySelect }) => {
  const [activeCurrencyId, setActiveCurrencyId] = useState(null);

  useEffect(() => {
    if (currencies.length > 0) {
      setActiveCurrencyId(currencies[0].id);
      if (onCurrencySelect) {
        onCurrencySelect(currencies[0]); // Передаём первый объект валюты
      }
    }
  }, [currencies, onCurrencySelect]);

  const handleCurrencyClick = (currency) => {
    setActiveCurrencyId(currency.id);
    if (onCurrencySelect) {
      onCurrencySelect(currency); // Передаём весь объект валюты
    }
  };

  return (
    <div className="opacity-100 grid grid-cols-3 gap-[4px] sm:gap-[14px] p-[10px] mt-[-10px] ml-[-10px] max-h-[450px] h-[130px] overflow-y-auto transition-height duration-300 ease-in-out sm:grid-cols-[repeat(5,1fr)] lg:h-[130px] lg:grid-cols-[repeat(6,1fr)]">
      {Array.isArray(currencies) && currencies.length > 0 ? (
        currencies.map((currency) => (
          <div
            key={currency.id}
            onClick={() => handleCurrencyClick(currency)}
            className={`min-w-[100px] max-w-[110px] w-auto sm:w-[120px] h-[110px] flex flex-col gap-[8px] p-[9px] justify-center items-center shadow-custom-button-currencie border-2 rounded-[8px] cursor-pointer transition-all ${
              activeCurrencyId === currency.id
                ? "border-custom-border-tab-button"
                : ""
            }`}
          >
            <div className="w-[35px] p-[2px]">
              <img src={currency.icon} alt={currency.name} />
            </div>
            <h5 className="font-semibold text-[12px] leading-[1.3] text-custom-main-text">
              {currency.name}
            </h5>
            <div className="flex flex-wrap gap-[3px] justify-center">
              <h5 className="font-semibold text-[12px] leading-[1.3] text-white">
                {currency.network}
              </h5>
            </div>
          </div>
        ))
      ) : (
        <p className="text-custom-text-error">No currencies available.</p>
      )}
    </div>
  );
};

export default CurrencySelector;
