import React from "react";
import arr from "../assets/arr back.png";
import ux3 from "../assets/ux cart.png";
import crime from "../assets/crime desk.png";
import stars from "../assets/stars desktop.png";
import { X } from "lucide-react";
import { MdRemove } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { TbCircleNumber1Filled, TbCircleNumber2Filled } from "react-icons/tb";
import { MdOutlineCircle } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";

const Cart = () => {
  const navigate = useNavigate();

  // guard cartItems so mappings are safe
  const cartItems = useCartStore((s) => s.cartItems) || [];
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);

  const subtotal = Number(getTotalPrice?.() || 0);

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
    // if you want to remove when 0, handle here; otherwise clamp to 1
    updateQuantity(item.id, newQty);
  };

  const handleIncrease = (item) => {
    const current = Number(item.quantity || 1);
    const newQty = current + 1;
    updateQuantity(item.id, newQty);
  };

  const handleRemove = (id, name) => {
    // confirm removal for better UX (optional)
    removeFromCart(id);
  };
  return (
    <div className="px-4">
      <div className="flex p-6">
        <img
          onClick={() => navigate("/")}
          src={arr}
          alt="Back to cart"
          className="md:w-10 md:h-10 lg:w-12 lg:h-12 md:mt-6 lg:mt-8 md:ml-6 lg:ml-10 xl:ml-14 cursor-pointer"
        />

        <h4 className="flex mx-auto font-medium text-[36px] md:text-[44px] lg:text-[52px] xl:text-[57px] pr-8">
          Cart
        </h4>
      </div>

      <div className="mx-auto border-b border-[#FFDDD1] w-full max-w-[1241px] pb-4 md:px-8 lg:px-24 xl:px-50">
        <div className="flex justify-between max-w-[1241px] mx-auto px-3 md:px-0 mt-6">
          <div className="flex items-center gap-2">
            <TbCircleNumber1Filled className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-[42px] xl:h-[42px]" />
            <p className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium text-[#1D2026]">
              Shopping Cart
            </p>
          </div>

          <div className="flex items-center gap-2">
            <TbCircleNumber2Filled className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-[42px] xl:h-[42px] text-[#B1B5C3]" />
            <p className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium text-[#B1B5C3]">
              Checkout details
            </p>
          </div>
        </div>
      </div>

      <div className="md:flex md:gap-4 lg:gap-6 xl:gap-8 max-w-[1241px] mx-auto">
        {/* Left column */}
        <section className="border-[0.25px] border-[#6C7275] rounded-xl w-full md:w-[500px] lg:w-[640px] xl:w-[751px] mt-6 md:mt-8 lg:mt-10 xl:mt-12 mx-auto bg-white">
          <div className="flex justify-between items-center border-b border-[#EAEAEA] px-4 py-4">
            <p className="md:block hidden text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium">
              Product
            </p>
            <p className="md:hidden block text-[12px] font-medium">
              Product & Qty
            </p>

            <div className="flex gap-9 md:gap-8 lg:gap-10 xl:gap-12 items-center">
              <p className="md:block hidden text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium">
                Quantity
              </p>

              <p className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium">
                Price
              </p>
              <p className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium">
                Subtotal
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-[14px] md:text-[16px]">Your cart is empty.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 bg-[#FF6636] text-white px-4 py-2 rounded"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="px-4 md:px-5 lg:px-6 py-4">
              {cartItems.map((item, idx) => {
                const qty = Number(item.quantity || 1);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 md:justify-between border-b border-[#EAEAEA] pb-4 pt-4"
                  >
                    {/* Product info */}
                    <div className="flex items-start gap-3 md:gap-5 lg:gap-6 w-full md:w-[60%]">
                      <img
                        src={item.image || (idx % 2 === 0 ? ux3 : crime)}
                        alt={item.name || "Cart item"}
                        className="w-[60px] md:w-[80px] lg:w-[90px] xl:w-[100px] h-[60px] md:h-[96px] lg:h-[108px] xl:h-[120px] object-cover rounded"
                      />

                      <div className="flex-1">
                        <div className="break-all">
                          <p className="text-[10px] md:text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium text-[#1C1C1C]">
                            {item.name}
                          </p>
                          <p className="text-[8px] md:text-[11px] lg:text-[11.5px] xl:text-[12px] text-[#73768A] mt-1">
                            {item.author || "Author Name"}
                          </p>
                        </div>

                        <div className="hidden md:block mt-2">
                          <img src={stars} alt="rating stars" />
                          <p className="text-[11px] lg:text-[11.5px] xl:text-[12px] text-[#737373] mt-1">
                            5430 Reviews
                          </p>
                        </div>

                        <div className="mt-2">
                          <button
                            onClick={() => handleRemove(item.id, item.name)}
                            aria-label={`Remove ${item.name}`}
                            className="text-[12px] text-[#1C1C1C] flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Controls + price */}
                    <div className="flex md:flex-row items-center justify-between w-full md:w-[40%] md:pl-6 lg:pl-7 xl:pl-8">
                      {/* Slimmer quantity control */}
                      <div className="flex items-center border border-[#73768A] rounded overflow-hidden w-[70px] h-5 md:h-[28px] lg:h-[29px] xl:h-[30px] md:w-[76px] lg:w-[78px] xl:w-20">
                        <button
                          onClick={() => handleDecrease(item)}
                          aria-label={`Decrease quantity for ${item.name}`}
                          className="p-1 disabled:opacity-50"
                          disabled={qty <= 1}
                        >
                          <MdRemove className="w-3 h-3 pl-1" />
                        </button>

                        <div className="px-2 py-1 pl-1 md:pl-2 pb-2 min-w-8 text-center">
                          <span className="text-[10px] md:text-[13px] lg:text-[13.5px] xl:text-[14px]">
                            {qty}
                          </span>
                        </div>

                        <button
                          onClick={() => handleIncrease(item)}
                          aria-label={`Increase quantity for ${item.name}`}
                          className="p-1"
                        >
                          <IoIosAdd className="w-3 h-3 pr-1" />
                        </button>
                      </div>

                      <div className="flex justify-between gap-8">
                        <p className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium md:pl-6 lg:pl-7 xl:pl-8">
                          {formatCurrency(item.price)}
                        </p>
                        <p className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-medium">
                          {formatCurrency(item.price * qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Right column: summary */}
        <aside className="border-[0.4px] border-[#6C7275] rounded-2xl w-full md:w-[280px] lg:w-[340px] xl:w-[401px] p-6 md:p-7 lg:p-7.5 xl:p-8 mt-8 md:mt-9 lg:mt-10 xl:mt-11 mx-auto">
          <h2 className="text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-medium">
            Cart Summary
          </h2>

          <form className="mt-6" aria-label="Shipping options">
            <fieldset>
              <legend className="sr-only">Shipping options</legend>

              <label className="flex items-center gap-3 border-[0.24px] w-full h-12 py-2 px-3 rounded mb-3">
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  defaultChecked
                  aria-label="Pick Up"
                />

                <span className="text-[14px]">Pick Up</span>
              </label>

              <label className="flex items-center gap-3 border-[0.24px] w-full h-12 py-2 px-3 rounded">
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  aria-label="Express Shipping"
                />

                <span className="text-[14px]">Express Shipping</span>
              </label>
            </fieldset>
          </form>

          <div className="mt-8 w-full">
            <div className="flex justify-between border-b pb-4">
              <p className="text-[14px]">Subtotal</p>
              <p className="text-[14px] font-medium">
                {formatCurrency(subtotal)}
              </p>
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-[14px]">Total</p>
              <p className="text-[14px] font-medium">
                {formatCurrency(subtotal)}
              </p>
            </div>
          </div>

          <button
            onClick={() => cartItems.length > 0 && navigate("/checkout")}
            disabled={cartItems.length === 0}
            className={`mt-7 w-full h-[52px] flex items-center justify-center gap-3 rounded text-white ${
              cartItems.length === 0
                ? "bg-[#FF6636] opacity-50 cursor-not-allowed"
                : "bg-[#FF6636]"
            }`}
            aria-disabled={cartItems.length === 0}
          >
            <span className="text-[16px] font-medium">Proceed To Checkout</span>
            <FaArrowRightLong />
          </button>
        </aside>
      </div>
    </div>
  );
};
export default Cart;
