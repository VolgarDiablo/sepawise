import React, { useState, useEffect, useCallback, useRef } from "react";
import { z } from "zod";
// import { NavLink } from "react-router-dom";
import CurrencySelector from "../../components/CurrencySelector/CurrencySelector";

const Main = () => {
  const [selectedButtonBlockSell, setSelectedButtonBlockSell] = useState("All");
  const [selectedButtonBlockBuy, setSelectedButtonBlockBuy] = useState("All");
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencySell, setSelectedCurrencySell] = useState(null);
  const [selectedCurrencyBuy, setSelectedCurrencyBuy] = useState(null);
  const [rates, setRates] = useState(null);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now()); // Последнее время активности

  const getWalletRegex = (network) => {
    switch (network) {
      case "BTC":
        return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
      case "XMR":
        return /^[48][0-9AB][1-9A-HJ-NP-Za-km-z]{93}$/;
      case "USDT (TRC20)":
      default:
        return /^T[0-9A-HJ-NP-Za-km-z]{33}$/;
    }
  };

  const validateSchema = (data, network) => {
    const schema = z.object({
      email: z.string().email("Wrong e-mail format").min(1, "Enter email"),
      wallet: z
        .string()
        .regex(getWalletRegex(network), `Wrong ${network} address format`)
        .min(1, "You must fill in this field"),
      tgUsername: z
        .string()
        .regex(
          /^@(?!(?:.*__|_$))[a-zA-Z0-9](?:[a-zA-Z0-9_]{3,30}[a-zA-Z0-9])?$/,
          "Wrong @username"
        )
        .min(2, "Enter your @username"),
      saleAmount: z
        .number({ invalid_type_error: "Sale amount must be a number" })
        .min(500, "Sale amount must be greater than 500")
        .max(150000, "Sale amount must be less than 150 000"),
      fullName: z
        .string()
        .regex(
          /^[A-Za-z]+ [A-Za-z]+$/,
          "The cardholder name must be in 'John Doe'"
        )
        .min(1, "Enter the cardholder name"),
      cardNumber: z.number(),
    });

    return schema.parse(data);
  };

  const handleClickBlockSell = (button) => {
    setSelectedButtonBlockSell(button);
  };

  const handleClickBlockBuy = (button) => {
    setSelectedButtonBlockBuy(button);
  };

  const [formData, setFormData] = useState({
    saleAmount: "",
    selectedCurrencySell: "",
    purchaseAmount: "",
    selectedCurrencyBuy: "",
    email: "",
    tgUsername: "",
    wallet: "",
    fullName: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Позволяем ввод только чисел в поле saleAmount
    if (
      (name === "saleAmount" || name === "cardNumber") &&
      !/^\d*\.?\d*$/.test(value)
    )
      return;

    if (name === "fullName" && /^\d*\.?\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedFormData = {
        ...formData,
        saleAmount: Number(formData.saleAmount),
        purchaseAmount: Number(formData.purchaseAmount),
        cardNumber: formData.cardNumber ? Number(formData.cardNumber) : null,
        selectedCurrencyBuy: selectedCurrencyBuy
          ? selectedCurrencyBuy.network
          : "",
        selectedCurrencySell: selectedCurrencySell
          ? selectedCurrencySell.network
          : "",
      };

      console.log("Данные для отправки:", parsedFormData);
      // Проверка схемы валидации с текущей сетью
      validateSchema(parsedFormData, selectedCurrencyBuy.network);

      setErrors({});

      const response = await fetch(
        `http://localhost:5000/telegram/send-to-telegram`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(parsedFormData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка запроса");
      }

      setFormData({
        saleAmount: "",
        selectedCurrencySell: "",
        purchaseAmount: "",
        selectedCurrencyBuy: "",
        email: "",
        tgUsername: "",
        wallet: "",
        fullName: "",
        cardNumber: "",
      });
    } catch (err) {
      if (err.errors) {
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    try {
      const schema = z.object({
        [name]: z
          .string()
          .regex(
            name === "wallet"
              ? getWalletRegex(selectedCurrencyBuy.network)
              : /.*/,
            `Wrong ${selectedCurrencyBuy.network} address format`
          )
          .min(1, "This field is required"),
      });

      schema.parse({ [name]: formData[name] });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: err.errors[0]?.message || "Invalid input",
      }));
    }
  };

  const [checkboxState, setCheckboxState] = useState({
    checkboxTerms: false,
    checkboxAml: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const isBothChecked =
    checkboxState.checkboxTerms && checkboxState.checkboxAml;

  const lastFetchTimeRef = useRef(0);

  const fetchRates = useCallback(async () => {
    const now = Date.now(); // Текущее время в миллисекундах
    const lastFetchTime = lastFetchTimeRef.current; // Последнее сохраненное время

    if (lastFetchTime) {
      const timeSinceLastFetch = now - lastFetchTime; // Разница в миллисекундах

      const seconds = Math.floor((timeSinceLastFetch / 1000) % 60);
      const minutes = Math.floor((timeSinceLastFetch / (1000 * 60)) % 60);
      const hours = Math.floor(timeSinceLastFetch / (1000 * 60 * 60));

      console.log(
        `Time since last fetch: ${hours} hours, ${minutes} minutes, ${seconds} seconds (${timeSinceLastFetch} ms)`
      );

      const fiveMinutes = 5 * 60 * 1000; // 5 минут в миллисекундах
      if (timeSinceLastFetch < fiveMinutes) {
        console.log(
          `Пропускаем запрос: данные еще актуальны. ${new Date().toLocaleString()}`
        );
        return; // Пропускаем запрос, если с последнего прошло меньше 5 минут
      }
    }

    try {
      const response = await fetch("http://localhost:5000/prices/currencies");
      const contentType = response.headers.get("content-type");
      const text = await response.text();

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON, got something else");
      }

      const data = JSON.parse(text);

      // Сохраняем время последнего запроса из ответа сервера
      if (data && data.timestamp) {
        lastFetchTimeRef.current = new Date(data.timestamp).getTime(); // Сохраняем время из сервера
        console.log(
          `Updated lastFetchTimeRef from server: ${new Date(
            lastFetchTimeRef.current
          ).toLocaleString()}`
        );
      } else {
        lastFetchTimeRef.current = now; // Используем локальное время
      }

      setRates(data.prices); // Обновляем состояние с курсами
      setLastActivityTime(now); // Обновляем время активности
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  }, []); // Зависимости остаются пустыми

  // Рендеринг монет
  useEffect(() => {
    let isMounted = true;

    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`http://localhost:5000/currencies/list`);
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();

        if (isMounted) {
          setCurrencies(data);
        }
        if (data.length > 0) {
          setSelectedCurrencyBuy(data[0]);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchCurrencies();
    fetchRates(); // Безопасно вызываем `fetchRates`

    return () => {
      isMounted = false;
    };
  }, [fetchRates]); // Указываем `fetchRates` как зависимость

  useEffect(() => {
    let timer;

    const scheduleNextFetch = () => {
      timer = setTimeout(() => {
        fetchRates().finally(scheduleNextFetch); // Запрос + планирование следующего
      }, 5 * 60 * 1000); // 5 минут в миллисекундах
    };

    scheduleNextFetch();

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании
  }, [fetchRates]);

  const handleCurrencySelectSell = (currency) => {
    setSelectedCurrencySell(currency);
    setFormData((prevFormData) => ({
      ...prevFormData,
      saleAmount: "",
      purchaseAmount: "",
    }));
    setErrors({});
  };

  const handleCurrencySelectBuy = (currency) => {
    setSelectedCurrencyBuy(currency);
    setFormData((prevFormData) => ({
      ...prevFormData,
      saleAmount: "",
      purchaseAmount: "",
    }));
    setErrors({});
  };

  const getExchangeRate = () => {
    if (!rates || !selectedCurrencySell || !selectedCurrencyBuy) {
      return "Курс недоступен";
    }

    const sellCurrency = selectedCurrencySell.name.split(" ")[0].toUpperCase();
    const buyCurrency = selectedCurrencyBuy.name.split(" ")[0].toUpperCase();

    const sellKey =
      sellCurrency === "WIRE"
        ? "USD"
        : sellCurrency === "SEPA"
        ? "EUR"
        : sellCurrency === "TETHER"
        ? "USD"
        : sellCurrency;

    const buyKey =
      buyCurrency === "WIRE"
        ? "USD"
        : buyCurrency === "SEPA"
        ? "EUR"
        : buyCurrency === "TETHER"
        ? "USD"
        : buyCurrency;

    // Формируем ключ для пары
    const pairKey = `${sellKey}${buyKey}`;

    // Проверяем наличие курса для пары
    const pairRate = rates[pairKey]?.price;

    if (!pairRate) {
      return "Курс недоступен";
    }

    // Возвращаем курс
    return `1 ${selectedCurrencySell.network} = ${pairRate} ${selectedCurrencyBuy.network}`;
  };

  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [lastActivityTime]);

  const handleBlurSaleAmount = () => {
    const saleAmount = parseFloat(formData.saleAmount);
    const rate = getExchangeRate(); // Получаем текущий курс, например "0.97 USDT"

    if (!isNaN(saleAmount) && rate) {
      const numericRate = parseFloat(rate.split(" ")[0]); // Извлекаем числовую часть курса
      const purchaseAmount = (saleAmount * numericRate * 0.96).toFixed(2); // Умножаем на курс и округляем
      setFormData((prevFormData) => ({
        ...prevFormData,
        purchaseAmount,
      }));
    }
  };

  useEffect(() => {
    if (currencies.length > 0) {
      const reversedCurrencies = currencies.slice().reverse();
      setSelectedCurrencySell(reversedCurrencies[0]); // Устанавливаем первый элемент реверсированного массива
    }
  }, [currencies]);

  const getFilteredCurrencies = (currencies, selectedCurrency) => {
    return currencies.filter(
      (currency) => currency.id !== selectedCurrency?.id
    );
  };

  return (
    <div>
      <form onSubmit={isBothChecked ? handleSubmit : (e) => e.preventDefault()}>
        <div className="flex items-center justify-center pb-[32px]">
          <main className="grid gap-[30px] max-w-[1200px] w-full grid-cols-1 lg:grid-cols-[1fr_370px] items-start">
            <div className="bg-custom-bg-card p-4 rounded-2xl shadow-custom-main flex flex-col gap-[24px] lg:row-start-1 lg:col-start-1 md:p-8">
              <h1 className="text-custom-main-text text-[24px] leading-[1.3] font-semibold">
                Want to sell
              </h1>
              <div className="flex flex-col gap-[35px] ">
                <div className="flex flex-col gap-[20px] sm:gap-[56px] sm:flex-row">
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-custom-main-text text-[12px] leading-[1.4] font-medium">
                      Payment systems
                    </span>
                    <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
                      <button
                        type="button"
                        onClick={() => handleClickBlockSell("All")}
                        className={`text-custom-main-text rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium  shadow-custom-button-tab
                          ${
                            selectedButtonBlockSell === "All"
                              ? "bg-custom-bg-card border-custom-border-tab-button border-2 text-custom-main-text"
                              : ""
                          }
                          hover:bg-custom-bg-tab-button hover:outline hover:outline-custom-border-tab-button hover:shadow-none `}
                      >
                        All
                      </button>
                      {/* <button
                        type="button"
                        onClick={() => handleClickBlockSell("Banks")}
                        className={`text-custom-main-text rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium  shadow-custom-button-tab
                          ${
                            selectedButtonBlockSell === "Banks"
                              ? "bg-custom-bg-card border-custom-border-tab-button border-2 text-custom-main-text"
                              : "border-[2px] border-transparent"
                          } 
                           hover:bg-custom-bg-tab-button hover:outline hover:outline-custom-border-tab-button hover:shadow-none`}
                      >
                        Banks
                      </button> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-custom-main-text text-[12px] leading-[1.4] font-medium">
                      Currencies
                    </span>
                    {/* <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]"> */}
                    <div className="grid gap-[4px] grid-cols-[repeat(1,74px)] sm:gap-[8px]">
                      <button
                        type="button"
                        className="rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab bg-custom-bg-card border-custom-border-tab-button border-2 text-custom-main-text"
                      >
                        {selectedCurrencySell
                          ? selectedCurrencySell.network
                          : ""}
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="opacity-100 grid grid-cols-3 gap-[4px] sm:gap-[14px] p-[10px] mt-[-10px] ml-[-10px] max-h-[450px] h-[130px] overflow-y-auto transition-height duration-300 ease-in-out sm:grid-cols-[repeat(5,1fr)] lg:h-[130px] lg:grid-cols-[repeat(6,1fr)]">
                  <div className="min-w-[100px max-w-[110px] w-auto sm:w-[120px] h-[110px] flex flex-col gap-[8px] p-[9px] justify-center items-center shadow-custom-button-currencie border-2 rounded-[8px] border-custom-border-tab-button">
                    <div className="w-[35px] p-[2px]">
                      <img src={iconSepa} alt="SEPA" />
                    </div>
                    <h5 className="font-semibold text-[12px] leading-[1.3] text-custom-main-text">
                      SEPA
                    </h5>
                    <div className="flex flex-wrap gap-[3px] justify-center">
                      <h5 className="font-semibold text-[12px] leading-[1.3] text-white">
                        EUR
                      </h5>
                    </div>
                  </div>
                </div> */}
                <CurrencySelector
                  currencies={getFilteredCurrencies(
                    currencies,
                    selectedCurrencyBuy
                  ).reverse()}
                  onCurrencySelect={handleCurrencySelectSell}
                  selectedCurrency={selectedCurrencySell}
                />
              </div>
            </div>

            <div className="bg-custom-bg-card p-4 rounded-2xl shadow-custom-main flex flex-col gap-[24px] lg:row-start-2 lg:col-start-1  md:p-8">
              <h1 className="text-custom-main-text text-[24px] leading-[1.3] font-semibold">
                Want to buy
              </h1>
              <div className="flex flex-col gap-[35px]">
                <div className="flex flex-col gap-[20px] sm:gap-[56px] sm:flex-row">
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-custom-main-text text-[12px] leading-[1.4] font-medium">
                      Payment systems
                    </span>
                    <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
                      <button
                        type="button"
                        onClick={() => handleClickBlockBuy("All")}
                        className={`text-custom-main-text rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium  shadow-custom-button-tab
                          ${
                            selectedButtonBlockBuy === "All"
                              ? "bg-custom-bg-card border-custom-border-tab-button border-2 text-custom-main-text"
                              : ""
                          }
                          hover:bg-custom-bg-tab-button hover:outline hover:outline-custom-border-tab-button hover:shadow-none `}
                      >
                        All
                      </button>
                      {/* <button
                        type="button"
                        onClick={() => handleClickBlockBuy("Crypto")}
                        className={`text-custom-main-text rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium shadow-custom-button-tab
                          ${
                            selectedButtonBlockBuy === "Crypto"
                              ? "bg-custom-bg-card border-custom-border-tab-button border-2 text-custom-main-text"
                              : "border-[2px] border-transparent"
                          }
                          hover:outline hover:outline-custom-border-tab-button hover:shadow-none`}
                      >
                        Crypto
                      </button> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-custom-main-text text-[12px] leading-[1.4] font-medium">
                      Currencies
                    </span>
                    {/* <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]"> */}
                    <div className="grid gap-[4px] grid-cols-[repeat(2px)] sm:gap-[8px]">
                      <button
                        type="button"
                        className="rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab bg-custom-bg-card border-custom-border-tab-button border-2 text-custom-main-text"
                      >
                        {selectedCurrencyBuy ? selectedCurrencyBuy.network : ""}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <CurrencySelector
                currencies={getFilteredCurrencies(
                  currencies,
                  selectedCurrencySell
                )}
                onCurrencySelect={handleCurrencySelectBuy}
                selectedCurrency={selectedCurrencyBuy}
              />
            </div>

            <div className="bg-custom-bg-card p-4 rounded-2xl shadow-custom-main flex flex-col gap-[32px] lg:row-start-3 lg:col-start-1  md:p-8">
              <h1 className="text-custom-main-text text-[24px] leading-[1.3] font-semibold">
                Payment details
              </h1>
              <div className="grid gap-[16px] grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col ">
                  <h3 className="text-custom-main-text text-[16px] leading-[1.06] font-semibold pb-5">
                    Sale amount{" "}
                    {selectedCurrencySell ? selectedCurrencySell.name : ""}
                  </h3>
                  <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-white h-[60px rounded-[8px] overflow-hidden justify-between">
                    <input
                      name="saleAmount"
                      className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                      placeholder="0"
                      type="text"
                      value={formData.saleAmount}
                      onChange={handleChange}
                      onBlur={handleBlurSaleAmount}
                    />
                    <div className="pr-4">
                      <span className="text-[#b6b6b6] font-normal text-[14px]">
                        {selectedCurrencySell
                          ? selectedCurrencySell.network
                          : ""}
                      </span>
                    </div>
                  </div>
                  {errors.saleAmount && (
                    <p className="text-custom-text-error leading-[1.4] text-[12px] font-medium pt-1">
                      {errors.saleAmount}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-custom-main-text text-[16px] leading-[1.06] font-semibold">
                    Purchase amount{" "}
                    {selectedCurrencyBuy ? selectedCurrencyBuy.name : ""}
                  </h3>
                  <div className="font-normal text-[14px] bg-white leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] h-[60px rounded-[8px] overflow-hidden justify-between">
                    <input
                      name="purchaseAmount"
                      className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                      placeholder="0"
                      type="text"
                      value={formData.purchaseAmount}
                      onChange={handleChange}
                      readOnly
                    />
                    <div className="pr-4">
                      <span className="text-[#b6b6b6] font-normal text-[14px]">
                        {selectedCurrencyBuy ? selectedCurrencyBuy.network : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-[20px] grid-cols-1">
                <h3 className="text-custom-main-text text-[16px] leading-[1.06] font-semibold">
                  Your details{" "}
                  {selectedCurrencyBuy ? selectedCurrencyBuy.name : ""}
                </h3>
                <div className="grid gap-[16px] grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-custom-bg-card h-[60px rounded-[8px] overflow-hidden justify-between">
                      <input
                        name="email"
                        className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                        placeholder="E-mail"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-custom-text-error leading-[1.4] text-[12px] font-medium pt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-custom-bg-card h-[60px rounded-[8px] overflow-hidden justify-between">
                      <input
                        name="tgUsername"
                        className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                        placeholder="Telegram"
                        type="text"
                        value={formData.tgUsername}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.tgUsername && (
                      <p className="text-custom-text-error leading-[1.4] text-[12px] font-medium pt-1">
                        {errors.tgUsername}
                      </p>
                    )}
                  </div>

                  {selectedCurrencyBuy?.type === "crypto" ? (
                    <div className="flex flex-col">
                      <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-custom-bg-card h-[60px rounded-[8px] overflow-hidden justify-between">
                        <input
                          name="wallet"
                          className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                          placeholder={`${
                            selectedCurrencyBuy
                              ? selectedCurrencyBuy.network
                              : ""
                          } address`}
                          type="text"
                          value={formData.wallet}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.wallet && (
                        <p className="text-custom-text-error leading-[1.4] text-[12px] font-medium pt-1">
                          {errors.wallet}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-custom-bg-card h-[60px] rounded-[8px] overflow-hidden justify-between">
                          <input
                            name="fullName"
                            className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                            placeholder={`Recepient's full name`}
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-custom-text-error leading-[1.4] text-[12px] font-medium pt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-custom-bg-card h-[60px] rounded-[8px] overflow-hidden justify-between">
                          <input
                            name="cardNumber"
                            className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                            placeholder={`Card number`}
                            type="text"
                            value={formData.cardNumber}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.cardNumber && (
                          <p className="text-custom-text-error leading-[1.4] text-[12px] font-medium pt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-custom-bg-sidebar text-white rounded-[12px] p-[20px] lg:p-[32px] shadow-custom-sidebar sticky lg:top-8 lg:col-start-2 lg:row-start-1">
              <span className="font-normal text-[12px] leading-[1.6] ">
                Do you want to buy
              </span>
              <p className="font-normal text-[32px] leading-[1.06]  w-fit m-0">
                {formData.purchaseAmount || "0"}{" "}
                {selectedCurrencyBuy ? selectedCurrencyBuy.network : ""}
              </p>
              <div className="mt-[23px] grid sm:grid-cols-4 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] ">
                    Rate:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] ">
                    {getExchangeRate()}
                  </span>
                </div>
                <div className="flex flex-col gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] ">
                    Reserve:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] ">
                    {selectedCurrencyBuy ? selectedCurrencyBuy.reserve : ""}{" "}
                    {selectedCurrencyBuy ? selectedCurrencyBuy.network : ""}
                  </span>
                </div>
                <div className="flex flex-col  gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] ">
                    Min amount:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] ">
                    {selectedCurrencyBuy ? selectedCurrencyBuy.minAmount : ""}{" "}
                    {selectedCurrencySell ? selectedCurrencySell.network : ""}{" "}
                  </span>
                </div>
                <div className="flex flex-col gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] ">
                    Max amount:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] ">
                    {selectedCurrencyBuy ? selectedCurrencyBuy.maxAmount : ""}{" "}
                    {selectedCurrencySell ? selectedCurrencySell.network : ""}{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className=" lg:row-start-4 lg:col-span-1">
              <div className="grid gap-[16px] grid-cols-1 ">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_minmax(200px,_280px)] gap-[16px]">
                  <div className="flex flex-col gap-2">
                    {/* Первый чекбокс */}
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="checkboxTerms"
                        className="hidden peer"
                        onChange={handleCheckboxChange}
                      />
                      <span
                        className={`mr-[10px] w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-[250ms] ${
                          checkboxState.checkboxTerms
                            ? "border-custom-secondary-text"
                            : "border-gray-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-4 h-4 transition-opacity duration-200 fill-custom-secondary-text ${
                            checkboxState.checkboxTerms
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a 1 1 0 000-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <span
                        className={`font-medium text-[12px] leading-[1.4] transition-colors duration-200 ${
                          checkboxState.checkboxTerms
                            ? "text-white"
                            : "text-custom-not-active-text"
                        }`}
                      >
                        I agree with personal data processing and accept
                        {/* <NavLink
                          to="/rules/terms"
                          target="_blank"
                          className="text-custom-secondary-text font-bold"
                        >
                          {" "}
                          exchange terms
                        </NavLink> */}
                        <span className="text-custom-secondary-text font-bold">
                          {" "}
                          exchange terms
                        </span>
                      </span>
                    </label>

                    {/* Второй чекбокс */}
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="checkboxAml"
                        className="hidden peer"
                        onChange={handleCheckboxChange}
                      />
                      <span
                        className={`mr-[10px] w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-[250ms] ${
                          checkboxState.checkboxAml
                            ? "border-custom-secondary-text"
                            : "border-gray-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-4 h-4 transition-opacity duration-200 fill-custom-secondary-text ${
                            checkboxState.checkboxAml
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span
                        className={`font-medium text-[12px] leading-[1.4] transition-colors duration-200 ${
                          checkboxState.checkboxAml
                            ? "text-white"
                            : "text-custom-not-active-text"
                        }`}
                      >
                        I agree with
                        {/* <NavLink
                          to="/rules/aml"
                          target="_blank"
                          className="text-custom-secondary-text font-bold"
                        >
                          {" "}
                          the KYC and AML procedure
                        </NavLink> */}
                        <span className="text-custom-secondary-text font-bold">
                          {" "}
                          the KYC and AML procedure
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* Кнопка */}
                  <button
                    type="submit"
                    disabled={!isBothChecked}
                    className={`text-[12px] font-semibold leading-[1.4] h-[64px] py-3 px-5 rounded-lg uppercase transition-colors duration-[250ms] ${
                      isBothChecked
                        ? "bg-custom-active-button text-[#FBFBFD]"
                        : "bg-custom-not-active-text text-[#00000042]"
                    }`}
                  >
                    Proceed to payment
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </form>
    </div>
  );
};

export default Main;
