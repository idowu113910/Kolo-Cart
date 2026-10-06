import Footer from "../components/Footer.tsx";

const Home = () => {
  const crunchies = [
    {
      name: "Crunchies",
      rating: "4.8 (1,240 reviews)",
      location: "Independence Layout, Enugu",
      opens: "Closes 9:00PM",
      store: "Browse Store",
      img: "./Image.png",
    },
    {
      name: "Crunchies",
      rating: "4.8 (1,240 reviews",
      location: "Independence Layout, Enugu",
      opens: "Closes 9:00PM",
      store: "Browse Store",
      img: "./Image.png",
    },
  ];
  return (
    <>
      <div className=" w-full p-5 bg-[#F9F9F9] pb-24">
        <div className="flex gap-2.5 items-center ">
          <img src="/icon.svg" alt="Location Icon" />

          <h3 className="text-[#7F8C8D] text-lg font-semibold font-jakarta">
            Available in <br />
            <span className="text-[#1A2B4C]">Enugu State</span>
          </h3>
        </div>

        <div className="searchContainer w-full mt-4">
          <label
            htmlFor="searchBox"
            className="bg-[#F3EDF7] flex rounded-full items-center px-4 border border-transparent w-full"
          >
            <img src="/state-layer.svg" alt="" />
            <input
              type="search"
              name="searchBox"
              id="searchBox"
              aria-label="Search supermarkets and products"
              placeholder="Search supermarkets, products......"
              className="w-full bg-transparent  text-slate-800 outline-none font-jakarta"
            />
          </label>
        </div>

        <div className="flex p-5 rounded-3xl text-white bg-[#1A2B4C] mt-5 max-w-xl items-center justify-center gap-5">
          <div>
            <p className="text-[16px] font-semibold font-jakarta leading-6">
              Kolo Saving(Coming soon)
            </p>
            <p className="text-[#F9F9F9]">
              Plan your monthly grocery and save more
            </p>
            <p className="bg-white text-[#2ECC71] px-4  text-center w-fit rounded-full">
              Join Waitlist
            </p>
          </div>

          <img src="./save-tomorrow.png" alt="Save Tomorrow" />
        </div>

        <section className="mt-5">
          <div className="flex justify-between">
            <p>Popular Supermarkets</p>
            <p>View all</p>
          </div>

          <div className="flex gap-4 mt-5 justify-center items-center ">
            {crunchies.map((crunch) => {
              return (
                <div className="border bg-white rounded-3xl p-5 items-center ">
                  <img src={crunch.img} alt="" />
                  <h2>{crunch.name}</h2>
                  <p>⭐ {crunch.rating}</p>
                  <p>📍 {crunch.location}</p>
                  <p>⌚ Open . {crunch.opens}</p>
                  <p>🛒 {crunch.store}s</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-5 ">
          <h2 className="text-[12px] font-bold text-[#1A2B4C]">Categories</h2>
          <div className="flex justify-between mt-5">
            <div>
              <img src="./grains.png" alt="" />
              <span>Grains & Pasta</span>
            </div>
            <div>
              <img src="./grains.png" alt="" />
              <span>Grains & Pasta</span>
            </div>
            <div>
              <img src="./grains.png" alt="" />
              <span>Grains & Pasta</span>
            </div>
            <div>
              <img src="./grains.png" alt="" />
              <span>Grains & Pasta</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
