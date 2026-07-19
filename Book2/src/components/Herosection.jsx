import React from "react";
import book from "../assets/book img.png";
import book2 from "../assets/book 2.png";
import logo from "../assets/desktop img.png";
import commu from "../assets/community img.png";
import adv from "../assets/Adventure img.png";
import prem from "../assets/Premium img.png";
import NavBar from "./NavBar";

const Herosection = () => {
  const features = [
    {
      icon: commu,
      title: "Join Our Community",
      description:
        "Connect with fellow book lovers, attend exclusive events, and enjoy personalized recommendations",
    },
    {
      icon: adv,
      title: "Adventure and Discovery",
      description:
        "Embark on an Adventure at our Goodness Bookstore. Every Book is a New Journey",
    },
    {
      icon: prem,
      title: "Exclusive and Premium",
      description:
        "Experience literary luxury at Goodness Bookstore. Curated collections for discerning readers",
    },
  ];

  return (
    <div className="h-[790px] md:h-[820px] lg:h-[850px] xl:h-[877px] -mt-2">
      <div className="w-full md:max-w-[90%] lg:max-w-[1000px] xl:max-w-[1150px] 2xl:max-w-[1200px] mx-auto p-6 md:flex md:gap-25 xl:scale-95">
        <div className="flex flex-col items-center xl:items-start justify-center mt-8 md:justify-start md:mt-16 lg:mt-20 xl:mt-26">
          <img src={logo} alt="" className="md:hidden" />

          <p
            className="font-bold text-[36px] sm:text-[38px] md:text-[48px] lg:text-[56px] xl:text-[64px]
   xl:max-w-[574px] w-full
text-[#1D2026]
px-4 md:px-0
leading-11 md:leading-13 lg:leading-15 xl:leading-16
tracking-[0.25px] lg:ml-10 xl:-ml-1
text-center md:text-left
mt-3"
          >
            Discover Your Next Great Read
          </p>

          <p
            className="font-normal text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] text-[#4E5566] text-center md:text-left w-full
xl:w-[574px] px-8 sm:px-6 md:px-5 mt-2 sm:mt-3.5 md:mt-2.5 2xl:-ml-5 xl:-ml-4 md:-ml-8 lg:ml-2"
          >
            Explore a world of stories, knowledge, and inspiration at Goodness
            Bookstore. Whether you are seeking the latest bestsellers, timeless
            classics, or hidden gems, our curated selection has something for
            every reader.
          </p>

          <button className="text-[#FF6636] text-[14px] md:text-[15px] lg:text-[15.5px] xl:text-[16px] font-medium rounded-xl py-2.5 md:py-3 xl:py-4 px-4 md:px-5 xl:px-6 bg-[white] w-36 md:w-40 xl:w-[182px] h-12 md:h-14 xl:h-16 mt-6 md:-ml-150 2xl:ml-0.5 xl:ml-1 lg:-ml-163 md:block hidden">
            Shop Now
          </button>
        </div>

        <button className="text-[#FF6636] text-[16px] font-medium rounded-xl py-2 px-6 bg-[white] mx-auto w-[330px] h-12 mt-4 md:hidden block">
          Shop Now
        </button>

        <div className="mt-10 flex-1 min-w-0">
          <img src={book} alt="" className="md:hidden block mx-auto" />

          <img
            src={book2}
            alt=""
            className="md:block hidden h-[300px] lg:h-[380px] xl:h-[460px] 2xl:h-[531px] 2xl:ml-12 w-full object-contain"
          />
        </div>
      </div>

      <div
        className="md:flex md:items-center md:justify-center md:mx-auto md:border md:border-[white] mt-44 md:mt-40 lg:mt-32 xl:mt-38 2xl:mt-40 md:gap-4 lg:gap-6 xl:gap-8 md:bg-[white] w-full md:max-w-[700px] lg:max-w-[880px] xl:max-w-[1048px] 2xl:max-w-[1150px] md:rounded-xl 
  md:p-2
md:shadow-[0_10px_2px_2px_rgba(56,119,194,0.08)]"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 flex flex-col items-center justify-center mt-4"
          >
            <img src={feature.icon} alt="" />

            <p className="text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-medium text-[#1D2026] text-center mt-2">
              {feature.title}
            </p>

            <p className="text-[12px] md:text-[13px] lg:text-[13.5px] xl:text-[14px] font-normal text-center w-[219px] md:w-full md:max-w-60 lg:max-w-[260px] xl:max-w-[280px] px-2 mt-2 text-[#4E5566]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herosection;
