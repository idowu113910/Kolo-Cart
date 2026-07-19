import React from "react";
import ux from "../assets/ux 2.png";
import love from "../assets/love 2.png";
import crime from "../assets/crime 2.png";
import arr from "../assets/arrow.png";
import ama from "../assets/ama.png";
import animal from "../assets/animal.png";
import sam from "../assets/sam.png";
import harry from "../assets/harry.png";
import trial from "../assets/trial.png";
import star from "../assets/star.png";
import mount from "../assets/mountain.png";
import fall from "../assets/The fall.png";
import idiot from "../assets/The idiot.png";
import geo from "../assets/geo world.png";
import storm from "../assets/martin.png";
import finish from "../assets/finish what you start.png";
import never from "../assets/neverwhere.png";
import demon from "../assets/demons.png";
import morning from "../assets/morning star.png";
import long from "../assets/longing.png";
import BookListMob from "../components/BookListMob";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { useSearch } from "../SearchContext";

const BookList = () => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (item) => {
    if (!item || !item.id) return;
    const cartItem = {
      id: item.id,
      name: item.title || item.name || "Untitled",
      price: Number(item.price || 0),
      image: item.image,
      quantity: 1,
      author: item.instructor || item.author || "",
    };
    addToCart(cartItem);
    navigate("/cart");
  };

  const books = [
    {
      id: "book-1",
      image: ux,
      title: "UX and UI Strategy",
      rating: 4.5,
      instructor: "Pamala B. Deacon",
      price: 5000,
    },
    {
      id: "book-2",
      image: crime,
      title: "Crime and Punishment",
      rating: 4.8,
      instructor: "Fyodor Dostoyevsky",
      price: 7000,
    },
    {
      id: "book-3",
      image: arr,
      title: "Arrow of God",
      rating: 4.6,
      instructor: "Chinua Achebe",
      price: 6500,
    },
    {
      id: "book-4",
      image: ama,
      title: "Around Your Neck",
      rating: 4.7,
      instructor: "Chimamanda Ngozi Adichie",
      price: 5000,
    },
    {
      id: "book-5",
      image: animal,
      title: "Animal Farm",
      rating: 4.9,
      instructor: "George Orwell",
      price: 6000,
    },
    {
      id: "book-6",
      image: sam,
      title: "The 5am Club",
      rating: 4.4,
      instructor: "Robin Sharma",
      price: 4000,
    },
    {
      id: "book-7",
      image: harry,
      title: "Harry Potter",
      rating: 4.6,
      instructor: "J.K. Rowling",
      price: 7000,
    },
    {
      id: "book-8",
      image: trial,
      title: "The Trial",
      rating: 4.8,
      instructor: "Franz Kafka",
      price: 4500,
    },
  ];

  const editors = [
    {
      id: "editor-1",
      image: mount,
      title: "And The Mountains",
      rating: 4.5,
      instructor: "Khaled Hosseini",
      price: 5000,
    },
    {
      id: "editor-2",
      image: fall,
      title: "The Fall",
      rating: 4.8,
      instructor: "Albert Camus",
      price: 7000,
    },
    {
      id: "editor-3",
      image: idiot,
      title: "The Idiot",
      rating: 4.6,
      instructor: "Fyodor Dostoyevsky",
      price: 6500,
    },
    {
      id: "editor-4",
      image: geo,
      title: "Geography of World",
      rating: 4.7,
      instructor: "Simon Adams",
      price: 5000,
    },
    {
      id: "editor-5",
      image: storm,
      title: "A Storm of Swords",
      rating: 4.9,
      instructor: "George R.R. Martin",
      price: 6000,
    },
    {
      id: "editor-6",
      image: finish,
      title: "Finish What You Start",
      rating: 4.4,
      instructor: "Peter Hollins",
      price: 4000,
    },
    {
      id: "editor-7",
      image: never,
      title: "Neverwhere",
      rating: 4.6,
      instructor: "Neil Gaiman",
      price: 7000,
    },
    {
      id: "editor-8",
      image: demon,
      title: "Demon",
      rating: 4.8,
      instructor: "Fyodor Dostoyevsky",
      price: 4500,
    },
  ];

  const formatPrice = (v) =>
    `₦${Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

  const { query } = useSearch();
  const isSingleLetter = (str) => /^[a-zA-Z]$/.test(str.trim());

  const filteredBooks = (() => {
    const q = (query || "").trim();
    if (!q) return books;
    if (isSingleLetter(q)) {
      return books.filter((b) =>
        b.title.toLowerCase().startsWith(q.toLowerCase()),
      );
    }
    const lower = q.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(lower) ||
        (b.instructor || "").toLowerCase().includes(lower),
    );
  })();

  return (
    <>
      <div className="hidden min-[1025px]:block mt-32 lg:mt-40 xl:mt-48 md:-mt-900">
        <div className="flex items-center gap-6 lg:gap-9 mt-10  lg:mt-14 px-8 lg:px-14 xl:px-20">
          <div className="flex-1 border-t border-[#1D2026]" />
          <p className="text-[#1D2026] text-[18px] lg:text-[22px] xl:text-[24px] font-medium whitespace-nowrap">
            Best Seller
          </p>
          <div className="flex-1 border-t border-[#1D2026]" />
        </div>

        <div className="w-full max-w-[900px] lg:max-w-[1000px] xl:max-w-[1112px] h-auto mx-auto mt-6 lg:mt-8 px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7 xl:gap-8">
            {filteredBooks.map((book) => (
              <article key={book.id} className="w-full">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full aspect-[233/284] object-cover"
                />

                <div className="flex justify-between mt-3 w-full">
                  <p className="text-[14px] lg:text-[15px] xl:text-[16px] font-medium flex-1">
                    {book.title}
                  </p>
                  <div className="flex gap-1 items-center">
                    <img
                      src={star}
                      alt="rating star"
                      className="w-4 h-4 lg:w-5 lg:h-5"
                    />
                    <p className="text-[13px] lg:text-[14px] font-normal text-[#73768A]">
                      {book.rating}
                    </p>
                  </div>
                </div>

                <p className="mt-1 text-[#73768A] font-normal text-[13px] lg:text-[14px]">
                  {book.instructor}
                </p>

                <p className="mt-3 text-[20px] lg:text-[22px] xl:text-[24px] font-medium text-[#1C1C1C]">
                  {formatPrice(book.price)}
                </p>

                <div className="flex w-full mt-3 justify-between items-center">
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-[#FF6636] w-[140px] lg:w-[155px] xl:w-[169px] h-9 lg:h-10 rounded-lg text-white font-medium text-[14px] lg:text-[16px]"
                    aria-label={`Add ${book.title} to cart`}
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() =>
                      console.log(`favorite toggled for ${book.title}`)
                    }
                    aria-label={`Add ${book.title} to favorites`}
                  >
                    <img
                      src={love}
                      alt="Add to favorites"
                      className="w-10 h-8 lg:w-12 lg:h-10"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-9 mt-6 px-8 lg:px-14 xl:px-20">
          <div className="flex-1 border-t border-[#1D2026]" />
          <p className="text-[#1D2026] text-[18px] lg:text-[22px] xl:text-[24px] font-medium whitespace-nowrap">
            Editor's Pick
          </p>
          <div className="flex-1 border-t border-[#1D2026]" />
        </div>

        <div className="w-full max-w-[900px] lg:max-w-[1000px] xl:max-w-[1112px] h-auto mx-auto mt-6 lg:mt-8 px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7 xl:gap-8">
            {filteredBooks.map((editor) => (
              <article key={editor.id} className="w-full">
                <img
                  src={editor.image}
                  alt={editor.title}
                  className="w-full aspect-[233/284] object-cover"
                />

                <div className="flex justify-between mt-3 w-full">
                  <p className="text-[14px] lg:text-[15px] xl:text-[16px] font-medium flex-1">
                    {editor.title}
                  </p>
                  <div className="flex gap-1 items-center">
                    <img
                      src={star}
                      alt="rating star"
                      className="w-4 h-4 lg:w-5 lg:h-5"
                    />
                    <p className="text-[13px] lg:text-[14px] font-normal text-[#73768A]">
                      {editor.rating}
                    </p>
                  </div>
                </div>

                <p className="mt-1 text-[#73768A] font-normal text-[13px] lg:text-[14px]">
                  {editor.instructor}
                </p>

                <p className="mt-3 text-[20px] lg:text-[22px] xl:text-[24px] font-medium text-[#1C1C1C]">
                  {formatPrice(editor.price)}
                </p>

                <div className="flex w-full mt-3 justify-between items-center">
                  <button
                    onClick={() => handleAddToCart(editor)}
                    className="bg-[#FF6636] w-[140px] lg:w-[155px] xl:w-[169px] h-9 lg:h-10 rounded-lg text-white font-medium text-[14px] lg:text-[16px]"
                    aria-label={`Add ${editor.title} to cart`}
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() =>
                      console.log(`favorite toggled for ${editor.title}`)
                    }
                    aria-label={`Add ${editor.title} to favorites`}
                  >
                    <img
                      src={love}
                      alt="Add to favorites"
                      className="w-10 h-8 lg:w-12 lg:h-10"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-9 mt-8 lg:mt-10 px-8 lg:px-14 xl:px-20">
          <div className="flex-1 border-t border-[#1D2026]" />
          <p className="text-[#1D2026] text-[18px] lg:text-[22px] xl:text-[24px] font-medium whitespace-nowrap">
            Most Search
          </p>
          <div className="flex-1 border-t border-[#1D2026]" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 xl:gap-8 mt-6 lg:mt-8 px-8 lg:px-24 xl:px-40">
          {[
            {
              id: "ms-1",
              image: mount,
              title: "And The Mountains",
              rating: 4.0,
              instructor: "Khaled Hosseini",
              price: 5000,
            },
            {
              id: "ms-2",
              image: morning,
              title: "The Morning Star",
              rating: 3.9,
              instructor: "Karl Ove Knausgaard",
              price: 4500,
            },
            {
              id: "ms-3",
              image: fall,
              title: "The Fall",
              rating: 4.6,
              instructor: "Albert Camus",
              price: 5000,
            },
            {
              id: "ms-4",
              image: long,
              title: "Book of Longing",
              rating: 5.0,
              instructor: "Leonard Cohen",
              price: 6500,
            },
          ].map((item) => (
            <div key={item.id} className="w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
              />

              <div className="flex justify-between mt-3">
                <p className="font-medium text-[14px] lg:text-[16px] text-[#1C1C1C]">
                  {item.title}
                </p>

                <div className="flex gap-1 items-center">
                  <img
                    src={star}
                    alt="rating star"
                    className="w-4 h-4 lg:w-5 lg:h-5"
                  />
                  <p className="font-normal text-[13px] lg:text-[14px] text-[#73768A]">
                    {item.rating}
                  </p>
                </div>
              </div>

              <p className="text-[13px] lg:text-[14px] text-[#73768A] font-normal">
                {item.instructor}
              </p>

              <p className="font-medium text-[20px] lg:text-[24px] mt-1.5">
                {formatPrice(item.price)}
              </p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#FF6636] text-white rounded-lg w-[140px] lg:w-[169px] font-medium text-[14px] lg:text-[16px] h-9 lg:h-10"
                  aria-label={`Add ${item.title} to cart`}
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    console.log(`favorite toggled for ${item.title}`)
                  }
                  aria-label={`Add ${item.title} to favorites`}
                >
                  <img
                    src={love}
                    alt="Add to favorites"
                    className="w-10 lg:w-auto"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile alternative — now covers up to 1024px */}
      <div className="min-[1025px]:hidden block">
        <BookListMob onAddToCart={handleAddToCart} />
      </div>
    </>
  );
};

export default BookList;
