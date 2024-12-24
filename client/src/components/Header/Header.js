import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  const handleOpenTelegram = () => {
    // Открываем ссылку для Telegram
    const telegramUrl = "tg://resolve?domain=mr_kcoder";
    const fallbackUrl = "https://t.me/mr_kcoder";

    // Проверяем, поддерживает ли браузер схему "tg://"
    window.open(telegramUrl, "_blank") || window.open(fallbackUrl, "_blank");
  };

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    if (!isMobileDevice()) {
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const handleClick = () => {
    if (isMobileDevice()) {
      setIsTooltipVisible((prev) => !prev);
    }
  };

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto  w-full py-5">
        <div className="w-[100px]">
          <NavLink to="/">
            {/* <svg
              className="jss6"
              width="58"
              height="20"
              viewBox="0 0 58 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.721591 19V1.54545H12.0739V4.19602H3.88352V8.93466H11.4858V11.5852H3.88352V16.3494H12.142V19H0.721591ZM17.6861 5.90909L20.3281 10.7415L23.0128 5.90909H26.277L22.331 12.4545L26.3452 19H23.098L20.3281 14.2869L17.5838 19H14.3111L18.2997 12.4545L14.4134 5.90909H17.6861Z"
                fill="currentColor"
              ></path>
              <path
                d="M28.7997 19V1.54545H35.4815C36.7429 1.54545 37.7912 1.74432 38.6264 2.14204C39.4673 2.53409 40.0952 3.07102 40.5099 3.75284C40.9304 4.43466 41.1406 5.20739 41.1406 6.07102C41.1406 6.78125 41.0043 7.3892 40.7315 7.89489C40.4588 8.39489 40.0923 8.80114 39.6321 9.11364C39.1719 9.42614 38.6577 9.65057 38.0895 9.78693V9.95739C38.7088 9.99148 39.3026 10.1818 39.8707 10.5284C40.4446 10.8693 40.9134 11.3523 41.277 11.9773C41.6406 12.6023 41.8224 13.358 41.8224 14.2443C41.8224 15.1477 41.6037 15.9602 41.1662 16.6818C40.7287 17.3977 40.0696 17.9631 39.1889 18.3778C38.3082 18.7926 37.2003 19 35.8651 19H28.7997ZM31.9616 16.358H35.3622C36.5099 16.358 37.3366 16.1392 37.8423 15.7017C38.3537 15.2585 38.6094 14.6903 38.6094 13.9972C38.6094 13.4801 38.4815 13.0142 38.2259 12.5994C37.9702 12.179 37.6065 11.8494 37.1349 11.6108C36.6634 11.3665 36.1009 11.2443 35.4474 11.2443H31.9616V16.358ZM31.9616 8.96875H35.0895C35.6349 8.96875 36.1264 8.86932 36.5639 8.67045C37.0014 8.46591 37.3452 8.17898 37.5952 7.80966C37.8509 7.43466 37.9787 6.99148 37.9787 6.48011C37.9787 5.80398 37.7401 5.24716 37.2628 4.80966C36.7912 4.37216 36.0895 4.15341 35.1577 4.15341H31.9616V8.96875ZM44.4368 19V5.90909H47.522V19H44.4368ZM45.9879 4.05114C45.4993 4.05114 45.0788 3.8892 44.7266 3.56534C44.3743 3.23579 44.1982 2.84091 44.1982 2.38068C44.1982 1.91477 44.3743 1.51989 44.7266 1.19602C45.0788 0.866477 45.4993 0.701704 45.9879 0.701704C46.4822 0.701704 46.9027 0.866477 47.2493 1.19602C47.6016 1.51989 47.7777 1.91477 47.7777 2.38068C47.7777 2.84091 47.6016 3.23579 47.2493 3.56534C46.9027 3.8892 46.4822 4.05114 45.9879 4.05114ZM57.2315 5.90909V8.29545H49.706V5.90909H57.2315ZM51.5639 2.77273H54.6491V15.0625C54.6491 15.4773 54.7116 15.7955 54.8366 16.017C54.9673 16.233 55.1378 16.3807 55.348 16.4602C55.5582 16.5398 55.7912 16.5795 56.0469 16.5795C56.2401 16.5795 56.4162 16.5653 56.5753 16.5369C56.7401 16.5085 56.8651 16.483 56.9503 16.4602L57.4702 18.8722C57.3054 18.929 57.0696 18.9915 56.7628 19.0597C56.4616 19.1278 56.0923 19.1676 55.6548 19.179C54.8821 19.2017 54.1861 19.0852 53.5668 18.8295C52.9474 18.5682 52.456 18.1648 52.0923 17.6193C51.7344 17.0739 51.5582 16.392 51.5639 15.5739V2.77273Z"
                fill="#4E83B9"
              ></path>
            </svg> */}
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="flex items-center gap-[16px]">
          {/* <NavLink
            to="/rules/aml"
            className="bg-custom-bg-card-aml text-custom-main-text font-semibold leading-[1.4] px-4 py-[6px] text-[12px] text-center rounded-[8px] flex items-center justify-center w-[100px] h-[44px]"
          >
            AML/KYC
          </NavLink> */}
          <div
            className="relative bg-custom-bg-card-aml text-custom-main-text font-semibold leading-[1.4] px-4 py-[6px] text-[12px] text-center rounded-[8px] flex items-center justify-center w-[100px] h-[44px] cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            id="aml-tooltip"
          >
            AML/KYC
            <Tooltip
              className="z-50"
              anchorId="aml-tooltip"
              content="AML/KYC Information Tooltip"
              place="top"
              isOpen={isTooltipVisible}
            />
          </div>

          <button className="w-[42px] h-[42px] flex items-center justify-center bg-custom-bg-card rounded-full">
            <svg
              width="20"
              height="26"
              viewBox="0 0 20 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.3032 7.55467C15.5367 10.731 13.173 13.5047 9.9999 13.778C6.82679 13.5047 4.46313 10.731 4.69657 7.55467C4.46408 4.37901 6.82749 1.60635 9.9999 1.33301C13.1723 1.60635 15.5357 4.37901 15.3032 7.55467Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4.14319 15.333C-1.70848 17.2697 3.85652 24.6663 9.99985 24.6663C16.1432 24.6663 21.7082 17.2697 15.8565 15.333"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>

          <div className="bg-custom-bg-card text-custom-main-text px-[10px] h-[36px] w-[50px] font-semibold text-xs flex items-center justify-center gap-[2px] rounded-lg shadow-custom-lang">
            {/* EN{" "} */}
            {/* <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.8335 8.3335L10.0002 12.5002L14.1668 8.3335"
                stroke="#3E3E3E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg> */}
            <div className="cursor-pointer" onClick={handleOpenTelegram}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.6294 7.17804C27.3362 6.84845 26.8971 6.66699 26.3929 6.66699C26.1188 6.66699 25.8284 6.72002 25.5299 6.82488L5.21439 13.9541C4.13627 14.3324 3.99107 14.9 4.0004 15.2046C4.00974 15.5093 4.18973 16.0685 5.28946 16.3902C5.29606 16.392 5.30265 16.3939 5.30924 16.3956L9.52322 17.5042L11.8021 23.495C12.1129 24.3117 12.8103 24.8191 13.6226 24.8191C14.1347 24.8191 14.6384 24.6218 15.0794 24.2488L17.6859 22.0425L21.4664 24.841C21.4668 24.8413 21.4673 24.8415 21.4677 24.8418L21.5036 24.8684C21.5069 24.8708 21.5104 24.8733 21.5137 24.8756C21.9339 25.1753 22.3926 25.3335 22.8406 25.3337H22.8408C23.7162 25.3337 24.4133 24.7379 24.6164 23.8162L27.945 8.7063C28.0787 8.09981 27.9667 7.55712 27.6294 7.17804ZM10.9329 17.2936L19.063 13.4754L14.0007 18.4204C13.9177 18.5014 13.859 18.6005 13.83 18.7084L12.8539 22.3433L10.9329 17.2936ZM14.1267 23.2977C14.093 23.3262 14.0591 23.3516 14.0252 23.375L14.9309 20.003L16.5783 21.2226L14.1267 23.2977ZM26.5668 8.4496L23.2381 23.5596C23.2061 23.7042 23.1038 24.0407 22.8406 24.0407C22.7106 24.0407 22.5473 23.9756 22.3801 23.8572L18.0962 20.6863C18.0956 20.6858 18.0949 20.6853 18.0942 20.6849L15.5452 18.798L22.8659 11.6468C23.1003 11.4179 23.1215 11.0673 22.9163 10.8158C22.7108 10.5643 22.3386 10.4852 22.0341 10.6283L9.99343 16.2831L5.72214 15.1597L26.0314 8.03264C26.203 7.97238 26.3227 7.95976 26.3929 7.95976C26.4359 7.95976 26.5124 7.96447 26.5408 7.99662C26.5782 8.03854 26.6258 8.18145 26.5668 8.4496Z"
                  fill="#FFFFFF"
                  stroke="#FFFFFF"
                  strokeWidth="0.4"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
