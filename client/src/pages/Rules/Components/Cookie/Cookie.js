import React from "react";
import "./Cookie.css";

const Cookie = () => {
  return (
    <div>
      <h1 className="text-[14px] font-bold mb-[14px] mt-[14px] leading-[22px]">
        Cookie Agreement
      </h1>
      <div className="flex flex-col gap-[14px] text-[14px] font-normal leading-[22px]">
        <p>
          The sepawise.com website (hereinafter referred to as the “Website”)
          uses cookies and similar technologies to ensure the best user
          experience by providing personalized information, remembering
          preferences when navigating and visiting the Website, and helping to
          get the information the user needs. The information we receive through
          cookies helps us provide you with our services in the way that suits
          you best.
        </p>
        <p>
          This agreement concerns the Website's use of information received from
          the Website users. This document also contains information about
          cookies, the Website's use of cookies, and how you can refuse using
          them.
        </p>
        <p>
          A cookie is a small text file an Internet website places on a personal
          computer, smartphone or other user device, containing information
          about the user navigation on the Internet website. Cookies store
          information about your Internet preferences.
        </p>
        <p>
          Cookies are intended for a variety of purposes, including to:
          <ul className="list-disc ml-10 mt-[14px]">
            <li>
              Analyze information about user visits to web pages to upgrade the
              Website.
            </li>
            <li>
              Provide messages and content we and third parties placed on this
              and others' websites, taking into account user interests.
            </li>
            <li>Help users obtaining the necessary information.</li>
            <li>
              Determine the number of visitors and their usage of our Website to
              improve its performance and to better understand the interests of
              our audience.
            </li>
          </ul>
        </p>
        <p>
          Before the Website installs cookies on your computer, a pop-up window
          will prompt you to consent to the installation thereof. By consenting
          to the installation of our cookies, you enable us to provide you with
          the best experience and service through our Website. If you do not
          consent to the use of cookies, some of the Website features may
          perform not in full or not as intended.
        </p>
        <p>
          None of the cookies the Website installs compromise your privacy in
          any way. In our cookies, we do not store personal and confidential
          information that identifies the user, such as address, password, debit
          or credit card details, etc.
        </p>
        <p>
          If you want to avoid using cookies on this Website, you can disable
          the storage of cookies in your browser at any time, and then delete
          cookies associated with the use of our Website, stored in your
          browser.
        </p>
        <p>
          Please note: in this case, displaying web pages and the Website user
          guide will be limited.
        </p>
        <p>
          We are not responsible for the content, methods of collecting and
          processing information by third-party websites, including websites our
          resource has links to. Please read the privacy policy of those
          resources that you visit before providing your personal data.
        </p>
      </div>
    </div>
  );
};

export default Cookie;
