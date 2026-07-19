import React, { useState } from "react";
import arr from "../assets/arr back.png";
import one from "../assets/1.png";
import two from "../assets/two.png";
import mc from "../assets/master card.png";
import np from "../assets/new payment.png";
import cn from "../assets/card number.png";
import { IoIosCheckboxOutline } from "react-icons/io";
import ux from "../assets/ux 4 checkout.png";
import { PiNumberTwo } from "react-icons/pi";
import { PiNumberOneBold } from "react-icons/pi";
import { MdRemove } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import crime from "../assets/crime checkout.png";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { PiCreditCardDuotone } from "react-icons/pi";
import { SiMastercard } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore"; // <- important

const Checkout = () => {
  const navigate = useNavigate();

  // read from the same store as Cart
  const cartItems = useCartStore((s) => s.cartItems) || [];
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);

  const subtotal = Number(getTotalPrice?.() || 0);

  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = Object.values(form).every((value) => value.trim() !== "");

  const formatCurrency = (value) => {
    const num = Number(value) || 0;
    return `₦${num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleDecrease = (item) => {
    const current = Number(item.quantity || 1);
    const newQty = Math.max(1, current - 1);
    updateQuantity(item.id, newQty);
  };

  const handleIncrease = (item) => {
    const current = Number(item.quantity || 1);
    const newQty = current + 1;
    updateQuantity(item.id, newQty);
  };

  const handleCompletePayment = () => {
    if (!isFormValid) return;
    setShowOrderPopup(true);
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-16 relative">
      {showOrderPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-6 sm:p-8 text-center shadow-xl">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-[#FF6636] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] flex items-center justify-center">
                <svg
                  viewBox="0 0 48 48"
                  className="w-11 h-11 -rotate-12"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M24 4c5 4 7 10 7 16 0 5-2 9-7 13-5-4-7-8-7-13 0-6 2-12 7-16Z" />
                  <circle cx="24" cy="17" r="2.6" />
                  <path d="M17 24c-4 1-6 4-7 9 5-1 8-3 9-7" />
                  <path d="M31 24c4 1 6 4 7 9-5-1-8-3-9-7" />
                  <path d="M20 33l-2 6 4-2" />
                  <path d="M28 33l2 6-4-2" />
                </svg>
              </div>
              <span className="absolute -top-1 left-1 text-white text-[10px]">
                ✦
              </span>
              <span className="absolute top-2 right-0 text-white text-[8px]">
                ✦
              </span>
              <span className="absolute bottom-1 left-0 text-white text-[8px]">
                ●
              </span>
              <span className="absolute top-6 right-3 text-white text-[6px]">
                ●
              </span>
            </div>

            <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1D2026] leading-snug">
              Your order has been received
            </h3>

            <button
              onClick={() => setShowOrderPopup(false)}
              className="mt-6 w-full h-11 sm:h-12 bg-[#FF6636] text-white rounded-lg text-[14px] sm:text-[15px] font-medium"
            >
              Purchase History
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center p-4 sm:p-6">
        <img
          onClick={() => navigate("/cart")}
          src={arr}
          alt="Back to cart"
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 cursor-pointer"
        />

        <h4 className="flex-1 text-center font-medium text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[57px] pr-8 sm:pr-9 md:pr-10 lg:pr-11 xl:pr-12">
          Checkout
        </h4>
      </div>

      <div className="mx-auto border-b border-[#FFDDD1] w-full max-w-[1241px] pb-4">
        <div className="flex justify-between w-full max-w-[1241px] mx-auto px-3 sm:px-8 md:px-16 lg:px-40 xl:px-58 mt-6 sm:mt-8 md:mt-9">
          <div className="flex gap-1.5 md:gap-0">
            <TbCircleNumber1Filled className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-[42px] xl:h-[42px] mt-0.5" />
            <p className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium text-[#1D2026] mt-1 md:mt-2 xl:mt-2.5">
              Shopping Cart
            </p>
          </div>

          <div className="flex gap-1.5">
            <TbCircleNumber2Filled className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-[42px] xl:h-[42px] mt-0.5" />
            <p className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium text-[#1D2026] mt-1 md:mt-2 xl:mt-2.5">
              Checkout details
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-0 lg:gap-8 xl:gap-10 max-w-[1241px] mx-auto">
        {/* Left column: contact + payment */}
        <div className="w-full lg:max-w-[689px]">
          {/* Contact Information */}
          <div className="border-[0.5px] border-[#6C7275] w-full h-auto rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 xl:p-10 mt-6 sm:mt-10 lg:mt-13 xl:mt-16">
            <h5 className="font-semibold text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] text-[#1D2026]">
              Contact Information
            </h5>

            <div className="flex flex-col sm:flex-row mt-4 sm:mt-5 lg:mt-5.5 xl:mt-6 gap-3 sm:gap-3 xl:gap-3.5">
              <div className="flex-1">
                <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal text-[#1D2026]">
                  Last Name
                </p>
                <input
                  type="text"
                  placeholder="First name"
                  value={form.lastName}
                  onChange={handleFieldChange("lastName")}
                  className="w-full mt-1.5 border-[0.53px] h-10 sm:h-10 lg:h-11 xl:h-12 rounded-md border-[#E9EAF0] placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] p-2 sm:p-3 xl:p-4 outline-none"
                />
              </div>

              <div className="flex-1">
                <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal text-[#1D2026]">
                  First Name
                </p>
                <input
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleFieldChange("firstName")}
                  className="w-full mt-1.5 border-[0.53px] h-10 sm:h-10 lg:h-11 xl:h-12 rounded-md border-[#E9EAF0] placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] p-2 sm:p-3 xl:p-4 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-3 gap-3 xl:gap-3.5">
              <div className="flex-1">
                <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal text-[#1D2026]">
                  Phone Number
                </p>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={handleFieldChange("phoneNumber")}
                  className="w-full mt-1.5 border-[0.53px] h-10 sm:h-10 lg:h-11 xl:h-12 rounded-md border-[#E9EAF0] placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] p-2 sm:p-3 xl:p-4 outline-none"
                />
              </div>

              <div className="flex-1">
                <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal text-[#1D2026]">
                  Email Address
                </p>
                <input
                  type="text"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleFieldChange("email")}
                  className="w-full mt-1.5 border-[0.53px] h-10 sm:h-10 lg:h-11 xl:h-12 rounded-md border-[#E9EAF0] placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] p-2 sm:p-3 xl:p-4 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="w-full h-auto rounded-2xl sm:rounded-3xl border-[0.5px] border-[#6C7275] p-5 sm:p-7 lg:p-8 xl:p-10 mt-6">
            <h4 className="text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold text-[#1D2026] leading-tight">
              Payment Method
            </h4>

            <div className="w-full h-auto min-h-[42px] sm:min-h-[42px] lg:min-h-[47px] xl:min-h-[52px] rounded-lg border border-[#E9EAF0] py-2 xl:py-2.5 px-3 sm:px-4 lg:px-5 xl:px-6 flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-10 xl:gap-14 mt-4 sm:mt-7 xl:mt-9">
              <div className="flex items-center">
                <div className="w-4 h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 bg-[#EB001B] rounded-full mix-blend-multiply"></div>
                <div className="w-4 h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 bg-[#F79E1B] rounded-full -ml-1.5 xl:-ml-2 mix-blend-multiply"></div>
              </div>

              <p className="text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-normal text-[#4E5566]">
                5795 **** **** ****
              </p>

              <p className="text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-normal text-[#4E5566]">
                04/24
              </p>

              <p className="text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-normal text-[#4E5566]">
                Mark Essien
              </p>
            </div>

            <div className="w-full h-auto min-h-[42px] lg:min-h-[47px] xl:min-h-[52px] border border-[#23BD33] gap-4 rounded-lg flex items-center p-1.5 xl:p-2 mt-3 sm:mt-4 xl:mt-5">
              <PiCreditCardDuotone className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 ml-2 text-[#FF6636]" />

              <p className="text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-normal text-[#4E5566]">
                New Payment Cards
              </p>
            </div>

            <div className="mt-3 sm:mt-4 xl:mt-5">
              <h5 className="text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal text-[#1D2026]">
                Name
              </h5>

              <input
                type="text"
                placeholder="Name on card"
                value={form.cardName}
                onChange={handleFieldChange("cardName")}
                className="w-full h-10 lg:h-11 xl:h-12 p-2 sm:p-3 xl:p-4 border border-[#E9EAF0] placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal rounded-lg mt-1.5 outline-none"
              />
            </div>

            <div className="mt-3 sm:mt-4">
              <h5 className="text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal text-[#1D2026]">
                Card Number
              </h5>

              <div className="flex items-center w-full h-10 lg:h-11 xl:h-12 rounded-lg border border-[#E9EAF0] p-1 mt-1.5">
                <PiCreditCardDuotone className="w-4 h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 ml-2 xl:ml-2.5 text-[#FF6636]" />
                <input
                  type="text"
                  placeholder="Label"
                  value={form.cardNumber}
                  onChange={handleFieldChange("cardNumber")}
                  className="flex-1 placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal pl-2 sm:pl-4 xl:pl-5 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 xl:gap-4 mt-3 sm:mt-3.5 xl:mt-4">
              <div className="flex-1">
                <p className="text-[#1D2026] text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal">
                  MM/YY
                </p>
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={form.expiry}
                  onChange={handleFieldChange("expiry")}
                  className="w-full p-2.5 sm:p-3 xl:p-3.5 h-10 lg:h-11 xl:h-12 rounded-lg border border-[#E9EAF0] placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] mt-2 outline-none"
                />
              </div>

              <div className="flex-1">
                <p className="text-[#1D2026] text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal">
                  CVC
                </p>
                <input
                  type="text"
                  placeholder="Security Code"
                  value={form.cvc}
                  onChange={handleFieldChange("cvc")}
                  className="w-full p-2.5 sm:p-3 xl:p-3.5 h-10 lg:h-11 xl:h-12 rounded-lg border border-[#E9EAF0] placeholder:text-[#8C94A3] text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] mt-2 outline-none"
                />
              </div>
            </div>

            <div className="flex items-start mt-3 sm:mt-4 xl:mt-5 gap-2 xl:gap-2.5">
              <IoIosCheckboxOutline className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 xl:w-[22px] xl:h-[22px] shrink-0" />

              <p className="text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-normal text-[#4E5566]">
                Remember this card, save it on my card list
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Order Summary */}
        <div className="w-full lg:max-w-[406px] rounded-2xl sm:rounded-3xl border border-[#6C7275] p-5 sm:p-7 xl:p-[29px] mt-6 lg:mt-13 xl:mt-16 mb-10">
          <h6 className="font-medium text-[18px] sm:text-[19px] xl:text-[20px] text-[#000000]">
            Order Summary
          </h6>

          {cartItems.length === 0 ? (
            <p className="mt-4 text-[14px]">Your cart is empty.</p>
          ) : (
            <>
              <div className="mt-4 space-y-4">
                {cartItems.map((item, index) => {
                  const qty = Number(item.quantity || 1);
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-start w-full border-b border-[#EAEAEA] pb-4 gap-2"
                    >
                      <div className="flex min-w-0">
                        <img
                          src={item.image || (index % 2 === 0 ? ux : crime)}
                          alt={item.name || "Product"}
                          className="w-[70px] h-[70px] sm:w-[84px] sm:h-[102px] lg:w-[92px] lg:h-[112px] xl:w-[100px] xl:h-[122px] object-cover rounded shrink-0"
                        />

                        <div className="flex flex-col mt-2 min-w-0 ml-3">
                          <p className="font-medium text-[12px] sm:text-[13px] xl:text-[14px] text-[#1C1C1C] break-words">
                            {item.name}
                          </p>
                          <p className="font-normal text-[10px] sm:text-[11px] xl:text-[12px] text-[#73768A]">
                            {item.author || ""}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleDecrease(item)}
                              aria-label={`Decrease quantity for ${item.name}`}
                              className="p-2 disabled:opacity-50 border border-[#73768A] rounded-l"
                              disabled={qty <= 1}
                            >
                              <MdRemove />
                            </button>

                            <div className="px-3 py-2 border-[0.3px] border-[#73768A]">
                              <span className="text-[14px]">{qty}</span>
                            </div>

                            <button
                              onClick={() => handleIncrease(item)}
                              aria-label={`Increase quantity for ${item.name}`}
                              className="p-2 border border-[#73768A] rounded-r"
                            >
                              <IoIosAdd />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="text-[14px] sm:text-[16px] xl:text-[20px] font-medium text-[#1C1C1C] whitespace-nowrap">
                        {formatCurrency(item.price * qty)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between border-b border-[#EAEAEA] pb-4 mt-3 sm:mt-6 xl:mt-8">
                <p className="text-[12px] sm:text-[13px] xl:text-[14px] font-normal text-[#6E7485]">
                  Subtotal
                </p>
                <p className="text-[12px] sm:text-[13px] xl:text-[14px] font-medium text-[#1C1C1C]">
                  {formatCurrency(subtotal)}
                </p>
              </div>

              <div className="flex justify-between border-b border-[#EAEAEA] pb-4 mt-4 sm:mt-6 xl:mt-8">
                <p className="text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal text-[#6E7485]">
                  Coupon Discount
                </p>
                <p className="text-[12px] sm:text-[13px] xl:text-[14px] font-medium text-[#1C1C1C]">
                  8%
                </p>
              </div>

              <div className="mt-3.5 sm:mt-5 xl:mt-6">
                <h6 className="text-[12px] sm:text-[13px] xl:text-[14px] font-normal text-[#1D2026]">
                  Apply Coupon
                </h6>

                <div className="flex items-center relative mt-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="w-full h-9 sm:h-10 lg:h-11 xl:h-12 rounded-lg border border-[#E9EAF0] pb-1 pl-3 pr-16 sm:pr-20 placeholder:text-[11px] sm:placeholder:text-[14px] xl:placeholder:text-[16px] font-normal text-[#8C94A3] outline-none"
                  />

                  <button className="absolute right-1 h-7 sm:h-8 xl:h-9 bg-[#1D2026] px-3 sm:px-3 xl:px-4 rounded-lg text-[11px] sm:text-[13px] xl:text-[14px] text-white">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-3 sm:mt-5 xl:mt-6">
                <p className="text-[14px] sm:text-[18px] xl:text-[20px] font-normal text-[#1C1C1C]">
                  Total
                </p>
                <p className="text-[14px] sm:text-[18px] xl:text-[20px] font-medium text-[#1C1C1C]">
                  {formatCurrency(subtotal)}
                </p>
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={!isFormValid}
                className={`w-full h-11 sm:h-12 xl:h-[52px] py-2 xl:py-2.5 px-3 xl:px-4 rounded-lg mt-4 sm:mt-6 xl:mt-8 text-[14px] sm:text-[15px] xl:text-[16px] font-medium text-white ${
                  isFormValid
                    ? "bg-[#FF6636]"
                    : "bg-[#FF6636] opacity-50 cursor-not-allowed"
                }`}
              >
                Complete Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
