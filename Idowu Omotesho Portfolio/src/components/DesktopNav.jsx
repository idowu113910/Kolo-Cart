import { useState, useEffect } from "react";

const navLinks = [
  { id: 1, label: "Project", type: "scroll", section: "projects" },
  { id: 2, label: "Resume", type: "link", href: "/resume.pdf" },
  { id: 3, label: "About", type: "scroll", section: "about" },
  { id: 4, label: "Contact", type: "scroll", section: "contact" },
];

const DesktopNav = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    console.log("Looking for:", sectionId, "Found:", element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="hidden md:flex justify-center pt-16">
      <nav>
        <div className="flex items-center gap-2 border border-white/10 shadow-black/40 rounded-[32px] h-[68px] px-[16px]">
          {navLinks.map((link) => (
            <div key={link.id} className="flex items-center gap-2">
              {link.type === "scroll" ? (
                <button
                  onClick={() => scrollToSection(link.section)}
                  className="group relative text-white text-[15px] font-thin  transition-colors duration-200 whitespace-nowrap px-2"
                >
                  {link.label}

                  {/* underline */}
                  <span className="absolute left-2 right-2 -bottom-0 h-[2px] bg-[white] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-white text-[15px] font-light transition-colors duration-200 whitespace-nowrap px-2 inline-block"
                >
                  {link.label}

                  {/* underline */}
                  <span className="absolute left-2 right-2 -bottom-0 h-[2px] bg-[white] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              )}

              <span className="text-white/30 text-[14px] select-none">|</span>
            </div>
          ))}

          {/* CTA button */}
          <a
            href="mailto:Idowuomotesho@outlook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 group"
          >
            <p
              className="
      bg-[#6741ED] rounded-[16px] px-5 h-[44px]
      flex items-center justify-center
      text-white text-[14px] font-light whitespace-nowrap
      transition-all duration-300
      border-t border-x border-b-[5px]
      border-transparent
      hover:bg-[#5B5FFF]
      hover:text-[#FDFBD4]
      hover:border-[#D2C8F3]
    "
            >
              Let's work 💻
            </p>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNav;
