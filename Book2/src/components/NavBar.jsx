import React, { useState } from "react";
import ham from "../assets/hamburger 2.png";
import love from "../assets/love img.png";
import cart from "../assets/cart img.png";
import logo from "../assets/desktop img.png";
import icon from "../assets/searh icon desk.png";
import icon2 from "../assets/icon3.png";
import face from "../assets/face img desk.png";
import { useNavigate } from "react-router-dom";
import droparr from "../assets/drop down arrow.png";
import book from "../assets/book img.png";
import book2 from "../assets/book 2.png";
import commu from "../assets/community img.png";
import adv from "../assets/Adventure img.png";
import prem from "../assets/Premium img.png";
import { useSearch } from "../SearchContext";

const NavBar = ({ whiteBg, hideAuthButtons }) => {
  const [open, setOpen] = useState();
  const [isOpen, setIsOpen] = useState();
  const navigate = useNavigate();

  const { query, setQuery } = useSearch();

  const [rotated, setRotated] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <nav
        className={`md:hidden block flex justify-between p-6  ${
          whiteBg ? "bg-white" : ""
        }`}
      >
        <div className="relative">
          {/* Hamburger Icon */}
          <img
            src={ham}
            alt="menu"
            onClick={() => setOpen(true)}
            className=" cursor-pointer"
          />

          {/* Overlay */}
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            ></div>
          )}

          {/* Slide Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-[287px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              ×
            </button>

            <div>
              <div className="flex mt-14 ml-6 border-b w-[247px] border-[#EAEAEA] pb-3">
                <div className="flex items-center rounded-tl-xl rounded-bl-xl w-[198px] h-10 border-[0.5px] border-[#FF6636]">
                  <input
                    type="text"
                    placeholder="Enter book title or Author"
                    className="placeholder:text-[14px] font-normal text-[#6E7485CC] ml-4 border-none outline-none w-full bg-transparent"
                  />
                </div>

                <div className="bg-[#FF6636] w-[49px] h-10 rounded-tr-xl rounded-br-xl flex items-center justify-center ">
                  <img src={icon2} alt="" className="w-5 h-5 object-contain" />
                </div>
              </div>

              <ul className="text-[#FF6636] font-medium text-[14px] p-6 flex flex-col gap-y-4">
                <div
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex border-b w-[247px] border-[#EAEAEA] pb-5 justify-between"
                >
                  <span className="font-medium">SHOP</span>

                  <img
                    src={droparr}
                    alt="dropdown arrow"
                    className={`w-6 h-6 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                {isOpen && (
                  <ul className="bg-[#FFDDD1] text-[#1C1C1C] h-[300px] text-[14px] font-normal flex flex-col p-2 gap-y-3">
                    <li>Philosophy</li>
                    <li>Religion</li>
                    <li>Fiction</li>
                    <li>Children's Book</li>
                    <li>Business</li>
                    <li>Self Help/Motivation</li>
                    <li>History/Politics</li>
                    <li>Biography</li>
                    <li>Memoir</li>
                  </ul>
                )}

                <li className="border-b w-[247px] border-[#EAEAEA] pb-6">
                  BOOK SUBSCRIPTION
                </li>
                <li className="border-b w-[247px] border-[#EAEAEA] pb-6">
                  JOUR OUR BOOK CLUB
                </li>
                <li className="border-b w-[247px] border-[#EAEAEA] pb-6">
                  SIGN UP FOR OUR NEWSLETTER
                </li>
                <li className="border-b w-[247px] border-[#EAEAEA] pb-6 ">
                  REQUEST FOR A BOOK
                </li>
                <li className="border-b w-[247px] border-[#EAEAEA] pb-6">
                  BE OUR VENDOR
                </li>
                <li className="border-b w-[247px] border-[#EAEAEA] pb-6">
                  SIGN UP / LOGIN
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <img src={love} alt="" />

          <img
            onClick={() => {
              navigate("/cart");
            }}
            src={cart}
            alt=""
          />
        </div>
      </nav>

      <div className={`w-full ${whiteBg ? "bg-[#F9F9FB]" : ""}`}>
        <div
          className={`md:mx-auto w-full 2xl:mx-auto justify-between xl:px-16 ${
            whiteBg
              ? ""
              : "md:max-w-[90%] lg:max-w-[1000px] xl:max-w-[1289px] 2xl:max-w-[1350px]"
          } ${hideAuthButtons ? "flex justify-center" : ""}`}
        >
          {/* inner nav */}
          <nav
            className={`md:flex hidden flex-row items-center rounded-xl transition-all duration-300 p-4 lg:p-8 xl:p-12 ${
              hideAuthButtons
                ? "justify-center ml-0"
                : "ml-2 lg:ml-4 xl:ml-6 justify-between"
            } ${
              whiteBg
                ? "bg-white border border-white"
                : "bg-transparent border-none"
            }`}
          >
            {/* Left: logo + search */}
            <div className="w-full max-w-[886px] py-3 lg:py-4 xl:py-5 flex items-center gap-4 lg:gap-6 xl:gap-8 px-4 lg:px-6 xl:px-10 rounded-xl bg-white border border-white shadow-[0px_-4px_20px_0px_#3877C214]">
              <div className="flex items-center gap-4 lg:gap-6 xl:gap-10 flex-1">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-[48px] h-[28px] lg:w-[57px] lg:h-[34px]"
                />

                <div className="flex items-center h-11 lg:h-12 px-2 gap-2 w-full max-w-[505px] xl:max-w-[537.5px] rounded-xl border border-[#C4C6D3] bg-[#F5F7FA]">
                  <img src={icon} alt="Search" className="ml-2" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none placeholder:text-[14px] lg:placeholder:text-[16px] font-normal text-[#8C94A3] focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Right: icons */}
              <div className="flex gap-4 lg:gap-6 xl:gap-[24.5px]">
                <div className="flex items-center justify-center w-10 h-10 xl:w-[47.5px] xl:h-[47.5px] rounded-xl xl:rounded-[11.75px] border border-[#C4C6D3] bg-[#F5F7FA]">
                  <img src={face} alt="User" className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 xl:w-[47.5px] xl:h-[47.5px] rounded-xl xl:rounded-[11.75px] border border-[#C4C6D3] bg-[#F5F7FA]">
                  <img src={love} alt="Favorites" className="w-5 h-5" />
                </div>
                <div
                  onClick={() => navigate("/cart")}
                  className="flex items-center justify-center w-10 h-10 xl:w-[47.5px] xl:h-[47.5px] rounded-xl xl:rounded-[11.75px] border border-[#C4C6D3] bg-[#F5F7FA] cursor-pointer"
                >
                  <img src={cart} alt="Cart" className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Right: Auth buttons (only visible on home page) */}
            {!hideAuthButtons && (
              <div className="flex justify-end items-center gap-3 lg:gap-4 ml-4 lg:ml-6 xl:ml-8 shrink-0">
                <button className="text-[14px] lg:text-[16px] font-medium text-white rounded-lg w-[110px] lg:w-[132px] text-center bg-[#FF6636] py-2 lg:py-2.5 px-3 lg:px-4 hover:opacity-90 transition">
                  Sign Up
                </button>
                <button
                  className="text-[14px] lg:text-[16px] font-medium text-[#FF6636] border border-[#FF6636] w-[110px] lg:w-[132px] rounded-lg bg-[#FFEEE8] py-2 lg:py-2.5
           px-3 lg:px-4 hover:bg-[#FFD6C4] transition"
                >
                  Login
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
