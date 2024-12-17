import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Terms.css";

const Terms = ({ isVisible, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimateModal(true), 10);
    } else {
      setAnimateModal(false);
      const timeout = setTimeout(() => setShowModal(false), 500);
      document.body.style.overflow = "";
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isVisible) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onClose]);

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-custom-global-bg-modal bg-opacity-50 backdrop-blur-[10px] flex items-center justify-center z-50 transition-opacity duration-500 ${
        animateModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-custom-bg-card m-4 p-4 sm:pt-12 sm:pb-12 sm:pr-4 sm:pl-12 rounded-[8px] shadow-lg max-w-4xl relative overflow-hidden transform transition-transform duration-500 ${
          animateModal ? "scale-100" : "scale-95"
        }`}
        style={{ maxHeight: "calc(100% - 64px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          onClick={onClose}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            right: "16px",
            top: "16px",
            color: "rgb(182, 182, 182)",
            cursor: "pointer",
          }}
        >
          <path
            d="M17 7L7 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7 7L17 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <div className="text-white">
          <h2 className="font-medium text-xl leading-[1.6] pb-[24px]">
            SepaWise Terms and Conditions
          </h2>
          <div className=" leading-[1.6] font-normal text-[14px] max-h-[660px] sm:max-h-[625px] lg:max-h-[700px] overflow-y-auto pr-4 pb-8 custom-scrollbar">
            <p className="mb-[14px] mt-[14px]">
              Before using the SepaWise service, the User must read the Terms
              and Conditions of the SepaWise service in their entirety. Using
              the SepaWise service is possible only if the User accepts all the
              terms of the agreement. You may not use the SepaWise service
              unless you have read, understood and accepted all the provisions
              of these Terms and Conditions.
            </p>
            <ol className="list-decimal-nested-terms">
              <li>
                <span className="font-bold">Terms and Conditions</span>
                <ol className="list-decimal-nested-terms">
                  <li>
                    SepaWise (the "Service") is a digital currency service
                    located on the Internet at https://sepawise.com.
                  </li>
                  <li>
                    User is any individual who has agreed to all the terms and
                    conditions offered by the Service and has joined this
                    agreement. The User and the Service are jointly referred to
                    as the "Parties".
                  </li>
                  <li>
                    "Application" means the information provided by the User by
                    electronic means of the Service, which indicates their
                    intention to use the services of the Service on the terms
                    proposed by the Service and specified in the parameters of
                    the application.
                  </li>
                  <li>
                    "Fiat currency" is the currency issued by the government,
                    which is legally defined as a legal tender in the country of
                    issue.
                  </li>
                  <li>
                    "Exchange" means the operation of exchanging Virtual Assets
                    or their equivalent in Fiat money of one kind, which belong
                    to the Account of one User, for Virtual Assets or their
                    equivalent in Fiat money of another kind, which belong to
                    the Account of another User, on the terms established by
                    such parties and which are performed exclusively on the
                    Site. In any case, the Exchange shall not be deemed or
                    construed as a marginal agreement.
                  </li>
                  <li>Exchange rate means a value ratio of two currencies.</li>
                  <li>
                    Agreement is an agreement between the Parties regarding the
                    digital currency exchange concluded on the terms and
                    conditions of the Service.
                  </li>
                </ol>
              </li>
              <li>
                <span className="font-bold">
                  Subject of the Agreement and Commencement
                </span>
                <ol className="list-decimal-nested-terms">
                  <li>
                    The subject hereof is services for the circulation of
                    digital currencies, provided upon the User' request, as well
                    as other services described on the website of the Service.
                  </li>
                  <li>
                    The Agreement shall be deemed accepted when the User submits
                    the Request, which is an integral part hereof. Each User
                    request is a new Agreement on new terms at the time of
                    submission.
                  </li>
                  <li>
                    This agreement shall come into effect when the User issues
                    the Request and upon assigning an individual request number.
                  </li>
                  <li>
                    The Service records the date and time, as well as the
                    parameters of the Request terms automatically when the User
                    issues the Request and upon assigning an individual request
                    number.
                  </li>
                  <li>
                    This agreement shall be terminated when the User receives
                    cash or digital currencies to his account in the amount
                    specified in the User Request parameters, or upon the
                    Request cancellation.
                  </li>
                  <li>
                    The Service reserves the right to unilaterally amend this
                    Agreement without appropriate notification to the User, but
                    with the obligatory publication of the current version
                    hereof on this page.
                  </li>
                </ol>
              </li>
              <li>
                <span className="font-bold">Terms of Service</span>
                <ol className="list-decimal-nested-terms">
                  <li>
                    Only those Users who have fully read and consent to the
                    terms and conditions for the provision of services by
                    SepaWise can, can use the Service.
                  </li>
                  <li>
                    The Service automatically sets the exchange rate and
                    publishes it on the Service's website.
                  </li>
                  <li>
                    The Service shall have the right to independently change the
                    exchange rates at any time unilaterally, and notify the
                    Service Users by posting up-to-date information on the
                    Service's website.
                  </li>
                  <li>
                    Establishing the exchange rate and the procedure for
                    changing the rate in the request:
                    <ul className="mt-[14px]">
                      <li>
                        The rate shall be established for 10 minutes upon
                        choosing the exchange type; after the expiration of the
                        time, a new rate will be offered automatically;
                      </li>
                      <li>
                        If the User managed to issue the Request within 10
                        minutes, then this rate shall be extended for another 15
                        minutes to complete the request payment. If the User did
                        not manage to make a payment and change the request
                        status to "Paid" by clicking on the "I paid" button,
                        then after the expiration of the time, a new exchange
                        rate shall be automatically offered;
                      </li>
                      <li>
                        The Service shall reserve the right to unilaterally
                        change the exchange rate if more than 8 hours have
                        passed since the transaction appeared in the digital
                        currency network, and there is no 2 transaction
                        confirmations from the digital currency network;
                      </li>
                      <li>
                        The Service shall reserve the right to unilaterally
                        change the exchange rate if the request contains an
                        error due to the User's fault, and the User has not
                        provided correct information to the Service's e-mail
                        within 8 hours;
                      </li>
                      <li>
                        The Service shall reserve the right to unilaterally
                        change the exchange rate if the original rate has
                        changed by more than 1% before the request is paid and
                        the request status is changed to "Paid".
                      </li>
                    </ul>
                  </li>
                  <li>
                    The appropriate user interface located on the Service
                    website allows managing the exchange process or obtaining
                    information about the progress of the service by the User.
                  </li>
                  <li>
                    The Service shall make an exchange at the request of the
                    User in strict accordance with the privacy policy, as well
                    as the anti-money laundering policy and the prevention of
                    illegal transactions.
                  </li>
                  <li>
                    Any operation completed by the Service at the request of the
                    User cannot be canceled by the User after its completion —
                    sending money or digital currencies due to the User by the
                    Service under the previously accepted exchange conditions.
                  </li>
                  <li>
                    In case of non-receipt of money or digital currencies from
                    the User within one hour upon creating the request by the
                    User, the Agreement shall be deemed terminated by the
                    Service unilaterally, as not entered into force.
                  </li>
                  <li>
                    In case of termination hereof, money or digital currencies
                    received after the above period, at the request of the User,
                    shall be refunded to the User details used to send money.
                    When making a refund, all commission costs for transferring
                    money or digital currencies shall be paid from money
                    received at the expense of the User. The Service shall not
                    be responsible for possible delays in the refund, if they
                    arose through no fault of the Service.
                  </li>
                  <li>
                    If the amount of money or digital currencies received
                    differs from that declared by the User, the Service can
                    unilaterally terminate the agreement by refusing to execute
                    the request and refunding money received to the User details
                    used to send money, or recalculate the amount at the rate
                    established in the request. When making a refund, all
                    commission costs for transferring money or digital
                    currencies shall be paid from money received at the expense
                    of the User. The Service shall not be responsible for
                    possible delays in the refund, if they arose through no
                    fault of the Service.
                  </li>
                  <li>
                    If the Service did not transfer money or digital currencies
                    to the details specified by the User within 72 hours from
                    the receipt of payment from the User, in the absence of
                    reasons for blocking money or digital currencies received at
                    the User Request from the Service, the User may request
                    termination hereof by canceling his request and refunding
                    money or digital currencies in full.
                  </li>
                  <li>
                    In case of the Request cancellation, money or digital
                    currencies shall be refunded by the Service to the sender's
                    details within 48 hours from the receipt of the request for
                    cancellation. The Service shall not be responsible for
                    possible delays in the refund, if they arose through no
                    fault of the Service.
                  </li>
                  <li>
                    If the exchange rate increases by more than 1%, all money
                    that have not been claimed for more than a day and received
                    in favor of the Service shall be subject to exchange or
                    refund at the rate established at the time the request was
                    issued.
                  </li>
                  <li>
                    The Service shall have the right to involve third-party
                    contractors to fulfill its obligations.
                  </li>
                  <li>
                    The Service shall have the right to cancel the request and
                    refund money or digital currencies deposited by the User
                    with reimbursement of commissions to the User without
                    explaining the reasons.
                  </li>
                  <li>
                    The Service shall have the right to refuse to provide
                    further services to the User without explaining the reasons.
                  </li>
                  <li>
                    The service shall have the right to suspend the exchange in
                    order to identify the sender of the transfer. In case of
                    identification failure, the request shall be canceled. When
                    making a refund, all commission costs for transferring money
                    or digital currencies shall be paid from money received at
                    the expense of the User. The Service shall not be
                    responsible for possible delays in the refund, if they arose
                    through no fault of the Service.
                  </li>
                  <li>
                    When using the Service, the User confirms that he legally
                    owns and disposes of money and digital currencies used. The
                    User guarantees that he is not involved in:
                    <ul>
                      <li>money laundering operations;</li>
                      <li>receiving income from drug trafficking;</li>
                      <li>
                        receiving income from criminal and/or terrorist
                        activities;
                      </li>
                      <li>
                        receiving income from trade with countries, when trade
                        therewith is prohibited by international organizations;
                      </li>
                      <li>receiving income from any other illegal activity.</li>
                    </ul>
                  </li>
                  <li>
                    When the User sends digital currencies, the Service shall
                    start fulfilling its exchange obligations only after two
                    confirmations of the digital currency network.
                  </li>
                  <li>
                    If money cannot be sent to the details provided by the
                    client for reasons beyond the control of the Service, or if
                    the client made a mistake with the details, the Service
                    shall have the right to require the client to send the
                    correct details to the Service e-mail support@sepawise.com,
                    submit card verification, or details for a refund. When
                    making a refund, all commission costs for transferring money
                    or digital currencies shall be paid from money received at
                    the expense of the User.
                  </li>
                </ol>
              </li>
              <li>
                <span className="font-bold">Privacy Policy</span>
                <ol className="list-decimal-nested-terms">
                  <li>
                    For transactions, the Service accepts the User personal
                    data, which the Service shall store in an encrypted form,
                    not make it public, not transfer to third parties, except
                    for the cases described in clauses 4.4 and clause 5.5
                    hereof.
                  </li>
                  <li>
                    All transactions with the Requests, as well as the transfer
                    of personal data from the User to the Service, shall be made
                    via an encrypted SSL channel with a key length of 256 bits.
                  </li>
                  <li>
                    The Service shall have the right, if necessary, to
                    independently collect additional User data by any available
                    means. All information collected as a result of such
                    activities shall not be made public, transferred to third
                    parties, except as described in clause 4.4, clause 4.5 and
                    clause 5.5 of this agreement.
                  </li>
                  <li>
                    The Service shall have the right to transfer the User
                    personal data and details of his transactions, at the
                    official request of law enforcement agencies, the court, as
                    well as on its own initiative to protect its own rights.
                  </li>
                  <li>
                    The Service has the right to transfer the User's personal
                    data and details of the transactions performed by the User
                    at the official request of payment systems and banks, if it
                    is necessary for the fulfilment of financial obligations.
                  </li>
                  <li>
                    All collected User data, as well as the details of his
                    transactions, shall be stored in the Service's database for
                    five years.
                  </li>
                </ol>
              </li>

              <li>
                <span className="font-bold">Limitation of Responsibility</span>
                <ol className="list-decimal-nested-terms">
                  <li>
                    The User shall guarantee that he is not a citizen and tax
                    resident of the United States of America, North Korea and
                    Iran.
                  </li>
                  <li>
                    Only persons who have reached the age of majority can use
                    the Service.
                  </li>
                  <li>
                    The User agrees that the scope of the Service's liability is
                    limited to the money received from the User for the
                    execution of the subject hereof, that the Service does not
                    provide additional guarantees and does not bear any
                    additional liability to the User, as well as the User does
                    not bear additional liability to the Service.
                  </li>
                  <li>
                    The Service will make every effort, but does not guarantee
                    the availability of its services around the clock, every
                    day. The Service does not bear any responsibility for
                    losses, lost profits and other costs of the User arising
                    from the impossibility of gaining access to the website and
                    the features of the Service.
                  </li>
                  <li>
                    The Service does not bear any responsibility for losses,
                    lost profits and other costs of the User resulting from
                    delays, errors or failures in making bank payments or
                    electronic transfers.
                  </li>
                  <li>
                    The Service does not bear any responsibility for losses,
                    lost profits and other costs of the User resulting from
                    erroneous expectations of the User regarding the exchange
                    rate of the Service, the profitability of transactions and
                    other subjective factors.
                  </li>
                  <li>
                    If the User provides erroneous data in the information about
                    the details of the money recipient, the Service does not
                    bear any responsibility for any adverse consequences or
                    damage resulting from such an error.
                  </li>
                  <li>
                    The User shall not falsify communication flows associated
                    with the Service operation, not interfere with its software
                    and/or hardware, and not exert any other influence that
                    could disrupt the normal Service operation, realizing that
                    such actions will be prosecuted with the full rigour of the
                    law.
                  </li>
                  <li>
                    Neither the User nor the Service shall be liable to each
                    other for delays or failure to fulfill their obligations
                    resulting from the force majeure circumstances, including
                    natural disasters, fire, floods, acts of terrorism, change
                    of government, civil unrest, as well as failures in the
                    functioning of Electronic Settlement Systems, power supply
                    systems, communication networks and Internet service
                    providers.
                  </li>
                  <li>
                    Electronic settlement systems or financial institutions are
                    solely responsible for the money entrusted to them by the
                    User. The Service cannot be a party to the agreement between
                    the Payment system or financial institution and the User.
                  </li>
                </ol>
              </li>
              <li>
                <span className="font-bold">
                  Dispute Resolution and Claim Acceptance Procedure
                </span>
                <ol className="list-decimal-nested-terms">
                  <li>
                    Disputes and disagreements arising from the provision of
                    services to the User by the Service shall be resolved
                    through negotiations between the User and the Service
                    administration, based on the provisions hereof.
                  </li>
                  <li>
                    The User shall send any claims hereunder in electronic form
                    to the e-mail address specified on the Service website.
                  </li>
                </ol>
              </li>
              <li>
                <span className="font-bold">Final Provisions</span>
                <ol className="list-decimal-nested-terms">
                  <li>
                    The Service shall have the right to send information to the
                    User e-mail about the status of the exchange process, as
                    well as other information related to the exchange.
                  </li>
                  <li>
                    Information on the website, including graphics, text
                    information, program codes, etc. is the property of the
                    Service and is protected by copyright laws.
                  </li>
                  <li>
                    The User confirms that he has read all the provisions
                    hereof, and unconditionally accepts them, otherwise the User
                    cannot use the Service.
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

Terms.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Terms;
