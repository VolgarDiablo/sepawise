import React, { useState } from "react";
import { z } from "zod";
import iconSepa from "../../assets/images/sepa.svg";
import iconTehterTRC from "../../assets/images/tetherTRC.svg";

const Main = () => {
  const [selectedButtonBlockSell, setSelectedButtonBlockSell] = useState("All");
  const [selectedButtonBlockBuy, setSelectedButtonBlockBuy] = useState("All");
  const mySchema = z.string();

  const handleClickBlockSell = (button) => {
    setSelectedButtonBlockSell(button);
  };

  const handleClickBlockBuy = (button) => {
    setSelectedButtonBlockBuy(button);
  };

  return (
    <div class="flex items-center justify-center pt-[16px] pb-[32px]">
      <main class="grid gap-[30px] max-w-[1200px] w-full grid-cols-1 lg:grid-cols-[1fr_minmax(auto,370px)] items-start">
        <div class="flex flex-col gap-[30px]">
          <div class="bg-white p-4 rounded-2xl shadow-custom-main flex flex-col gap-[24px]">
            <h1 class="text-[#3e3e3e] text-[24px] leading-[1.3] font-semibold">
              Want to sell
            </h1>
            <div class="flex flex-col gap-[35px]">
              <div class="flex flex-col gap-[20px] sm:gap-[56px]">
                <div class="flex flex-col gap-[15px]">
                  <span class="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                    Payment systems
                  </span>
                  <div class="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
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
                <div class="flex flex-col gap-[15px]">
                  <span class="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                    Currencies
                  </span>
                  <div class="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
                    <button class="rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue">
                      EUR
                    </button>
                  </div>
                </div>
              </div>
              <div className="opacity-100 grid grid-cols-3 gap-[4px] sm:gap-[14px] p-[10px] mt-[-10px] ml-[-10px] max-h-[450px] h-[130px] overflow-y-auto transition-height duration-300 ease-in-out sm:grid-cols-[repeat(5,1fr)] lg:h-[130px] lg:grid-cols-[repeat(6,1fr)]">
                <div class="min-w-[100px max-w-[110px] w-auto sm:w-[120px] h-[110px] flex flex-col gap-[8px] p-[9px] justify-center items-center shadow-custom-button-currencie border-2 rounded-[8px] border-custom-tab-button-blue">
                  <div class="w-[28px] p-[2px]">
                    <img src={iconSepa} />
                  </div>
                  <h5 class="font-semibold text-[12px] leading-[1.3] text-[#3e3e3e]">
                    SEPA
                  </h5>
                  <div class="flex flex-wrap gap-[3px] justify-center">
                    <h5 class="font-semibold text-[12px] leading-[1.3] text-[#3e83b9]">
                      EUR
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-2xl shadow-custom-main flex flex-col gap-[24px]">
            <h1 class="text-[#3e3e3e] text-[24px] leading-[1.3] font-semibold">
              Want to sell
            </h1>
            <div class="flex flex-col gap-[35px]">
              <div class="flex flex-col gap-[20px] sm:gap-[56px]">
                <div class="flex flex-col gap-[15px]">
                  <span class="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                    Payment systems
                  </span>
                  <div class="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
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
                <div class="flex flex-col gap-[15px]">
                  <span class="text-[#3e3e3e] text-[12px] leading-[1.4] font-medium">
                    Currencies
                  </span>
                  <div class="grid gap-[4px] grid-cols-[repeat(4,74px)] sm:gap-[8px]">
                    <button class="rounded-[10px] px-3 py-1 text-[0.8125rem] leading-[1.75] font-medium transition-all shadow-custom-button-tab bg-white border-custom-tab-button-blue border-2 text-custom-tab-button-blue">
                      TRC20
                    </button>
                  </div>
                </div>
              </div>
              <div className="opacity-100 grid grid-cols-3 gap-[4px] sm:gap-[14px] p-[10px] mt-[-10px] ml-[-10px] max-h-[450px] h-[130px] overflow-y-auto transition-height duration-300 ease-in-out sm:grid-cols-[repeat(5,1fr)] lg:h-[130px] lg:grid-cols-[repeat(6,1fr)]">
                <div class="min-w-[100px max-w-[110px] w-auto sm:w-[120px] h-[110px] flex flex-col gap-[8px] p-[9px] justify-center items-center shadow-custom-button-currencie border-2 rounded-[8px] border-custom-tab-button-blue">
                  <div class="w-[28px] p-[2px]">
                    <img src={iconTehterTRC} />
                  </div>
                  <h5 class="font-semibold text-[12px] leading-[1.3] text-[#3e3e3e]">
                    Tether
                  </h5>
                  <div class="flex flex-wrap gap-[3px] justify-center">
                    <h5 class="font-semibold text-[12px] leading-[1.3] text-[#3e83b9]">
                      TRC20
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-2xl shadow-custom-main">Блок 3</div>
        </div>

        <div class="bg-blue-100 rounded-[12px] p-[20px] lg:p-[32px] shadow-custom-sidebar">
          Сайдбар
        </div>
      </main>
    </div>
  );
};

export default Main;
