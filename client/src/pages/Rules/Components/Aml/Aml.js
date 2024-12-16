import React from "react";
import "./Aml.css";

const Aml = () => {
  return (
    <div>
      <h1 className="text-[14px] font-bold mb-[14px] mt-[14px] leading-[22px]">
        Anti-Money Laundering and Illegal Operations Policy
      </h1>
      <ol className="list-decimal-nested-aml text-[14px] font-normal leading-[22px]">
        <li>
          In accordance with the international legislation, the Service adheres
          to a number of rules and implements a number of procedures aimed at
          preventing the use of the Service for the purpose of money laundering
          transactions, as well as other transactions of illegal nature.
        </li>

        <li>
          In order to prevent the transactions of illegal character, the Service
          establishes certain requirements to all the Requests created by the
          User:
          <ul className="mt-[14px]">
            <li>
              Transfers in favor of third parties are strictly prohibited;
            </li>
            <li>
              All the contact details stated in the User's Order as well as any
              other personal information provided to the Service must be up to
              date and absolutely truthful;
            </li>
            <li>
              It is strictly forbidden to submit Applications using anonymous
              proxy-servers or any other anonymous Internet connections.
            </li>
          </ul>
        </li>
        <li>
          The Service reserves the right to request a photo or video of the
          User's ID within the framework of the KYC(Know Your Customer) policy.
          The Client's identification information will be collected, stored,
          transferred and protected strictly in accordance with the Company's
          Personal Data Processing Policy.
        </li>
        <li>
          The User will be refused an exchange if the Service is not satisfied
          with the information provided, or there are doubts that he/she is who
          he/she claims to be.
        </li>
        <li>
          The Service reserves the right to suspend all the User's requests for
          exchange until the User has provided copies of the documents proving
          their identity and any other information required to check the
          transaction in the following cases:
          <ul className="mt-[14px]">
            <li>
              If a violation of any of the requirements set forth in paragraph 2
              of this Agreement is identified;
            </li>
            <li>
              When the User's application is stopped by the Illegal Transactions
              Prevention System;
            </li>
            <li>
              If the Service has reasonable suspicion that the User is
              attempting to use the services of the Service for the purpose of
              conducting illegal transactions;
            </li>
            <li style={{ marginBottom: "15px" }}>
              If any high-risk transactions using the User's credentials are
              detected.
            </li>
          </ul>
          In turn, the User undertakes to provide the requested document within
          7 working days from the receipt of the request to provide it, or to
          request the cancellation of the application.
        </li>
        <li>
          The Service uses an internal verification and analysis system to
          identify high-risk transactions and addresses. The Service reserves
          the right not to disclose information about the methods and results of
          the User's transaction verification.
        </li>
        <li>
          Upon detecting high-risk transactions involving the User's details,
          the Service reserves the right to cancel the application and return
          the funds or digital currencies deposited by the User. Funds are
          refunded only to the details from which the transfer was made. When
          refunds are made, all commission expenses for the transfer of funds or
          digital currencies are made from the funds received at the expense of
          the User. The Service is not responsible for possible delays in
          refunds if they are not the fault of the Service.
        </li>
        <li>
          In case of the User's failure to provide the required documents, the
          Service reserves the right to refuse service in the future.
        </li>
        <li>
          The Service retains the right to refuse to provide the User with any
          further service and transfer all the data of the User and all the data
          about the User's transactions to the law enforcement authorities in
          case of
          <ul className="mt-[14px]">
            <li>
              Detection of transactions aimed at money laundering, terrorist
              organizations financing, fraud of any kind, as well as
              transactions aimed at conducting any other illegal or unlawful
              operations;
            </li>
            <li>
              If the Service has a reasonable suspicion that the document
              presented by the User for the User identification is counterfeit
              or invalid;
            </li>
            <li>
              The receipt of information from the authorized bodies about the
              unauthorized possession of the User's money or digital currencies,
              or other information making it impossible for the Service to
              provide services to the User;
            </li>
            <li>
              Discovery of any actions or attempted actions of the User aimed at
              causing any negative impact on the hardware and software complex
              of the Service;
            </li>
            <li>
              Discovery of any actions or attempted actions of the User aimed at
              theft of databases and other tangible and intangible property of
              the Service;
            </li>
            <li>
              Discovery of any actions or attempted actions by the User which
              can cause any physical, material or non-material damage to the
              Service;
            </li>
            <li>
              In case the funds are received from a card other than the one that
              was verified, the Service suspends the exchange. Funds on this
              request will be returned to the sender within 24 hours after the
              request and subject to the mandatory verification of the card from
              which the funds were received. All commissions for funds or
              digital currencies transfers will be deducted from the funds
              received at the User's expense.
            </li>
          </ul>
        </li>
        <li>
          The Service reserves the right to suspend all the User's requests for
          exchange until copies of documents or other information confirming the
          fact of payment have been received from the User.
        </li>
        <li>
          Some exchange directions may not be available to the Users using the
          IP addresses of the countries under international sanctions.
        </li>
      </ol>
    </div>
  );
};

export default Aml;
