import TypeIt from "typeit-react";
import "./Header.css";

const Header = () => {
  return (
    <header className="py-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl text-[#2b2115]">
          <span className="font-serif italic">
            <TypeIt>Count</TypeIt>
          </span>
        </h1>
        <p className="text-center text-[#594a3a] italic">
          A Tool for Thoughtful Analysis
        </p>
      </div>
    </header>
  );
};

export default Header;
