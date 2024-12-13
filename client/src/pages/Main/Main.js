import React, { useState } from "react";
import { z } from "zod";
import iconSepa from "../../assets/images/sepa.svg";
import iconTehterTRC from "../../assets/images/tetherTRC.svg";
import { NavLink } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Wrong e-mail format").min(1, "Enter email"),
  wallet: z
    .string()
    .regex(/^T[0-9A-HJ-NP-Za-km-z]{33}$/, "Wrong Tether TRC-20 address format")
    .min(1, "You must fill in this field"),
  tgUsername: z
    .string()
    .regex(
      /^@(?!(?:.*__|_$))[a-zA-Z0-9](?:[a-zA-Z0-9_]{3,30}[a-zA-Z0-9])?$/,
      "Wrong @username"
    )
    .min(2, "Enter your @username"),
});

const Main = () => {
  const [selectedButtonBlockSell, setSelectedButtonBlockSell] = useState("All");
  const [selectedButtonBlockBuy, setSelectedButtonBlockBuy] = useState("All");

  const handleClickBlockSell = (button) => {
    setSelectedButtonBlockSell(button);
  };

  const handleClickBlockBuy = (button) => {
    setSelectedButtonBlockBuy(button);
  };

  const [formData, setFormData] = useState({
    saleAmount: "",
    purchaseAmount: "",
    email: "",
    tgUsername: "",
    wallet: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Позволяем ввод только чисел в поле saleAmount
    if (name === "saleAmount" && !/^\d*\.?\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleBlurSaleAmount = () => {
    const saleAmount = parseFloat(formData.saleAmount);
    if (!isNaN(saleAmount)) {
      // Расчет purchaseAmount: 1.02 EUR = 1 USDT, вычитаем 4% комиссии
      const purchaseAmount = ((saleAmount / 1.02) * 0.96).toFixed(2);
      setFormData((prevFormData) => ({
        ...prevFormData,
        purchaseAmount,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      schema.parse(formData);
      setErrors({});

      const response = await fetch("http://localhost:5000/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка запроса");
      }

      setFormData({
        saleAmount: "",
        purchaseAmount: "",
        email: "",
        tgUsername: "",
        wallet: "",
      });
    } catch (err) {
      if (err.errors) {
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.log("Произошла ошибка при отправке данных.");
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    try {
      schema.pick({ [name]: true }).parse({ [name]: formData[name] });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (err) {
      const firstError = err.errors.find((error) => error.path[0] === name);
      if (firstError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: firstError.message,
        }));
      }
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

  return (
    <div>
      <form onSubmit={isBothChecked ? handleSubmit : (e) => e.preventDefault()}>
        <div className="flex items-center justify-center pt-[16px] pb-[32px]">
          <main className="grid gap-[30px] max-w-[1200px] w-full grid-cols-1 lg:grid-cols-[1fr_370px] items-start">
            <div className="bg-white p-4 rounded-2xl shadow-custom-main flex flex-col gap-[24px] lg:row-start-1 lg:col-start-1 md:p-8">
              <h1 className="text-[#3e3e3e] text-[24px] leading-[1.3] font-semibold">
                Want to sell
              </h1>
              <div className="flex flex-col gap-[35px] ">
                <div className="flex flex-col gap-[20px] sm:gap-[56px] sm:flex-row">
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                      Payment systems
                    </span>
                    <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
                      <button
                        type="button"
                        onClick={() => handleClickBlockSell("All")}
                        className={`rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab
                          ${
                            selectedButtonBlockSell === "All"
                              ? "bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue"
                              : ""
                          }
                          hover:bg-custom-bg-tab-button hover:outline hover:outline-1 hover:outline-custom-tab-button-blue hover:shadow-none `}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClickBlockSell("Banks")}
                        className={`rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab
                          ${
                            selectedButtonBlockSell === "Banks"
                              ? "bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue"
                              : "border-[2px] border-transparent"
                          } 
                           hover:bg-custom-bg-tab-button hover:outline hover:outline-1 hover:outline-custom-tab-button-blue hover:shadow-none`}
                      >
                        Banks
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                      Currencies
                    </span>
                    {/* <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]"> */}
                    <div className="grid gap-[4px] grid-cols-[repeat(1,74px)] sm:gap-[8px]">
                      <button className="rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue">
                        EUR
                      </button>
                    </div>
                  </div>
                </div>
                <div className="opacity-100 grid grid-cols-3 gap-[4px] sm:gap-[14px] p-[10px] mt-[-10px] ml-[-10px] max-h-[450px] h-[130px] overflow-y-auto transition-height duration-300 ease-in-out sm:grid-cols-[repeat(5,1fr)] lg:h-[130px] lg:grid-cols-[repeat(6,1fr)]">
                  <div className="min-w-[100px max-w-[110px] w-auto sm:w-[120px] h-[110px] flex flex-col gap-[8px] p-[9px] justify-center items-center shadow-custom-button-currencie border-2 rounded-[8px] border-custom-tab-button-blue">
                    <div className="w-[28px] p-[2px]">
                      <img src={iconSepa} alt="SEPA" />
                    </div>
                    <h5 className="font-semibold text-[12px] leading-[1.3] text-[#3e3e3e]">
                      SEPA
                    </h5>
                    <div className="flex flex-wrap gap-[3px] justify-center">
                      <h5 className="font-semibold text-[12px] leading-[1.3] text-[#3e83b9]">
                        EUR
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-custom-main flex flex-col gap-[24px] lg:row-start-2 lg:col-start-1  md:p-8">
              <h1 className="text-[#3e3e3e] text-[24px] leading-[1.3] font-semibold">
                Want to buy
              </h1>
              <div className="flex flex-col gap-[35px]">
                <div className="flex flex-col gap-[20px] sm:gap-[56px] sm:flex-row">
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                      Payment systems
                    </span>
                    <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
                      <button
                        type="button"
                        onClick={() => handleClickBlockBuy("All")}
                        className={`rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium  shadow-custom-button-tab
                          ${
                            selectedButtonBlockBuy === "All"
                              ? "bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue"
                              : ""
                          }
                          hover:bg-custom-bg-tab-button hover:outline hover:outline-1 hover:outline-custom-tab-button-blue hover:shadow-none `}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClickBlockBuy("Crypto")}
                        className={`rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab
                          ${
                            selectedButtonBlockBuy === "Crypto"
                              ? "bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue"
                              : "border-[2px] border-transparent"
                          }
                          hover:outline hover:outline-1 hover:outline-custom-tab-button-blue hover:shadow-none`}
                      >
                        Crypto
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <span className="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                      Currencies
                    </span>
                    {/* <div className="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]"> */}
                    <div className="grid gap-[4px] grid-cols-[repeat(1,74px)] sm:gap-[8px]">
                      <button className="rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue">
                        TRC20
                      </button>
                    </div>
                  </div>
                </div>
                <div className="opacity-100 grid grid-cols-3 gap-[4px] sm:gap-[14px] p-[10px] mt-[-10px] ml-[-10px] max-h-[450px] h-[130px] overflow-y-auto transition-height duration-300 ease-in-out sm:grid-cols-[repeat(5,1fr)] lg:h-[130px] lg:grid-cols-[repeat(6,1fr)]">
                  <div className="min-w-[100px max-w-[110px] w-auto sm:w-[120px] h-[110px] flex flex-col gap-[8px] p-[9px] justify-center items-center shadow-custom-button-currencie border-2 rounded-[8px] border-custom-tab-button-blue">
                    <div className="w-[28px] p-[2px]">
                      <img src={iconTehterTRC} alt="Tehter TRC20" />
                    </div>
                    <h5 className="font-semibold text-[12px] leading-[1.3] text-[#3e3e3e]">
                      Tether
                    </h5>
                    <div className="flex flex-wrap gap-[3px] justify-center">
                      <h5 className="font-semibold text-[12px] leading-[1.3] text-[#3e83b9]">
                        TRC20
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-custom-main flex flex-col gap-[32px] lg:row-start-3 lg:col-start-1  md:p-8">
              <h1 className="text-[#3e3e3e] text-[24px] leading-[1.3] font-semibold">
                Payment details
              </h1>
              <div className="grid gap-[16px] grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[#3e3e3e] text-[16px] leading-[1.06] font-semibold">
                    Sale amount SEPA
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
                      required
                    />
                    <div className="pr-4">
                      <span className="text-[#b6b6b6] font-normal text-[14px]">
                        EUR
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[#3e3e3e] text-[16px] leading-[1.06] font-semibold">
                    Purchase amount Tether
                  </h3>
                  <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-white h-[60px rounded-[8px] overflow-hidden justify-between">
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
                        TRC20
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-[20px] grid-cols-1">
                <h3 className="text-[#3e3e3e] text-[16px] leading-[1.06] font-semibold">
                  Your details Tether
                </h3>
                <div className="grid gap-[16px] grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-white h-[60px rounded-[8px] overflow-hidden justify-between">
                      <input
                        name="email"
                        className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                        placeholder="E-mail"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>{" "}
                    {errors.email && (
                      <p className="text-[#b9634e] leading-[1.4] text-[12px] font-medium pt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-white h-[60px rounded-[8px] overflow-hidden justify-between">
                      <input
                        name="tgUsername"
                        className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                        placeholder="Enter your Tg @username"
                        type="text"
                        value={formData.tgUsername}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.tgUsername && (
                      <p className="text-[#b9634e] leading-[1.4] text-[12px] font-medium pt-1">
                        {errors.tgUsername}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="font-normal text-[14px] leading-[1.4375em] text-[rgba(0,0,0,0.87)] box-border cursor-text inline-flex items-center relative shadow-[rgba(91,91,91,0.09)_0px_2px_5px,rgba(91,91,91,0.11)_0px_2px_5px_0px] bg-white h-[60px rounded-[8px] overflow-hidden justify-between">
                      <input
                        name="wallet"
                        className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                        placeholder="Tether TRC-20 address"
                        type="text"
                        value={formData.wallet}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.wallet && (
                      <p className="text-[#b9634e] leading-[1.4] text-[12px] font-medium pt-1">
                        {errors.wallet}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#4e83b9] text-[#fdfdfb] rounded-[12px] p-[20px] lg:p-[32px] shadow-custom-sidebar sticky top-8 lg:col-start-2 lg:row-start-1">
              <span className="font-normal text-[12px] leading-[1.6] text-[#d3e1ee]">
                Do you want to buy
              </span>
              <p className="font-normal text-[32px] leading-[1.06] text-[#fdfdfb] relative w-fit m-0 mt-[10px]">
                {formData.purchaseAmount || "0"} USDT
                <div className="text-[12px] font-semibold leading-[1.06] text-[#fdfdfb]  absolute right-0 top-[-12px]">
                  TRC20
                </div>
              </p>
              <div className="mt-[23px] grid sm:grid-cols-4 lg:grid-cols-2   gap-4">
                <div className="flex flex-col cursor-pointer gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] text-[#d3e1ee]">
                    Rate:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] text-[#fbfbfd]">
                    1.02 EUR = 1 USDT
                  </span>
                </div>
                <div className="flex flex-col cursor-pointer gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] text-[#d3e1ee]">
                    Reserve:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] text-[#fbfbfd]">
                    123123
                  </span>
                </div>
                <div className="flex flex-col cursor-pointer gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] text-[#d3e1ee]">
                    Min amount:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] text-[#fbfbfd]">
                    123123
                  </span>
                </div>
                <div className="flex flex-col cursor-pointer gap-[7px]">
                  <span className="font-normal text-[12px] leading-[1.6] text-[#d3e1ee]">
                    Max amount:
                  </span>
                  <span className="font-bold text-[12px] leading-[1.2] text-[#fbfbfd]">
                    123123
                  </span>
                </div>
              </div>
            </div>

            <div className=" lg:row-start-4 lg:col-span-1">
              <div className="grid gap-[16px] grid-cols-1 sm:grid-cols-[1fr_minmax(200px,_280px)]">
                <div className="bg-[#E7EEF5] rounded-[10px] px-[24px] py-[18px] leading-[1.3] h-max text-[12px] ">
                  KYC procedure in progress
                </div>
                <div className="grid grid-cols-1 gap-[16px]">
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
                            ? "border-[#4E83B9]"
                            : "border-gray-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-4 h-4 transition-opacity duration-200 fill-[#4E83B9] ${
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
                            ? "text-[#4e83b9]"
                            : "text-[#b6b6b6]"
                        }`}
                      >
                        I agree with personal data processing and accept
                        <NavLink
                          to="/rules/terms"
                          target="_blank"
                          className="text-[#551a8b] font-normal"
                        >
                          {" "}
                          exchange terms
                        </NavLink>
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
                            ? "border-[#4E83B9]"
                            : "border-gray-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-4 h-4 transition-opacity duration-200 fill-[#4E83B9] ${
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
                            ? "text-[#4e83b9]"
                            : "text-[#b6b6b6]"
                        }`}
                      >
                        I agree with
                        <NavLink
                          to="/rules/aml-kyc"
                          target="_blank"
                          className="text-[#551a8b] font-normal"
                        >
                          {" "}
                          the KYC and AML procedure
                        </NavLink>
                      </span>
                    </label>
                  </div>

                  {/* Кнопка */}
                  <button
                    type="submit"
                    disabled={!isBothChecked}
                    className={`text-[12px] font-semibold leading-[1.4] h-[64px] py-3 px-5 rounded-lg uppercase transition-colors duration-[250ms] ${
                      isBothChecked
                        ? "bg-[#4E83B9] text-[#FBFBFD]"
                        : "bg-[#E0E0E0] text-[#00000042]"
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
