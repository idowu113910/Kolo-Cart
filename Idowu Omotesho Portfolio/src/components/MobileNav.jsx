import { useState, useEffect } from "react";
import ham from "../assets/hamburger.png";
import closeIcon from "../assets/x-mark.png";

const navLinks = [
  { id: 1, label: "Projects", type: "scroll", section: "projects" },
  { id: 2, label: "Resume", type: "link", href: "/resume.pdf" },
  { id: 3, label: "About", type: "scroll", section: "about" },
  { id: 4, label: "Contact", type: "scroll", section: "contact" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      setOpen(false);
    }, 50);
  };

  return (
    <div className="block md:hidden">
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
      )}

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-24px)] max-w-[767px]">
        <div
          className="
            flex items-center justify-between
            h-[72px]
            px-4
            rounded-full
            bg-black/20
            backdrop-blur-xl
            border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          "
        >
          {/* Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              hover:bg-white/5
              transition-all duration-300
            "
          >
            <img
              src={open ? closeIcon : ham}
              alt={open ? "Close Menu" : "Open Menu"}
              className="w-6 h-6"
              draggable={false}
            />
          </button>

          {/* CTA Button */}
          <a
            href="mailto:Idowuomotesho@outlook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="
                bg-[#6741ED]
                rounded-[16px]
                h-[46px]
                px-6
                flex items-center justify-center
                text-white
                text-sm
                font-medium
                whitespace-nowrap
              "
            >
              Let's work 💻
            </div>
          </a>
        </div>

        {/* Dropdown */}
        {open && (
          <div
            id="top-dropdown"
            role="menu"
            className="
              fixed
              top-24
              left-4
              right-4
              z-50
              text-white
              dropdown-slide
            "
          >
            <ul className="flex flex-col space-y-10 py-6 mt-10 px-4 text-[16px] font-light">
              {navLinks.map((link) => (
                <li key={link.id} className="float-down">
                  {link.type === "scroll" ? (
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="transition-colors text-left w-full"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="transition-colors block w-full"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNav;
