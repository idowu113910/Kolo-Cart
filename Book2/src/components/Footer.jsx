import React from "react";
import social from "../assets/social media.png";
import apple from "../assets/apple.png";
import store from "../assets/play store.png";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center text-center mt-12 text-white bg-[#1D2026] h-[611px] md:h-[500px] lg:h-[525px] xl:h-[548px]">
      <div className="mt-5 md:mt-0 md:max-w-[550px] lg:max-w-[600px] xl:max-w-[645px] md:flex md:flex-col md:justify-start md:items-start md:text-start">
        <h4 className="font-semibold text-[16px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-9">
          About Goodness Bookstore
        </h4>

        <p className="font-normal text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] w-[361px] md:w-full px-2.5 md:px-14 lg:px-16 xl:px-18 md:-ml-14 lg:-ml-16 xl:-ml-18 md:mt-4 xl:mt-5.5">
          At Goodness Books, we believe in the power of stories to transform
          lives. Our carefully curated collection spans various genres, ensuring
          there is something for every reader. We are passionate about fostering
          a love for reading and building a community of book enthusiasts.
          Whether you are searching for the latest bestseller or a timeless
          classic, our knowledgeable staff is here to guide you. Join us in
          celebrating the joy of reading and discover your next great adventure
          with Goodness Books.
        </p>

        <img src={social} alt="" className="mx-auto mt-1 md:-ml-1 md:mt-2" />
      </div>

      <div className="max-w-[400px] md:max-w-[450px] lg:max-w-[475px] xl:max-w-[495px] md:flex md:flex-col md:justify-start md:items-start md:text-start">
        <h5 className="font-semibold text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-9 md:-mt-2">
          Join Our Newsletter
        </h5>

        <p className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-normal w-[361px] md:w-full px-2 md:px-3 xl:px-4 md:-ml-3 xl:-ml-4 mt-5.5">
          Stay connected with Goodness Books by subscribing to our newsletter!
          Be the first to know about new arrivals, exclusive offers, upcoming
          events, and book recommendations tailored just for you.{" "}
        </p>

        <div className="max-w-[361px] flex items-center justify-center mt-4">
          <input
            type="text"
            placeholder="Enter Your Email"
            className="placeholder:text-[14px] w-[280px] h-10 font-normal text-[#6E7485CC] bg-white px-3 py-1 rounded-tl-xl rounded-bl-xl"
          />

          <p className="rounded-tr-xl rounded-br-xl bg-[#FF6636] w-[74px] text-[16px] font-medium p-2">
            Join
          </p>
        </div>

        <p className="text-[14px] leading-[100%] font-medium text-left ml-2 md:ml-1 mt-6">
          Download our app
        </p>

        <div className="flex items-center justify-center gap-1.5 md:gap-3 lg:gap-3.5 mx-auto mt-4 md:mt-4 xl:mt-4.5 mb-4 md:ml-0">
          <div className="flex rounded-xl bg-[#363B4766] gap-4 p-2 w-[174.5px]">
            <img src={apple} alt="" className="w-8 h-8 ml-2" />

            <div className="flex flex-col">
              <p className="text-[10px] font-normal text-[#B7BAC7]">
                Download now
              </p>
              <p className="text-[16px] font-medium">App Store</p>
            </div>
          </div>

          <div className="flex rounded-xl bg-[#363B4766] gap-4 p-2 w-[174.5px]">
            <img src={store} alt="" className="w-8 h-8 ml-2" />

            <div className="flex flex-col">
              <p className="text-[10px] font-normal text-[#B7BAC7]">
                Download now
              </p>
              <p className="text-[16px] font-medium">Play Store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
