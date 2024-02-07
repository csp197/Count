import TypeIt from "typeit-react";
import "./Header.css";

const Header = () => {
  return (
    <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
      {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950"> */}
      <TypeIt>Count</TypeIt>
      {/* </span> */}
    </h1>
    // <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
    //   <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400">
    //     {/* to-white-600 */}
    //     Count
    //   </span>
    // </h1>
  );
};

export default Header;
