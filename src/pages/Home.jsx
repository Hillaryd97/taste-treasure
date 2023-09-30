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
import { supabase } from "../createClient";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
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
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes data from the "recipes" table
    async function fetchRecipes() {
      const { data, error } = await supabase.from("userRecipes").select("*"); // You can specify columns you want to select here

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
      }
    }

    fetchRecipes();
  }, []); // Run this effect once on component mount
  // const ingredientsString = recipes.ingredients.join(", ");
  return (
    <div className="min-h-screen overflow-hidden bg-purple-50">
      <div className="container md:mx-auto px-2 py-4">
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
            <div className="flex flex-col w-full z-10 p-3 rounded-sm col-span-3   lg:col-span-2">
              {recipes.map((recipe) => (
                <div className="mb-2 bg-blue-100 p-2">
                  <div>
                    <h4 className="font-bold pb-1 pt-3">
                      {recipe.recipeName}
                    </h4>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <p className="text-sm font-semibold">Ingredients:</p>
                    <p>{ recipe.ingredients.join(", ")}</p>
                  </div>
                  <div className="flex justify-end items-center w-full py-1">
                    <Link
                      to={"/recipeCard"}
                      className="hover:bg-opacity-80 rounded-full bg-primary py-0.5 px-3 text-white"
                    >
                      View
                    </Link>
                    <button className="hover:bg-opacity-80 rounded-full bg-red-500 py-0.5 px-3 text-white ml-2">
                      Like
                    </button>
                  </div>
                  <div>
                    <p className="text-sm md:text-center pb-0.5 pr-1">
                      By{" "}
                      <span className="font-bold text-primary">
                        {recipe.userName}
                      </span>{" "}
                      in <span className="">{recipe.category}</span>
                    </p>
                  </div>
                </div>
              ))}
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
