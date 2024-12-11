import React, { useState } from "react";
import bestchange from "../../assets/images/bestchange.png";
import useModal from "../../hooks/useModall";
import CopiedNotification from "../../components/Notification/Copied/CopiedNotification";
import ModalTerms from "../../components/Modal/Terms/Terms";

const Footer = () => {
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);
  const { isModalVisible, openModal, closeModal } = useModal();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopiedVisible(true);
      setTimeout(() => {
        setIsCopiedVisible(false);
      }, 3000);
    });
  };

  const handleOpenTelegram = () => {
    // Открываем ссылку для Telegram
    const telegramUrl = "tg://resolve?domain=mr_kcoder";
    const fallbackUrl = "https://t.me/mr_kcoder";

    // Проверяем, поддерживает ли браузер схему "tg://"
    window.open(telegramUrl, "_blank") || window.open(fallbackUrl, "_blank");
  };

  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="flex justify-between items-start max-w-[1200px] mx-auto w-full py-5 gap-4 pt-8 pb-8 flex-col-reverse pl-4 pr-4 sm:flex-row">
          <div
            className="font-normal text-[12px] leading-[1.6] text-[#b6b6b6] cursor-pointer"
            onClick={openModal}
          >
            Terms of Exchange
          </div>
          <div>
            <img src={bestchange} alt="BestChange" />
          </div>
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
                fill="#9DB1C6"
                stroke="#9DB1C6"
                stroke-width="0.4"
              ></path>
            </svg>
          </div>
          <div className="flex flex-row gap-10 justify-between">
            <div>
              <p className="font-normal text-[12px] leading-[1.6] text-[#b6b6b6]">
                Support
              </p>
              <span
                className="font-bold text-[12px] leading-[1.2] cursor-pointer text-[#5a5a5a]"
                onClick={(e) => handleCopy(e.target.innerText)}
              >
                support@sepawise
              </span>
            </div>
            <div>
              <p className="font-normal text-[12px] leading-[1.6] text-[#b6b6b6]">
                Partnership
              </p>
              <span
                className="font-bold text-[12px] leading-[1.2] cursor-pointer text-[#5a5a5a]"
                onClick={(e) => handleCopy(e.target.innerText)}
              >
                partner@sepawise
              </span>
            </div>
          </div>
        </div>
      </div>
      <CopiedNotification isVisible={isCopiedVisible} />
      <ModalTerms isVisible={isModalVisible} onClose={closeModal} />
    </div>
  );
};

export default Footer;
