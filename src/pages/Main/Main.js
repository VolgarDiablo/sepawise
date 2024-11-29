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
    email: "",
    wallet: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Проверяем данные с помощью схемы Zod
      schema.parse(formData);
      alert("Form submitted successfully!");
      setErrors({});
    } catch (err) {
      // Если есть ошибки, сохраняем их в state
      const newErrors = {};
      err.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
                      name="wallet"
                      className="text-[16px] h-full w-full p-[20.5px_5px_20.5px_20px] leading-[24px] font-normal focus:outline-none"
                      placeholder="Tether TRC-20 address"
                      type="text"
                      value={formData.wallet}
                      onChange={handleChange}
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
            Сайдбар
          </div>

          <div className=" lg:row-start-4 lg:col-span-1">
            <div className="grid gap-[16px] grid-cols-1 sm:grid-cols-2">
              <div className="bg-[#E7EEF5] rounded-[10px] px-[24px] py-[18px] leading-[1.3] h-max text-[12px] ">
                KYC procedure in progress
              </div>
              <div className="grid-cols-1 gap-[16px] sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="hidden peer" />

                    <span className="mr-[10px] w-5 h-5 rounded-md border-2 border-gray-300 bg-white flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white peer-checked:block"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="font-medium text-[12px] leading-[1.48] peer-checked:text-[#4e83b9] text-[#b6b6b6]">
                      I agree with personal data processing and accept
                      <NavLink
                        to="/"
                        target="_blank"
                        className="text-[#551a8b] leading-[1.4] font-normal"
                      >
                        {" "}
                        exchange terms
                      </NavLink>
                    </span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="hidden peer" />

                    <span className="mr-[10px] w-5 h-5 rounded-md border-2 border-gray-300 bg-white flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white peer-checked:block"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="font-medium text-[12px] leading-[1.48] peer-checked:text-[#4e83b9] text-[#b6b6b6]">
                      I agree with
                      <NavLink
                        to="/"
                        target="_blank"
                        className="text-[#551a8b] leading-[1.4] font-normal"
                      >
                        {" "}
                        the KYC and AML procedure
                      </NavLink>
                    </span>
                  </label>
                </div>
                <button type="submit">Proceed to payment</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </form>
  );
};

export default Main;
