import React from "react";
import ux from "../assets/ux mobile.png";
import crime from "../assets/crime mobile.png";
import arr from "../assets/arr mobile.png";
import ama from "../assets/ama mobile.png";
import sam from "../assets/5am mobile.png";
import animal from "../assets/animal mob.png";
import harry from "../assets/Harry mobile.png";
import trial from "../assets/trial mobile.png";
import star from "../assets/star mobile.png";
import love from "../assets/love mobile.png";
import mount from "../assets/mount mobile.png";
import fall from "../assets/fall mobile.png";
import idiot from "../assets/idiot mobile.png";
import geo from "../assets/geo mobile.png";
import storm from "../assets/martin mobile.png";
import finish from "../assets/finish what you start mobile.png";
import never from "../assets/neverwhere mobile.png";
import demon from "../assets/demons mobile.png";

const BookListMob = () => {
  const seller = [
    {
      id: 1,
      image: ux,
      title: "UX and UI Strategy",
      rating: 4.5,
      instructor: "Pamala B. Deacon",
      price: 5000,
    },
    {
      id: 2,
      image: crime,
      title: "Crime and  Punishment",
      rating: 4.8,
      instructor: "Fyodor Dostoyevsky",
      price: 7000,
    },
    {
      id: 3,
      image: arr,
      title: "Arrow of GOD",
      rating: 4.6,
      instructor: "Chinua Achebe",
      price: 6500,
    },
    {
      id: 4,
      image: ama,
      title: "Around Your Neck",
      rating: 4.7,
      instructor: "Chimamanda Ngozi Adichie",
      price: 5000,
    },
    {
      id: 5,
      image: sam,
      title: "Animal Farm",
      rating: 4.9,
      instructor: "George Orwell",
      price: 6000,
    },
    {
      id: 6,
      image: animal,
      title: "The 5am Club",
      rating: 4.4,
      instructor: "Robin Sharma",
      price: 4000,
    },
    {
      id: 7,
      image: harry,
      title: "Harry Porter",
      rating: 4.6,
      instructor: "J.K Rowling",
      price: 7000,
    },
    {
      id: 8,
      image: trial,
      title: "The trial",
      rating: 4.8,
      instructor: "Frank Kafka",
      price: 4500,
    },
  ];

  const edit = [
    {
      id: 1,
      image: mount,
      title: "And The Mountains",
      rating: 4.5,
      instructor: "Khaled Hosseini",
      price: 5000,
    },
    {
      id: 2,
      image: fall,
      title: "The Fall",
      rating: 4.8,
      instructor: "Albert Campus",
      price: 7000,
    },
    {
      id: 3,
      image: idiot,
      title: "The Idiot",
      rating: 4.6,
      instructor: "Fyodor Dostoyevsky",
      price: 6500,
    },
    {
      id: 4,
      image: geo,
      title: "Geography of World",
      rating: 4.7,
      instructor: "Simon Adams",
      price: 5000,
    },
    {
      id: 5,
      image: storm,
      title: "A Storm of Swords",
      rating: 4.9,
      instructor: "George R.R Martin",
      price: 6000,
    },
    {
      id: 6,
      image: finish,
      title: "Finish What You Start",
      rating: 4.4,
      instructor: "Peter Hollins",
      price: 4000,
    },
    {
      id: 7,
      image: never,
      title: "NeverWhere",
      rating: 4.6,
      instructor: "Neil Gaiman",
      price: 7000,
    },
    {
      id: 8,
      image: demon,
      title: "Demon",
      rating: 4.8,
      instructor: "Fyodor Dostoyevsky",
      price: 4500,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-6 sm:gap-8 md:gap-9 mt-[500px] sm:mt-[600px] md:mt-[700px] px-4">
        <div className="flex-1 border-t border-[#1D2026]"></div>
        <p className="text-[20px] sm:text-[22px] md:text-[24px] text-[#1D2026] font-medium whitespace-nowrap">
          Best Seller
        </p>
        <div className="flex-1 border-t border-[#1D2026]"></div>
      </div>

      <div className="px-4 py-6 mt-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {seller.map((item) => (
            <div key={item.id} className="w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded"
              />

              <div className="flex justify-between mt-2">
                <p className="text-[10.31px] sm:text-[12px] md:text-[13px] font-medium text-[#1C1C1C] truncate pr-1">
                  {item.title}
                </p>

                <div className="flex gap-1 shrink-0">
                  <img
                    src={star}
                    alt=""
                    className="w-[15.47px] sm:w-[16px] md:w-[17px] h-[15.47px] sm:h-[16px] md:h-[17px]"
                  />
                  <p className="font-normal text-[9.02px] sm:text-[10px] md:text-[11px] text-[#73768A]">
                    {item.rating}
                  </p>
                </div>
              </div>

              <p className="text-[#73768A] font-normal text-[9.02px] sm:text-[10px] md:text-[11px] mt-1 truncate">
                {item.instructor}
              </p>

              <p className="font-medium text-[15.47px] sm:text-[17px] md:text-[18px] text-[#1C1C1C] mt-2">
                ₦{item.price.toLocaleString()}
              </p>

              <div className="flex justify-between mt-2 gap-2">
                <button className="bg-[#FF6636] rounded-[5.16px] text-white text-[10.31px] sm:text-[11px] md:text-[12px] flex-1 py-1.5 sm:py-2">
                  Add To Cart
                </button>
                <button className="shrink-0">
                  <img src={love} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 sm:gap-8 md:gap-9 mt-14 px-4">
        <div className="flex-1 border-t border-[#1D2026]"></div>
        <p className="text-[20px] sm:text-[22px] md:text-[24px] text-[#1D2026] font-medium whitespace-nowrap">
          Editor's Pick
        </p>
        <div className="flex-1 border-t border-[#1D2026]"></div>
      </div>

      <div className="px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {edit.map((pick) => (
            <div key={pick.id} className="w-full">
              <img
                src={pick.image}
                alt={pick.title}
                className="w-full h-auto rounded"
              />

              <div className="flex justify-between mt-2">
                <p className="text-[10.31px] sm:text-[12px] md:text-[13px] font-medium text-[#1C1C1C] truncate pr-1">
                  {pick.title}
                </p>

                <div className="flex gap-1 shrink-0">
                  <img
                    src={star}
                    alt=""
                    className="w-[15.47px] sm:w-[16px] md:w-[17px] h-[15.47px] sm:h-[16px] md:h-[17px]"
                  />
                  <p className="font-normal text-[9.02px] sm:text-[10px] md:text-[11px] text-[#73768A]">
                    {pick.rating}
                  </p>
                </div>
              </div>

              <p className="text-[#73768A] font-normal text-[9.02px] sm:text-[10px] md:text-[11px] mt-1 truncate">
                {pick.instructor}
              </p>

              <p className="font-medium text-[15.47px] sm:text-[17px] md:text-[18px] text-[#1C1C1C] mt-2">
                ₦{pick.price.toLocaleString()}
              </p>

              <div className="flex justify-between mt-2 gap-2">
                <button className="bg-[#FF6636] rounded-[5.16px] text-white text-[10.31px] sm:text-[11px] md:text-[12px] flex-1 py-1.5 sm:py-2">
                  Add To Cart
                </button>
                <button className="shrink-0">
                  <img src={love} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="font-medium text-[20px] sm:text-[22px] md:text-[24px] text-[#1D2026] text-center">
        Most Search
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 mt-6">
        <div className="w-full">
          <img src={ux} alt="" className="w-full h-auto" />

          <div className="flex justify-between">
            <p className="text-[10.31px] sm:text-[12px] md:text-[13px] font-medium text-[#1C1C1C]">
              UX & UI Strategy
            </p>

            <div className="flex gap-1">
              <img
                src={star}
                alt=""
                className="w-[15.47px] sm:w-[16px] md:w-[17px] h-[15.47px] sm:h-[16px] md:h-[17px]"
              />
              <p className="font-normal text-[9.02px] sm:text-[10px] md:text-[11px] text-[#73768A]">
                4.5
              </p>
            </div>
          </div>

          <p className="text-[#73768A] font-normal text-[9.02px] sm:text-[10px] md:text-[11px]">
            Pamala B. Deacon
          </p>

          <p className="font-medium text-[15.47px] sm:text-[17px] md:text-[18px] text-[#1C1C1C] mt-2">
            ₦5,000
          </p>

          <div className="flex justify-between mt-2">
            <button className="bg-[#FF6636] rounded-[5.16px] text-white text-[10.31px] sm:text-[11px] md:text-[12px] w-full max-w-[108.92px]">
              Add To Cart
            </button>
            <img src={love} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="w-full">
          <img src={ux} alt="" className="w-full h-auto" />

          <div className="flex justify-between">
            <p className="text-[10.31px] sm:text-[12px] md:text-[13px] font-medium text-[#1C1C1C]">
              UX & UI Strategy
            </p>

            <div className="flex gap-1">
              <img
                src={star}
                alt=""
                className="w-[15.47px] sm:w-[16px] md:w-[17px] h-[15.47px] sm:h-[16px] md:h-[17px]"
              />
              <p className="font-normal text-[9.02px] sm:text-[10px] md:text-[11px] text-[#73768A]">
                4.5
              </p>
            </div>
          </div>

          <p className="text-[#73768A] font-normal text-[9.02px] sm:text-[10px] md:text-[11px]">
            Pamala B. Deacon
          </p>

          <p className="font-medium text-[15.47px] sm:text-[17px] md:text-[18px] text-[#1C1C1C] mt-2">
            ₦5,000
          </p>

          <div className="flex justify-between mt-2">
            <button className="bg-[#FF6636] rounded-[5.16px] text-white text-[10.31px] sm:text-[11px] md:text-[12px] w-full max-w-[108.92px]">
              Add To Cart
            </button>
            <img src={love} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListMob;
