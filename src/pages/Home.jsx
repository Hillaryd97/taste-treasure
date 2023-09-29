import { Link } from "react-router-dom";
import img9 from "../assets/img (4).jpeg";
import img10 from "../assets/img4.jpg";
import img5 from "../assets/img3.jpg";
import img6 from "../assets/img2.jpg";
import img7 from "../assets/img8.jpg";
import img1 from "../assets/img (1).jpeg";
import PropTypes from "prop-types";
import MealCard from "../components/MealCard";
import MostLikedCard from "../components/MostLikedCard";
import IngredientCard from "../components/IngredientCard";
import Nav from "../components/Nav";
import { useState } from "react";
const categories = [
  "Japanese",
  "American",
  "Nigerian",
  "Vegan",
  "Dessert",
  "Breakfast",
  "Lunch",
];

const Home = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="min-h-screen overflow-hidden bg-purple-50">
      <div className="container md:mx-auto md:px-0 px-2 py-4">
        <Nav />
        <div className="flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center pb-8">
            <h3 className="font-playfair-display font-bold text-2xl pb-1 md:pt-10 lg:pt-4 pt-4">
              Explore Recipes
            </h3>
            <p className="text-gray-500 font-bold">
              Discover a diverse collection of recipes!
            </p>
          </div>
          <div className="flex justify-between">
            <div className="bg-white px-6 py-1 font-bold flex justify-between lg:justify-normal lg:space-x-6 w-full items-center rounded-full text-lg">
              <p className="text-primary lg:mr-6">Categories:</p>
              <div className="lg:hidden relative">
                <button
                  className="focus:text-primary border border-transparent focus:border-primary px-2 py-0.5 rounded-full duration-100 flex items-center"
                  onClick={() => {
                    const dropdown =
                      document.getElementById("categoryDropdown");
                    dropdown.classList.toggle("hidden");
                  }}
                >
                  <span className="mr-2">{selectedCategory}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 5.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="categoryDropdown"
                  className="hidden absolute top-10 right-0 bg-white shadow-lg rounded-lg border border-primary z-20"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white duration-300"
                      onClick={() => {
                        setSelectedCategory(category);
                        const dropdown =
                          document.getElementById("categoryDropdown");
                        dropdown.classList.add("hidden");
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden lg:flex space-x-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="focus:text-primary border border-transparent focus:border-primary px-2 py-0.5 rounded-full duration-100"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col w-full z-10 p-3 rounded-sm col-span-3 items-center lg:col-span-2">
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 w-full justify-between md:mt-8">
                <MealCard
                  image={img1}
                  userName={"Gojo Satoru"}
                  category={"Breakfast"}
                  recipe_name={"Strawberry Mochi"}
                />
                <MealCard
                  image={img5}
                  userName={"Hatake Kakashi"}
                  category={"Lunch"}
                  recipe_name={"Ramen "}
                />
                <MealCard
                  image={img7}
                  userName={"Uchiha Itachi"}
                  category={"Dairy Free"}
                  recipe_name={"Dango"}
                />
                <MealCard
                  image={img6}
                  userName={"Jung Hoseok"}
                  category={"Vegan"}
                  recipe_name={"Hotteok Pancakes"}
                />
                <MealCard
                  image={img6}
                  userName={"Nanami Kento"}
                  category={"Vegan"}
                  recipe_name={"Sushi"}
                />
                <MealCard
                  image={img5}
                  userName={"Kim Namjoon"}
                  category={"Lunch"}
                  recipe_name={"Bibimbap "}
                />
                <MealCard
                  image={img7}
                  userName={"Uchiha Itachi"}
                  category={"Dairy Free"}
                  recipe_name={"Natto"}
                />
                <MealCard
                  image={img1}
                  userName={"Gojo Satoru"}
                  category={"Breakfast"}
                  recipe_name={"Spaghetti Bolognese"}
                />
              </div>
            </div>
            <div className="hidden lg:flex flex-col w-full z-10 space-y-4  mt-8 col-span-1">
              <div className="bg-white  py-4 rounded-sm shadow-md">
                <h4 className="font-bold pb-2 px-3 border-b">
                  INGREDIENT SPOTLIGHT
                </h4>
                <IngredientCard />
              </div>
              <div className="bg-white pt-4 rounded-sm shadow-md">
                <div className="flex justify-between px-3 pb-3">
                  <h4 className="font-bold">TRENDING RECIPES</h4>
                  {/* <Link className="font-bold text-primary">VIEW ALL</Link> */}
                </div>
                <MostLikedCard
                  userName={"Travis Tortellini"}
                  recipeName={"Spaghetti Bolognese"}
                  category={"Italian"}
                  image={img5}
                />
                <MostLikedCard
                  userName={"Park Jimin"}
                  recipeName={"Mitirashi Dango"}
                  category={"Italian"}
                  image={img6}
                />
                <MostLikedCard
                  userName={"Ayotunde Olawunmi"}
                  recipeName={"Plantain and Gizzard"}
                  category={"Italian"}
                  image={img10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
