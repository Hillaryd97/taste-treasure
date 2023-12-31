import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react"; // Import useState
import { supabase } from "../createClient";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Initialize state for the navbar
  const navigate = useNavigate();
  const navRef = useRef(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the navbar state
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    };

    // Add event listener for clicks outside of the navigation menu
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Sign out the user from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error logging out:", error);
        // Handle logout error (e.g., display an error message)
      } else {
        console.log("User logged out successfully");
        // Clear user session data from sessionStorage
        sessionStorage.removeItem("user");

        // Redirect the user to the login page or any other desired location
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout error (e.g., display an error message)
    }
  };
  const sessionData = sessionStorage.getItem("user");
  // const userEmail = JSON.parse(sessionData).user.email;

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
          {/* <div className="hidden lg:block drop-shadow-sm">
            <input
              className="w-72 border p-1 px-2 bg-gray-100 border-primary rounded-xl rounded-r-none focus:outline-none focus:bg-secondary duration-300 placeholder:focus:text-white"
              type="text"
              placeholder="Search Recipes..."
            />
            <button className="bg-primary border border-primary rounded-xl rounded-l-none text-white py-1 px-2 hover:bg-opacity-80 duration-300">
              Search
            </button>
          </div> */}
          <div className="hidden lg:flex space-x-3 md:space-x-4 items-center z-10">
            <Link
              to={"/home"}
              className="text-black font-bold hover:text-primary"
            >
              Home
            </Link>
            {sessionData ? (
              <Link
                to={"/profile"}
                className="text-black font-bold hover:text-primary"
              >
                Profile
              </Link>
            ) : (
              <span className="text-gray-400 font-bold cursor-not-allowed">
                Profile
              </span>
            )}
            <Link
              to={"/add-recipe"}
              className="text-black font-bold hover:text-primary"
            >
              Add Recipe
            </Link>
            <Link
              onClick={handleLogout}
              className="text-white bg-red-500 hover:opacity-80 focus:scale-95 rounded-full shadow-md font-bold px-4 py-2 hover:shadow-none duration-300"
            >
              LOGOUT
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div
        ref={navRef}
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
            {sessionData ? (
              <Link
                to="/profile"
                onClick={toggleNav}
                className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
              >
                View Profile
              </Link>
            ) : (
              <span className="text-gray-400 font-bold cursor-not-allowed block py-2 px-4 hover:bg-primary hover:text-white transition duration-300">
                View Profile
              </span>
            )}
          </li>
          <li>
            <Link
              to="/add-recipe"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Add Recipe
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
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
