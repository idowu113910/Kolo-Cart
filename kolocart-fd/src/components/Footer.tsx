const Footer = () => {
  const Icons = [
    { name: "Home", alt: "Home", src: "./Vector.svg" },
    { name: "Category", alt: "Category", src: "./Vector2.svg" },
    { name: "Orders", alt: "Orders", src: "./Vector3svg.svg" },
    { name: "Cart", alt: "Cart", src: "./Vector4.svg" },
    { name: "Account", alt: "Account", src: "./Vector5.svg" },
  ];
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#F3EDF7]">
      <div className="flex w-full items-center justify-around py-4">
        {Icons.map((icon) => (
          <div
            key={icon.name}
            className="flex flex-col items-center justify-center gap-1"
          >
            <img src={icon.src} alt={icon.alt} />
            <p>{icon.name}</p>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
