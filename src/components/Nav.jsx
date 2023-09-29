import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Initialize state for the navbar

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the navbar state
  };

  return (
    <div className="relative">
      <div className="container md:mx-auto md:px-0 px-2 py-4">
        <div className="flex justify-between items-center">
          <div className="text-primary md:text-2xl text-2xl font-bold z-10">
            <h1>
              {" "}
              Taste<span className=" text-secondary">Treasure</span>
            </h1>
          </div>
          <div className="lg:hidden flex">
            <button
              className={`text-primary z-30 font-bold text-xl uppercase ${
                isNavOpen ? "z-50" : ""
              }`} // Increase z-index when the menu is open
              onClick={toggleNav}
            >
              {/* Hamburger Icon */}
              <div className="w-6 h-1 bg-primary mb-1"></div>
              <div className="w-6 h-1 bg-primary mb-1"></div>
              <div className="w-6 h-1 bg-primary"></div>
            </button>
          </div>
          <div className="hidden lg:block drop-shadow-sm">
            <input
              className="w-72 border p-1 px-2 bg-gray-100 border-primary rounded-xl rounded-r-none focus:outline-none focus:bg-secondary duration-300 placeholder:focus:text-white"
              type="text"
              placeholder="Search Recipes..."
            />
            <button className="bg-primary border border-primary rounded-xl rounded-l-none text-white py-1 px-2 hover:bg-opacity-80 duration-300">
              Search
            </button>
          </div>
          <div className="hidden lg:flex space-x-3 md:space-x-4 items-center z-10">
            <Link to={"/profile"} className="text-black font-bold hover:text-primary">
              Profile
            </Link>
            <Link to={"/add-recipe"} className="text-black font-bold hover:text-primary">
              Add Recipe
            </Link>
            <Link
              to={"/logout"}
              className="text-white bg-red-600 rounded-full shadow-md font-bold px-4 py-2 hover:shadow-none duration-300"
            >
              LOGOUT
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-secondary overflow-y-auto transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } z-20 transition-transform ease-in-out duration-300`}
      >
        <ul className="pt-16 pb-4 pl-4 text-black text-lg ">
          <li>
            <Link
              to="/home"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              View Profile
            </Link>
          </li>
          <li>
            <Link
              to="/addRecipe"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Add Recipe
            </Link>
          </li>
          <li>
          <Link
              to={"/logout"}
              className="hover:text-white hover:bg-red-600 text-red-600 tracking-wider border-t border-b border-black mt-9 font-bold block py-2 px-4 hover:shadow-none duration-300"
            >
              LOGOUT
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
